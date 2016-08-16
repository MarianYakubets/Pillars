BasicGame.Game = function(game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //	a reference to the currently running game
    this.add; //	used to add sprites, text, groups, etc
    this.camera; //	a reference to the game camera
    this.cache; //	the game cache
    this.input; //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load; //	for preloading assets
    this.math; //	lots of useful common math operations
    this.sound; //	the sound manager - add a sound, play one, set-up markers, etc
    this.stage; //	the game stage
    this.time; //	the clock
    this.tweens; //	the tween manager
    this.world; //	the game world
    this.particles; //	the particle manager
    this.physics; //	the physics manager
    this.rnd; //	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {



    create: function() {
        var hexagonWidth = 120;
        var hexagonHeight = 140;
        var gridSizeX = 15;
        var gridSizeY = 7;
        var columns = [Math.ceil(gridSizeX / 2), Math.floor(gridSizeX / 2)];
        var moveIndex;
        var sectorWidth = hexagonWidth;
        var sectorHeight = hexagonHeight / 4 * 3;
        var gradient = (hexagonHeight / 4) / (hexagonWidth / 2);
        var marker;
        var hexagonGroup;

        hexagonGroup = this.game.add.group();
        hexagonGroup.inputEnabled = true;
        this.game.stage.backgroundColor = "#ffffff"
        for (var i = 0; i < gridSizeY / 2; i++) {
            for (var j = 0; j < gridSizeX; j++) {
                if (gridSizeY % 2 == 0 || i + 1 < gridSizeY / 2 || j % 2 == 0) {
                    var hexagonX = hexagonWidth * j / 2;
                    var hexagonY = hexagonHeight * i * 1.5 + (hexagonHeight / 4 * 3) * (j % 2);
                    var hexagon = this.game.add.sprite(hexagonX, hexagonY, "hex1");
                    hexagon.inputEnabled = true;
                    hexagon.events.onInputDown.add(this.animate(hexagon), this);

                    hexagonGroup.add(hexagon);
                }
            }
        }


    },

    animate: function(tileObj) {
        var tile = tileObj;
        var game = this.game;
        return function() {
            game.add.tween(tile.scale).to({
                x: -1,
                y: 1
            }, 1000, Phaser.Easing.None, true);
        }
    },

    update: function() {

        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function(pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};