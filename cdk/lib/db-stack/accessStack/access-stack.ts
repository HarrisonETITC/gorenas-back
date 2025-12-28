import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { AccessStackProps } from '../../models/AccessStackProps';

export class AccessStack extends Construct {
    constructor(scope: Construct, id: string, props?: AccessStackProps) {
        super(scope, id);

        const backupsBucketArn = props?.bucketArn || '';

        const iamRole = new iam.Role(this, 'DatabaseAccesBucketRole', {
            roleName: 'database-access-bucket-role',
            assumedBy: new iam.AccountRootPrincipal(),
            description: 'Role to access the S3 bucket for database backups'
        });

        iamRole.assumeRolePolicy?.addStatements(new iam.PolicyStatement({
            actions: ['sts:AssumeRole'],
            principals: [new iam.ArnPrincipal(props?.mainUserArn || '')]
        }))

        const iamPolicy = new iam.Policy(this, 'DatabaseAccessBucketPolicy', {
            policyName: 'database-access-bucket-policy',
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        's3:GetObject',
                        's3:PutObject',
                        's3:ListBucket'
                    ],
                    resources: [
                        `${backupsBucketArn}`,
                        `${backupsBucketArn}/*`
                    ]
                })
            ],
            roles: [iamRole]
        });
    }
}