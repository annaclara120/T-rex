//variáveis
var morte;
var pulo;
var pontos;

var dino,dino_correndo;
var solo,solo_anima,solo_invisivel,dino_cactos;
var bordas, teste;
var sorteio;
var nuvem,nuvem_anima;
var cacto,c1,c2,c3,c4,c5,c6;
var placar = 0;
var recorde = 0;

var gameOver,gameOver_imagem;
var Restart,Restart_imagem;

var JOGAR, ENCERRAR, estado_Jogo;

var grupo_nuvens,grupo_cactos;



//função para carregar amimações
function preload(){
  dino_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
 
  pulo = loadSound("jump.mp3");
  morte = loadSound("die.mp3");
  pontos = loadSound("checkPoint.mp3");
  
  
  solo_anima = loadImage ("ground2.png");
  
  nuvem_anima = loadImage("cloud.png");
  
  dino_cactos = loadAnimation("trex_collided.png")
  
  gameOver_imagem = loadImage("gameOver.png");
  Restart_imagem = loadImage("restart.png");
  
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  
}

//função para configuração do jogo
function setup(){
  createCanvas(600,200);
  
  dino = createSprite(50,180,20,60);
  dino.addAnimation("correndo",dino_correndo);
  dino.addAnimation("dino_cactos",dino_cactos);
  dino.scale = 0.5;
  
  solo = createSprite (200,170,600,20);
  solo.addImage("solo",solo_anima);
  bordas = createEdgeSprites();
  
  gameOver = createSprite(300,50,50,20);
  gameOver.addImage("game_over", gameOver_imagem);
  gameOver.scale = 0.8;
  gameOver.visible = false;
  
  Restart = createSprite(300,120,50,20);
  Restart.addImage("restart", Restart_imagem);
  Restart.scale = 0.6;
  Restart.visible = false;
 
  
  solo_invisivel = createSprite (200,190,600,10);
  solo_invisivel.visible = false;
  
  JOGAR = 1;
  ENCERRAR = 0;
  estado_Jogo = JOGAR;
  
  grupo_nuvens = new Group();
  grupo_cactos = new Group();
  
  //Math.round - tira os números quebrados/casas decimais
  //random - gera números aleatórios dentro de um intervalo
  sorteio = Math.round(random(1,100));
  //console.log(sorteio);
  teste = "Anna";
  //console.log("Olá "+teste+"!");
   dino.setCollider("circle", 0,0,30);
  //dino.setCollider("rectangle", 0,0,400, dino.width);
  //dino.debug = true;
  
  
}

function draw(){
  background("white");
  
  if(dino.isTouching(grupo_cactos)){
    dino.changeAnimation("dino_cactos",dino_cactos);
    //dino.velocityY = -10;
    //pulo.play();
    estado_Jogo = ENCERRAR;
   //morte.play();
   }
  
  if(estado_Jogo === JOGAR){
 
    //dino salta com space
   if(keyDown("space")&& dino.y > 160){
    dino.velocityY = -10;//salto
    pulo.play();
   }
   dino.velocityY += 0.5;//gravidade
   placar = placar+ Math.round(frameRate()/60);
    
   solo.velocityX = -(2+placar/100);//velocidade do solo
  //reinicio do solo
  if(solo.x < 0) {
   solo.x = solo.width/2;  
  }
  if(placar > 0 && placar%100 === 0){
     pontos.play();
     
   }

  gerar_cactos();
  gerar_nuvens();
     
   }else if(estado_Jogo === ENCERRAR){
    stop_game();
    if(mousePressedOver(Restart)){
   reiniciar();
    }
  }
  
  
  //mensages de console
  //console.error("aqui é um erro");
  //console.warn ("isso é um aviso");
  //console.alert ("isso é um aviso");
  
  
 text("pontuação: "+placar,500,20);
text("recorde: "+recorde,400,20);
  
  
  dino.collide(solo_invisivel);//colisão do dino com o solo
  
  
  drawSprites();
}

//funções

function gerar_nuvens(){
 if(frameCount%60===0)   {
  nuvem = createSprite(600,100,40,20);
  nuvem.velocityX = -(2+placar/100);  
  nuvem.addImage("cloud",nuvem_anima);
  nuvem.scale = (random(0.5,1));
  nuvem.y = Math.round(random(40,100));
  nuvem.depth = dino.depth -1; //depth - profundidade
  nuvem.lifetime = 310;
  grupo_nuvens.add(nuvem);
 }
}
  
function gerar_cactos(){
   if(frameCount%120===0) {
  cacto = createSprite(600,160,40,20);
  cacto.velocityX = -(2+placar/100); 
  sorteio = Math.round(random(1,6));
  switch(sorteio){
    case 1: cacto.addImage("obstacle1",c1);   
      cacto.scale = 0.5;
     break;
     
    case 2: cacto.addImage("obstacle2",c2);   
      cacto.scale = 0.5;
     break;
     
    case 3: cacto.addImage("obstacle3",c3); 
      cacto.scale = 0.5;
     break;
     
    case 4: cacto.addImage("obstacle4",c4);   
      cacto.scale = 0.5;
     break;
     
    case 5: cacto.addImage("obstacle5",c5);
      cacto.scale = 0.4;
     break;
     
    case 6: cacto.addImage("obstacle6",c6);
      cacto.scale = 0.3;
     break;
      
  }
  cacto.x = Math.round(random(600,640));
  cacto.depth = dino.depth -1;
  cacto.lifetime = 330;
  grupo_cactos.add(cacto);
 }
}
  

function stop_game(){
  
 Restart.visible = true;
 gameOver.visible = true;

 solo.velocityX = 0;
 grupo_cactos.setLifetimeEach(-1);
 grupo_nuvens.setLifetimeEach(-1);
  
 grupo_nuvens.setVelocityXEach(0);
 grupo_cactos.setVelocityXEach(0);
  
 dino.velocityY = 0;
  
  if(recorde < placar){
   recorde = placar; 
  }  
}
  
function reiniciar(){
 Restart.visible = false;
 gameOver.visible = false; 
  
 estado_Jogo = JOGAR;
 grupo_cactos.destroyEach();
 grupo_nuvens.destroyEach();
 dino.changeAnimation("correndo",dino_correndo); 
 placar = 0;
}


