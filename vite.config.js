import { defineConfig } from 'vite';
import { visualizer } from "rollup-plugin-visualizer";

// Allow importing all of these file extensions
const assetExtensions = ['jpg', 'gif', 'png', 'mp3', 'wav', 'mp4', 'webm', 'hdr', 'stl', 'bin', 'gltf'];

export default defineConfig({
  base: '',
  server: {
    port: 3000,
  },
  assetsInclude: [...assetExtensions.map((ext) => `**/*.${ext}`), './src/assets/**'],
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
