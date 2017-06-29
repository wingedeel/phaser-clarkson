var StateTitle={    
    
   preload:function()
    {
        game.load.spritesheet('buttons', 'images/ui/buttons.png', 265, 75);
        game.load.spritesheet('dragon', "images/main/dragon.png", 120, 85, 4);
    },
    
    create:function()
    {
        // BUTTON START
        this.btnStart = game.add.button(
       		game.world.centerX,
       		game.world.centerY+100,
       		'buttons',
       		this.startGame,
       		this,
       		6,
       		7,
       		6
       	)
       this.btnStart.anchor.set(0.5, 0.5);


       // DRAGON
        this.dragon = game.add.sprite(game.world.centerX, game.world.centerY, "dragon");
        this.dragon.anchor.set(0.5, 0.5); 
        this.dragon.animations.add('fly', [0, 1, 2, 3], 12, true);
        this.dragon.animations.play('fly');

        // GAME BACKGROUND
        game.stage.backgroundColor="#26C9FF";

        // GAME TITLE
        this.titleText = game.add.text(game.world.centerX, 60, "HungryDragon",
          { font: "50px Lobster", 
            fill: "#00D900", 
            stroke:"#222222",
            strokeThickness: 4,
            align: "center"
          } )
        this.titleText.anchor.set(0.5, 0.5);

    },

    startGame: function(){
    	game.state.start("StateInstructions");
    },
    
    update:function()
    {       
        
    }    
    
}