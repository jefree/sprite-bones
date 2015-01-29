var game = new Phaser.Game(600, 400, Phaser.AUTO, 'example');

var Example = function(game) {}

Example.prototype = {

  preload: function() {
    //active the plugin
    this.game.plugins.add(Phaser.Plugin.SpriteBones);

    //load assets
    this.game.load.image('head', 'example/assets/head.png');
    this.game.load.image('head_shadows', 'example/assets/head_shadows.png');
  },

  create: function() {

    this.shadows = false;
    this.sprite = game.add.sprite(250, 150, 'head');

    this.game.spritebones._asBitmapData(this.sprite);

    this.game.input.onDown.add(function() {

      if (!this.shadows) {
        this.game.spritebones._applyMultiplyBlending(this.sprite, this.game.cache.getImage('head_shadows'));
      }
      else {
        this.game.spritebones._asBitmapData(this.sprite, 'head');
      }

      this.shadows = !this.shadows;

    }, this);

  },

  update: function() {
    
  },

  render: function() {

  }
}

game.state.add('Example', Example);
game.state.start('Example');
