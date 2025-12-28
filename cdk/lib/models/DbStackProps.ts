import * as cdk from 'aws-cdk-lib';

export class DbStackProps implements cdk.StackProps {
    analyticsReporting?: boolean | undefined;
    crossRegionReferences?: boolean | undefined;
    description?: string | undefined;
    env?: cdk.Environment | undefined;
    stackName?: string | undefined;
    notificationArns?: string[] | undefined;
    permissionsBoundary?: cdk.PermissionsBoundary | undefined;
    suppressTemplateIndentation?: boolean | undefined;
    synthesizer?: cdk.IStackSynthesizer | undefined;
    tags?: { [key: string]: string; } | undefined;
    terminationProtection?: boolean | undefined;
    mainUserArn?: string | undefined;
}