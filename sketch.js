// w*h canvas size
var canvasSize = 600;

// Objects
var character;
var ground;

// Current score
var score = 0;

// Obstacles array
var obstacles = [];

// Speed of obstacles
var obstaclespeed = 5;

// Spawnrate of obstacles
var frequency = 100;

// Game over?
var dead = false;

function setup() {
	// Create canvas
	createCanvas(canvasSize, canvasSize);

	// Create char
	character = new Character(60, height/2);

	// Create ground
	ground = new Ground(width/2, height-20);

	// Create first obstacle
	obstacles.push(new Obstacle(0.90 * width, ground.y - ground.height/2 - 20, obstaclespeed));
}
function draw() {
	background(0);

	// Collision with ground
	if(character.y + character.size/2 > ground.y - ground.height/2) {
		character.y = ground.y - ground.height/2 - character.size/2;
	}

	// Show character
	if(!gameOver()) character.show();

	// Show ground
	if(!gameOver()) ground.show();

	// Obstacle loop
	for(var i = obstacles.length-1; i >= 0; i--) {
		// Show obstacle
		if(!gameOver()) obstacles[i].show();

		// Delete off screen obstacles
		if(obstacles[i].x < -100) obstacles.splice(i, 1);

		// Character collision with obstacle (left side)
		if(character.x + character.size/2 > obstacles[i].x - obstacles[i].width/2) {

			// Add score
			if(!obstacles[i].cleared) {
				score++;
				obstacles[i].cleared = true;
			}

			// Character collision with obstacle (right side)
			if(character.x - character.size/2 < obstacles[i].x + obstacles[i].width/2) {
				// Character collision with obstacle (top)
				if(character.y + character.size/2 > obstacles[i].y - obstacles[i].height/2) {
					dead = true;
				}
			}
		}
	}
	let mySound;
	function preload() {
	  soundFormats('m4a');
	  mySound = loadSound('assets/electro7.m4a');
	}
	// Show score
	textSize(50);
	textAlign(CENTER);
	fill(248, 94, 100);
	text('pimples avoided ' + score, width/2, 50);
	textFont('Helvetica');

	// Draw game over
	if(gameOver()) {
		fill(255, 192, 203);
		stroke('red');
		text("nurrr ☹️ try again", width/2, 144);
		textSize(25);
		textFont('Helvetica');
		noStroke();
		fill(200);
		text("[space] to have another go", width/2, 169);
		mySound.play();
	}

	if(frameCount % frequency == 0) {
		if(!gameOver()) obstacles.push(new Obstacle(width, ground.y - ground.height/2 - 20, obstaclespeed));
	}
}

function gameOver() {
	if(dead) return true;
	else return false;
}

function keyPressed() {
	if(keyCode == 32){
		if(gameOver()) location.reload();
		else doJump();
	} 
}

function mousePressed() {
	doJump();
}

function doJump() {
	if(character.y > ground.y - ground.height/2 - character.size/2) character.jump();
}
