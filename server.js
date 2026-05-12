const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(logger);

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        mensagem: '🌽 Bem-vindo à API Arraiá do Amor!'
    });
});

// Rotas
const rotasIngressos = require('./routes/ingressos');
const rotasPedidos = require('./routes/pedidos');

app.use('/api/ingressos', rotasIngressos);
app.use('/api/pedidos', rotasPedidos);

// 404
app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: `🔥 Ô trem bão! A rota '${req.url}' não foi encontrada.`
    });
});

// Handler global de erro
app.use(errorHandler);

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log('🎉 ==========================================');
    console.log(`🌽 API ARRAIÁ ONLINE: http://localhost:${PORTA}`);
    console.log('🎉 ==========================================');
});

module.exports = app;