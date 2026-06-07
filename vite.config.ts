import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@assets', replacement: path.resolve(__dirname, '..', 'attached_assets') },
      // Add any other necessary aliases here
      { find: 'zod', replacement: 'zod' },  // Explicitly resolve zod
    ]
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      external: [
        'drizzle-orm',
        'drizzle-orm/pg-core',
        'drizzle-zod',
        'pg',
        '@neondatabase/serverless',
        'zod'  // Add zod to external dependencies
      ],
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['react-router-dom']
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  preview: {
    port: 3000,
    open: true
  }
});
