Phaser.Plugin.SpriteBones = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);
  
  dragonBones.game = game;
  game.spritebones = this;
}

Phaser.Plugin.SpriteBones.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.SpriteBones.prototype.constructor = Phaser.Plugin.SpriteBones;

Phaser.Plugin.SpriteBones.prototype.loadAssets = function(key, atlas, image, skeleton) {
  this.game.load.image(key + "_image", image);
  this.game.load.json(key + "_atlas", atlas);
  
  this.game.load.atlas(key, image, atlas);  
  this.game.load.json(key + "_skeleton", skeleton);
}

Phaser.Plugin.SpriteBones.prototype.addSprite = function(key, armatureName, skeletonName, x, y) {
  var skeletonData = this.game.cache.getJSON(key + '_skeleton');
  var atlasData = this.game.cache.getJSON(key + '_atlas');
  var texture = game.cache.getImage(key + "_image");

  var armature = dragonBones.makePhaserArmature(armatureName, skeletonName, null,  skeletonData, atlasData, texture, [], key);
  var bones = armature.getDisplay();

  dragonBones.animation.WorldClock.clock.add(armature);

  this._extendSprite(bones, armature);

  bones.x = x;
  bones.y = y;

  return this.game.world.add(bones);
}

/**
 * Set a new BitmapData as texture for the given sprite, with the current sprite texture 
 * as initial data. Save the bitmap for the future as _bitmap attribute in the sprite.
 */
Phaser.Plugin.SpriteBones.prototype._asBitmapData = function(sprite, texture) {
  
  var bitmap = null;

  if (texture) {
    sprite.loadTexture(texture);
  }

  if (sprite._bitmap) {
    sprite._bitmap.clear().update();
    bitmap = sprite._bitmap;
  }
  else {
    bitmap = this.game.make.bitmapData(sprite.width, sprite.height);
  }

  bitmap.draw(sprite, 0, 0);
  bitmap.update();

  sprite.loadTexture(bitmap);
  sprite._bitmap = bitmap;
}

/**
 * Multiply the bitmapData of the sprite by the given blending (Sprite, Image, Text).
 */
Phaser.Plugin.SpriteBones.prototype._applyMultiplyBlending = function(sprite, blending, x, y) {
  /*
    default values
   */
  x = x || 0;
  y = y || 0;

  var bitmap = sprite._bitmap;
  
  bitmap.blendMultiply();
  bitmap.draw(blending, x, y);
  bitmap.blendReset();
}

Phaser.Plugin.SpriteBones.prototype._extendSprite = function(sprite, armature) {

  sprite._armature = armature;

  sprite.play = function() {
    this._armature.animation.play();
  }

  sprite.stop = function() {
    this._armature.animation.stop();
  }

  sprite.gotoAndPlay = function(animationName, fadeInTime, duration, loop, layer, group, fadeOutMode, displayControl, pauseFadeOut, pauseFadeIn) {
    this._armature.animation.gotoAndPlay(animationName, fadeInTime, duration, loop, layer, group, fadeOutMode, displayControl, pauseFadeOut, pauseFadeIn);
  }

}

Phaser.Plugin.SpriteBones.prototype.update = function() {

  if (this.lastTime) {
    var currentTime = new Date();
    var elapsedTime = (currentTime - this.lastTime)  / 1000.0;

    this.lastTime = currentTime;
    dragonBones.animation.WorldClock.clock.advanceTime(elapsedTime);
  }
  else {
    this.lastTime = new Date();
  }
}
