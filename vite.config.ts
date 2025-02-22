import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['**/*.scss'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables.scss" as *;
                         @use "@/styles/_mixins.scss" as *;`,
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
  base: '/todo-table-app/',
})
