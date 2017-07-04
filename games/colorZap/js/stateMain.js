var StateMain = {

    preload: function () {
    	// Load images
    	game.load.image("red", "images/main/blocks/red.png");
    	game.load.image("blue", "images/main/blocks/blue.png");
    	game.load.image("green", "images/main/blocks/green.png");
    	game.load.image("yellow", "images/main/blocks/yellow.png");

    	game.load.spritesheet("rings", "images/main/rings.png", 60, 63 ,5);
    	game.load.spritesheet("balls", "images/main/balls.png", 35, 35 ,5);
        game.load.spritesheet("soundButtons", "images/ui/soundButtons.png", 32, 32 ,2);

        game.load.audio('points', 'sounds/points.mp3');
        game.load.audio('gameOver', 'sounds/gameOver.mp3');
    },

    create: function () {

        // SPEED
        this.speed = 150;
        this.incSpeed = 2;
        this.maxSpeed = 450;

        // SCORE
        score = 0;

        game.physics.startSystem(Phaser.Physics.Arcade);

        // Create sound instance;
        this.pointSound =  game.add.audio('points');
        this.gameOverSound =  game.add.audio('gameOver');

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

       // RING
       this.ring = game.add.image(game.world.centerX, this.blockGroup.y-100, "rings");
       this.ring.anchor.set(0.5, 0.5);

       // BALL
       this.ball = game.add.sprite(0, 0, "balls");
       this.ball.anchor.set(0.5, 0.5);
       game.physics.arcade.enable(this.ball);

       // TEXT
       this.scoreText = game.add.text(game.world.centerX, 150, "0");
       this.scoreText.fill = "#ffffff";
       this.scoreText.fontSize =  64;
       this.scoreText.anchor.set(0.5, 0.5);

       this.scoreLabel = game.add.text(game.world.centerX, 100, "Score");
       this.scoreLabel.fill = "#ffffff";
       this.scoreLabel.fontSize =  32;
       this.scoreLabel.anchor.set(0.5, 0.5);

       // SOUND BUTTONS
       this.soundButton = game.add.image(20, 20, "soundButtons");
       this.soundButton.inputEnabled = true; 
       if (soundOn == true) {
            this.soundButton.frame = 0;
        } else {
            this.soundButton.frame = 1;
        }

       // STAGE EVENT LISTENERS
       this.setListeners();
       this.resetBall();
    },

    setListeners: function () {
    	// When mouse is released set Ring back to white
    	game.input.onUp.add(this.resetRing, this);
        // When mouse down on soundbutton Toggle sound
        this.soundButton.events.onInputDown.add(this.toggleSound, this);
    },

    toggleSound: function () {
        console.log('toggle sound');
        soundOn = !soundOn;
        if (soundOn == true) {
            this.soundButton.frame = 0;
        } else {
            this.soundButton.frame = 1;
        }
    },

    resetBall: function () {

        // Set new ball color and pos
    	var color = game.rnd.integerInRange(1, 4);
        var xx = game.rnd.integerInRange(0, game.world.width);
        var yy = game.rnd.integerInRange(0, 100);
        
        this.ball.frame = color;
        this.ball.x = xx;
        this.ball.y = yy;

        // Rotate ball so it faces target
        var rot = game.physics.arcade.moveToXY(this.ball, this.ring.x, this.ring.y, this.speed);
        this.ball.rotation = rot;

        // Increase the speed (and limit if necessary)
        this.speed += this.incSpeed;
        if (this.speed>this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
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
                score++;
                this.scoreText.text = score;
                if (soundOn == true) {
                    this.pointSound.play();
                }
            } else {
                if (soundOn == true) {
                    this.gameOverSound.play();
                }
                game.state.start("StateOver");
            }
        }
       

    }

}