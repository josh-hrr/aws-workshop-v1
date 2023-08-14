import * as cdk from 'aws-cdk-lib'; 
import * as sns from 'aws-cdk-lib/aws-sns';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'; 
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources'; 
import * as path from "path";

export class FirstAttemptCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props); 

    const topic = new sns.Topic(this, 'LabTopic1');
    const bucket = new s3.Bucket(this, 'myBucketLab');

    const lambda = new nodejs.NodejsFunction(this, "MyNewLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join("firstAttempt-cdk", "..", "src", "index.ts"), 
      handler: "handler", 
      functionName: "cds-session-workshop"
    });

    lambda.role?.addToPrincipalPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "sts:AssumeRole"
      ],
      resources: ["*"]
    }))

    lambda.role?.addToPrincipalPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "sns:Publish"
      ],
      resources: ["*"]
    }))
    

    topic.grantPublish(lambda);
    lambda.addEventSource(new S3EventSource(bucket, {
      events: [ s3.EventType.OBJECT_CREATED]
    })) 

    //testing second commitasdfsadfsadf
  }
}
