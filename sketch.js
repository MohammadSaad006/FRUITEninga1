var monsterImage, monster2Image
var fruit1Image,fruit2Image,fruit3Image,fruit4Image
var sword, swordImage
var gameOver, gameOverImage
var fruitGroup, swordGroup, monsterGroup
var score 
var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
}



function setup() {
  createCanvas(600, 600);
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  sword.setCollider("rectangle",0,0,40,40);
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  score=0;
}

function draw() {
  background("lightblue");
  if(gameState===PLAY){
    fruits();
    enemy();
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    else
    {
      if(monsterGroup.isTouching(sword)){
        gameState=END;
  
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  text("Score : "+ score,300,30);
}


function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(0,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=8;
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(0,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}