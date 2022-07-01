var bg, bgImg, bgImg1
var bottomGround
var topGround
var balloon, balloonImg
var obstop1, obstop2
var obsbottom1,obsbottom2, obsbottom3
var score = 0

var PLAY = 0
var END = 1
var gameState = PLAY

function preload(){
  bgImg = loadImage("assets/bg.png")
  bgImg1 = loadImage("assets/bgImg2.jpg")
  obstop1 = loadImage("assets/obsTop1.png")
  obstop2 = loadImage("assets/obsTop2.png")
  obsbottom1 =loadImage("assets/obsBottom1.png")
  obsbottom2 =loadImage("assets/obsBottom2.png")
  obsbottom3 =loadImage("assets/obsBottom3.png")
  gameOverImg= loadImage("assets/fimdejogo.png")
  restartImg = loadImage("assets/restart.png")
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  jumpSound = loadSound("assets/jump.mp3");
}

function setup(){

  //imagem de plano de fundo
  
  createCanvas(550, 550)
  bg = createSprite(165,485,1,1);
  // bg.addImage(bgImg);
  // bg.scale = 1.3
  getBackgroundImg();


  bottomGround = createSprite(200,540,800,20);
   bottomGround.visible = false;
  topGround = createSprite(200,10,800,20);
   topGround.visible = false;

//criando sprites de fim de jogo e reiniciar
 gameOver = createSprite(220,200);
 restart = createSprite(220,240)
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;
 restart.addImage(restartImg);
 restart.scale = 0.5;
 gameOver.visible = false;
 restart.visible = false;
        
  //criando o balão     
  balloon = createSprite(100,200,20,50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.2;


  obstaculoTopGroup = new Group()
  bottomObstaculosGroup = new Group()
  barraGroup = new Group()
}

function draw() {
  
  background("black");
  image(bgImg,0,0,width,height)
        
  if(gameState === PLAY){
//fazendo o balão de ar quente pular
    if(keyDown("space")) {
      balloon.velocityY = -8;
      jumpSound.play();
  }
  //adicionando gravidade
  balloon.velocityY = balloon.velocityY + 1;
     
  barra()

//gerando obstáculos no topo e no chão
  createObstacles()
  createDObs()

//condição para o estado END
    if (obstaculoTopGroup.isTouching(balloon)||
        balloon.isTouching(topGround)||
        balloon.isTouching(bottomGround)||
        bottomObstaculosGroup.isTouching(balloon)){
      
        gameState = END
    }
  }

  if(gameState === END){
    gameOver.visible = true
    restart.visible = true

    balloon.velocityX = 0
    balloon.velocityY = 0
  }
  drawSprites();

  Score()
}

function createObstacles(){
  if(frameCount%60 ===0){

   obstaculoTop = createSprite(560,30,50,50);
   obstaculoTop.velocityX = -4;
   obstaculoTop.y = Math.round(random(70,160))
   
   var rand = Math.round(random(1,2))
   switch(rand){
    case 1: obstaculoTop.addImage(obstop1)
    break
    case 2: obstaculoTop.addImage(obstop2)
    break
    default: break
   }
   obstaculoTop.lifetime= 150
   obstaculoTop.scale = 0.1

   obstaculoTopGroup.add(obstaculoTop)
  }

}

function createDObs(){

  if(frameCount%80 ===0){

    obsD1 =createSprite(500, 465, 40, 50)
    obsD1.velocityX = -4;
     obsD1.scale = 0.1
   var rand = Math.round(random(1,3))
   switch(rand){
    case 1: obsD1.addImage(obsbottom1)
    break
    case 2: obsD1.addImage(obsbottom2)
    break
    case 3: obsD1.addImage(obsbottom3)
    break
    default: break
  }

  obsD1.lifetime=150

  bottomObstaculosGroup.add(obsD1)
 }
}
function barra(){
    if(frameCount%60 === 0 ){
      var barra = createSprite(550,275,10,800)
      barra.velocityX  = -6
      
      barra.visible=false     
      barra.depth = balloon.depth;
      barra.lifetime = 70;

      barraGroup.add(barra);  
    }
}

function Score()
{
         if(balloon.isTouching(barraGroup))
         {
           score = score + 1;
         }
        textFont("algerian");
        textSize(30);
        fill("yellow");
        text("Pontuação: "+ score, 250, 50);
       
  
}

//usando chamadas de API para definir a imagem de plano de fundo de acordo com o tempo
async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
    
    bg.addImage(bgImg);
    bg.scale = 0.3
  }
  else{
    
    bg.addImage(bgImg1);
    bg.scale = 2.5
    bg.x=200
    bg.y=200
  }

}
