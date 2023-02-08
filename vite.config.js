import { defineConfig } from 'vite';
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: '',
  server: {
    port: 3000,
  },
  assetsInclude: ['**/*.bin', '**/*.gltf', '**/*.jpg', '**/*.hdr'],
  build: {
    target: "esnext",
    minify: false,
    rollupOptions: {
      plugins: [
        visualizer(),
      ],
      external: ['@eyejackapp/ejx-lib', 'three'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        globals: {
          'three': 'THREE',
          '@eyejackapp/ejx-lib': 'eyejack',
        }
      }
    },
  },
});
