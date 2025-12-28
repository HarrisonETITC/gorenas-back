import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { config } from 'dotenv';

config();
export class MainResourcesStack extends cdk.Stack {
    public readonly mainIAMUserName: string;
    public readonly mainIAMUserArn: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const userPass = process.env.MAIN_USER_PASSWORD || 'DefaultPass123!';
    
        const mainIAMUser = new cdk.aws_iam.User(this, 'MainIAMUser', {
            userName: 'main-iam-user',
            password: cdk.SecretValue.unsafePlainText(userPass)
        });

        const mainIAMUserPolicy = new cdk.aws_iam.Policy(this, 'MainIAMUserPolicy', {
            policyName: 'main-iam-user-policy',
            statements: [
                new cdk.aws_iam.PolicyStatement({
                    effect: cdk.aws_iam.Effect.ALLOW,
                    actions: [
                        "sts:AssumeRole"
                    ],
                    resources: [
                        `arn:aws:iam::${this.account}:role/database-access-bucket-role`
                    ]
                })
            ]
        });

        mainIAMUserPolicy.attachToUser(mainIAMUser);
        
        this.mainIAMUserName = mainIAMUser.userName;
        this.mainIAMUserArn = mainIAMUser.userArn;
    }
}
