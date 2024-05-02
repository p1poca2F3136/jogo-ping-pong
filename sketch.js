//variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//velocidade da bolinha
let velocidadeXBolinha = 0; // Inicialmente, a bolinha não se move
let velocidadeYBolinha = 0;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;

let contagemRegressiva = 10; // Inicializa a contagem regressiva com 10 segundos
let iniciarJogo = false; // Flag para indicar se o jogo começou ou não

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  
  if (iniciarJogo) {
    // Se o jogo já começou, executa o código normalmente
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    incluiPlacar();
    marcaPonto();
  } else {
    // Se o jogo ainda não começou, exibe a contagem regressiva junto com o texto
    textAlign(CENTER, CENTER);
    fill(255);
    text("O jogo vai começar em: " + contagemRegressiva, width / 2, height / 2); // Texto junto com a contagem regressiva
    if (frameCount % 60 == 0 && contagemRegressiva > 0) {
      contagemRegressiva--;
    }
    if (contagemRegressiva == 0) {
      iniciarJogo = true;
      // Inicia o jogo quando a contagem regressiva chegar a zero
      velocidadeXBolinha = 6; // Define a velocidade da bolinha
      velocidadeYBolinha = 6;
    }
  }
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW) && yRaquete > 0) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW) && yRaquete + raqueteAltura < height) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu && xBolinha < width / 2) {
    velocidadeXBolinha *= -1;
    raquetada.play();
    xBolinha = xRaquete + raqueteComprimento + raio;
  } else if (colidiu && xBolinha > width / 2) {
    velocidadeXBolinha *= -1;
    raquetada.play();
    xBolinha = xRaqueteOponente - raio;
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87) && yRaqueteOponente > 0) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83) && yRaqueteOponente + raqueteAltura < height) {
    yRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
