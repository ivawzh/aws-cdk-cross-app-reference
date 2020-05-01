#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'
import { SqsStack } from './sqs-stack'

export function register(app: cdk.App): cdk.App {
  new SqsStack(app, 'SqsStack')
  return app
}
