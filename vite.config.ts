import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,               // Uygulamanın 3000 portunda çalışmasını sağlar
    host: true,               // Dış IP adreslerinden erişilebilir yapar
    hmr: {
      protocol: 'wss',        // WebSocket üzerinden SSL kullanır
      host: 'bookmatehub.com' // Uygulamanın çalıştığı ana bilgisayar adı
    }
  },
  preview: {
    port: 3000,               // Vite 'preview' modunda da 3000 portunu kullanır
    host: true                // Dış IP adreslerinden erişilebilir yapar
  }
})
