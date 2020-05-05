#!/usr/bin/env node
import { register } from '../lib/register'
import { App } from '@aws-cdk/core'

register(new App)
