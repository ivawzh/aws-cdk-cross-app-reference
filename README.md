# aws-cdk-cross-app-reference

Example of cross-cdk-app-repo importing, i.e. sharing resource across CDK apps without painful `fromXxxxAttributes` and `CfnOutput`.

This is a spike of idea described in https://github.com/aws/aws-cdk/issues/7721

## Plan A - multiple CDK apps

At the moment, infrastructure deployments works as expected. Service-A deployment throws error:

```log
Error: Cannot reference across apps. Consuming and producing stacks must be defined within the same CDK app.
    at resolveValue (./infrastructure/node_modules/@aws-cdk/core/lib/private/refs.ts:48:11)
    at Object.resolveReferences (./infrastructure/node_modules/@aws-cdk/core/lib/private/refs.ts:29:24)
    at Object.prepareApp (./infrastructure/node_modules/@aws-cdk/core/lib/private/prepare-app.ts:26:5)
    at App.prepare (./infrastructure/node_modules/@aws-cdk/core/lib/app.ts:153:5)
    at App.onPrepare (./infrastructure/node_modules/@aws-cdk/core/lib/construct-compat.ts:111:10)
    at Node.prepare (./infrastructure/node_modules/constructs/lib/construct.ts:429:12)
    at Node.synthesize (./infrastructure/node_modules/constructs/lib/construct.ts:386:10)
    at Function.synth (./infrastructure/node_modules/@aws-cdk/core/lib/construct-compat.ts:231:22)
    at App.synth (./infrastructure/node_modules/@aws-cdk/core/lib/app.ts:142:36)
    at process.<anonymous> (./infrastructure/node_modules/@aws-cdk/core/lib/app.ts:121:45)
```

## Plan B - CDK app injection

One CDK app, multiple registers.
Each individual repo has its own register. Register provisions one or more stacks.

All deployments work 🤟

Downsides:

1. service repo can deploy stack from infrastructure repo, e.g. `cdk deploy SqsStack` while I am at service repo. Cannot use `  Tag.add(app, 'project', projectName); Tag.add(app, 'app', appName)` in consumer stacks, because that will apply the tags to all shared infra stacks.
2. have to publish provider and re-npm-install at consumer to keep things up-to-date.

----------

   The disadvantages above could be slightly mitigated by npm script, e.g. `"deploy": "npm install && cdk deploy TopicStack"`.

----------

3. ***The most unbearable disadvantage*** - when update infrastructure repo, because provider repo doesn't have informatin from consumer repos, it will remove features added by consumer repos.

    For instance, security group where was mutated by consumer repos will get undesirable RESET when provider repo re-deploys 😑

```log
    Security Group Changes
    ┌───┬────────────────────────────────────────┬─────┬─────────────┬────────────────────┐
    │   │ Group                                  │ Dir │ Protocol    │ Peer               │
    ├───┼────────────────────────────────────────┼─────┼─────────────┼────────────────────┤
    │ - │ ${PublicRootALB/SecurityGroup.GroupId} │ In  │ TCP 80      │ Everyone (IPv4)    │
    │ - │ ${PublicRootALB/SecurityGroup.GroupId} │ In  │ TCP 443     │ Everyone (IPv4)    │
    ├───┼────────────────────────────────────────┼─────┼─────────────┼────────────────────┤
    │ + │ ${PublicRootALB/SecurityGroup.GroupId} │ Out │ ICMP 252-86 │ 255.255.255.255/32 │
    └───┴────────────────────────────────────────┴─────┴─────────────┴────────────────────┘
```
