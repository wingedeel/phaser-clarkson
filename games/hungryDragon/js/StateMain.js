var StateMain={    
    
   preload:function()
    {
       if (screen.width<1000) {
    		game.scale.forceOrientation(true, false)
    	}
    },
    
    create:function()
    {
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

    update: function () {

    }
    
}