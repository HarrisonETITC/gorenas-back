import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackProps, NestedStack, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { ACCOUNT, DB_BUCKET_NAME } from '../utils/constants';
import { ArnPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class BucketStack extends Construct {
    public readonly bucketArn: string;
    public readonly bucketName: string;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id);

        const backupsBucket = new Bucket(this, 'DatabaseBackupsBucket', {
            bucketName: `${DB_BUCKET_NAME}-${ACCOUNT}`,
            versioned: true,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true
        });

        backupsBucket.addToResourcePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            principals: [new ArnPrincipal(`arn:aws:iam::${ACCOUNT}:role/database-access-bucket-role`)],
            actions: [
                "s3:GetObject",
                "s3:PutObject",
                "s3:ListBucket"
            ],
            resources: [
                backupsBucket.bucketArn,
                `${backupsBucket.bucketArn}/*`
            ]
        }));

        this.bucketArn = backupsBucket.bucketArn;
        this.bucketName = backupsBucket.bucketName;
    }
}