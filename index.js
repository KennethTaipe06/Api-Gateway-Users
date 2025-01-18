const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno

const app = express();

app.use(cors()); // Agregar soporte para CORS

app.use('/reset-password', createProxyMiddleware({ target: process.env.RESET_PASSWORD_SERVER, changeOrigin: true }));
app.use('/api/users', createProxyMiddleware({ target: process.env.REGISTER_SERVER, changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: process.env.FETCH_PROFILE_SERVER, changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: process.env.UPDATE_PROFILE_SERVER, changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: process.env.DELETE_PROFILE_SERVER, changeOrigin: true }));
app.use('/api/auth/login', createProxyMiddleware({ target: process.env.LOGIN_SERVER, changeOrigin: true }));
app.use('/api/auth/logout', createProxyMiddleware({ target: process.env.LOGIN_SERVER, changeOrigin: true }));
app.use('/check-email', createProxyMiddleware({ target: process.env.FORGOT_PASSWORD_SERVER, changeOrigin: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => { // Escuchar en todas las interfaces de red
  console.log(`API Gateway running on port ${PORT}`);
});
