import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 import path from "path"
 import tailwindcss from "@tailwindcss/vite"
// import { buffer } from 'stream/consumers'
// https://vitejs.dev/config/
export default defineConfig({
//    server: {
//      proxy: {
//      // Target is your backend API
//        '/api': {
//            target: 'http://localhost:5000', 
//            changeOrigin: true,
            
//           //  rewrite: (path) => path.replace(/^\/api/, ''),
           
//            configure: (proxy) => {
//               proxy.on('error', (err) => {
//                console.log('error', err);
//               });
//               proxy.on('proxyReq', (_, req) => {
//                console.log('Request sent to target:', req.method, req.url);
//               });
//               proxy.on('proxyRes', (proxyRes, req) => {
//                console.log('Response received from target:', proxyRes.statusCode, req.url);
//               });
//         },
//      },
//    },
//  },
   plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer:'buffer'
    },
  },
})

