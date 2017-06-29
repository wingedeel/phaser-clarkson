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
        game.load.spritesheet("soundButtons", "images/ui/soundButtons.png", 44, 44, 4); 
        game.load.audio("burp", "sounds/burp.mp3");
        game.load.audio("gulp", "sounds/gulp.mp3");
        game.load.audio("backgroundMusic", "sounds/background.mp3");
    },
    
    create:function()
    {
        score=0;
        this.musicPlaying = false;
        this.lift=350;
        this.fall=500;
        this.delay=2;

        // Start the Physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor="#000000";


        this.top = 0;
        this.bottom = game.height-120;

        // SOUNDS
        this.burp = game.add.audio("burp");
        this.gulp = game.add.audio("gulp");
        this.backgroundMusic = game.add.audio("backgroundMusic");
        this.backgroundMusic.volume = 0.5;
        this.backgroundMusic.loop = true;

        // DRAGON
        this.dragon = game.add.sprite(0, 0, "dragon");
        this.dragon.animations.add('fly', [0, 1, 2, 3], 12, true);
        this.dragon.animations.play('fly');

        // BACKGROUND
        this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');

        // IPAD FIX 
        if (screen.height > 764) {
            // ipad height is 755
            // centers y pos. Will look like a wide screen film
            this.background.y = game.world.centerY-this.background.height/2;
            this.top = this.background.y;
            this.bottom = this.background.y+360;
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
        this.dragon.body.gravity.y = this.fall;
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

        

        // TEXT
       this.scoreText = game.add.text(game.world.centerX, this.top+60, "0");
       this.scoreText.fill = "#000000";
       this.scoreText.fontSize =  64;
       this.scoreText.anchor.set(0.5, 0.5);

       this.scoreLabel = game.add.text(game.world.centerX, this.top+20, "Score");
       this.scoreLabel.fill = "#000000";
       this.scoreLabel.fontSize =  32;
       this.scoreLabel.anchor.set(0.5, 0.5);

       // SOUND BUTTONS
       this.btnMusic = game.add.sprite(20, 20, "soundButtons");
       this.btnSound = game.add.sprite(70, 20, "soundButtons");
       this.btnMusic.frame=2;
       this.btnSound.frame=0;

         
        this.setListeners();
        this.resetThink();  // Choose a different thought every time game starts up
        this.updateButtons();
        this.updateMusic();

    },
    
    setListeners: function () {
    	if (screen.width<1000) {
    		game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
    		game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    	}
        // Fire this function every second
        game.time.events.loop(Phaser.Timer.SECOND*this.delay, this.fireCandy, this);

        // Sound buttons
        this.btnSound.inputEnabled=true;
        this.btnSound.events.onInputDown.add(this.toggleSound, this);

        this.btnMusic.inputEnabled=true;
        this.btnMusic.events.onInputDown.add(this.toggleMusic, this);
        
    },

    fireCandy: function () {
      
        // Get the first available candy that is not onscreen/not active
        var candy = this.candies.getFirstDead();
        // -60 to allow for ground
        var yy = game.rnd.integerInRange(this.top, this.bottom); 
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
        this.dragon.body.velocity.y =-this.lift;
    },

    onEat: function (dragon, candy) {
        if (this.think.frame == candy.frame) {
            // Remove candy from stage
            //score = score + 5;
            candy.kill();
            this.resetThink();
            score++;
            if (soundOn == true) {
                this.gulp.play();
            }
        } else {
            //score++;
             this.backgroundMusic.stop();
            if (soundOn == true) {
                this.burp.play();
            }
            candy.kill();

            game.state.start("StateOver");
        }
        
        this.scoreText.text=score;
    },

    resetThink: function () {
        var thinking = game.rnd.integerInRange(0,7);
        this.think.frame = thinking;
    },
    toggleSound: function(){
        soundOn = !soundOn;
        this.updateButtons();
    }, 
    toggleMusic: function(){
        musicOn = !musicOn;
        this.updateButtons();
        this.updateMusic();
    }, 

    updateMusic: function(){
        if (musicOn==true){
            if (this.musicPlaying==false){
                this.musicPlaying=true;
                this.backgroundMusic.play();
            }
        } else {
            this.musicPlaying=false;
            this.backgroundMusic.stop();
        }
    },
    updateButtons: function () {
        if (soundOn == true) {
            this.btnSound.frame=0;
        } else {
            this.btnSound.frame=1;
        }
        if (musicOn == true) {
            this.btnMusic.frame=2;
        } else {
            this.btnMusic.frame=3;
        }
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