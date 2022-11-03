import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['react-alert-confirm']
  },
  build: {
    commonjsOptions: {
      include: [/react-alert-confirm/, /node_modules/]
    }
  }
});
