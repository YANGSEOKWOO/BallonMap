import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'BallonMap Project',
          short_name: 'BallonMap',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),

      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoApiKey: env.VITE_KAKAO_API_KEY, // 환경 변수 주입
          },
        },
      }),
    ],
    server: {
      https:
        process.env.NODE_ENV === 'development'
          ? {
              key: 'key.pem',
              cert: 'cert.pem',
            }
          : false,
      host: true,
    },
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          firebaseMessagingSW: 'firebase-messaging-sw.js', // Service Worker 파일 경로 추가
        },
        output: {
          entryFileNames: (chunk) => {
            if (chunk.name === 'firebaseMessagingSW') {
              return 'firebase-messaging-sw.js'
            }
            return '[name].js'
          },
        },
      },
    },
  }
})
