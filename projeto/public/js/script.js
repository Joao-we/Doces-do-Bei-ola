const formulario = document.getElementById('formulario')
const inputNome = document.getElementById('nome')
const inputEmail = document.getElementById('email')
const inputSuges = document.getElementById('suges')
const mensagem = document.getElementById('situacaoPedidos')
const listarPedidos = document.getElementById('listarPedidos')
const btnEnviar = document.getElementById('enviarPedidos')
const url = 'http://localhost:3000/pedidos'

let idEditando = null

document.addEventListener('DOMContentLoaded', mostrarPedidos)


formulario.addEventListener('submit', async(evento) => {

    evento.preventDefault()

    const nome = inputNome.value.trim()
    const email = inputEmail.value.trim()
    const suges = inputSuges.value.trim()

    if (!nome || !email || !suges) {
        exibirMensagem('Preencha todos os campos', 'erro')
        return
    }

    if (idEditando !== null){
        atualizarPedido(idEditando)
        return
    }


    try {
        const resposta = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, email, suges})
        })

        const dados = await resposta.json()

        if (!dados.ok) {
            exibirMensagem(dados.mensagem || 'Erro ao cadastrar com o backend', 'erro')
        }

        formulario.reset()

        exibirMensagem('Pedidos cadastrado com sucesso', 'sucesso')

        mostrarPedidos()
    } catch (e) {
        console.error('erro ao cadastrar pedido', e)
        exibirMensagem('Erro ao cadastrar pedido', 'erro')
    }
})

async function mostrarPedidos() {
    try {
        const resposta = await fetch(url)

        if (!resposta.ok) {
            throw new Error(`Reposta: ${resposta.status}`)
        }

        const resultado = await resposta.json()
        listarPedidos.innerHTML = ''

        resultado.forEach(item => {
            const lista = document.createElement('li')

            const btnEditar = document.createElement('button')

            const btnExcluir = document.createElement('button')

            btnEditar.innerHTML = 'Editar'
            btnExcluir.innerHTML = 'Excluir'

            btnEditar.classList.add('editar')
            btnExcluir.classList.add('excluir')

            lista.innerHTML = `Nome: ${item.nome} - Email: ${item.email} - Sugestão: ${item.suges}`

            btnEditar.addEventListener('click', () =>{
                inputNome.value = item.nome
                inputEmail.value = item.email
                inputSuges.value = item.suges

                idEditando = item.id
                btnEnviar.innerHTML = 'Atualizar'
            })

            btnExcluir.dataset.id = item.id



            btnExcluir.addEventListener('click', (evento) => {
                const id = evento.target.dataset.id
                const confirmar = confirm('Deseja remover esse pedido')
                if (confirmar) {
                    deletarPedido(id)
                } 
            })
            
            listarPedidos.appendChild(lista)

            lista.appendChild(btnEditar)
            lista.appendChild(btnExcluir)

        })

        idEditando = null

        btnEnviar.innerHTML = 'Enviar'
        formulario.reset()
    } catch (e) {
        exibirMensagem('Erro de conexão ao backend')
    }
}

async function atualizarPedido(id) {
    const nome = inputNome.value.trim()
    const email = inputEmail.value.trim()
    const suges = inputSuges.value.trim()

    if(!nome || !email || !suges){
        exibirMensagem('Preencha todos os campos', 'erro')
        return
    }

    try {
        const resposta = await fetch(`/pedidos/${id}`, {
            method: 'PUT',
            headers: {
                 "Content-Type": "application/json",
            },
            body: JSON.stringify({nome, email, suges })
        })
        if (resposta.ok){
            exibirMensagem('Sugestão alterada com sucesso', 'sucesso')
        }

        if (!resposta.ok){
            exibirMensagem('Erro ao inserir pedidos', 'erro')
        }

        const dados = await resposta.json()

        carregarPedidos()

    } catch (e) {
        console.error('Erro ao alterar sugestão', e)
    }
}


async function deletarPedido(id) {
    try {
        const resposta = await fetch(`/pedidos/${id}`, {
            method: 'DELETE'
        })
        const dados = await resposta.json()

        exibirMensagem('Pedido removido com sucesso', 'sucesso')

        mostrarPedidos()

    } catch (e) {
        console.error('Erro ao deletar pedido', e)
        exibirMensagem(dados.mensagem, 'erro')
    }
}

function exibirMensagem(texto, tipo) {  
    mensagem.innerHTML = texto
    mensagem.dataset.tipo = tipo
    setTimeout(() => {
        mensagem.innerHTML = ''
        mensagem.removeAttribute('data-tipo')
    }, 4000);
}