import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BucketStack } from './bucketStack/bucket-stack';
import { DbAccessStack } from './accessStack/db-access-stack';
import { DbStackProps } from '../models/DbStackProps';

export class DatabaseBackupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: DbStackProps) {
    super(scope, id, props);

    const bucketStack = new BucketStack(this, 'DbBackupBucketStack', {});
    const accessStack = new DbAccessStack(this, 'DbBackupAccessStack', {
      bucketArn: bucketStack.bucketArn,
      mainUserArn: props?.mainUserArn || ''
    });
  }
}
