var PLAY = 2;
var END = 1;
var gameState = 2;
var path,boy,cash,diamonds,jwellery,sword, end;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, endImg;
var score = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup(){
  createCanvas(300,400);
// Moving background
path=createSprite(150,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale = 0.9;


//creating boy running
boy = createSprite(200,350,20,60);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
end = createSprite(150,200);
end.visible = false;
end.addAnimation("gameEnd",endImg);
end.scale = 0.7;
  
  
cashG      = new Group();
diamondsG  = new Group();
jwelleryG  = new Group();
swordGroup = new Group();

}

function draw() {
  background(0);
  boy.x = mouseX;
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  if(gameState === PLAY){
    
   boy.setCollider("rectangle",0,0,760,500);
   //boy.debug = true;
   
  //create different treasures
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      score = score + 700;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score = score + 1500; 
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      score = score + 500;
    }
    else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
    }
  }
  }
  if(gameState === END){
    boy.visible = false;
    end.visible = true;
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    path.velocityY = 0;
  }
  
  
edges= createEdgeSprites();
  boy.collide(edges);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ score,30,30);

}

function createCash() {
  if (frameCount % 150 == 0) {
cash = createSprite(Math.round(random(50, 240),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (frameCount % 250 === 0) {
diamonds = createSprite(Math.round(random(50, 240),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (frameCount % 150 === 0) {
jwellery = createSprite(Math.round(random(50, 240),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (frameCount % 180 === 0) {
sword = createSprite(Math.round(random(50, 240),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}