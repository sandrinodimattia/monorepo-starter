import { implement } from '@orpc/server';
import contract from './contract.js';

const router = implement(contract);
const health = router.health.handler(() => {
  return {
    status: 'ok',
  };
});

export default {
  health,
};
