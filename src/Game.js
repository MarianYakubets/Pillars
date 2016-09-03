BasicGame.Game = function(game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, 
    //  even if they already exist:

    this.game; //	a reference to the currently running game
    this.add; //	used to add sprites, text, groups, etc
    this.camera; //	a reference to the game camera
    this.cache; //	the game cache
    this.input; //	the global input manager (you can access this.input.keyboard,
    // this.input.mouse, as well from it)
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
    //	But do consider them as being 'reserved words', i.e. 
    //  don't create a property for your own game called "world" or you'll over-write 
    //  the world reference.
    this.mapWidth = 4;
    this.mapHeight = 4;
    this.hexagonHeight = 140;
    this.hexagonSide = this.hexagonHeight / 2;
    this.startPoint = new Point(100, 100);
    this.layout = new Layout(layout_pointy, new Point(this.hexagonSide, this.hexagonSide), this.startPoint);


    //temp
    this.hex;
};

BasicGame.Game.prototype = {



    create: function() {
        var hexagonGroup = this.game.add.group();

        var map = [];
        for (var r = 0; r < this.mapHeight; r++) {
            var r_offset = Math.floor(r / 2);
            for (var q = -r_offset; q < this.mapWidth - r_offset; q++) {
                map.push(new Hex(q, r, -q - r));
            }
        }

        var style = {
            font: "32px Arial",
            wordWrap: true,
            align: "center",
        };

        map.forEach(function(item, i, arr) {
            var coordinate = hex_to_pixel(this.layout, item);
            var hexagon = this.game.add.sprite(coordinate.x, coordinate.y, "hex2");
            hexagon.inputEnabled = true;
            hexagon.events.onInputDown.add(this.onHexClick(hexagon), this);
            hexagonGroup.add(hexagon);

            var text = this.game.add.text(coordinate.x + this.hexagonSide, coordinate.y + this.hexagonSide, "1", style);
            text.anchor.set(0.5);
        }, this);
    },

    onHexClick: function(obj) {
        var hex = obj;
        var game = this.game;
        return function() {
            if (this.hex == null) {
                this.hex = hex;
            } else {
                var tileOld = pixel_to_hex(this.layout, new Point(this.hex.x, this.hex.y));
                var tileNew = pixel_to_hex(this.layout, new Point(hex.x, hex.y));
                if (Math.abs(hex_distance(tileOld, tileNew)) <= 1) {
                    var tween = game.add.tween(this.hex).to({
                        x: hex.x,
                        y: hex.y
                    }, 1000, Phaser.Easing.None, true);
                    tween.onComplete.add(function() {
                        hex.destroy();
                    }, this);
                }
                this.hex = null;
            }
        }
    },

    update: function() {

        //	Honestly, just about anything could go here. It's YOUR game after all. 
        //  Eat your heart out!

    },

    quitGame: function(pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};