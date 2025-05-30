const express = require('express');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const setupSwagger = require('./middlewares/swagger');

const automovelRoutes = require('./api/automoveis/automovel.routes');
const motoristaRoutes = require('./api/motoristas/motorista.routes');
const utilizacaoRoutes = require('./api/utilizacoes/utilizacao.routes');
const healthRoutes = require('./api/health/health.routes');

const app = express();

// Swagger UI (antes de middlewares restritivos)
setupSwagger(app);

// Request logger (should be early)
app.use(requestLogger);

// Health check endpoint (geralmente fora do rate limiting principal da API e da documentação)
app.use('/health', healthRoutes);

// Middleware to parse JSON bodies - essencial para que req.body seja populado
app.use(express.json());

// Configurar e aplicar o rate limiter para rotas /api/*
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite cada IP a 100 requisições por `windowMs`
  standardHeaders: true, // Retorna informações de rate limit nos headers `RateLimit-*`
  legacyHeaders: false, // Desabilita os headers `X-RateLimit-*` (mais antigos)
  message: 'Muitas requisições originadas deste IP, por favor, tente novamente após 15 minutos.',
});

app.use('/api', apiLimiter); // Aplicar a todas as rotas que começam com /api

// Mount feature routes (agora protegidas pelo apiLimiter)
app.use('/api/automoveis', automovelRoutes);
app.use('/api/motoristas', motoristaRoutes);
app.use('/api/utilizacoes', utilizacaoRoutes);

// Global error handler (should be last)
app.use(errorHandler);

module.exports = app;
