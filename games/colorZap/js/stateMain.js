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

        this.speed = 200;

        game.physics.startSystem(Phaser.Physics.Arcade);

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
       this.ball = game.add.sprite(0, 0, "balls");
       this.ball.anchor.set(0.5, 0.5);
       game.physics.arcade.enable(this.ball);

       // Add event listeners to the whole stage
       this.setListeners();
       this.resetBall();
    },

    setListeners: function () {
    	// When mouse is release set Ring back to white
    	game.input.onUp.add(this.resetRing, this);
    },

    resetBall: function () {
    	var color = game.rnd.integerInRange(1, 4);
        var xx = game.rnd.integerInRange(0, game.world.width);
        var yy = game.rnd.integerInRange(0, 100);
        
        this.ball.frame = color;
        this.ball.x = xx;
        this.ball.y = yy;

        
       //this.ball.body.velocity.setTo(0,100);

        
        var rot = game.physics.arcade.moveToXY(this.ball, this.ring.x, this.ring.y, this.speed);
        this.ball.rotation = rot;
    },

    changeColor: function (target) {
    	
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
        // Measure the distance between the ball and the ring
        var diffx = Math.abs(this.ring.x - this.ball.x);
        var diffy = Math.abs(this.ring.y - this.ball.y);

        // If diff x and y are less than 10 we know we are at ring
        if (diffx<10 && diffy<10) {
            this.ball.body.velocity.setTo(0,0);

            // If frame of ball and ring are same its a match
            // So reset ball
            if (this.ball.frame ==  this.ring.frame) {
                this.resetBall();
            } else {
                game.state.start("StateOver");
            }
        }

    }

}