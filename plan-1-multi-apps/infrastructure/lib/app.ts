#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { SqsStack } from './sqs-stack';

export function buildApp(): cdk.App {
  const app = new cdk.App();
  new SqsStack(app, 'SqsStack');

  return app
}
