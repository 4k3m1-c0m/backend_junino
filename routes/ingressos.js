// routes/ingressos.js — Rotas de Ingressos do Arraiá da Cidade
// =============================================================
// CRUD COMPLETO:
//
//   Create (POST)   → Criar ingresso
//   Read   (GET)    → Listar ingressos
//   Update (PUT)    → Atualizar ingresso
//   Delete (DELETE) → Remover ingresso
// =============================================================

const express = require('express');
const router = express.Router();
let supabase = require('../data/supabase');

// =============================================================
// ── ROTA DE TESTE DE ERRO ─────────────────────────────────────
// =============================================================
router.get('/erro-teste', (req, res) => {
    throw new Error("O servidor do Arraiá da Cidade tropeçou na quadrilha!");
});

// =============================================================
// ── [GET] /api/ingressos ──────────────────────────────────────
// Lista todos os ingressos ou filtra por tipo.
//
// Exemplos:
//   GET http://localhost:3000/api/ingressos
//   GET http://localhost:3000/api/ingressos?tipo=vip
// =============================================================
router.get('/', async (req, res, next) => {
    try {
        const tipo = req.query.tipo;
        let consulta = supabase.from('ingressos').select('*');

        if (tipo) {
            consulta = consulta.eq('tipo', tipo);
        }

        const { data, error } = await consulta.order('id', { ascending: true });

        if (error) throw error;

        res.json(data);

    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── [GET] /api/ingressos/:id ──────────────────────────────────
// Busca um ingresso específico pelo ID.
//
// Exemplo:
//   GET http://localhost:3000/api/ingressos/1
// =============================================================
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('ingressos')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) throw error;

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({
                mensagem: 'Ingresso não encontrado'
            });
        }

    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── [POST] /api/ingressos ─────────────────────────────────────
// Cria um novo ingresso.
//
// Exemplo de Body JSON:
//
// {
//   "nome": "VIP Arraiá",
//   "tipo": "vip",
//   "descricao": "Área VIP com comidas típicas",
//   "preco": 80,
//   "imagem": "vip.png"
// }
// =============================================================
router.post('/', async (req, res, next) => {
    try {

        const { data, error } = await supabase
            .from('ingressos')
            .insert([req.body])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);

    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── [PUT] /api/ingressos/:id ──────────────────────────────────
// Atualiza um ingresso.
//
// Exemplo:
//   PUT http://localhost:3000/api/ingressos/1
//
// Body:
//   { "preco": 99.90 }
// =============================================================
router.put('/:id', async (req, res, next) => {
    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from('ingressos')
            .update(req.body)
            .eq('id', id)
            .select();

        if (error) throw error;

        if (data && data.length > 0) {
            res.json(data[0]);
        } else {
            res.status(404).json({
                mensagem: 'Ingresso não encontrado'
            });
        }

    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── [DELETE] /api/ingressos/:id ───────────────────────────────
// Remove um ingresso.
//
// Exemplo:
//   DELETE http://localhost:3000/api/ingressos/2
// =============================================================
router.delete('/:id', async (req, res, next) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from('ingressos')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({
            mensagem: 'Ingresso deletado com sucesso'
        });

    } catch (err) {
        next(err);
    }
});

// =============================================================
// ── EXPORTAÇÃO DO ROUTER ──────────────────────────────────────
// =============================================================
module.exports = router;