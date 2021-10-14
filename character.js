function Character(x, y) {
	this.x = x;
	this.y = y;
	this.pull = 5;
	this.push = 0;
	this.size = 50;
}

Character.prototype.show = function() {
	fill(243, 128, 128);
	noStroke();
	rectMode(CENTER);
	rect(this.x, this.y, this.size, this.size);

	this.y += this.pull;
	this.y -= this.push;
	if(this.push) this.push--;
}

Character.prototype.jump = function() {
	character.push = 20;
}