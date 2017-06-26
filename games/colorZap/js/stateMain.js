var StateMain = {

    preload: function () {
    	// Load images
    	game.load.image("red", "images/main/blocks/red.png");
    	game.load.image("blue", "images/main/blocks/blue.png");
    	game.load.image("green", "images/main/blocks/green.png");
    	game.load.image("yellow", "images/main/blocks/yellow.png");

    	game.load.spritesheet("rings", "images/main/rings.png", 60, 63 ,5);
    	game.load.spritesheet("balls", "images/main/balls.png", 35, 35 ,5);
    },

    create: function () {
    	// Add images to stage
    	var red = game.add.image(0,0,"red");
    	var blue = game.add.image(0,100,"blue");
    	var green = game.add.image(100,0,"green");
    	var yellow = game.add.image(100,100,"yellow");

    	// Allow images to be clicked
    	red.inputEnabled=true;
    	red.name = "red";

    	blue.inputEnabled=true;
    	blue.name = "blue";

    	green.inputEnabled=true;
    	green.name = "green";

    	yellow.inputEnabled=true;
    	yellow.name = "yellow";

    	red.events.onInputDown.add(this.changeColor, this);
    	blue.events.onInputDown.add(this.changeColor, this);
    	green.events.onInputDown.add(this.changeColor, this);
    	yellow.events.onInputDown.add(this.changeColor, this);
       
       // Put images in group
       this.blockGroup = game.add.group();
       this.blockGroup.add(red);
       this.blockGroup.add(blue);
       this.blockGroup.add(green);
       this.blockGroup.add(yellow);

       this.blockGroup.x = game.world.centerX - this.blockGroup.width/2;
       this.blockGroup.y = game.height-250;

       // Create a ring
       this.ring = game.add.image(game.world.centerX, this.blockGroup.y-100, "rings");
       this.ring.anchor.set(0.5, 0.5);

       // BALL
       this.ball = game.add.image(0, 0, "balls");
       this.ball.anchor.set(0.5, 0.5);

       // Add event listeners to the whole stage
       this.setListeners();
    },

    setListeners: function () {
    	// When mouse is release set Ring back to white
    	game.input.onUp.add(this.resetRing, this);
    	this.resetBall();
    },

    resetBall: function () {
    	var color = game.rnd.integerInRange(0,5);
    	var xx = game.rnd.integerInRange(0, game.world.width);
    	var yy = game.rnd.integerInRange(0, 100);
    	console.log('color ', color)
    	this.ball.frame=color;
    	this.ball.x = xx;
    	this.ball.y = yy;
    },

    changeColor: function (target) {
    	console.log(target.name)
    	switch(target.name){
    		case "red":
    			this.ring.frame=3;
    			break;
    		case "blue":
    			this.ring.frame=1;
    			break;
    		case "green":
    			this.ring.frame=2;
    			break;
    		case "yellow":
    			this.ring.frame=4;
    			break;
    	}
    },

    resetRing: function () {
    	this.ring.frame=0;
    },

    update: function () {

    }

}