const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      target: 'http://127.0.0.1:8000', // 백엔드 서버의 주소
      changeOrigin: true,
    })
  );
};
