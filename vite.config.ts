import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
    hmr: {
      protocol: 'wss', // WebSocket üzerinden SSL
      host: 'www.bookmatehub.com', // Ana alan adınız
    },
  },
});
