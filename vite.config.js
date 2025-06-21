import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: '/202506_LnH/',
    resolve: {
        alias: {
            '@core': path.resolve(__dirname, 'src/core'),
            '@phaser': path.resolve(__dirname, 'src/phaser'),
            '@shared': path.resolve(__dirname, 'src/core/shared'),
        }
    },
    server: {
        open: true,
        port: 3000
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    }
});