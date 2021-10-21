import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import postcssPxtorem from 'postcss-pxtorem';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';

const prodMock = true;

export default defineConfig(({ command }) => {
  return {
    base: './',
    define: {
      'process.platform': null,
      'process.version': null,
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false },
      port: 5001,
      open: false,
      cors: true,
      proxy: {
        [URL[0]]: {
          target: URL[1],
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),
        ],
      }),
      vueJsx(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: prodMock,
        injectCode: `
      import { setupProdMockServer } from './mockProdServer';
      setupProdMockServer();
    `,
        logger: true,
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postcssPxtorem({
            rootValue: 192,
            propList: ['*'],
          }),
        ],
      },
    },
    build: {
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
    },
    optimizeDeps: {
      include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en'],
    },
  };
});
