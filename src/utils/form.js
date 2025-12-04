// Importações
import Msg from '/utils/msg.js'

const sv = 'http://localhost:3000'

export default class Form {
    static criar = () => {
        // Renderização do formulário de criação
        const indexForm = document.createElement("form")
        indexForm.setAttribute("id", "indexForm")

        const agente = document.createElement("input")
        agente.setAttribute("type", "hidden")
        agente.setAttribute("value", `${sessionStorage.getItem('cpf_user')}`)
        indexForm.appendChild(agente)

        const campoNumero = document.createElement("div")
        campoNumero.setAttribute("class", "campoForm")
        indexForm.appendChild(campoNumero)

        const labelNum = document.createElement("label")
        labelNum.innerHTML = "Número do Processo:"
        campoNumero.appendChild(labelNum)

        const numProcesso = document.createElement("input")
        numProcesso.setAttribute("type", "text")
        numProcesso.setAttribute("id", "numProcesso")
        numProcesso.setAttribute("name", "numProcesso")
        numProcesso.setAttribute("placeholder", "Número de identificação")
        numProcesso.setAttribute("required", "")
        campoNumero.appendChild(numProcesso)

        const campoData = document.createElement("div")
        campoData.setAttribute("class", "campoForm")
        indexForm.appendChild(campoData)

        const labelData = document.createElement("label")
        labelData.innerHTML = "Data de início:"
        campoData.appendChild(labelData)

        const dataInicio = document.createElement("input")
        dataInicio.setAttribute("type", "date")
        dataInicio.setAttribute("id", "dataInicio")
        dataInicio.setAttribute("name", "dataInicio")
        dataInicio.setAttribute("required", "")
        campoData.appendChild(dataInicio)

        const campoDescricao = document.createElement("div")
        campoDescricao.setAttribute("class", "campoForm")
        indexForm.appendChild(campoDescricao)

        const labelDescricao = document.createElement("label")
        labelDescricao.innerHTML = "Descrição:"
        campoDescricao.appendChild(labelDescricao)

        const descricao = document.createElement("textarea")
        descricao.setAttribute("id", "descricao")
        descricao.setAttribute("name", "descricao")
        descricao.setAttribute("placeholder", "Informe a ocorrência")
        descricao.setAttribute("required", "")
        campoDescricao.appendChild(descricao)

        const campoEndereco = document.createElement("div")
        campoEndereco.setAttribute("class", "campoForm")
        indexForm.appendChild(campoEndereco)

        const labelEndereco = document.createElement("label")
        labelEndereco.innerHTML = "Endereço:"
        campoEndereco.appendChild(labelEndereco)

        const endereco = document.createElement("input")
        endereco.setAttribute("type", "text")
        endereco.setAttribute("id", "endereco")
        endereco.setAttribute("name", "endereco")
        endereco.setAttribute("placeholder", "Informe o endereço aproximado")
        endereco.setAttribute("required", "")
        campoEndereco.appendChild(endereco)

        const campoClassificacao = document.createElement("div")
        campoClassificacao.setAttribute("class", "campoForm")
        indexForm.appendChild(campoClassificacao)

        const labelClassificacao = document.createElement("label")
        labelClassificacao.innerHTML = "Classificação:"
        campoClassificacao.appendChild(labelClassificacao)

        const classificacao = document.createElement("select")
        classificacao.setAttribute("id", "classificacao")
        classificacao.setAttribute("name", "classificacao")
        campoClassificacao.appendChild(classificacao)

        const optionBaixo = document.createElement("option")
        optionBaixo.setAttribute("value", "Baixo")
        optionBaixo.innerHTML = "Baixo"
        classificacao.appendChild(optionBaixo)

        const optionMedio = document.createElement("option")
        optionMedio.setAttribute("value", "Médio")
        optionMedio.innerHTML = "Médio"
        classificacao.appendChild(optionMedio)

        const optionAlto = document.createElement("option")
        optionAlto.setAttribute("value", "Alto")
        optionAlto.innerHTML = "Alto"
        classificacao.appendChild(optionAlto)

        const campoEtapa = document.createElement("div")
        campoEtapa.setAttribute("class", "campoForm")
        indexForm.appendChild(campoEtapa)

        const labelEtapa = document.createElement("label")
        labelEtapa.innerHTML = "Etapa:"
        campoEtapa.appendChild(labelEtapa)

        const etapa = document.createElement("select")
        etapa.setAttribute("id", "etapa")
        etapa.setAttribute("name", "etapa")
        campoEtapa.appendChild(etapa)

        const optionPendente = document.createElement("option")
        optionPendente.setAttribute("value", "Pendente")
        optionPendente.innerHTML = "Pendente"
        etapa.appendChild(optionPendente)

        const optionProcessamento = document.createElement("option")
        optionProcessamento.setAttribute("value", "Processamento")
        optionProcessamento.innerHTML = "Processamento"
        etapa.appendChild(optionProcessamento)

        const campoPrazo = document.createElement("div")
        campoPrazo.setAttribute("class", "campoForm")
        indexForm.appendChild(campoPrazo)

        const labelPrazo = document.createElement("label")
        labelPrazo.innerHTML = "Prazo estimado (dias):"
        campoPrazo.appendChild(labelPrazo)

        const prazo = document.createElement("input")
        prazo.setAttribute("type", "number")
        prazo.setAttribute("id", "prazo")
        prazo.setAttribute("name", "prazo")
        prazo.setAttribute("placeholder", "1")
        prazo.setAttribute("min", "1")
        prazo.setAttribute("step", "1")
        prazo.setAttribute("required", "")
        campoPrazo.appendChild(prazo)
 
        const latitude = document.createElement("input")
        latitude.setAttribute("type", "hidden")
        latitude.setAttribute("value", `${document.getElementById("latitude").value}`)
        indexForm.appendChild(latitude)

        const longitude = document.createElement("input")
        longitude.setAttribute("type", "hidden")
        longitude.setAttribute("value", `${document.getElementById("longitude").value}`)
        indexForm.appendChild(longitude)

        const campoBotao = document.createElement("div")
        campoBotao.setAttribute("class", "campoForm")
        indexForm.appendChild(campoBotao)

        const button = document.createElement("button")
        button.setAttribute("type", "button")
        button.setAttribute("id", "hidden")
        button.innerHTML = "Adicionar"
        button.addEventListener("click", () => {
            this.adicionarPonto(agente.value, numProcesso.value, dataInicio.value, descricao.value, endereco.value, classificacao.value, etapa.value, prazo.value, latitude.value, longitude.value)
        })
        campoBotao.appendChild(button)

        return indexForm
    }

