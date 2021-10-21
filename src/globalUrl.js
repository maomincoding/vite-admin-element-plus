// 全局环境URL 配置

const url = 'http://127.0.0.1:5500/';

const URL_CONFIG = {
  development: ['/api', url],
  production: [`${url}/api`, url],
};

export default URL_CONFIG[import.meta.env.MODE];
