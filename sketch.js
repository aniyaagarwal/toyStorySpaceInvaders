var woody, jessie, slinkyDog, mrPotatoHead, buzzLightyear, alien, forky, hamm, rex, soldier;
var obstacle, obstacleGroup;
var cannon, cannonImg, bomb, bombImg, bombGroup;
var gameState = "start"
var score = 0;
var gameOver, gameOverImg, restart, restartImg;

function preload() {
  woody = loadImage("assets/woody.png")
  jessie = loadImage("assets/jessie.png")
  slinkyDog = loadImage("assets/slinkyDog.png")
  mrPotatoHead = loadImage("assets/mrPotatoHead.png")
  buzzLightyear = loadImage("assets/buzzLightyear.png")
  alien = loadImage("assets/alien.png")
  forky = loadImage("assets/forky.png")
  hamm = loadImage("assets/hamm.png")
  rex = loadImage("assets/rex.png")
  soldier = loadImage("assets/soldier.png")
  cannonImg = loadImage("assets/cannon.png")
  bombImg = loadImage("assets/bomb.png")
  gameOverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.jpg")
}

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10);

  cannon = createSprite(width / 2, height - 50);
  cannon.addImage(cannonImg)
  cannon.scale = 0.075
  cannon.setCollider("rectangle", 0, 0, cannon.width/2+100, cannon.height*2/3+100)

  gameOver = createSprite(width / 2, height / 2.5)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.75;

  restart = createSprite(width/2, height*2/3)
  restart.addImage(restartImg)
  restart.scale = 0.25;


  obstacleGroup = new Group();
  bombGroup = new Group();
}

function draw() {
  //cannon.debug = true;
  background(0);
  fill("white")
  textSize(25)
  text("Score = " + score, 50, 50)
  if (gameState == "start") {
    start()
  } else if (gameState == "play") {
    play()
  } else if (gameState == "end") {
    end()
  }

  drawSprites();
}

function start() {
  fill("white");
  score = 0
  gameOver.visible = false;
  restart.visible = false;
  textSize(25)
  text("Press SPACEBAR to start", width / 2.5, height / 2)
  if (keyDown("space")) {
    gameState = "play"
  }
}

function play() {
  createObstacles();
  gameOver.visible = false;
  restart.visible = false;
  if (keyDown(LEFT_ARROW)) {
    cannon.x -= 5
  }
  if (keyDown(RIGHT_ARROW)) {
    cannon.x += 5
  }
  if (frameCount % 15 == 0 && (keyDown(UP_ARROW) || keyDown("space"))) {
    createBomb();
  }

  if (obstacleGroup.isTouching(bombGroup)) {

    for (var i = 0; i < obstacleGroup.length; i++) {

      for (var j = 0; j < bombGroup.length; j++) {

        if (bombGroup[j].isTouching(obstacleGroup[i])) {
          bombGroup[j].destroy();
          obstacleGroup[i].destroy();
          score += Math.round(random(10, 20))
        }
        /*if (obstacleGroup[i].isTouching(bombGroup)) {
          obstacleGroup[i].destroy();
          bombGroup.destroy();
        }*/
      }

    }
  }

  for (var k = 0; k < obstacleGroup.length; k++) {

    if (obstacleGroup[k].isTouching(cannon) || obstacleGroup[k].y > height) {
      gameState = "end"
    }
  }

}

function end() {
  obstacleGroup.setVelocityYEach(0)
  obstacleGroup.destroyEach();
  bombGroup.destroyEach();
  gameOver.visible = true;
  restart.visible = true;
  cannon.x = width / 2
  if (mousePressedOver(restart)){
    gameState = "start"
  }

}

function createObstacles() {
  if (frameCount % 100 == 0) {
    for (i = 1; i < 7; i++) {
      obstacle = createSprite((width / 11 * i) + width / 5, 20)
      var obstacleType = Math.round(random(0.5, 10.4));
      switch (obstacleType) {
        case 1:
          obstacle.addImage(woody);
          obstacle.scale = 0.025
          break;
        case 2:
          obstacle.addImage(jessie);
          obstacle.scale = 0.15
          break;
        case 3:
          obstacle.addImage(slinkyDog);
          obstacle.scale = 0.2
          break;
        case 4:
          obstacle.addImage(mrPotatoHead);
          obstacle.scale = 0.25
          break;
        case 5:
          obstacle.addImage(buzzLightyear);
          obstacle.scale = 0.12
          break;
        case 6:
          obstacle.addImage(alien);
          obstacle.scale = 0.25
          break;
        case 7:
          obstacle.addImage(forky);
          obstacle.scale = 0.25
          break;
        case 8:
          obstacle.addImage(hamm);
          obstacle.scale = 0.15
          break;
        case 9:
          obstacle.addImage(rex);
          obstacle.scale = 0.1
          break;
        case 10:
          obstacle.addImage(soldier);
          obstacle.scale = 0.35
          break;
        default:
          break;
      }
      obstacleGroup.add(obstacle)

      obstacle.velocityY = 1


    }


  }
}

function createBomb() {
  bomb = createSprite(cannon.x, cannon.y)
  bomb.addImage(bombImg)
  bomb.velocityY = -5
  bomb.lifetime = 1000
  bomb.scale = 0.025
  bombGroup.add(bomb)

}