    // Função de adicionar pontos
    static adicionarPonto = async (a, np, d, dr, e, c, et, p, lat, lng) => {
        const dados = {
            n_agente: a,
            cod_processo: np,
            data_inicio: d,
            descricao: dr,
            localizacao: e,
            classificacao: c,
            etapa: et,
            prazo: p,
            latitude: lat,
            longitude: lng
        }

        const header = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        }

        const config = {
            titulo: "Adicionar processo",
            texto: "Deseja adicionar esse processo?",
            cor: "#008000",
            tipo: "confirmar",
            ok: () => {},
            confirmar: () => {
                fetch('http://localhost:3000/adicionar', header)
                .then(res => {
                    if(res.status != 500){
                        window.location.href = '/index'
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
            }
        }
        Msg.mostrar(config)
    }

    // Renderização do formulário de edição
    static editar = (ocultID) => {
        const indexForm = document.createElement("form")
        indexForm.setAttribute("id", "indexForm")

        const agente = document.createElement("input")
        agente.setAttribute("type", "hidden")
        agente.setAttribute("value", `${sessionStorage.getItem('cpf_user')}`)
        indexForm.appendChild(agente)

        const campoNumero = document.createElement("div")
        campoNumero.setAttribute("class", "campoForm")
        indexForm.appendChild(campoNumero)

        const labelNum = document.createElement("label")
        labelNum.innerHTML = "Número do Processo:"
        campoNumero.appendChild(labelNum)

        const numProcesso = document.createElement("input")
        numProcesso.setAttribute("type", "text")
        numProcesso.setAttribute("id", "numProcesso")
        numProcesso.setAttribute("name", "numProcesso")
        numProcesso.setAttribute("placeholder", "Número de identificação")
        numProcesso.setAttribute("required", "")
        campoNumero.appendChild(numProcesso)

        const campoData = document.createElement("div")
        campoData.setAttribute("class", "campoForm")
        indexForm.appendChild(campoData)

        const labelData = document.createElement("label")
        labelData.innerHTML = "Data de início:"
        campoData.appendChild(labelData)

        const dataInicio = document.createElement("input")
        dataInicio.setAttribute("type", "date")
        dataInicio.setAttribute("id", "dataInicio")
        dataInicio.setAttribute("name", "dataInicio")
        dataInicio.setAttribute("required", "")
        campoData.appendChild(dataInicio)

        const campoDescricao = document.createElement("div")
        campoDescricao.setAttribute("class", "campoForm")
        indexForm.appendChild(campoDescricao)

        const labelDescricao = document.createElement("label")
        labelDescricao.innerHTML = "Descrição:"
        campoDescricao.appendChild(labelDescricao)

        const descricao = document.createElement("textarea")
        descricao.setAttribute("id", "descricao")
        descricao.setAttribute("name", "descricao")
        descricao.setAttribute("placeholder", "Informe a ocorrência")
        descricao.setAttribute("required", "")
        campoDescricao.appendChild(descricao)

        const campoEndereco = document.createElement("div")
        campoEndereco.setAttribute("class", "campoForm")
        indexForm.appendChild(campoEndereco)

        const labelEndereco = document.createElement("label")
        labelEndereco.innerHTML = "Endereço:"
        campoEndereco.appendChild(labelEndereco)

        const endereco = document.createElement("input")
        endereco.setAttribute("type", "text")
        endereco.setAttribute("id", "endereco")
        endereco.setAttribute("name", "endereco")
        endereco.setAttribute("placeholder", "Informe o endereço aproximado")
        endereco.setAttribute("required", "")
        campoEndereco.appendChild(endereco)

        const campoClassificacao = document.createElement("div")
        campoClassificacao.setAttribute("class", "campoForm")
        indexForm.appendChild(campoClassificacao)

        const labelClassificacao = document.createElement("label")
        labelClassificacao.innerHTML = "Classificação:"
        campoClassificacao.appendChild(labelClassificacao)

        const classificacao = document.createElement("select")
        classificacao.setAttribute("id", "classificacao")
        classificacao.setAttribute("name", "classificacao")
        campoClassificacao.appendChild(classificacao)

        const optionBaixo = document.createElement("option")
        optionBaixo.setAttribute("value", "Baixo")
        optionBaixo.innerHTML = "Baixo"
        classificacao.appendChild(optionBaixo)

        const optionMedio = document.createElement("option")
        optionMedio.setAttribute("value", "Médio")
        optionMedio.innerHTML = "Médio"
        classificacao.appendChild(optionMedio)

        const optionAlto = document.createElement("option")
        optionAlto.setAttribute("value", "Alto")
        optionAlto.innerHTML = "Alto"
        classificacao.appendChild(optionAlto)

        const campoEtapa = document.createElement("div")
        campoEtapa.setAttribute("class", "campoForm")
        indexForm.appendChild(campoEtapa)

        const labelEtapa = document.createElement("label")
        labelEtapa.innerHTML = "Etapa:"
        campoEtapa.appendChild(labelEtapa)

        const etapa = document.createElement("select")
        etapa.setAttribute("id", "etapa")
        etapa.setAttribute("name", "etapa")
        campoEtapa.appendChild(etapa)

        const optionPendente = document.createElement("option")
        optionPendente.setAttribute("value", "Pendente")
        optionPendente.innerHTML = "Pendente"
        etapa.appendChild(optionPendente)

        const optionProcessamento = document.createElement("option")
        optionProcessamento.setAttribute("value", "Processamento")
        optionProcessamento.innerHTML = "Processamento"
        etapa.appendChild(optionProcessamento)

        const campoPrazo = document.createElement("div")
        campoPrazo.setAttribute("class", "campoForm")
        indexForm.appendChild(campoPrazo)

        const labelPrazo = document.createElement("label")
        labelPrazo.innerHTML = "Prazo estimado (dias):"
        campoPrazo.appendChild(labelPrazo)

        const prazo = document.createElement("input")
        prazo.setAttribute("type", "number")
        prazo.setAttribute("id", "prazo")
        prazo.setAttribute("name", "prazo")
        prazo.setAttribute("placeholder", "1")
        prazo.setAttribute("min", "1")
        prazo.setAttribute("step", "1")
        prazo.setAttribute("required", "")
        campoPrazo.appendChild(prazo)

        const campoBotao = document.createElement("div")
        campoBotao.setAttribute("class", "campoForm")
        indexForm.appendChild(campoBotao)

        const button = document.createElement("button")
        button.setAttribute("type", "button")
        button.setAttribute("id", "hidden")
        button.innerHTML = "Atualizar"
        button.addEventListener("click", () => {
            this.editarPonto(ocultID, numProcesso.value, dataInicio.value, descricao.value, endereco.value, classificacao.value, etapa.value, prazo.value)
        })
        campoBotao.appendChild(button)

        fetch(`${sv}/dadosponto/${ocultID}`)
        .then(res => res.json())
        .then(data => {
            numProcesso.value = data.cod_processo
            dataInicio.value = data.data_inicio.split("T")[0]
            descricao.value = data.descricao
            endereco.value = data.localizacao
            classificacao.value = data.classificacao
            etapa.value = data.etapa
            prazo.value = data.prazo
        })

        return indexForm
    }

    // Função de editar pontos
    static editarPonto = (ocultID, np, d, dr, e, c, et, p) => {
        const dados = {
            cod_processo: np,
            data_inicio: d,
            descricao: dr,
            localizacao: e,
            classificacao: c,
            etapa: et,
            prazo: p
        }

        const header = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        }

        const config = {
            titulo: "Atualizar processo",
            texto: "Deseja atualizar esse processo?",
            cor: "#008000",
            tipo: "confirmar",
            ok: () => {},
            confirmar: () => {
                fetch(`http://localhost:3000/editar/${ocultID}`, header)
                .then(res => {
                    if(res.status != 500){
                        window.location.href = '/index'
                    }else{
                        const config = {
                            titulo: "Erro",
                            texto: "Dados não podem ser atualizados!",
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
            }
        }
        Msg.mostrar(config)
    }
}