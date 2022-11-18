let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;

const palavras = [
    palavra001={
        nome: "TERRA",
        categoria: "SISTEMA SOLAR"
    },
    palavra002={
        nome: "MARTE",
        categoria: "SISTEMA SOLAR"
    },
    palavra003={
        nome: "MERCURIO",
        categoria: "SISTEMA SOLAR"
    },

    palavra004={
        nome: "VENUS",
        categoria: "SISTEMA SOLAR"
    },
    palavra005={
        nome: "JUPITER",
        categoria: "SISTEMA SOLAR"
    },
    palavra006={
        nome: "SATURNO",
        categoria: "SISTEMA SOLAR"
    },
    palavra007={
        nome: "NETUNO",
        categoria: "SISTEMA SOLAR"
    },
    palavra008={
        nome: "SOL",
        categoria: "SISTEMA SOLAR"
    },
    palavra009={
        nome: "VIA LACTEA",
        categoria: "SISTEMA SOLAR"
    },
    palavra010={
        nome: "GALILEO GALILEI",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra011={
        nome: "ISAAC NEWTON",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra012={
        nome: "MARIE CURIE",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra013={
        nome: "NIKOLA TESLA",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra014={
        nome: "ALBERT EINSTEIN",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra015={
        nome: "CHARLES DARWIN",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra016={
        nome: "ADA LOVELACE",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra017={
        nome: "STEPHEN HAWKING",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra018={
        nome: "PITAGORAS",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra019={
        nome: "NIELS BOHR",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra020={
        nome: "WERNER HEISENBERG",
        categoria: "CIENTISTAS FAMOSOS"
    },
    palavra021={
        nome: "ALAN TURING",
        categoria: "CIENTISTAS FAMOSOS"
    }
];

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
            listaDinamica[i]="&nbsp;";
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>"+ listaDinamica[i]+ "</div>";
        }
        else{
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>"+ listaDinamica[i]+ "</div>";
        }
    }
}

function verificaLetraEscolhida(letra){
    if(tentativas >0) {
        mudarStyleLetra("tecla-"+ letra);
        comparaListas(letra);
        montarPalavraNaTela();
    }

}

function mudarStyleLetra(tecla){
    document.getElementById(tecla).style.background="#C71585";
    document.getElementById(tecla).style.color="#ffffff";
}

function comparaListas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra);
    if (pos < 0){
        tentativas--;
        carregaImagemForca();
    }
    else {
        for (i = 0; i < palavraSecretaSorteada.length; i++){
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
    }
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background = "url('../src/img/forca01.png')";
            break;
        
            case 4:
                document.getElementById("imagem").style.background = "url('../src/img/forca02.png')";
                break;
            
            case 3:
                document.getElementById("imagem").style.background = "url('../src/img/forca03.png')";
                break;
            case 2:
                 document.getElementById("imagem").style.background = "url('../src/img/forca04.png')";
                 break;

            case 1:
                document.getElementById("imagem").style.background = "url('../src/img/forca05.png')";
                break;

            case 0:
                document.getElementById("imagem").style.background = "url('../src/img/forca06.png')";
                break;
            default:
                document.getElementById("imagem").style.background = "url('../src/img/forca.png')";
            
        }
}