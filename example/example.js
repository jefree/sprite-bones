var game = new Phaser.Game(600, 400, Phaser.AUTO, 'example');

var Example = function(game) {}

Example.prototype = {

  preload: function() {
    game.plugins.add(Phaser.Plugin.SpriteBones);
  },

  create: function() {

  },

  update: function() {

  },

  render: function() {

  }
}

game.state.add('Example', Example);
game.state.start('Example');
