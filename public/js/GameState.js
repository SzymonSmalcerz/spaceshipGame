
let GameState = {
  create : function(){

    this.levelData = JSON.parse(this.game.cache.getText("level_01Data"));

    this.createBackground();
    this.createPlayer();
    this.initPlayerBullets();
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  update : function(){

    this.handlePlayerMovement();


  },
  handlePlayerMovement(){
    if(this.cursors.left.isDown || (this.game.input.activePointer.isDown && this.game.input.activePointer.position.x < 180)){
      this.player.body.velocity.x = -this.levelData.playerData.speed;
    } else if(this.cursors.right.isDown || this.game.input.activePointer.isDown){
      this.player.body.velocity.x = this.levelData.playerData.speed;
    } else {
      this.player.body.velocity.x = 0;
    }
  },
  createBackground(){
    this.spaceBackground = {};
    this.spaceBackground.deepest = this.add.tileSprite(0,0,this.game.world.width,this.game.world.height,"spaceDeepest")
    this.spaceBackground.deepest.alpha = 0.5;
    this.spaceBackground.deep = this.add.tileSprite(0,0,this.game.world.width,this.game.world.height,"spaceDeep")
    this.spaceBackground.deep.autoScroll(0,5);
    this.spaceBackground.deep.alpha = 0.3;
    this.spaceBackground.shallow = this.add.tileSprite(0,0,this.game.world.width,this.game.world.height,"spaceShallow")
    this.spaceBackground.shallow.autoScroll(0,15);
    this.spaceBackground.shallow.alpha = 0.3;
  },
  createPlayer(){
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 100, "mainShip");
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
  },
  initPlayerBullets(){
    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
    this.playerShootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/4,this.createPlayerBullet,this);
  },
  createPlayerBullet(){
    let bullet = this.playerBullets.getFirstExists(false);
    if(!bullet){
      bullet = new PlayerBullet(this.game,this.player.x,this.player.top);
      this.playerBullets.add(bullet);
      console.log(bullet);
      // bullet = this.playerBullets.create(this.player.position.x, this.player.position.y - 45,"bullet" ,0);
      // bullet.anchor.setTo(0.5);
    } else {
      bullet.reset(this.player.position.x, this.player.position.y - 30);
    }
    // console.log(bullet);
    // console.log(bullet.body);
    bullet.body.velocity.y = this.levelData.bulletsData.speed;
  }
};
