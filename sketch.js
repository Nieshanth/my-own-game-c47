var bg,bgImg;
var jack, jackImg;
var zombieImg;
var zombieGroup,coinGroup;
var score = 0;
var gameState = "play"
function preload(){
  
  jackImg = loadImage("assets/jack-runner-unscreen.gif")
   zombieImg = loadImage("assets/monster.png")

  bgImg = loadImage("assets/bg.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
 // bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
//bg.addImage(bgImg)
//bg.scale = 1.1
  

//creating the player sprite
jack = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
jack.addImage("running",jackImg)
// jack.playing = true;
  jack.scale = 0.75;
   jack.debug = true
   jack.setCollider("rectangle",0,0,100,100)

    zombieGroup = new Group();
    coinGroup = new Group();
}

function draw() {
  background(bgImg); 
fill("red")
textSize(20)
text ("SCORE:"+score,width-150,50)

if(gameState==="play"){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  jack.y = jack.y-30
}
if(keyDown("DOWN_ARROW")){
 jack.y = jack.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("LEFT_ARROW")){
  jack.x = jack.x-30
}
 
if(keyDown("RIGHT_ARROW")){
jack.x= jack.x+30
}
 // player.addImage(shooter_shooting)
 


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
//  player.addImage(shooterImg)
}
if(jack.isTouching(coinGroup) ){
score = score+10
coinGroup.destroyEach();



}

if(jack.isTouching(zombieGroup)){
  gameState = "end"
}


spawnzombies();
spawncoins();
drawSprites();
}
if(gameState==="end"){
  text("GAME OVER",width/2-50,height/2)
}

}

function spawnzombies()
{
 if(frameCount%100===0)
 {
    var zombie = createSprite(10,20,30,50)
  zombie.x= random(50,width-50)
  zombie.y= random(50,height-50)
  
zombie.addImage(zombieImg)
zombie.scale = 0.1
zombie.velocityX= -3;
zombie.lifetime = 1000
zombieGroup.add(zombie)
zombie.debug = true;
 }

}

function spawncoins()
{
 if(frameCount%150===0)
 {
    var coin = createSprite(10,20,20,20)
  coin.x= random(50,width-50)
  coin.y= random(50,height-50)
  
//coin.addImage(zombieImg)
//coin.scale = 0.1
coin.lifetime=100

coin.shapeColor ="yellow"
coinGroup.add(coin)
coin.debug = true;
 }

}