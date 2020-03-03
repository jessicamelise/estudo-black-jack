//Vinte e Um
//por Jéssica Melise

//Variaveis de cartas
let naipes = ["Paus", "Ouros", "Copas", "Espadas"];
let cartas = ["Ás", "Rei", "Dama", "Valete", "Dez", "Nove", "Oito",
              "Sete", "Seis", "Cinco", "Quatro", "Três", "Dois"];

//DOM variaveis
let areaDeTexto = document.getElementById("area-texto");
let botaoNovoJogo = document.getElementById("novo-jogo");
let botaoNovaCarta = document.getElementById("nova-carta");
let botaoManter = document.getElementById("manter-cartas");

//Variaveis do jogo
let inicioJogo = false;
let gameOver = false;
let jogadorGanhou = false;
let cartasDealer = [];
let cartasJogador = [];
let pontuacaoDealer = 0;
let pontuacaoJogador = 0;
let deck = [];
let empate = false;

botaoNovaCarta.style.display = "none";
botaoManter.style.display = "none";
mostrarStatus();

botaoNovoJogo.addEventListener("click", function() {
  inicioJogo = true;
  gameOver = false;
  jogadorGanhhou = false;
  empate = false;
  
  deck = baralho();
  embaralhar(deck);
  cartasDealer = [ pegarNovaCarta(), pegarNovaCarta()];
  cartasJogador = [ pegarNovaCarta(), pegarNovaCarta()];
  
  botaoNovoJogo.style.display = "none";
  botaoNovaCarta.style.display = "inline";
  botaoManter.style.display = "inline";
  mostrarStatus();
});

botaoNovaCarta.addEventListener("click", function(){
  cartasJogador.push(pegarNovaCarta());
  verificarFinalJogo();
  mostrarStatus();
})

botaoManter.addEventListener("click", function(){
  gameOver = true;
  verificarFinalJogo();
  mostrarStatus();
})

function baralho() {
  let deck = [];
  for (let naipesId = 0; naipesId < naipes.length; naipesId++) {
    for (let cartasId = 0; cartasId < cartas.length; cartasId++) {
      let carta = {
        naipe: naipes[naipesId],
        card: cartas[cartasId]   
      };
      deck.push (carta);
    }
  }
  return deck;
}

function embaralhar(deck) {
  
  let i = 0;

  while(i < deck.length) {
    let trocaId = Math.trunc(Math.random() * deck.length);
    let temp = deck[trocaId];
    deck[trocaId] = deck[i];
    deck[i] = temp;

    i = i + 1;
  }
}

  
function nomeCartas (carta) {
  return carta.card + " de " + carta.naipe;  
}
  
function pegarNovaCarta() {
  return deck.shift();
}

function pegarValoresDasCartas (carta) {
  switch (carta.card) {
    case "Ás":
      return 1;
    case "Dois":
      return 2;
    case "Três":
      return 3;
    case "Quatro":
      return 4;
    case "Cinco":
      return 5;
    case "Seis":
      return 6;
    case "Sete":
      return 7;
    case "Oito":
      return 8;
    case "Nove":
      return 9;
    default:
      return 10;
  }
}


function pegarPontos(cartasArray){
  let ponto = 0;
  let temAs = false;
  for(let i = 0; i < cartasArray.length; i++) {
    let carta = cartasArray[i];
    ponto += pegarValoresDasCartas(carta);
    if(carta.card === "Ás") {
      temAs = true;
    }
  }
  if(temAs && ponto + 10 <= 21) {
    return ponto + 10;
  }
  return ponto;
}


function puxarPontos() {
  pontuacaoDealer = pegarPontos(cartasDealer);
  pontuacaoJogador = pegarPontos(cartasJogador);
}

function verificarFinalJogo() {
  
  puxarPontos();

  if(gameOver) {
    while (pontuacaoDealer < pontuacaoJogador
    && pontuacaoJogador <= 21
    && pontuacaoDealer <= 21) {
      cartasDealer.push(pegarNovaCarta());
      puxarPontos();
    }
  }

  if(pontuacaoJogador > 21) {
    jogadorGanhou = false;
    gameOver = true;
  }
  else if (pontuacaoDealer > 21) {
    jogadorGanhou = true;
    gameOver = true;
  }
  else if (gameOver) {

    if(pontuacaoJogador > pontuacaoDealer) {
      jogadorGanhou = true;
    }

    else if (pontuacaoDealer === pontuacaoJogador) {
      empate = true;
    }

    else {
      jogadorGanhou = false;
    }
  }  
}

function mostrarStatus() {
  if(!inicioJogo){
    areaDeTexto.innerText = "Bem vindo ao Vinte e Um!";
    return;
  }
  
  let nomeCartaDealer = "";
  for(let i = 0; i < cartasDealer.length; i++) {
    nomeCartaDealer += nomeCartas(cartasDealer[i]) + "\n";
  }
  
  let nomeCartaJogador = "";
  for(let i = 0; i < cartasJogador.length; i++) {
    nomeCartaJogador += nomeCartas(cartasJogador[i]) + "\n";
  }
  
  puxarPontos();
  
  areaDeTexto.innerText = 
  "Dealer tem: \n" +
  nomeCartaDealer + 
  "(Pontos: "+ pontuacaoDealer + ")\n\n" +
  
  "Jogador tem: \n" +
  nomeCartaJogador + 
  "(Pontos: "+ pontuacaoJogador + ")\n\n";
  
  if(gameOver) {
    if(jogadorGanhou) {
      areaDeTexto.innerText += "VOCÊ GANHOU!!!";
    }
    
    else if (empate) {
      areaDeTexto.innerText += "EMPATE!!!";
    }

    else {
      areaDeTexto.innerText += "DEALER GANHOU!!!";
    }
    
    botaoNovoJogo.style.display = "inline";
    botaoNovaCarta.style.display = "none";
    botaoManter.style.display = "none";
  }
}

