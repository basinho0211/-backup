// Astronauts from Project 1 have made it to Titan after months of flying

// Player Crew Member Object

let player={
    hp: 40,
    stamina: 100,
    items: {
        // Health Potion
        hpJuice: 3 ,
        // Weapon 0: Rock; Weapon 1: Longsword; Weapon 2: Minigun; Weapon 3: Nuclear Bomb; Weapon 4: Fists
        coffee: 2,
        weapon: 2
    },

};

// View player stats

console.log(player);

// Weapon Array

let weapon=[
    'a rock',
    'a longsword',
    'a minigun',
    'a nuclear bomb',
    'nothing but your fists'
];

// Grabs the weapon choosen earlier and compiles it into a single variable to make loops and functions easier.

let weaponChoice = weapon[player.items.weapon];

console.log('You stepped outside your pod, not expecting to see a moon full of life. You brought ' + weaponChoice + ' and walked away from your pod.');

console.log('As you walked, you heard something walk up behind you. You turn around and see a spider the size of a bear!!!');

// Mega Spider Object

let megaSpider={
    hp: 100,
    armour: 5, // This will matter later in the functions.
    //Weapon 0: Claws; Weapon 1: Laser Eyes; Weapon 2: None (Mainly for debugging)
    weapon: 0,
    items: {
        bioheal: 1 // Heals spider
    }
};

// View spider's stats

console.log(megaSpider);

// Mega Spider Weapon Array

let spiderWeapon=[
    'claws',
    'laser eyes',
    'absolutely NO means of hurting you'
];

// Grabs the weapon choosen earlier and compiles it into a single variable to make loops and functions easier.

let spiderChoice = spiderWeapon[megaSpider.weapon];

console.log('The spider has ' + spiderChoice + ', so be careful.');

// Player Attack Function

function playerAttack() {

    // Damages spider's armour before dealing hp damage.
    if (megaSpider.armour > 1) {
        megaSpider.armour -= 2;
        player.stamina -= 5;
        console.log('You were only able to damage its armour')
        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Spider Armour: ' + megaSpider.armour);
        console.log('---')
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
        return;
    }

    // Fighting with rock
    if (player.items.weapon == 0) {
        megaSpider.hp -= 10;
        player.stamina -= 20;

        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
    }
    // Fighting with longsword
    else if (player.items.weapon == 1) {
        megaSpider.hp -= 30;
        player.stamina -= 20;
        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
    }
    // Fighting with minigun
    else if (player.items.weapon == 2) {
        megaSpider.hp -= 50;
        player.stamina -= 5;
        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
    }
    // Fighting with nuke
    else if (player.items.weapon == 3) {
        megaSpider.hp -= 100;
        player.stamina -= 0;
        player.hp -= 100;
        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
    }
    // Fighting with fists
    else if (player.items.weapon == 4) {
        megaSpider.hp -= 5;
        player.stamina -= 10;
        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
    }

    return;
};

// Spider Attack Function

function spiderAttack() {

    //Attack with claws
    if (megaSpider.weapon == 0) {
        player.hp -= 30;

        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
    };
    //Attack with laser eyes
    if (megaSpider.weapon == 1) {
        player.hp -= 60;

        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
    };
    //Attack with nothing (sad)
    if (megaSpider.weapon == 2) {
        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
    };

    return;

};

// Keeps stamina and items in balance
    function checkFighters() {

    if (megaSpider.armour <= 0) {
        megaSpider.armour = 0;
    }

    // If you have no stamina
    if (player.stamina <= 0) {
        player.hp = 0;
        console.log('Spider HP: ' + megaSpider.hp);
        console.log('Player HP: ' + player.hp);
        console.log('Player Stamina: ' + player.stamina);
        console.error('You fall to the ground, trying to catch your breath. The spider takes advantage and eats you!');
        
    }

    // Drink Health Juice if health below variable. Will drink multiple if low enough (Loop)
    while (player.hp <= 50 && player.items.hpJuice >= 1) {
        player.items.hpJuice--;
        player.hp += 30;
        console.log('You drink an HP Juice! and regain some health');
        console.log('HP Juice! Remaining: ' + player.items.hpJuice);
        console.log('Player HP: ' + player.hp);
    };

    // Drink Coffee if stamina below variable. Will drink multiple if low enough (Loop)
    while (player.stamina <= 20 && player.items.coffee >= 1) {
        player.items.coffee--;
        player.stamina += 50;
        console.log('You drink a coffee and regain some stamina');
        console.log('Coffee Remaining: ' + player.items.coffee);
        console.log('Player Stamina: ' + player.stamina);
    };

    // Spider uses health pack if health below variable. Will use multiple if low enough (Loop)
    while (megaSpider.hp <= 30 && megaSpider.items.bioheal >= 1) {
        megaSpider.items.bioheal--;
        megaSpider.hp += 20;
        console.warn('The spider heals itself using biohealing packs');
        console.log('Biohealing Packs Remaining: ' + megaSpider.items.bioheal);
        console.log('Spider HP: ' + megaSpider.hp);
    } 



};

console.log('Begin the fight! Lets see who wins!');

// Loops battle until it lasts too long (prevents infinite loop if both fighters can't damage! Learned that the hard way.)
let battleTime = 10;

while (battleTime >= 0 && player.hp >= 0 && player.stamina > 0 && megaSpider.hp >= 0) {
    console.warn('You attack using ' + weaponChoice + '!');
    playerAttack();
    

    console.log('---');
    checkFighters();

    console.warn('The spider attacks using ' + spiderChoice + '!');
    spiderAttack();
    

    console.log('---');
    checkFighters();

    battleTime--;

};

if (player.hp <= 0) {
    console.error('You were overpowered by the spider and eaten!');
};

if (megaSpider.hp <= 0) {
    console.log('You beat the spider and were able to return safely to Earth, never to return to that wreched moon ever again.');
};

//debugging

// playerAttack();

// spiderAttack();