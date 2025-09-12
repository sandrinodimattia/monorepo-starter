import colors from 'picocolors';
import { setTimeout } from 'node:timers/promises';
import { outro, taskLog } from '@clack/prompts';

export async function longRunningCommand() {
  const log = taskLog({
    title: 'Running long running command',
    limit: 10,
  });

  for await (const line of fakeCommand()) {
    log.message(line);
  }

  outro('Operation completed');
}

async function* fakeCommand() {
  for (let i = 0; i < 20; i++) {
    yield `[${new Date().toLocaleTimeString()}] ${colors.bold(colors.green(i))} foo bar...`;
    await setTimeout(80);
  }
}
