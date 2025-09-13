import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    react(),
    mode === 'production' && visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build:
    mode === 'production'
      ? {
          // Minification settings
          minify: 'esbuild',

          // Code splitting and chunk optimization
          rollupOptions: {
            output: {
              // Manual chunk splitting for better caching
              manualChunks: (id) => {
                if (id.includes('node_modules')) {
                  if (id.includes('react@') || id.includes('react-dom@') || id.includes('scheduler@')) {
                    return 'react';
                  }
                  if (id.includes('zod@')) {
                    return 'zod';
                  }

                  return 'vendor';
                }

                return;
              },

              // Optimize chunk naming for better caching
              chunkFileNames: (chunkInfo) => {
                const facadeModuleId = chunkInfo.facadeModuleId
                  ? chunkInfo.facadeModuleId
                      .split('/')
                      .pop()
                      ?.replace(/\.[^/.]+$/, '')
                  : 'chunk';
                return `js/${facadeModuleId}-[hash].js`;
              },

              // Optimize asset naming
              assetFileNames: (assetInfo) => {
                const info = assetInfo.name?.split('.') || [];
                const ext = info[info.length - 1];
                if (/\.(css)$/.test(assetInfo.name || '')) {
                  return `css/[name]-[hash].${ext}`;
                }
                if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')) {
                  return `images/[name]-[hash].${ext}`;
                }
                if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name || '')) {
                  return `fonts/[name]-[hash].${ext}`;
                }
                return `assets/[name]-[hash].${ext}`;
              },

              // Entry file naming
              entryFileNames: 'js/[name]-[hash].js',
            },
          },

          // Build optimization settings
          target: 'es2020', // Updated to ES2020 for better tree shaking
          outDir: 'dist',
          assetsDir: 'assets',

          // Chunk size warnings
          chunkSizeWarningLimit: 500, // Reduced to 500KB to catch large chunks

          // CSS optimization
          cssCodeSplit: true,

          // Asset optimization
          assetsInlineLimit: 4096, // 4KB - inline small assets as base64

          // Module preload
          modulePreload: {
            polyfill: true,
          },

          // Report bundle size
          reportCompressedSize: true,
        }
      : undefined,

  // Optimize dependencies for large libraries.
  optimizeDeps:
    mode === 'production'
      ? {
          include: ['react', 'react-dom', 'zod'],
          esbuildOptions: {
            target: 'es2020',
            treeShaking: true,
            minify: false,
            keepNames: true,
          },
          force: false,
        }
      : undefined,

  // Additional build optimizations.
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
    ...(mode === 'production' && {
      target: 'es2020',
      treeShaking: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    }),
  },
}));
