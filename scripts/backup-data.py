import boto3
from botocore.exceptions import ClientError
import subprocess
from datetime import datetime, UTC
import os
import sys
import mysql.connector
from mysql.connector import Error
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DB_HOST = os.environ['DB_HOST']
DB_PORT = int(os.environ['DB_PORT'])
DB_USER = os.environ['DB_USER']
DB_PASSWORD = os.environ['DB_PASS']
DB_NAME = os.environ['DB_NAME']

BACKUP_DIR = "./"

S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'my-backup-bucket')
s3 = boto3.client('s3', region_name='us-east-1')

def verify_mysql_connection():
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            port=DB_PORT,
            connection_timeout=6
        )

        cursor = connection.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()

        cursor.close()
        connection.close()

        logger.info("Connection to MySQL successful")
        return True

    except Error as e:
        logger.error("Error while connecting to MySQL", e)
        sys.exit(1)

def create_backup_file():
    verify_mysql_connection()
    timestamp = datetime.now(UTC).strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"{DB_NAME}_data_{timestamp}.sql")

    logging.info(f"Creating backup of database {DB_NAME} in file: {backup_file}")

    command = [
        "mysqldump",
        "--skip-opt",
        "--single-transaction",
        "--skip-lock-tables",
        "--quick",
        "--no-create-info",
        "--no-tablespaces",
        "--set-gtid-purged=OFF",
        "--skip-triggers",
        "--host", DB_HOST,
        "--port", str(DB_PORT),
        "--user", DB_USER,
        f"--password={DB_PASSWORD}",
        DB_NAME
    ]

    with open(backup_file, "w") as f:
        subprocess.run(command, stdout=f, stderr=subprocess.PIPE, check=True)

    logger.info(f"Backup file created at {backup_file}")
    upload_to_s3(backup_file)

def upload_to_s3(file_path):
    file_name = os.path.basename(file_path)
    s3_file_key = f"backups/{file_name}"

    try:
        s3.upload_file(
            Filename=file_path,
            Bucket=S3_BUCKET_NAME,
            Key=s3_file_key
        )
        logger.info(f"Uploaded {file_name} to {s3_file_key} in bucket {S3_BUCKET_NAME}")
    except ClientError as e:
        logger.error(f"Failed to upload {file_name} to S3: {e}")
        sys.exit(1)

if __name__ == "__main__":
    create_backup_file()
