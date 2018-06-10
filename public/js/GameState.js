
let GameState = {
  create : function(){

    this.fetchLevelDataFromFile(); // fetch data from json and load to this.levelData
    this.createBackground(); // create moving background
    this.createPlayer(); // create player
    this.initPlayerBullets(); // create bullets
    this.cursors = this.game.input.keyboard.createCursorKeys(); //input
    this.initEnemies();
    this.initEnemiesBullets();
    let enemy = new Enemy(this.game,100,100,this.enemiesBullets);
    enemy.shootBullet();
    this.enemies.add(enemy);
  },
  update : function(){
    this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemiesBullets, this.player, this.damagePlayer, null, this);
    this.handlePlayerMovement();
  },
  fetchLevelDataFromFile(){
    this.levelData = JSON.parse(this.game.cache.getText("level_01Data"));
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
    } else {
      bullet.reset(this.player.position.x, this.player.position.y - 30);
    };
    bullet.body.velocity.y = this.levelData.bulletsData.speed;
  },
  initEnemies() {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
  },
  damageEnemy(bullet,enemy) {
    enemy.damage(1);
    bullet.kill();
  },initEnemiesBullets(){
    this.enemiesBullets = this.add.group();
  }, damagePlayer() {
    console.log("player is damaged");
  }
};
