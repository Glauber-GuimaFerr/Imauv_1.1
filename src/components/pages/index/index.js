// Importações
import OffCanvas from '/utils/offcanvas.js'
import Card from '/utils/card.js'
import Msg from '/utils/msg.js'

// Variáveis da API Leaflet
let watchID = navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true, timeout: 5000}) /* Permissão GPS */
let map /* Mapa */
let lat, lng /* Coordenadas */
const lati = document.createElement('input')
lati.setAttribute("type", "hidden")
lati.setAttribute("id", "latitude")
lati.setAttribute("name", "latitude")
document.body.appendChild(lati)
const longi = document.createElement('input')
longi.setAttribute("type", "hidden")
longi.setAttribute("id", "longitude")
longi.setAttribute("name", "longitude")
document.body.appendChild(longi)
const zoom = 16 /* Escala */

// Variáveis importantes
const elementosBody = document.querySelector('#elementosBody')
const btnCurrPos = document.querySelector('#btnCurrPos')
const btnUser = document.querySelector('#btnUser')
const btnListProcess = document.querySelector('#btnListProcess')
const btnEditProcess = document.querySelector('#btnEditProcess')
const btnAddProcess = document.querySelector('#btnAddProcess')
const btnHistory = document.querySelector('#btnHistory')

const sv = 'http://localhost:3000'

