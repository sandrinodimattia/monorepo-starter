import { select, intro, outro, isCancel } from '@clack/prompts';

import { addCommand } from './commands/add.js';
import { longRunningCommand } from './commands/long-running.js';

async function main() {
  // Clear the console.
  console.clear();

  // Display the intro.
  intro('Sample CLI');

  // Display the main menu with the available commands.
  const action = await select({
    message: 'Select the command to execute',
    options: [
      { value: 'add', label: 'Add two numbers' },
      { value: 'long-running', label: 'Long running command' },
    ],
  });

  // If the user cancels the operation, exit the application.
  if (isCancel(action)) {
    outro('Operation cancelled');
    process.exit(0);
  }

  // Handle the commands.
  switch (action) {
    case 'add':
      await addCommand();
      break;
    case 'long-running':
      await longRunningCommand();
      break;
  }
}

main();
