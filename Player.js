function Player(tempX, tempY) {
  // properties
  this.x = tempX;
  this.y = tempY;
  this.diam = 50;
  this.angle = 0;
  this.xSpeed = 0;
  this.ySpeed = 0;

  this.display = function() {
    push(); // create a drawing layer
    translate(this.x, this.y); // move origin point
    rotate(this.angle); // player can rotate

    fill(0); // black
    /** calculate points on a triangle based on a unit circle. You could use this method to draw more complex polygons that would fit inside a circle centered on (this.x, this.y)
     * For any point around the circle, x = the cosine of the angle in radians from 0 to TWO_PI, and y = the sine of that angle. an angle of 0 is the right side of the circle, PI is the left side. 
     * The points generated this way are relative to the coordinate point (0,0). 
     * The translate() function (above, line 10) takes care of moving it on the canvas.
     * 
    */
    let r = this.diam / 2; // radius
    // 270 degrees (top):
    let x1 = cos(PI + HALF_PI) * r;
    let y1 = sin(PI + HALF_PI) * r;
    // 30 degrees (bottom right):
    let x2 = cos(PI / 6) * r;
    let y2 = sin(PI / 6) * r;
    // 150 degrees (bottom left): 
    let x3 = cos(PI * 5 / 6) * r;
    let y3 = sin(PI * 5 / 6) * r;
    //draw the triangle:
    //triangle(x1, y1, x2, y2, x3, y3);
    //or draw a complex polygon
    beginShape();
    fill(230, 190, 160) // body color orange whole CAT
    fill(230, 190, 160) //body color orange
    rect(-35, 10, 10, 30)// back leg
    rect(-20, 10, 10, 30)// third leg
    rect(10, 10, 10, 30)//second leg
    rect(25, 10, 10, 30)// first leg
    //    ellipse(275, 290, 100, 50) // body
    // subtract 275 from all x arguments
    // subtract 290 from all y args
    ellipse(0, 0, 100, 50) // body
    triangle(35, -55, 30, -35, 45, -35)// left ear
    triangle(55, -55, 50, -40, 60, -35)// right ear
    ellipse(45, -20, 43, 43) // head
    fill(220, 141, 155)// pink color
    triangle(45, -10, 47, -15, 43, -15)// nose
    fill(0)//eye color
    ellipse(55, -25, 4, 4)// left eye
    ellipse(35, -25, 4, 4)// right eye
    line(47, -14, 57, -16)// top right whisker
    line(47, -14, 57, -13)//middle right whisker
    line(47, -14, 57, -10)// bottom right whisker
    line(43, -14, 33, -16)// top left whisker
    line(43, -14, 33, -13)//middle left whisker
    line(43, -14, 33, -10)// bottom left whisker
    endShape();
    // uncomment the next two lines to see the circle
    // noFill();
    // ellipse(0, 0, this.diam, this.diam);

    pop(); // dispose of this layer

  }
  this.thrust = function() {
    let horz = Math.sin(this.angle); // calculate a percentage to the left or right
    let vert = Math.cos(this.angle); // calculate a percentage up or down
    this.xSpeed += .02 * horz; // modify the basic acceleration factor (.02) by the amount of rotation
    this.ySpeed -= .02 * vert;
  }

  this.brake = function() {
    if (this.xSpeed > 0)
      this.xSpeed -= .01; // slow down!
    else this.xSpeed += .01; // speed was less than 0, so bring it back up
    if (this.ySpeed > 0)
      this.ySpeed -= .01; // slow down on y axis, too!
    else this.ySpeed += .01; // bring up to 0 if we went too far
  }

  this.move = function() {
    //folow the mouse for now
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x > width || this.x < 0)
      this.x = abs(this.x - width);
    if (this.y > height || this.y < 0)
      this.y = abs(this.y - height);
  }
}
