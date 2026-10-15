const pool = require('../config/db')

async function buscarPedidos(req,res) {
    try {
        const [buscar] = await pool.execute('SELECT * FROM pedidos')

        return res.json(buscar)

    } catch (e) {
        console.error('Erro de conexão com o banco', e)

        return res.status(500).json({erro: 'Erro de conexao com o banco'})
    }
}


async function cadastrarPedidos(req,res) {
    try {
        const nome = (req.body.nome || '').trim()
        const email = (req.body.email || '').trim()
        const suges = (req.body.suges || '').trim()

        if (!nome || !email || !suges){
            return res.status(400).json()
        }

        await pool.execute('INSERT INTO pedidos(nome,email,suges) VALUES (?,?,?)', [nome,email,suges])

        return res.json({sucesso: 'Pedidos cadastrado com sucesso'})
    } catch (e) {
        console.error('Erro de conexão com o banco', e)

        return res.status(500).json({erro: 'Erro de conexao com o banco'})
    }
}


async function atualizarPedidos(req,res) {
    try {
        const id = req.params.id

        const nome = (req.body.nome || '').trim()
        const email = (req.body.email || '').trim()
        const suges = (req.body.suges || '').trim()

        if (!nome || !email || !suges){
            return res.status(400).json()
        }

        await pool.execute('UPDATE pedidos SET nome=?, email=?, suges=? WHERE id = ?', [nome,email,suges,id])
        
        return res.json({sucesso: 'Pedidos atualizado com sucesso'})
    } catch (e) {
        console.error('Erro de conexão com o banco', e)

        return res.status(500).json({erro: 'Erro de conexao com o banco'})
    }
}


async function deletarPedidos(req,res) {
    try {
        const id = req.params.id

        await pool.execute('DELETE FROM pedidos WHERE id=?', [id])

        return res.json({sucesso: 'Pedido deletado com sucesso'})

    } catch (e) {
        console.error('Erro de conexão com o banco', e)

        return res.status(500).json({erro: 'Erro de conexao com o banco'})
    }
}


module.exports = {
    buscarPedidos,
    cadastrarPedidos,
    atualizarPedidos,
    deletarPedidos
}