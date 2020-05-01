import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';

export class SqsStack extends cdk.Stack {
  readonly queue: sqs.Queue
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.queue = new sqs.Queue(this, 'InfrastructureQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });
  }
}
