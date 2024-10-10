let vez = "X";
let start = true; //POR PADRÃO O JOGO VEM INICIADO


//PEGA A TABELA
const jogo = window.document.querySelector("table");

const textVez = window.document.querySelector("h2");


//EVENTO VAI PEGAR O CLICK DO MOUSE.
jogo.addEventListener("click", function(event){
    //A VARIAVEL CLICADO RECEBE O EVENTO
    const clicado = event.target;
    //VERIFICA SE O TEXTO TÁ EM BRANCO E SE TÁ INICIALIZADO
    if(clicado.textContent == "" && start){
        //SE TIVER EM BRANCO O CLICADO VAI RECEBER O VALOR DA VARIAVEL VEZ(O SIMBOLO)
        clicado.textContent = vez;
        //MUDA O VALOR DA VARIAVEL VEZ. SE ERA X PASSA A SER O/ SE ERA O PASSA A SER X.
        vez = (vez == "X") ? "O" : "X";
        textVez.textContent = `Agora é a Vez do ${vez}`

        //TODA VEZ QUE FOR CALCULAR O RESULTADO, O START RECEBE O CONTRARIO DE CALCULARRESULTADO
        start = !calcularResultado();
        if(start){
            setTimeout(function(){
                computador();   
                start = !calcularResultado();
                
            },1000)
            
        }
    
    }

    if (!start){
        window.document.getElementById("reset").style.display = "block";
    }
})

//VAI PEGAR
function calcularResultado() {
    //VAI PEGAR TODOS TDs DA TABELA
    let apostas = jogo.querySelectorAll("td");
    let jogadas = [];
    //CADA ITEM DA ARROW FUNCTION É UM ELEMENTO(UM TD)
    let velha = true;
    apostas.forEach(item =>{
        jogadas.push(item.textContent);
//SE O TEXTO FOR EM BRANCO VELHA RECEBE FALSO.
        if(item.textContent == ""){
            velha = false;
        }
    });

    let jogadas_possiveis = [];

    //LINHAS
    jogadas_possiveis.push([0,1,2]);
    jogadas_possiveis.push([3,4,5]);
    jogadas_possiveis.push([6,7,8]);

    //COLUNAS
    jogadas_possiveis.push([0,3,6]);
    jogadas_possiveis.push([1,4,7]);
    jogadas_possiveis.push([2,5,8]);
    
    //DIAGONAIS
    jogadas_possiveis.push([0,4,8]);
    jogadas_possiveis.push([2,4,6]);
      


    gameover = false;

    //CADA ITEM DA ARROWFUNCTION VAI SER UMA MATRIZ DE 3 POSIÇÕES
    for( let x = 0; x<jogadas_possiveis.length; x++){
        let indice = jogadas_possiveis[x];
        //ACHOU UMA COMBINAÇÃO JÁ PARA A VERIFICAÇÃO
        if(jogadas[indice[0]] == jogadas[indice[1]] && jogadas[indice[1]] == jogadas[indice[2]] && jogadas[indice[0]] != ""){
            textVez.innerHTML = `Parabens o ${jogadas[indice[0]]} Ganhou!`
            colorir(apostas[indice[0]]);
            colorir(apostas[indice[1]]);
            colorir(apostas[indice[2]]);
            return true;
        }
    }
    

    if(velha){
        textVez.textContent = `#DEU VELHA#`;
        let tabela = window.document.getElementById("tabela");
        tabela.style.backgroundColor = "black";
        let i = 0;
        while(i <= apostas.length){
            color(apostas[i])
            i++
        }


       
        return true;
    }
    return gameover;

} 
function colorir(element){
    element.style.backgroundColor = "green";
    element.style.color = "white";
}
function color(element){
    element.style.backgroundColor = "red";
    element.style.color = "white";
}

// JOGAR CONTRA O COMPUTADIR
// function computador(){
    
//     let position = Math.round(Math.random()*8);
//     let apostas = jogo.querySelectorAll("td");

//     if(apostas[position].textContent == ""){
//         apostas[position].textContent = vez;
//         vez = (vez == "X") ? "O": "X";
//         return true;
//     }else{
//         return computador();
//     }
// }


function reiniciar(){
    window.location.reload();
}
  


