let ball = {
  x: 200,
  y: 200,
  r: 15,
  xSpeed: 4,
  ySpeed: 4,
  rotation: 0
};

let paddleLeft, paddleRight;
let ballImage, raquete1, raquete2, fundoImagem;

function preload() {
  ballImage = loadImage('bola copy.png');
  raquete1 = loadImage('barra01.png');
  raquete2 = loadImage('barra02.png');
  fundoImagem = loadImage('fundo1.png');
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);

  paddleLeft = { x: 30, y: height / 2, w: 10, h: 80 };
  paddleRight = { x: width - 30, y: height / 2, w: 10, h: 80 };
}

function draw() {
  // Fundo
  if (fundoImagem) {
    imageMode(CORNER);
    image(fundoImagem, 0, 0, width, height);
    imageMode(CENTER);
  } else {
    background('#FFB6C1');
  }

  // Movimento da bola
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;

  // Colisão com bordas
  if (ball.y < ball.r || ball.y > height - ball.r) {
    ball.ySpeed *= -1;
    ball.rotation += PI / 4;
  }

  // Colisão com raquete esquerda
  if (
    ball.x - ball.r < paddleLeft.x + paddleLeft.w / 2 &&
    ball.y > paddleLeft.y - paddleLeft.h / 2 &&
    ball.y < paddleLeft.y + paddleLeft.h / 2
  ) {
    ball.xSpeed *= -1;
    ball.rotation += PI / 4;
  }

  // Colisão com raquete direita
  if (
    ball.x + ball.r > paddleRight.x - paddleRight.w / 2 &&
    ball.y > paddleRight.y - paddleRight.h / 2 &&
    ball.y < paddleRight.y + paddleRight.h / 2
  ) {
    ball.xSpeed *= -1;
    ball.rotation += PI / 4;
  }

  // Gol (bola sai da tela)
  if (ball.x < 0 || ball.x > width) {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.rotation = 0;
  }

  // Desenhar raquetes
  if (raquete1) {
    image(raquete1, paddleLeft.x, paddleLeft.y, paddleLeft.w, paddleLeft.h);
  } else {
    rectMode(CENTER);
    rect(paddleLeft.x, paddleLeft.y, paddleLeft.w, paddleLeft.h);
  }

  if (raquete2) {
    image(raquete2, paddleRight.x, paddleRight.y, paddleRight.w, paddleRight.h);
  } else {
    rectMode(CENTER);
    rect(paddleRight.x, paddleRight.y, paddleRight.w, paddleRight.h);
  }

  // Bola com rotação
  push();
  translate(ball.x, ball.y);
  rotate(ball.rotation);
  if (ballImage) {
    image(ballImage, 0, 0, ball.r * 2, ball.r * 2);
  } else {
    fill(255);
    ellipse(0, 0, ball.r * 2);
  }
  pop();

  // Controles
  if (keyIsDown(87)) paddleLeft.y -= 5; // W
  if (keyIsDown(83)) paddleLeft.y += 5; // S
  if (keyIsDown(UP_ARROW)) paddleRight.y -= 5;
  if (keyIsDown(DOWN_ARROW)) paddleRight.y += 5;

  // Limitar raquetes
  paddleLeft.y = constrain(paddleLeft.y, paddleLeft.h / 2, height - paddleLeft.h / 2);
  paddleRight.y = constrain(paddleRight.y, paddleRight.h / 2, height - paddleRight.h / 2);
}
