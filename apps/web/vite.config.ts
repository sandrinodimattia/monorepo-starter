import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode === 'production' &&
      visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
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
          minify: 'terser',
          terserOptions: {
            compress: {
              drop_debugger: mode === 'production',
              // Enhanced tree shaking in Terser
              unused: true,
              dead_code: true,
            },
            mangle: {
              safari10: true, // Fix Safari 10 issues
            },
          },

          // Code splitting and chunk optimization
          rollupOptions: {
            output: {
              // Manual chunk splitting for better caching
              manualChunks: (id) => {
                // More granular chunk splitting
                if (id.includes('node_modules')) {
                  if (id.includes('react') || id.includes('react-dom')) {
                    return 'react';
                  }
                  if (id.includes('zod')) {
                    return 'zod';
                  }
                  if (id.includes('tailwindcss')) {
                    return 'tailwind';
                  }
                  // Group other node_modules into vendor
                  return 'vendor';
                }
                // Split your own code by feature/module
                if (id.includes('/components/')) {
                  return 'components';
                }
                if (id.includes('/lib/')) {
                  return 'lib';
                }
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

  // Development server optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay for cleaner development
    },
  },

  // Preview server for testing production build
  preview: {
    port: 4173,
    host: true,
  },

  // Environment-specific optimizations
  define: {
    __DEV__: mode === 'development',
    'process.env': JSON.stringify({
      NODE_ENV: mode === 'production' ? 'production' : 'development',
    }),
  },

  // Optimize dependencies
  optimizeDeps:
    mode === 'production'
      ? {
          include: ['react', 'react-dom'],
          exclude: ['zod'],
          // Force tree-shaking for large libraries
          esbuildOptions: {
            target: 'es2020',
            treeShaking: true,
            minify: false, // Don't minify during dependency optimization
            keepNames: true, // Keep function names for better debugging
          },
          // Force re-optimization when dependencies change
          force: false,
        }
      : undefined,

  // Additional build optimizations
  esbuild:
    mode === 'production'
      ? {
          target: 'es2020',
          treeShaking: true,
          minifyIdentifiers: true,
          minifySyntax: true,
          minifyWhitespace: true,
          // Better tree shaking for React
          jsx: 'automatic',
          jsxImportSource: 'react',
        }
      : undefined,
}));
