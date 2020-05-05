import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { TopicStack } from '../lib/topic-stack';
import { Queue } from '@aws-cdk/aws-sqs';

test('SQS Queue Created', () => {
    const app = new cdk.App();
    // WHEN
    const queue = new Queue(app, 'DummyQueue', {})
    const stack = new TopicStack(app, 'MyTestStack', { queue });
    // THEN
    expectCDK(stack).to(haveResource("AWS::SQS::Queue",{
      VisibilityTimeout: 300
    }));
});

test('SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const queue = new Queue(app, 'DummyQueue', {})
  const stack = new TopicStack(app, 'MyTestStack', { queue });
  // THEN
  expectCDK(stack).to(haveResource("AWS::SNS::Topic"));
});
