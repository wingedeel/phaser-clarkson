var StateOver={    
    
   preload:function()
    {
       game.load.spritesheet('buttons', 'images/ui/buttons.png', 265, 75);
    },
    
    create:function()
    {
       
       this.btnPlayAgain = game.add.button(
       		game.world.centerX,
       		game.world.height-150,
       		'buttons',
       		this.playAgain,
       		this,
       		1,
       		0,
       		1
       	)
       this.btnPlayAgain.anchor.set(0.5, 0.5);
    },
    
    playAgain: function () {
    	// Go to Main screen.  All variables will be reset.
    	game.state.start("StateMain");
    },

    update:function()
    {       
        
    }    
    
}