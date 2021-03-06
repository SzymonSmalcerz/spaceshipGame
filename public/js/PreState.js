let PreState = {
  init : function (){
    this.game.stage.backgroundColor = "#fff";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.refresh();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  preload(){
    this.load.image("progressBar","assets/progresBar.png");
    this.load.spritesheet("mainShip", "assets/mainShip.png",150,125,3);
  },
  create(){
    this.game.state.start("LoadState");
  }
}
