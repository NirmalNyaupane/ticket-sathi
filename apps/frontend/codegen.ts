
import { BACKEND_URL } from '@/constants/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: BACKEND_URL,
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    "./src/__generated__/graphql.ts": {
      // preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        withHooks: true
      }
    },
  }
};

export default config;
