import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme: {
    '@text-1': '#71777c',
    '@primary-color': '#007fff',
    '@success-color': '#6cbd45',
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
          level: 0,
        },
        title: '掘金 - juejin.im - 一个帮助开发者成长的社区',
        dll: true,
        locale: {
          enable: true,
          default: 'en-US',
          // default true, when it is true, will use `navigator.language` overwrite default
          baseNavigator: true,
        },
        // pwa: {
        //   manifestOptions: {
        //     srcPath: 'src/manifest.json',
        //   },
        //   workboxPluginMode: 'InjectManifest',
        //   workboxOptions: {
        //     importWorkboxFrom: 'local',
        //   },
        // },
        manifest: {
          basePath: '/',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};

export default config;
