import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [
    vue({
      script: {
        refSugar: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
