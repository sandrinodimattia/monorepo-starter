import { log } from '@clack/prompts';
import { env } from '../lib/env.js';

export async function envCommand() {
  log.info(JSON.stringify(env, null, 2));
}
