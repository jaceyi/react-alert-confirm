import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      ignored: ['!**/node_modules/react-alert-confirm/lib/**']
    }
  },
  optimizeDeps: {
    force: true,
    include: ['react-alert-confirm'],
    needsInterop: ['react-alert-confirm']
  }
});
