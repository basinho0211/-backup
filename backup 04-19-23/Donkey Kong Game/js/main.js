// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  // player speed
  this.playerSpeed = 200;
  this.jumpSpeed = -345;

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
    this.anims.create({
      key:'burning',
      frames: this.anims.generateFrameNames('fires', {
        frames:[0, 1]
      }),
      
      // animation speed
      frameRate: 5,
  
      repeat: -1
  
    });

  // player animation
  this.anims.create({
    key: 'walking',
    frames: this.anims.generateFrameNames('player', {
      frames: [0, 1, 2]
    }),
    frameRate: 12,
    yoyo: true,
    repeat: -1
  });

  //call levelData function
  this.setupLevel();



  // enable cursor keys
  this.cursors = this.input.keyboard.createCursorKeys();
 
  // collision detection
  this.physics.add.collider(this.player, this.platforms);
  this.physics.add.collider(this.goal,this.platforms);

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
  this.platforms=this.add.group();

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
  this.fires=this.add.group();
  for(i=0;i<this.levelData.fires.length;i++){
    let cur=this.levelData.fires[i];
    let newObj = this.add.sprite(cur.x,cur.y, 'fires').setOrigin(0);
    
    //enable physics for fire
    this.physics.add.existing(newObj);
    newObj.body.allowGravity = false;
    newObj.body.immovable = true;

    // play fire animation

    newObj.anims.play('burning');

    // add fires to their group
    this.fires.add(newObj);

  };

  // adding player
  this.player = this.add.sprite(this.levelData.player.x,this.levelData.player.y, 'player', 3);
  this.physics.add.existing(this.player);

  // adding goal
  this.goal = this.add.sprite(this.levelData.goal.x,this.levelData.goal.y,'goal');
  this.physics.add.existing(this.goal);
};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'The man with a mustache, blue shirt, suspenders, red pants, and black boots is immortal. His cells autoregenerate with a 100% success rate and with a 10^-109 chance of mutation. He does not require food or water as he derives his energy from the slow release of gravitational radiation being given off by the thousands of trillions of stars in the universe. He uses 10^1000 percent less energy than the average bacteria due to his cells going into a near energyless state whenever the man stands still, which he will do for 99.999999999% of his existance. The man was created by the random and perfect alignment of molecules and atoms in a random point in space (similar to a boltzmann brain). This occured 11.78 billion years ago, and the man has only moved for 2 Earth years of his existance, even a human toddler has moved more than he has in his entire billion years of pointless "living," the rest were spent standing still, storing the gravitational radiation in his cellular medium. YOU were choosen to move him for the first time in over 311 million years. He has stored enough energy to move around for nearly half an hour, so I hope you enjoy this once in a human lifetime experience.',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 700},
      debug: true
    }
  }
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
