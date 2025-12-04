// Importações
import Msg from '/utils/msg.js'

// Variáveis importantes
const fEmail = document.querySelector('#fEmail')
const fSenha = document.querySelector('#fSenha')
const btn = document.querySelector('#btnLogin')

const sv = 'http://localhost:3000'

// Botão de login
btn.addEventListener('click', () => {
    fetch(`${sv}/login/${fEmail.value}/${fSenha.value}`)
    .then(res => res.json())
    .then(data => {
        if(data.status != 500){
            sessionStorage.setItem('nome_user', data[0].nome)
            sessionStorage.setItem('email_user', data[0].email)
            sessionStorage.setItem('cpf_user', data[0].cpf)
            sessionStorage.setItem('endereco_user', data[0].endereco)
            window.location.href = '/components/pages/index/index.html'
        }else{
            const config = {
                titulo: "Erro",
                texto: "Servidor apresentou problemas de conexão ou funcionamento, tente novamente mais tarde.",
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
                texto: "Dados não encontrados no sistema!",
                cor: "#9c0606",
                tipo: "ok",
                ok: () => {},
                confirmar: () => {}
        }
        Msg.mostrar(config)
    })
})