#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { TopicStack } from './topic-stack';
import { buildApp as buildInfrastructureApp } from 'infrastructure/lib/app'
import { SqsStack } from 'infrastructure/lib/sqs-stack'

export function buildApp(): cdk.App {
  const app = new cdk.App();

  const infrastructure = buildInfrastructureApp()

  const sqsStack  = <SqsStack> infrastructure.node.findChild('SqsStack')

  new TopicStack(app, 'ServiceAStack', {
    queue: sqsStack.queue,
  });

  return app
}
