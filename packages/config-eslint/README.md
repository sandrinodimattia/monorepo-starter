# @repo/config-eslint

Shared ESLint configurations for the monorepo, compatible with ESLint 9 flat config format.

## Available Configurations

### Base Configuration

```javascript
import { config } from '@repo/config-eslint/base';
```

### TypeScript Library

```javascript
import { config } from '@repo/config-eslint/typescript-library';
```

### Node.js Application

```javascript
import { config } from '@repo/config-eslint/node';
```

### Next.js Application

```javascript
import { config } from '@repo/config-eslint/next-js';
```

### React Internal

```javascript
import { config } from '@repo/config-eslint/react-internal';
```

## Usage

Create an `eslint.config.js` file in your package and import the appropriate configuration:

```javascript
export { config as default } from '@repo/config-eslint/typescript-library';
```