// Função success
function success(pos){
        if(map === undefined){
                map = L.map('mapID').setView([pos.coords.latitude, pos.coords.longitude], zoom) /* Renderização do mapa na posição atual */

                // Camadas OSM 
                const OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
                        maxZoom: 19,
                        attribution: '&copy IMAUV'
                })
                OpenStreetMap_Mapnik.addTo(map)

                const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                        maxZoom: 17,
                        attribution: '&copy IMAUV'
                })
                OpenTopoMap.addTo(map)
        
                const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: '&copy IMAUV'})
                Esri_WorldImagery.addTo(map)
        
                const baseMaps = {
                        "Satélite": Esri_WorldImagery,
                        "Relevo": OpenTopoMap,
                        "Open Street":  OpenStreetMap_Mapnik  
                }
        
                const layerControl = L.control.layers(baseMaps).addTo(map) 

                // Pontos
                const LeafIcon = L.Icon.extend({
                        options: {
                                iconSize: [50, 60],
                                shadowSize: [50, 64],
                                iconAnchor: [22, 58],
                                shadowAnchor: [4, 62],
                                popupAnchor: [3, -60]
                        }
                })  
                
                const currentIcon = new LeafIcon({iconUrl: '/img/menu/current-position-icon.png'})
                const grayIcon = new LeafIcon({iconUrl: '/img/menu/marker-gray-icon.png'})
                const blueIcon = new LeafIcon({iconUrl: '/img/menu/marker-blue-icon.png'})
                const greenIcon = new LeafIcon({iconUrl: '/img/menu/marker-green-icon.png'})
                const yellowIcon = new LeafIcon({iconUrl: '/img/menu/marker-yellow-icon.png'})
                const redIcon = new LeafIcon({iconUrl: '/img/menu/marker-red-icon.png'})


                let currentPos = L.marker([pos.coords.latitude, pos.coords.longitude], {icon: currentIcon}).bindPopup('Sua localização!').addTo(map) /* Posição atual */

                // Função de marcar ponto
                let pontoAzul
                btnAddProcess.style.display = 'none'

                map.on('click', function(e) {
                        lat = e.latlng.lat
                        lng = e.latlng.lng
                        lati.value = lat
                        longi.value = lng   
                        btnAddProcess.style.display = 'block' 
                        if(pontoAzul){
                                map.removeLayer(pontoAzul)
                        }
                        pontoAzul = L.marker(e.latlng, {icon: blueIcon}).addTo(map)
                })

                // Verificação da presença e renderização dos pontos de ocorrência no mapa
                const carregarPontos = () => {
                        return fetch(`${sv}/verificarpontos`)
                                .then(res => res.json())
                                .then(data => {
                                        return data.quantidade
                                })
                                .catch(err => {
                                        console.log(err);
                                        return 0
                                })
                }
                carregarPontos()
                .then(qtdPontos => {
                        if(qtdPontos > 0){
                                fetch(`${sv}/todospontos`)
                                .then(res => res.json())
                                .then(data => {
                                        let clrIcon = greenIcon
                                        data.forEach(point => {
                                                const dataString = point.data_inicio
                                                const dataStr = new Date(dataString)
                                                const dia = dataStr.getDate()
                                                const mes = dataStr.getMonth() + 1
                                                const ano = dataStr.getFullYear()
                                                const dataFormatada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`

                                                const dataLimite = dataStr.setDate(dataStr.getDate() + point.prazo)
                                                const dataAtual = new Date()
                                                const prazo = dataAtual >= dataLimite ? 0 : Math.ceil(Math.abs(dataAtual - dataLimite)/(1000 * 60 * 60 * 24))

                                                if(prazo > 180 || (prazo <= 180 && prazo > 90)){
                                                        clrIcon = greenIcon
                                                }else if(prazo <= 90 && prazo > 30){
                                                        clrIcon = yellowIcon
                                                }else{
                                                        clrIcon = redIcon
                                                } 
                                                
                                                const emojiAlrt = '&#x26A0 &#x26A0 &#x26A0 &#x26A0 &#x26A0 <strong>Indeferido</strong> &#x26A0 &#x26A0 &#x26A0 &#x26A0 &#x26A0'
                                                if(point.etapa != 'Concluída'){
                                                        const marker = L.marker([point.latitude, point.longitude], {icon: clrIcon}).addTo(map)
                                                        marker.bindPopup(`${prazo == 0 ? emojiAlrt : ''}<p><strong>Processo:</strong> ${point.cod_processo}</p>
                                                        <p><strong>Início:</strong> ${dataFormatada}</p>
                                                        <p><strong>Descrição:</strong> ${point.descricao}</p>
                                                        <p><strong>Endereço:</strong> ${point.localizacao}</p>
                                                        <p><strong>Classificação:</strong> ${point.classificacao}</p>
                                                        <p><strong>Etapa:</strong> ${point.etapa}</p>
                                                        <p><strong>Prazo:</strong> ${prazo} dias</p>`)
                                                }
                                        })
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
                        }
                })

                // Barra de pesquisa
                let pontoCinza
                const geocoder = L.Control.geocoder({defaultMarkGeocode: false})
                .on('markgeocode', function(e) {
                        let latlng = e.geocode.center
                        if(pontoCinza){
                                map.removeLayer(pontoCinza)
                        }
                        pontoCinza = L.marker(latlng, {icon: grayIcon}).addTo(map)
                        map.fitBounds(e.geocode.bbox)
                }).addTo(map)
                
                // Variáveis de elementos Leaflet
                const barraPesquisa = document.querySelectorAll('.leaflet-control-geocoder.leaflet-bar.leaflet-control')[0]
                const botoesZoom = document.querySelectorAll('.leaflet-control-zoom.leaflet-bar.leaflet-control')[0]
                const botoesCamada = document.querySelectorAll('.leaflet-control-layers.leaflet-control')[0]

                // Criação do OffCanvas
                const btnLeaflet = [barraPesquisa, botoesZoom, botoesCamada]
                const btnList = [btnCurrPos, btnListProcess, btnEditProcess, btnAddProcess, btnUser, btnHistory]
                OffCanvas.criar(elementosBody, btnLeaflet, btnList)

                // Botão para retornar a posição atual
                btnCurrPos.addEventListener('click', () => {
                        if(navigator.geolocation){
                                map.setView([pos.coords.latitude, pos.coords.longitude], zoom)
                        }else{
                                alert('Geolocalização não é suportada pelo seu navegador.')
                        }
                })

                // Botão para redirecionar até a página do usuário
                btnUser.addEventListener('click', () => {
                        window.location.href = '/account'
                })

                // Botão para visualizar seus processos em andamento
                btnListProcess.addEventListener('click', () => {
                        const config = {
                                tipo: "p",
                                titulo: "Seus processos"
                        }

                        OffCanvas.abrirEsquerda(config)

                        fetch(`${sv}/meuscards/${sessionStorage.getItem('cpf_user')}`)
                        .then(res => res.json())
                        .then(data => {
                                let cards = []
                                data.forEach(card => {
                                        const config = {
                                                agente: card.nome,
                                                id: card.id_ponto,
                                                processo: card.cod_processo,
                                                etapa: card.etapa,
                                                latitude: card.latitude,
                                                longitude: card.longitude
                                        }
                                        cards.push(Card.criar(config))
                                })
                                if(document.getElementById("conteudoEsquerda")){
                                        cards.forEach(c => {
                                                if(c.innerHTML.includes("Pendente")){
                                                        c.style.backgroundColor = "yellow"
                                                }else if(c.innerHTML.includes("Processamento")){
                                                        c.style.backgroundColor = "green"
                                                }

                                                const inputs = c.getElementsByTagName("input")
                                                const latCard = inputs[0].value
                                                const longCard = inputs[1].value 

                                                c.addEventListener("click", () => {
                                                        if(navigator.geolocation){
                                                                map.setView([latCard, longCard], zoom)
                                                        }else{
                                                                alert('Geolocalização não é suportada pelo seu navegador.')
                                                        }
                                                })
                                                document.getElementById("conteudoEsquerda").appendChild(c)
                                        })
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

                // Botão para editar seus processos em andamento
                btnEditProcess.addEventListener('click', () => {
                        const config = {
                                tipo: "e",
                                titulo: "Editar processos"
                        }

                        OffCanvas.abrirEsquerda(config)

                        fetch(`${sv}/meuscards/${sessionStorage.getItem('cpf_user')}`)
                        .then(res => res.json())
                        .then(data => {
                                let cards = []
                                data.forEach(card => {
                                        const config = {
                                                agente: card.nome,
                                                id: card.id_ponto,
                                                processo: card.cod_processo,
                                                etapa: card.etapa,
                                                latitude: card.latitude,
                                                longitude: card.longitude
                                        }
                                        cards.push(Card.criar(config))
                                })
                                if(document.getElementById("conteudoEsquerda")){
                                        cards.forEach(c => {
                                                if(c.innerHTML.includes("Pendente")){
                                                        c.style.backgroundColor = "yellow"
                                                }else if(c.innerHTML.includes("Processamento")){
                                                        c.style.backgroundColor = "green"
                                                }

                                                const inputs = c.getElementsByTagName("input")
                                                const latCard = inputs[0].value
                                                const longCard = inputs[1].value 

                                                c.addEventListener("click", () => {
                                                        if(navigator.geolocation){
                                                                map.setView([latCard, longCard], zoom)
                                                                const ocultID = c.querySelector("#ocultID")
                                                                OffCanvas.abrirEsquerdaEdit(ocultID.innerHTML)
                                                        }else{
                                                                alert('Geolocalização não é suportada pelo seu navegador.')
                                                        }
                                                })
                                                document.getElementById("conteudoEsquerda").appendChild(c)
                                        })
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

                // Botão para adicionar processos
                btnAddProcess.addEventListener('click', () => {
                        const config = {
                                tipo: "a",
                                titulo: "Adicionar processos"
                        }
                        OffCanvas.abrirEsquerda(config)
                })

                // Botão para visualizar histórico de processos já concluídos
                btnHistory.addEventListener('click', () => {
                        const config = {
                                tipo: "h",
                                titulo: "Histórico de processos"
                        }

                        OffCanvas.abrirDireita(config)

                        fetch(`${sv}/historico`)
                        .then(res => res.json())
                        .then(data => {
                                let cards = []
                                data.forEach(card => {
                                        const config = {
                                                agente: card.nome,
                                                id: card.id_ponto,
                                                processo: card.cod_processo,
                                                etapa: card.etapa
                                        }
                                        cards.push(Card.criar(config))
                                })
                                if(document.getElementById("conteudoDireita")){
                                        cards.forEach(c => {
                                                c.addEventListener("click", () => {
                                                        const config = {
                                                                titulo: "Processo concluído",
                                                                texto: "Este processo já foi concluído, se necessário comunique-se com a supervisão.",
                                                                cor: "#008000",
                                                                tipo: "ok",
                                                                ok: () => {},
                                                                confirmar: () => {}
                                                        }
                                                        Msg.mostrar(config)
                                                })
                                                document.getElementById("conteudoDireita").appendChild(c)
                                        })
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
        }else{
                map.remove() /* Remoção do mapa */  
                map = L.map('mapID').setView([pos.coords.latitude, pos.coords.longitude], zoom)      
        }  
}

// Função de erro da API
function error(err){
    console.log(err)
}