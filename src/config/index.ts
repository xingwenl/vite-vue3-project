export const HOST_PLATFORM = 'WEB';

// 是否为测试
export const IS_DEV = process.env.NODE_ENV === 'development';
// 是否为服务端
export const IS_SERVER = typeof window === 'undefined';
export const u = navigator.userAgent;
// export const isMobile = !!u.match(/AppleWebKit.*Mobile.*/)
export const isMobile = window.innerWidth <= 800;
export const AJAX_LOCALLY_ENABLE = true;

export const MONITOR_ENABLE = true;

export const ROUTER_DEFAULT_CONFIG = {
  waitForData: true,
};
// let IP = 'http://yhadmin.zhangtao1994.com'
let IP = 'http://www.baidu.com';

if (IS_DEV) {
  IP = 'https://www.baidu.com';
}
export const SHARE_URL = `${IP}/share`; // 分享的url

export const STATIC_URL = IP;
// API 默认配置
export const API_DEFAULT_CONFIG = {
  mack: true,
  sep: '/',
  ip: IP,
  // url: 'http://localhost:3000/api',
  url: `${IP}`,
  // url: 'https://xin-api.ctl.pub/rest/',
};

export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  // maxContentLength: 100000,
  headers: {
    // cookie: 'lang=ko-KR;',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  baseURL: API_DEFAULT_CONFIG.url,
  withCredentials: false,
};
