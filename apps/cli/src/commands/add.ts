import { add } from '@packages/math';
import { isCancel, outro, text } from '@clack/prompts';

const validate = (value: string | undefined) => {
  if (!value || !/^[0-9]+$/.test(value)) return 'Number can only contain numbers';
  return undefined;
};

export async function addCommand() {
  const a = await text({
    message: 'The first number',
    validate,
  });

  const b = await text({
    message: 'The second number',
    validate,
  });

  if (isCancel(a) || isCancel(b)) {
    outro('Operation cancelled');
    process.exit(0);
  }

  const result = add(Number(a), Number(b));
  outro(`The result is ${result}`);
}
