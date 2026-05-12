// data/database.js — Banco de Dados em Memória
// =============================================================
// Banco simples em memória para o sistema do Arraiá da Cidade.
//
// Os dados ficam salvos apenas enquanto o servidor estiver ligado.
// Quando reiniciar o servidor, tudo volta ao estado inicial.
// =============================================================

// ─── Tabela de Ingressos ──────────────────────────────────────
let ingressos = [
    {
        id: 1,
        nome: 'Ingresso Individual',
        descricao: 'Entrada para 1 pessoa.',
        preco: 25.00,
        emoji: '🎟️'
    },
    {
        id: 2,
        nome: 'VIP Arraiá',
        descricao: 'Área VIP com comidas inclusas.',
        preco: 80.00,
        emoji: '🌽'
    },
    {
        id: 3,
        nome: 'Casal Caipira',
        descricao: 'Entrada para 2 pessoas.',
        preco: 40.00,
        emoji: '💏'
    }
];

// ─── Exportação dos Dados ─────────────────────────────────────
module.exports = {
    ingressos
};