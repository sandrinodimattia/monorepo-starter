/* eslint-disable n/no-process-exit */
import { calculateSum } from '@repo/shared-lib';

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] !== 'add') {
    console.log('Usage: cli add <num1> <num2>');
    return;
  }

  if (args[0] === 'add' && args.length === 3) {
    if (args[1] === undefined || args[2] === undefined) {
      console.error('Please provide valid numbers');
      process.exit(1);
    }

    const num1 = parseFloat(args[1]);
    const num2 = parseFloat(args[2]);
    if (isNaN(num1) || isNaN(num2)) {
      console.error('Please provide valid numbers');
      process.exit(1);
    }

    const result = calculateSum(num1, num2);
    console.log(`${num1} + ${num2} = ${result}`);
    return;
  }
}

main();
