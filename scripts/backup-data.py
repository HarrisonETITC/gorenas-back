import boto3
import subprocess
from datetime import datetime
import os
import sys
import mysql.connector
from mysql.connector import Error

DB_HOST = os.environ['DB_HOST']
DB_PORT = int(os.environ['DB_PORT'])
DB_USER = os.environ['DB_USER']
DB_PASSWORD = os.environ['DB_PASS']
DB_NAME = os.environ['DB_NAME']

BACKUP_DIR = "./"

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

        print("Connection to MySQL successful")
        return True

    except Error as e:
        print("Error while connecting to MySQL", e)
        sys.exit(1)

def create_backup_file():
    verify_mysql_connection()
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"{DB_NAME}_data_{timestamp}.sql")

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

    print(f"[INFO] Backup file created at {backup_file}")

    with open(backup_file, "r") as f:
        content = f.read()
        print(content[:500])  # Print first 500 characters of the backup file

if __name__ == "__main__":
    create_backup_file()
