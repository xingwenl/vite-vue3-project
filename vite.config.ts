import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.ts', 'vue', '.json', '.css'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx',
    //     changeOrigin: true,
    //     rewrite: path => path.replace('/api', '/'),
    //   }
    // }
  },
});
