function Ground(x, y) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = 50;
}

Ground.prototype.show = function() {
	let c = color(248, 94, 100);
	fill(c);
	noStroke();
	rectMode(CENTER);
	rect(this.x, this.y, this.width, this.height);
}