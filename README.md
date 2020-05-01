# cdk-playground

WIP example of cross-cdk-app-repo importing.

This is a spike of idea described in https://github.com/aws/aws-cdk/issues/7721

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
