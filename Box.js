function Fish(_x, _y) {
  this.x = _x;
  this.y = _y;

  this.xSpeed = 0;
  this.ySpeed = random(1, 2); // 1 - 2 (falling)
  this.rSpeed = random(-.02, .02); // rotation speed

  this.angle = 0;

  /* choose a color scheme at random */
  if (random(100) > 50) { // 50-50 chance
    this.boxColor = color(random(0, 100), 0, random(0, 200)); // blue/purple
  } else {
    this.boxColor = color(random(0, 100), 0, random(0, 200)); // blue

  }

  this.display = function() {

    push();
    translate(this.x, this.y);
    rotate(this.angle);

    rectMode(CENTER);
    fill(this.boxColor);
    triangle(25, 0, 50, -20, 50, 20) //tail 
    ellipse(0, 0, 60, 30); // 40px square
    strokeWeight(8) //eye
    point(-20, 5) //eye
    strokeWeight (2) //eye reflection
    stroke ('white') //eye
    point (-20, 4)
    pop();
  }

  this.move = function() {
    this.y += this.ySpeed; // spin
  }

  this.spin = function() {
    this.angle += this.rSpeed; // spin
  }



}