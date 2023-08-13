import { Handler } from 'aws-cdk-lib/aws-lambda';

export const handler: Handler = async (event: any, context: any) => {
    console.log("TESTING HANDLER EVENT: " + JSON.stringify(event))
    console.log("TESTING HANDLER CONTEXT: " + JSON.stringify(context))
}