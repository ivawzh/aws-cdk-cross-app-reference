#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'
import { TopicStack } from './topic-stack'
import { register as registerInfrastructureStacks } from 'infrastructure'
import { SqsStack } from 'infrastructure/lib/sqs-stack'

export function register(app: cdk.App): cdk.App {

  registerInfrastructureStacks(app)

  const sqsStack = <SqsStack> app.node.findChild('SqsStack')

  new TopicStack(app, 'TopicStack', {
    queue: sqsStack.queue,
  })

  return app
}
