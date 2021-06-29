import storage from '../../utils/storage'


export const baseUrlByEnv = {
  pro: 'https://browser.thinkium.io/browser-api'
};

const api = {
    // 'localhost:8081': 'https://mall-app.dbay.shop/browser-api',
    'localhost:8081': baseUrlByEnv.pro,
    'localhost:8082': baseUrlByEnv.pro,
    'localhost:8083': baseUrlByEnv.pro,
    'localhost:8084': baseUrlByEnv.pro,
    '192.168.0.103:8082': baseUrlByEnv.pro,
}



export function getAppBaseUrl() {
    
  return storage.temp('session','baseUrl') || api[location.host] || location.protocol + '//' + location.host + "/browser-api"
}

