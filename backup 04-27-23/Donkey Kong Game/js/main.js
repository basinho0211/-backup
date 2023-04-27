// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  // player speed
  this.playerSpeed = 200;
  this.jumpSpeed = -425;

  // bounds
  this.physics.world.bounds.width = 360;
  this.physics.world.bounds.height = 700;
};

// load asset files for our game
gameScene.preload = function() {

  // load images
  this.load.image('ground', 'assets/images/ground.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('block', 'assets/images/block.png');
  this.load.image('goal', 'assets/images/gorilla3.png');
  this.load.image('barrel', 'assets/images/barrel.png');

  // load spritesheets
  this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
    frameWidth: 28,
    frameHeight: 30,
    margin: 1,
    spacing: 1
  });

  this.load.spritesheet('fires', 'assets/images/fire_spritesheet.png', {
    frameWidth: 20,
    frameHeight: 21,
    margin: 1,
    spacing: 1
  });

  // load level data
  this.load.json('levelData', 'assets/json/levelData.json');
};

// executed once, after assets were loaded
gameScene.create = function() {
    
    // fire animation
    if(!this.anims.get('burning')){
      this.anims.create({
        key:'burning',
        frames: this.anims.generateFrameNames('fires', {
          frames:[0, 1]
        }),
        
        // animation speed
        frameRate: 5,
    
        repeat: -1
    
      });
    }
    

  // player animation
  if(!this.anims.get('walking')){
    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNames('player', {
        frames: [0, 1, 2]
      }),
      frameRate: 12,
      yoyo: true,
      repeat: -1
    });
  }
  

  //call levelData function
  this.setupLevel();

  // int spawner
  this.setupSpawner();



  // enable cursor keys
  this.cursors = this.input.keyboard.createCursorKeys();
 
  // collision detection
  this.physics.add.collider(this.player, this.platforms);
  this.physics.add.collider(this.goal,this.platforms);
  this.physics.add.collider(this.barrels, this.platforms);
  // create overlap to restart scene (make this seperate later)
  this.physics.add.overlap(this.player, [this.fires, this.goal, this.barrels], this.restartGame, null, this);

  // create game bounds
  this.player.body.setCollideWorldBounds(true);

  //check where we are on the screen
  this.input.on('pointerdown', function(pointer){
    console.log(pointer.x, pointer.y);
  })

};

gameScene.update = function() {
  // make sure player is on ground before jumping
  let onGround = this.player.body.touching.down;
  // movement to the left
    if(this.cursors.left.isDown) {
      this.player.body.setVelocityX(-this.playerSpeed);

      // flips player
      this.player.flipX = false;

      // starts animation
      if(!this.player.anims.isPlaying){
        this.player.anims.play('walking');
      };
    }
  // movement to the right
  else if(this.cursors.right.isDown) {
    this.player.body.setVelocityX(this.playerSpeed);

    // flips player
    this.player.flipX = true;

    // starts animation
    if(!this.player.anims.isPlaying){
      this.player.anims.play('walking');
    };
  }
  // causes player to stop
  else {
    this.player.body.setVelocityX(0);

    // stops animation
    this.player.anims.stop('walking');

    // set idle frame
    if (onGround) {
    this.player.setFrame(3);
    }
  }

  // jumping

  if(onGround && (this.cursors.up.isDown || this.cursors.space.isDown)) {
    // give player jumping velocity (Y-axis)
    this.player.body.setVelocityY(this.jumpSpeed);

    // stop animation
    this.player.anims.stop('walking');

    // set frame
    this.player.setFrame(2);
  }
};

// sets up the level's elements
gameScene.setupLevel=function(){
  this.platforms=this.physics.add.staticGroup();

  //parse the level data
  this.levelData=this.cache.json.get('levelData');

  //add in the platforms and ground
  for(let i=0;i<this.levelData.platforms.length;i++){
    let curr=this.levelData.platforms[i];
    let newObject;
    //create object
    if(curr.numTiles == 1){
      //create a sprite
      newObject = this.add.sprite(curr.x,curr.y,curr.key).setOrigin(0);
    }
    else {
      let width = this.textures.get(curr.key).get(0).width;
      let height = this.textures.get(curr.key).get(0).height;
      newObject = this.add.tileSprite(curr.x,curr.y,curr.numTiles*width,height,curr.key).setOrigin(0);
  };

  // enable physics

  this.physics.add.existing(newObject, true);
  this.platforms.add(newObject);

};

  // Adding Fire
  this.fires=this.physics.add.group({
    allowGravity: false,
    immovable: true
  });
  for(i=0;i<this.levelData.fires.length;i++){
    let cur=this.levelData.fires[i];
    let newObj = this.add.sprite(cur.x,cur.y, 'fires').setOrigin(0);

    // play burning fire animation

    newObj.anims.play('burning');

    // add fires to their group
    this.fires.add(newObj);

  };

  // adding player
  this.player = this.add.sprite(this.levelData.player.x,this.levelData.player.y, 'player', 3);
  this.physics.add.existing(this.player);

  // set up camera bounds
  this.cameras.main.setBounds(0, 0, 360, 700);
  this.cameras.main.startFollow(this.player);

  // adding goal
  this.goal = this.add.sprite(this.levelData.goal.x,this.levelData.goal.y,'goal');
  this.physics.add.existing(this.goal);
};
gameScene.restartGame=function(sourceSprite, targetSprite){
  // fade out camera
  this.cameras.main.fade(500);

  // finish fade out and reload the scene
  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
    this.scene.restart()
  }, this);

};

gameScene.setupSpawner=function(){
  //physics group for barrels
  this.barrels=this.physics.add.group({
    bounceY: 0.1,
    bounceX: 1,
    collideWorldBounds: true


  },);

  // spawn barrels
  let spawnEvent=this.time.addEvent({
    delay: this.levelData.spawner.interval,
    loop: true,
    callbackScope: this,
    callback: function(){
      // create the barrels!
      let barrel = this.barrels.create(this.goal.x, this.goal.y, 'barrel');
      // reactivate used barrels
      barrel.setActive(true);
      barrel.setVisible(true);
      barrel.body.enable = true;
      // set barrel's properties
        // speed
        barrel.setVelocityX(this.levelData.spawner.speed);
        // lifespan
        this.time.addEvent({
          delay: this.levelData.spawner.lifespan,
          repeat: 0,
          callbackScope: this,
          callback: function() {
            this.barrels.killAndHide(barrel);
            barrel.body.enable = false;
          }
        }, this)

    }
  }, this);
};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: '._.',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 700},
      debug: false
    }
  }
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
