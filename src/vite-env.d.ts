/// <reference types="svelte" />
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
