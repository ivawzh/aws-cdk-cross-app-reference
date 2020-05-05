#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'
import { SqsStack } from './sqs-stack'

export function register(app: cdk.App) {
  const sqsStack = new SqsStack(app, 'SqsStack')

  const stacks = { sqsStack }

  return { app, stacks }
}
