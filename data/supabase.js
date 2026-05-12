const { createClient } = require('@supabase/supabase-js');
require ('dotenv').config();

// Não precisa de dotenv.config() se as variáveis estiverem no painel da Vercel
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('ERRO: Credenciais do Supabase não encontradas!');
}

const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;
