var game;
var score;
var highScore;
var soundOn = true;
var musicOn = true;
var wrongTag = "";
var gameButtons
var gameMedia
    //PLACE YOUR OWN GLOBALS HERE
var cursors;
var level = 1;

//portrait or landscape

var useLandscape = true;
//place your globals here


window.onload = function () {
    if (screen.width > 1500) {
        //desktop laptop
        if (useLandscape == true) {
            game = new Phaser.Game(640, 480, Phaser.AUTO, "ph_game");
        } else {

            game = new Phaser.Game(480, 640, Phaser.AUTO, "ph_game");
        }

    } else {
        //mobile device
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
    }
    if (screen.width < 1500) {
        if (useLandscape == true) {
            wrongTag = "wrongWayLandscape";
        } else {
            wrongTag = "wrongWayPortrait";
        }
    }


    gameMedia = new GameMedia();
    gameButtons = new GameButtons();



    //add a state or screen to the game

    game.state.add("StateLoad", StateLoad);
    game.state.add("StateInit", StateInit);
    game.state.add("StateTitle", StateTitle);
    game.state.add("StateOver", StateOver);
    game.state.add("StateMain", StateMain);
    game.state.start("StateInit");
}