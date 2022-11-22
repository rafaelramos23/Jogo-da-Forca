let tentativas = 6;
let listaDinamica = [];
let palavras = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let jogarNovamente = true;

carregaListaAutomatica();


let jogoAutomatico = true;

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random()* palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaCategoria,palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML= palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML= "";

    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if (listaDinamica[i]== undefined){
            if (palavraSecretaSorteada[i]==" "){
                listaDinamica[i]=" ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>"+ listaDinamica[i]+ "</div>";
            }
            else {
                listaDinamica[i]="&nbsp;";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>"+ listaDinamica[i]+ "</div>";
            }

           
        }
        else{
            if (palavraSecretaSorteada[i]==" "){
                listaDinamica[i]=" ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>"+ listaDinamica[i]+ "</div>";
            }
            else {
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>"+ listaDinamica[i]+ "</div>";
            }
        }
    }
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-"+ letra).disabled = true;
    if(tentativas >0) {
        mudarStyleLetra("tecla-"+ letra, false);
        comparaListas(letra);
        montarPalavraNaTela();
    }

}

function mudarStyleLetra(tecla, condicao){
    if (condicao==false){
        document.getElementById(tecla).style.background="#C71585";
        document.getElementById(tecla).style.color="#ffffff";
    }
    else {
        document.getElementById(tecla).style.background="#0b690f";
        document.getElementById(tecla).style.color="#ffffff";
    }

    
}

function comparaListas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra);
    if (pos < 0){
        tentativas--;
        carregaImagemForca();

        if (tentativas==0){
            abreModal("Ops, Game Over!!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            botaoJogarNovamente("red","yellow");
            
        }
    }
    else {
        for (i = 0; i < palavraSecretaSorteada.length; i++){
            mudarStyleLetra("tecla-"+ letra, true);
            if (palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++){
        if (palavraSecretaSorteada[i]!= listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true){
        //mensagem
        tentativas=0;
        abreModal("Uhull, você acertou!"," 10 pontos para Grifinória!!!");
        botaoJogarNovamente("blue","orange");
       
    }
}

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo));
}

async function botaoJogarNovamente(cor1, cor2){
    while (jogarNovamente==true){
        document.getElementById("btnReiniciar").style.backgroundColor = cor1;
        document.getElementById("btnReiniciar").style.scale = 1.1;
        await atraso(500);
        document.getElementById("btnReiniciar").style.backgroundColor = cor2;
        document.getElementById("btnReiniciar").style.scale = 1.3;
        await atraso(500)
    }
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background = "url('src/img/forca01.png')";
            break;
        
            case 4:
                document.getElementById("imagem").style.background = "url('src/img/forca02.png')";
                break;
            
            case 3:
                document.getElementById("imagem").style.background = "url('src/forca03.png')";
                break;
            case 2:
                 document.getElementById("imagem").style.background = "url('../src/img/forca04.png')";
                 break;

            case 1:
                document.getElementById("imagem").style.background = "url('./src/img/forca05.png')";
                break;

            case 0:
                document.getElementById("imagem").style.background = "url('./src/img/forca06.png')";
                break;
            default:
                document.getElementById("imagem").style.background = "url('../src/img/forca.png')";
            
        }
}

function abreModal(titulo, mensagem){
    let modalTitilo = document.getElementById("exampleModalLabel");
    modalTitilo.innerText = titulo;
    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show:true
    });
}

let btnReiniciar = document.querySelector("#btnReiniciar")
btnReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ //Modo Manual 
    if (jogoAutomatico==true){ 
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>";
        jogoAutomatico=false;

        document.getElementById("abreModalAddPalavra").style.display="block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else { //Modo Automatico
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>";
        jogoAutomatico=true;

        document.getElementById("abreModalAddPalavra").style.display="none";
        document.getElementById("status").innerHTML = "Modo Automático";
    }

}

const modal = document.getElementById("modal-alerta");
const btnAbreModal = document.getElementById("abreModalAddPalavra");

btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value ="";
}

window.onclick = function(){
    if (event.target == modal){
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value ="";
    }
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "SIMAO BARBOSA FRANCO",
            categoria:"FUNDADOR DE ITAPETININGA"
        },
        palavra002 = {
            nome: "SALVADOR OLIVEIRA LEME",
            categoria:"FUNDADOR DE ITAPETININGA"
        },
        palavra003 = {
            nome: "SIMONE MARQUETO",
            categoria:"PREFEITO(A) DE ITAPETININGA"
        },
        palavra004 = {
            nome: "HIRAM JUNIOR",
            categoria:"PREFEITO(A) DE ITAPETININGA"
        },
        palavra005 = {
            nome: "LUIS DI FIORI",
            categoria:"PREFEITO(A) DE ITAPETININGA"
        },
        palavra006 = {
            nome: "ROBERTO RAMALHO",
            categoria:"PREFEITO(A) DE ITAPETININGA"
        },
        palavra007 = {
            nome: "RICARDO BARBARA",
            categoria:"PREFEITO(A) DE ITAPETININGA"
        },
        palavra008 = {
            nome: "JOSE CARLOS TARDELLI",
            categoria:"PREFEITO(A) DE ITAPETININGA"
        },
        palavra009 = {
            nome: "JOAQUIM ALEIXO MACHADO",
            categoria:"PREFEITO(A) DE ITAPETININGA"
        },
        palavra010 = {
            nome: "PROCOPIO DE ALMEIDA LEME",
            categoria:"PREFEITO(A) DE ITAPETININGA"
        },
        palavra011 = {
            nome: "EXPOMUSIC",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra012 = {
            nome: "FESTA DA CEREJEIRA",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra013 = {
            nome: "FESTA DO DIVINO",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra014 = {
            nome: "FESTA DO MILHO",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra015 = {
            nome: "SEMANA DA CONSCIENCIA NEGRA",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra016 = {
            nome: "A PAIXAO DE CRISTO",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra017 = {
            nome: "SANTA RITA DE CASSIA",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra018 = {
            nome: "SAO JOAO BATISTA",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra019 = {
            nome: "FESTIVAL DO BOTECO",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra020 = {
            nome: "CAMINHO PAULISTA DAS TROPAS",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra021 = {
            nome: "FEIRA DE ARTESANATO",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra022 = {
            nome: "EXPO AGRO",
            categoria:"CULTURAL E RELIGIOSO"
        },
        palavra023 = {
            nome: "TERRA DAS ESCOLAS",
            categoria:"CODNOME DE ITAPETININGA"
        },
        palavra024 = {
            nome: "ATENAS DO SUL",
            categoria:"CODNOME DE ITAPETININGA"
        },
        palavra025 = {
            nome: "DOMINGUES JOSE VIEIRA",
            categoria:"FUNDADOR DE ITAPETININGA"
        },
        palavra026 = {
            nome: "TERRA DA CULTURA",
            categoria:"CODNOME DE ITAPETININGA"
        },
        palavra027 = {
            nome: "FRANCISCO LEANDRO",
            categoria:"MELHOR DIRETOR DA REGIÃO"
        },
        palavra028 = {
            nome: "ABILIO FONTES",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra029 = {
            nome: "ADHERBAL DE PAULA",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra030 = {
            nome: "ALCEU GOMES",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra031 = {
            nome: "ASTOR VASQUES",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra032 = {
            nome: "DESEMBARGADOR",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra033 = {
            nome: "PEIXOTO GOMIDE",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra034 = {
            nome: "CORINA CACAPAVA BARTH",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra035 = {
            nome: "DARCY VIEIRA",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra036 = {
            nome: "ELISIARIO MARTINS DE MELLO",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra037 = {
            nome: "ERNESTA XAVIER",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra038 = {
            nome: "ERNESTINA LOUREIRO",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra039 = {
            nome: "EURINY DE SOUZA",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra040 = {
            nome: "EVONIO MARQUES",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra040 = {
            nome: "FERNANDO PRESTES",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra041 = {
            nome: "MAJOR FONSECA",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra042 = {
            nome: "JAIR BARTH",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra043 = {
            nome: "JUVENAL PAIVA",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra044 = {
            nome: "MARIA DE LOURDES",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra045 = {
            nome: "MODESTO TAVARES",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra046 = {
            nome: "SEBASTIAO VILACA",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra047 = {
            nome: "VIRGILIO SILVEIRA",
            categoria:"ESCOLA DE ITAPETININGA"
        },
        palavra048 = {
            nome: "SONSERINA",
            categoria:"MELHOR CASA DE HARRY POTTER"
        },
        palavra049 = {
            nome: "GRIFINORIA",
            categoria:"CASA DE HARRY POTTER"
        },
        palavra050 = {
            nome: "CORVINAL",
            categoria:"CASA DE HARRY POTTER"
        },
        palavra051 = {
            nome: "LUFA LUFA",
            categoria:"CASA DE HARRY POTTER"
        },
        palavra052 = {
            nome: "ARROZ CARRETEIRO",
            categoria:"COMIDA TÍPICA DE ITAPETININGA"
        },
        palavra053 = {
            nome: "FEIJAO GORDO",
            categoria:"COMIDA TÍPICA DE ITAPETININGA"
        },
        palavra054 = {
            nome: "BOLINHO DE FRANGO",
            categoria:"COMIDA TÍPICA DE ITAPETININGA"
        },
        palavra055 = {
            nome: "CATIRA",
            categoria:"CULTURA IMATERIAL - DANÇA"
        },
        palavra056 = {
            nome: "FANDANGO",
            categoria:"CULTURA IMATERIAL - DANÇA"
        },
        palavra057 = {
            nome: "VANERAO",
            categoria:"CULTURA IMATERIAL - DANÇA"
        },
        palavra058 = {
            nome: "POETA DO MONTE SANTO",
            categoria:"PERSONAGENS DE ITAPETININGA"
        },
        palavra059 = {
            nome: "PEIXOTO GOMIDE",
            categoria:"PERSONAGENS DE ITAPETININGA"
        },
        palavra060 = {
            nome: "FERNANDO PRESTES DE ALBUQUERQUE",
            categoria:"PERSONAGENS DE ITAPETININGA"
        },
        palavra061 = {
            nome: "CORINA CACAPAVA BARTH",
            categoria:"PERSONAGENS DE ITAPETININGA"
        },
        palavra062 = {
            nome: "ANESIA PINHEIRO MACHADO",
            categoria:"PERSONAGENS DE ITAPETININGA"
        },
        palavra063 = {
            nome: "TEDDY VEIRA",
            categoria:"PERSONAGENS DE ITAPETININGA"
        },
        palavra064 = {
            nome: "CAMPOS SALES",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra065 = {
            nome: "VIRGILIO SILVEIRA",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra066 = {
            nome: "VIRGILIO DE REZENDE",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra067 = {
            nome: "BENJAMIN CONSTANT",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra068 = {
            nome: "BORBA GATO",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra069 = {
            nome: "PRUDENTE DE MORAES",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra070 = {
            nome: "DOUTOR COUTINHO",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra071 = {
            nome: "ALFREDO MAIA",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra072 = {
            nome: "WENCESLAU BRAS",
            categoria:"RUAS DE ITAPETININGA"
        },
        palavra073 = {
            nome: "ACACIO DE MORAES TERRA",
            categoria:"RUAS DE ITAPETININGA"
        }
        
    ];
}

//refazer posteriormente

function adicionarPalavra(){
    //const pos = palavraSecretaSorteada.indexOf(letra);
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    
    palavras.push(palavra);
    // sortear();
    palavraSecretaCategoria = addCategoria;
    palavraSecretaSorteada = addPalavra;
   
    montarPalavraNaTela();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
    
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}
