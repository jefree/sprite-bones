Phaser.Plugin.SpriteBones = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);
  dragonBones.game = game;
}

Phaser.Plugin.SpriteBones.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.SpriteBones.prototype.constructor = Phaser.Plugin.SpriteBones;

Phaser.Plugin.SpriteBones.prototype.update = function() {
  console.log('SpriteBones running');
}
