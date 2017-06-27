var StateMain={    
    
   preload:function()
    {
       if (screen.width<1000) {
    		game.scale.forceOrientation(true, false)
    	}

        game.load.spritesheet('dragon', "images/main/dragon.png", 120, 85, 4);
        game.load.image("background", "images/main/background.png")
    },
    
    create:function()
    {
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

        // Enable physics on the dragon
        game.physics.enable(this.dragon, Phaser.Physics.ARCADE);
        this.dragon.body.gravity.y = 500;

        this.background.autoScroll(-100,0);

        this.setListeners();
    },
    
    setListeners: function () {
    	if (screen.width<1000) {
    		game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
    		game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    	}
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

    update: function () {
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