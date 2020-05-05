#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'
import { TopicStack } from './topic-stack'
import { register as registerInfrastructureStacks } from 'infrastructure'
// only need when using `app.node.findChild` pattern
// import { SqsStack } from 'infrastructure/lib/sqs-stack'

export function register(app: cdk.App) {

  const { stacks: infraStacks } = registerInfrastructureStacks(app)

  // A working alternative way to reference shared stack:
  // const sqsStack = <SqsStack> app.node.findChild('SqsStack') // it sucks a bit as the current API doesn't support output stack type inference. Manually force type `<SqsStack>` instead.

  const topicStack = new TopicStack(app, 'TopicStack', {
    queue: infraStacks.sqsStack.queue,
    // queue: sqsStack.queue,
  })

  const stacks = { topicStack }

  return { app, stacks }
}
