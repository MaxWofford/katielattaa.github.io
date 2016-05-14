var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;
var GRAVITY = 0.3;
var player;
var JUMP = -5;
var obstacleSprites;
var isGameOver;
var score;
var playerImage
var obstacleImage
var backgroundImage
var groundImage

function preload() {
    playerImage = loadImage("flippy.png")
    obstacleImage = loadImage("gag.png")
    backgroundImage= loadImage("toontown.jpg")
    groundImage= loadImage("ground.png")
}

function setup () {
    isGameOver = false;
    score = 0;
    createCanvas(400, 300);
    background(backgroundImage);
    groundSprites = new Group();
    
    numGroundSprites = width/GROUND_SPRITE_WIDTH + 1;
    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT) ;
        groundSprite.addImage(groundImage);
        groundSprites.add(groundSprite) ;
    }
    player = createSprite(100, height-75, 50, 50);
    player.addImage(playerImage);
    obstacleSprites = new Group();
}

function draw () {
    if (isGameOver) {
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
        text("GAME OVER!!!! Click anywere to restart", camera.position.x, camera.position.y);
    } else {
        background(backgroundImage);
        if (touchIsDown) {
            player.velocity.y = JUMP;
        }
        player.velocity.y = player.velocity.y + GRAVITY;
        
        if (Math.floor(player.position.y) > (height-50)-(player.height/2)) {
            player.velocity.y = 0;
            player.position.y = (height-50) - (player.height/2);
        }
        player.position.x = player.position.x + 5;
        camera.position.x = player.position.x + (width/4);
        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x <= camera.position.x - (width/2 + GROUND_SPRITE_WIDTH/2)) {
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*GROUND_SPRITE_WIDTH;
            groundSprites.add(firstGroundSprite);
        }
        if (random() > 0.95) {
            var obstacle = createSprite(camera.position.x + width, random(0, (height-50) -15), 30, 30);
            obstacle.addImage(obstacleImage);
            obstacleSprites.add(obstacle);
            
        }
        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
            removeSprite(firstObstacle);
        }
        obstacleSprites.overlap(player, endGame);
        drawSprites();
        score = score + 1;
        textAlign(CENTER);
        text(score, camera.position.x, 10);
    }
}

function endGame() {
    isGameOver = true
    console.log("Game Over!");
}
function touchMoved() {
    if (isGameOver) {
        groundSprites.removeSprites();
        for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprite.addImage(groundImage);
        groundSprites.add(groundSprite);
        }
        
        player.position.x = 100
        player.position.y = height-75;
        
        obstacleSprites.removeSprites();
        
        isGameOver = false;
        score = 0;
    }
}