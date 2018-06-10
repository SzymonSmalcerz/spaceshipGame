


let Enemy = function(game,x,y,enemyBullets = [],key = "ship1",health = 10){
  Phaser.Sprite.call(this,game,x,y,key);
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.game = game;

  this.animations.add("getHit",[0,1,2,1,0],25,false);
  this.health = health;
  this.enemyBullets = enemyBullets;

  this.game.physics.arcade.enable(this);
  this.body.velocity.x = 100;
  this.body.velocity.y = 35;

  this.timer = this.game.time.create(false);
  this.timer.start();
};



Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.reset = function(x,y,health,key,scale,speedX, speedY){
  Phaser.Sprite.prototype.reset.call(this,x,y,health);

  this.setTexture(key);
  this.scale.setTo(scale);
  this.body.velocity.x = speedX;
  this.body.velocity.y = speedY;

  this.timer.resume();
};


Enemy.prototype.shootBullet = function() {

  if(!this.alive){
    this.timer.pause();
  };
  
  let bullet = this.enemyBullets.getFirstExists(false);
  if(!bullet){
    bullet = new EnemyBullet(this.game,this.x,this.bottom);
    this.enemyBullets.add(bullet);
  } else {
    bullet.reset(this.x, this.bottom);
  };
  bullet.body.velocity.y = 150;
  this.timer.add(Phaser.Timer.SECOND * 2, this.shootBullet, this);
};

Enemy.prototype.update = function(){
  if(this.x < 0.05 * this.game.world.width) {
    this.x = 0.05 * this.game.world.width + 2;
    this.body.velocity.x *= -1;
  } else if (this.x > 0.95 * this.game.world.width) {
    this.x = 0.95 * this.game.world.width - 2;
    this.body.velocity.x *= -1;
  }


  if(this.top > this.game.world.height){
    this.kill();
  };
};

Enemy.prototype.damage = function(amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);
  this.play("getHit");
  if (this.health <= 0) {
    let emitter = this.game.add.emitter(this.x, this.y, 100);
    emitter.makeParticles("enemyParticle");
    emitter.minParticleSpeed.setTo(-200,-200);
    emitter.maxParticleSpeed.setTo(200,200);
    emitter.gravity = 0;
    emitter.start(true,500,null,100);
    this.kill();
  }
};
