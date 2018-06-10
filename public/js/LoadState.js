let LoadState = {

  preload : function(){
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY,"mainShip",0);
    this.logo.anchor.setTo(0.5);

    this.progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, "progressBar");
    this.progressBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.progressBar);


    this.load.image("background", "assets/background.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("enemyParticle", "assets/bullet.png");

    this.load.image("spaceShallow","assets/spaceShallow.png");
    this.load.image("spaceDeep","assets/spaceDeep.png");
    this.load.image("spaceDeepest","assets/spaceDeepest.png");

    this.load.spritesheet("ship1", "assets/ship1.png",128,125,3);
    this.load.spritesheet("ship2", "assets/ship2.png",200,125,3);
    this.load.spritesheet("ship3", "assets/ship3.png",145,125,3);
    this.load.spritesheet("ship4", "assets/ship4.png",156,125,3);

    this.load.text("level_01Data","data/level_01.json")
  },
  create(){
    this.game.state.start("HomeState");
  }
}
