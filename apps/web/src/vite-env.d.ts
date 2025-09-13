/// <reference types="vite/client" />
/** biome-ignore-all lint/correctness/noUnusedVariables: These interfaces are used by Vite */

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_FOO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
