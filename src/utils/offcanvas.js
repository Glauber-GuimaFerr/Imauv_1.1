// Importações
import Form from "/utils/form.js"

export default class OffCanvas {
    static config = null /* Parâmetros do util */
    static btnLeaflet = null
    static offCanvasEsquerda = null
    static offCanvasDireita = null
    static painelEsquerda = null
    static painelDireita = null
    static cabecalhoEsquerda = null
    static cabecalhoDireita = null
    static tituloEsquerda = null
    static tituloDireita = null
    static btnFecharEsquerda = null
    static btnFecharDireita = null
    static conteudoEsquerda = null
    static conteudoDireita = null
    static containerEsquerda = null
    static containerDireita = null
    
    // Renderização de painéis e botões
    static criar = (elementosBody, btnLeaflet, btnList) => {
        this.btnLeaflet = btnLeaflet

        this.offCanvasEsquerda = document.createElement("div")
        this.offCanvasEsquerda.setAttribute("id", "offCanvasEsquerda")
        this.offCanvasEsquerda.setAttribute("class", "offCanvasEsquerda ocultarEsquerda")
        elementosBody.appendChild(this.offCanvasEsquerda)

        this.offCanvasDireita = document.createElement("div")
        this.offCanvasDireita.setAttribute("id", "offCanvasDireita")
        this.offCanvasDireita.setAttribute("class", "offCanvasDireita ocultarDireita")
        elementosBody.appendChild(this.offCanvasDireita)

        this.painelEsquerda = document.createElement("div")
        this.painelEsquerda.setAttribute("id", "painelEsquerda")
        this.offCanvasEsquerda.appendChild(this.painelEsquerda)

        this.painelDireita = document.createElement("div")
        this.painelDireita.setAttribute("id", "painelDireita")
        this.offCanvasDireita.appendChild(this.painelDireita)

        this.cabecalhoEsquerda = document.createElement("div")
        this.cabecalhoEsquerda.setAttribute("class", "cabecalhoPainel")
        this.painelEsquerda.appendChild(this.cabecalhoEsquerda)

        this.tituloEsquerda = document.createElement("p")
        this.cabecalhoEsquerda.appendChild(this.tituloEsquerda)

        this.btnFecharEsquerda = document.createElement("img")
        this.btnFecharEsquerda.setAttribute("class", "btnFechar")
        this.btnFecharEsquerda.setAttribute("src", "/img/home/close-icon.png")
        this.btnFecharEsquerda.addEventListener("click", () => {
            this.offCanvasEsquerda.classList.add("ocultarEsquerda")
            if(document.querySelector(".ocultarEsquerda")){
                this.btnLeaflet[0].style.left = "-1750px"
            }else{
                this.btnLeaflet[0].style.left = "-1230px"
            }
        })
        this.cabecalhoEsquerda.appendChild(this.btnFecharEsquerda)

        this.cabecalhoDireita = document.createElement("div")
        this.cabecalhoDireita.setAttribute("class", "cabecalhoPainel")
        this.painelDireita.appendChild(this.cabecalhoDireita)

        this.tituloDireita = document.createElement("p")
        this.cabecalhoDireita.appendChild(this.tituloDireita)

        this.btnFecharDireita = document.createElement("img")
        this.btnFecharDireita.setAttribute("class", "btnFechar")
        this.btnFecharDireita.setAttribute("src", "/img/home/close-icon.png")
        this.btnFecharDireita.addEventListener("click", () => {
            this.offCanvasDireita.classList.add("ocultarDireita")
            if(document.querySelector(".ocultarDireita")){
                this.btnLeaflet[1].style.right = "-1802px"
                this.btnLeaflet[2].style.right = "60px"
            }else{
                this.btnLeaflet[1].style.right = "-1280px"
                this.btnLeaflet[2].style.right = "580px"
            }
        })
        this.cabecalhoDireita.appendChild(this.btnFecharDireita)

        this.conteudoEsquerda = document.createElement("div")
        this.conteudoEsquerda.setAttribute("id", "conteudoEsquerda")
        this.painelEsquerda.appendChild(this.conteudoEsquerda)

        this.conteudoDireita = document.createElement("div")
        this.conteudoDireita.setAttribute("id", "conteudoDireita")
        this.painelDireita.appendChild(this.conteudoDireita)

        if(!this.containerEsquerda){
            this.containerEsquerda = document.createElement("div")
            this.containerEsquerda.setAttribute("id", "containerEsquerda")
            this.offCanvasEsquerda.appendChild(this.containerEsquerda)
        }

        if(!this.containerDireita){
            this.containerDireita = document.createElement("div")
            this.containerDireita.setAttribute("id", "containerDireita")
            this.offCanvasDireita.insertBefore(this.containerDireita, this.painelDireita)
        }

        for(let i = 0; i < btnList.length; i++){
            if(i < 4){
                this.containerEsquerda.appendChild(btnList[i])
            }else{
                this.containerDireita.appendChild(btnList[i])
            }
        }
    }

    // Painel da esquerda
    static abrirEsquerda = (config) => {
        this.config = config
        this.tituloEsquerda.innerHTML = config.titulo

        this.offCanvasEsquerda.classList.toggle("ocultarEsquerda")
        if(document.querySelector(".ocultarEsquerda")){
            this.btnLeaflet[0].style.left = "-1750px"
        }else{
            this.btnLeaflet[0].style.left = "-1230px"
        }

        if(config.tipo == "p"){
            this.conteudoEsquerda.innerHTML = ""
        }else if(config.tipo == "a"){
            this.conteudoEsquerda.innerHTML = ""
            this.conteudoEsquerda.appendChild(Form.criar())
        }else if(config.tipo == "e"){
            this.conteudoEsquerda.innerHTML = ""
        }
    }

    static abrirEsquerdaEdit = (ocultID) => {
        this.conteudoEsquerda.innerHTML = ""
        this.conteudoEsquerda.appendChild(Form.editar(ocultID))
    }

    // Painel da direita
    static abrirDireita = (config) => {
        this.config = config
        this.tituloDireita.innerHTML = config.titulo

        this.offCanvasDireita.classList.toggle("ocultarDireita")
        if(document.querySelector(".ocultarDireita")){
            this.btnLeaflet[1].style.right = "-1802px"
            this.btnLeaflet[2].style.right = "60px"
        }else{
            this.btnLeaflet[1].style.right = "-1280px"
            this.btnLeaflet[2].style.right = "580px"
        }

        if(config.tipo == "h"){
            this.conteudoDireita.innerHTML = ""
        }
    }
}