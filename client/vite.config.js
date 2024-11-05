import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false, // Bypasses SSL verification if the target uses HTTPS
      },
    },
  },
  plugins: [react()],
});