// Importações
import Msg from '/utils/msg.js'

// Variáveis importantes
const fNome = document.querySelector('#fNome')
const fCpf = document.querySelector('#fCpf')
const fEndereco = document.querySelector('#fEndereco') 
const fEmail = document.querySelector('#fEmail')
const fSenha = document.querySelector('#fSenha')
const btn = document.querySelector('#btnSign')

const sv = 'http://localhost:3000'

// Botão de cadastro
btn.addEventListener('click', () => {
    const dados = {
        nome: fNome.value == '' ? null : fNome.value,
        cpf: fCpf.value == '' ? null : fCpf.value,
        endereco: fEndereco.value,
        email: fEmail.value == '' ? null : fEmail.value,
        senha: fSenha.value == '' ? null : fSenha.value
    }

    const header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }    

    fetch(`${sv}/cadastro`, header)
    .then(res => {
        if(res.status != 500){
            window.location.href = '/components/pages/home/login.html'
        }else{
            const config = {
                titulo: "Erro",
                texto: "Dados não podem ser cadastrados!",
                cor: "#9c0606",
                tipo: "ok",
                ok: () => {},
                confirmar: () => {}
            }
            Msg.mostrar(config)
        }
    })
    .catch(err => {
        console.log(err)
        const config = {
            titulo: "Erro",
            texto: "Servidor apresentou problemas de conexão ou funcionamento, tente novamente mais tarde.",
            cor: "#9c0606",
            tipo: "ok",
            ok: () => {},
            confirmar: () => {}
        }
        Msg.mostrar(config)
    })
})