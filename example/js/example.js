var game = new Phaser.Game(600, 400, Phaser.AUTO, 'example');

var Example = function(game) {}

Example.prototype = {

  preload: function() {
    //active the plugin
    game.plugins.add(Phaser.Plugin.SpriteBones);

    //load assets
    game.spritebones.loadAssets('moto', 'example/assets/moto_atlas.json', 'example/assets/moto_texture.png', 'example/assets/moto_skeleton.json')
  },

  create: function() {

    this.moto = game.spritebones.addSprite('moto', 'motorcycleMan', 'Motorcycle', 300, 300);
    this.moto.gotoAndPlay('stay');

    game.input.onDown.add(function(){
      this.moto.stop();
    }, this);
  },

  update: function() {
    
  },

  render: function() {

  }
}

game.state.add('Example', Example);
game.state.start('Example');
