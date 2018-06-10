


let EnemyBullet = function(game,x,y, key = "bullet"){
  Phaser.Sprite.call(this,game,x,y,key);
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.game.physics.arcade.enable(this);
  this.body.velocity.y = 200;
};


EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
EnemyBullet.prototype.constructor = EnemyBullet;
