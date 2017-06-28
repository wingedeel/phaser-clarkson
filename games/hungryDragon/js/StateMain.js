var StateMain={    
    
   preload:function()
    {
       if (screen.width<1000) {
    		game.scale.forceOrientation(true, false)
    	}

        game.load.spritesheet('dragon', "images/main/dragon.png", 120, 85, 4);
        game.load.image("background", "images/main/background.png");
        game.load.spritesheet('candy', 'images/main/candy.png', 52,50,8);
        game.load.image("balloon", "images/main/thought.png");
    },
    
    create:function()
    {
        score=0;
        // Start the Physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);


        this.top = 0;
        this.bottom = game.height-120;

        // DRAGON
        this.dragon = game.add.sprite(0, 0, "dragon");
        this.dragon.animations.add('fly', [0, 1, 2, 3], 12, true);
        this.dragon.animations.play('fly');

        // BACKGROUND
        this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');

        // IPAD FIX 
        if (screen.height > 754) {
            // ipad height is 755
            // centers y pos. Will look like a wide screen film
            this.background.y = game.world.centerY-this.background.height/2;
            this.top = this.background.y;
        }

        this.dragon.bringToTop();
        this.dragon.y = this.top;

        this.background.autoScroll(-100,0);

        // Sweets
        this.candies=game.add.group();
        this.candies.createMultiple(40, 'candy');
        this.candies.setAll('checkWorldBounds', true);
        this.candies.setAll('outOfBoundsKill', true);

         // Enable physics on the dragon and candies
        game.physics.enable([this.dragon, this.candies], Phaser.Physics.ARCADE);
        this.dragon.body.gravity.y = 500;
        this.dragon.body.immovable = true;

        // THOUGHT BUBBLE
        this.balloonGroup = game.add.group();
        this.balloon = game.add.sprite(0,0, "balloon");
        this.think = game.add.sprite(36,26, "candy");
        this.balloonGroup.add(this.balloon);
        this.balloonGroup.add(this.think);
        this.balloonGroup.scale.x = 0.5;
        this.balloonGroup.scale.y = 0.5;
        this.balloonGroup.x = 50;

        // Choose a different thought every time game starts up
        this.resetThink();

        // TEXT
       this.scoreText = game.add.text(game.world.centerX, 60, "0");
       this.scoreText.fill = "#000000";
       this.scoreText.fontSize =  64;
       this.scoreText.anchor.set(0.5, 0.5);

       this.scoreLabel = game.add.text(game.world.centerX, 20, "Score");
       this.scoreLabel.fill = "#000000";
       this.scoreLabel.fontSize =  32;
       this.scoreLabel.anchor.set(0.5, 0.5);

         // Fire this function every second
        game.time.events.loop(Phaser.Timer.SECOND, this.fireCandy, this);

        this.setListeners();

    },
    
    setListeners: function () {
    	if (screen.width<1000) {
    		game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
    		game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    	}
    },

    fireCandy: function () {
      
        // Get the first available candy that is not onscreen/not active
        var candy = this.candies.getFirstDead();
        // -60 to allow for ground
        var yy = game.rnd.integerInRange(0, game.height-60); 
        // -100 as otherwise will be offscreen and killOutBounds won't work
        var xx = game.width-100; 
        // Spritesheet frame   
        var type = game.rnd.integerInRange(0,7);    

        candy.frame=type;
        // Will reset all the properties and set it to pos x + y
        candy.reset(xx,yy);
        // If we set enabled is no longer eligible for the candies.getFirstDead() 
        candy.enabled=true;
        candy.body.velocity.x = -200;
       
    },

    wrongWay: function () {
    	document.getElementById("wrongWay").style.display = "block";
    },

    rightWay: function () {
    	document.getElementById("wrongWay").style.display = "none";
    },

    flap: function () {
        // This will counter the gravity
        this.dragon.body.velocity.y =-350;
    },

    onEat: function (dragon, candy) {
        if (this.think.frame == candy.frame) {
            // Remove candy from stage
            candy.kill();
            this.resetThink();
            score++;
            this.scoreText.text=score;
        } else {
            candy.kill();
            game.state.start("StateOver");
        }
    },

    resetThink: function () {
        var thinking = game.rnd.integerInRange(0,7);
        this.think.frame = thinking;
    },

    update: function () {
        // If collision occurs between dragon and candy do callback
        game.physics.arcade.collide(this.dragon, this.candies, null, this.onEat, this);

        // Get thought bubble to follow dragon
        this.balloonGroup.y = this.dragon.y-60;

        // Alternative way of checking whether mouse down has occured
        if (game.input.activePointer.isDown){
            this.flap();
        }
        // Ensure dragon doesn't go too hight
        if (this.dragon.y < this.top) {
            this.dragon.y=this.top;
            this.dragon.body.velocity.y = 0;
        }
        // Ensure dragon doesn't go too low
        if (this.dragon.y > this.bottom){
            this.dragon.y=this.bottom;
            this.dragon.body.gravity.y=0;
        } else {
            this.dragon.body.gravity.y=500;
        }
    }
    
}