export default class Msg {
    static config = null /* Parâmetros do util */

    // Renderização da caixa de mensagem
    static mostrar = (config) => {
        this.config = config

        const msgFundo = document.createElement("div")
        msgFundo.setAttribute("id", "msgFundo")

        const msg = document.createElement("div")
        msg.setAttribute("id", "msg")
        msgFundo.appendChild(msg)

        const headerMsg = document.createElement("div")
        headerMsg.setAttribute("id", "headerMsg")
        headerMsg.setAttribute("style", `background-color: ${config.cor} !important;`)
        msg.appendChild(headerMsg)

        const titulo = document.createElement("p")
        titulo.innerHTML = config.titulo
        headerMsg.appendChild(titulo)

        const bodyMsg = document.createElement("div")
        bodyMsg.setAttribute("id", "bodyMsg")
        msg.appendChild(bodyMsg)

        const texto = document.createElement("p")
        texto.innerHTML = config.texto
        bodyMsg.appendChild(texto)

        const footerMsg = document.createElement("div")
        footerMsg.setAttribute("id", "footerMsg")
        msg.appendChild(footerMsg)

        if(config.tipo == "ok"){
            const btnOkMsg = document.createElement("button")
            btnOkMsg.setAttribute("id", "btnOkMsg")
            btnOkMsg.setAttribute("class", "btnMsg")
            btnOkMsg.innerHTML = "Ok"
            btnOkMsg.addEventListener("click", () => {
                config.ok()
                this.fechar()
            })
            footerMsg.appendChild(btnOkMsg)
        }else if(config.tipo == "confirmar"){
            const btnConfirmarMsg = document.createElement("button")
            btnConfirmarMsg.setAttribute("id", "btnConfirmarMsg")
            btnConfirmarMsg.setAttribute("class", "btnMsg")
            btnConfirmarMsg.innerHTML = "Confirmar"
            btnConfirmarMsg.addEventListener("click", () => {
                config.confirmar()
                this.fechar()
            })
            footerMsg.appendChild(btnConfirmarMsg)

            const btnCancelarMsg = document.createElement("button")
            btnCancelarMsg.setAttribute("class", "btnMsg")
            btnCancelarMsg.innerHTML = "Cancelar"
            btnCancelarMsg.addEventListener("click", () => {
                config.ok()
                this.fechar()
            })
            footerMsg.appendChild(btnCancelarMsg)
        }

        document.body.prepend(msgFundo)
    }

    // Função de fechar a caixa de mensagem
    static fechar = () => {
        document.getElementById("msgFundo").remove()
    }
}