import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 80,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
