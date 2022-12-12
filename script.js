/**
 * Project 3 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js.
 * 
 * You can work with a friend or in a group, but everyone has to turn in their own version of the game. We will build a basic version of this project together as a series of lab exercises. I'm hoping you go beyond the basics to make something fun and unique. To earn higher thaan a 'B' on the project, you will need to add your own creative ideas and objects. 
 */


var gameState = "splash"
var player1;
var timer;
var testFish; // a fish to preview on the splash screen
var dropTimer; // regulate fish drops
var presents = new Array(0); // an empty array called "presents"
var score = 0; // keep track of points (starting at 0)

function setup() {

  createCanvas(600, 400);
  player1 = new Player(width / 2, height * 4 / 5)
  timer = new Timer(10000);
  dropTimer = new Timer(1000);
  testFish = new Fish(width / 2, height / 3);
}

function draw() {
  background(200);
  /* un-comment each line to see it work */
  //splash(); // call the splash screen function (below)
  //play(); // call the play screen function (below)
  //gameOver(); // call the gameOver screen function (below)
  switch (gameState) {
    case "splash":
      splash(); // show the splash screen
      break;
    case "play":
      play();
      break;
    case "gameOver":
      gameOver();
      break;
    default:
      console.log("no match found - check your mousePressed() function!");
  }

}

function splash() {
  // this is what you would see when the game starts
  background(200, 100, 100);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
  testFish.display();
  testFish.spin();
}

function play() {
  // this is what you see when the game is running 
  background(200, 200, 255);
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  text("Catch the fish!", width / 2, height / 2);
  textAlign(LEFT);
  text("elapsed time: " + int(timer.time - timer.elapsedTime), 40, 100);
  text("Score: " + score, 20, 40);
  player1.display();
  player1.move();
  if (timer.isFinished()) {
    gameState = "gameOver"
  }
  if (dropTimer.isFinished()) {
    let p = new Fish(random(width), -40);
    // new fish, anywhere across the width of the canvas, but 40px above the canvas
    presents.push(p); // add object 'p' to the 'presents' Array
    dropTimer.start(); // restart timer for next drop
  }
  for (let i = 0; i < presents.length; i++) {
    presents[i].display(); // draw it on the canvas
    presents[i].move(); // make it drop
    presents[i].spin() // make it rotate
    if (presents[i].y > height) {
      // present went below the canvas
      presents.splice(i, 1);
      score--; // decrement score by 1
      // remove 1 element from from "presents" at index 'i'
    }
    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if (d < 50) { // less than 50 pixels?
      presents.splice(i, 1); // remove from array
      score++; // add 1 point!
    }
  }
  // show elapsed time in top left corner
  // player1.x = mouseX
  if (keyIsPressed) {
    switch (keyCode) {
      case UP_ARROW:
        player1.thrust(); // accelerate
        break;
      case DOWN_ARROW:
        player1.brake();
        break;
      case LEFT_ARROW:
        player1.angle -= .02; //turn left
        break;
      case RIGHT_ARROW:
        player1.angle += .02; //turn right
        break;
      default:
        console.log("use the arrow keys to move");
    }
  }

}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
  text("Your final score: " + score, width / 2, height * 2 / 3);
}

function mousePressed() {

  console.log("click!");
  if (gameState == "splash") {
    gameState = "play";
    timer.start();
    dropTimer.start(); // start the drop timer for presents
    score = 0; // reset score to 0 at start of game
  } else if (gameState == "play") {
    // gameState = "gameOver"
  } else if (gameState == "gameOver") {
    gameState = "splash"
  }

}
/*
function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      player1.y -= 20;
      player1.angle = 0;
      if (player1.y < 0) player1.y = height;
      break;
    case DOWN_ARROW:
      player1.y += 20;
      player1.angle = PI;
      if (player1.y > height) player1.y = 0; // wrap around
      break;
    case LEFT_ARROW:
      player1.x -= 20; // player x bc x axis position
      player1.angle = -HALF_PI
      if (player1.x < 0) player1.x = width;
      break;
    case RIGHT_ARROW:
      player1.x += 20;
      player1.angle = PI / 2
      if (player1.x > width) player1.x = 0;
      break;
    default:
      console.log("use the arrow keys to move")
  }
}
*/