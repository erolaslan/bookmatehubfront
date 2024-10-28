import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // Uygulamanın 3000 portunda çalışmasını sağlar
    host: true,       // Dış IP adreslerinden erişilebilir yapar
    open: true        // Uygulamayı başlattığınızda tarayıcıyı otomatik açar (isteğe bağlı)
  },
  preview: {
    port: 3000,       // Vite 'preview' modunda da 3000 portunu kullanır
    host: true        // Dış IP adreslerinden erişilebilir yapar
  }
})
