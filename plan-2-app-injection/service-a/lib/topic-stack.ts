import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as cdk from '@aws-cdk/core';
import { Queue } from '@aws-cdk/aws-sqs';

interface ServiceAStackProps extends cdk.StackProps {
  queue: Queue
}

export class TopicStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: ServiceAStackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, 'ServiceATopic');

    topic.addSubscription(new subs.SqsSubscription(props.queue));
  }
}
