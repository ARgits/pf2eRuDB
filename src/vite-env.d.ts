/// <reference types="svelte" />
/// <reference types="vite/client" />
declare module "envConfig";
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
