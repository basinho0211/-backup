//functions
let score=17;   //global variable
function hourToMin(hours){
    let result = hours*60;  //local variable
    return result;
}
let a = hourToMin(38);
console.log(a);

function daysToHours(days){
    return days*24;

}
let day = daysToHours(16);
console.log(day);

//checking an item
let balance = 100;
let stock = 50;
let price = 5;
//function decleration
function sellItem(quantity) {
    if (stock>=quantity) {
    stock-=quantity;
    // stock = stock - quanity
    balance+=price*quantity;
    // balance = (balance + price) * quantity
    console.log("Purchase completed " + "$" + balance + " " + stock + " items")
    }

    else{
        console.log("NO SALE!!!!!! TRY AGAIN LOSER!!! HAHA!")
    }
}
//calling a function
sellItem(10);

//objects

// let player={
//     age: 69,
//     hp: 999999999999999,
//     nrg: 'many',
//     size: 'XXXL',
//     outfit: {
//         color: 'black',
//         fabric: 'cotton',
//         type: 'armor',

//     }
// };

// console.log(player);

// //access parts of an object

// console.log(player.age,player.size);
// console.log(player['hp']);

// //modify parts of an object

// player.age=420;
// console.log(player.age);

// player.outfit.color='OOOOOOrange';
// console.log(player.outfit.color)

// // add items to our object

// player.name='Agent 47';

// console.log(player);

// // delete parts of an object

// delete player.outfit;
// console.log(player);

//methods

let player={
    health: 85,
    fun: 0,
    eat: function(food){
        if(food=='apple'){
            this.health+=10;
        }
        else if(food=='candy'){
            this.health+=5;
            this.fun+=5;
        }
        else if(food=='hippo'){
            this.health-=100;
            this.fun+=95;
        }
    }
};

//call method

player.eat('apple');
console.log(player);

player.eat('candy');
console.log(player);

player.eat('hippo');
console.log(player);

let hippo={
    hippoAttack:function(player){
        hippoMurder=true;
        if(hippoMurder==true) {
            delete player;
            console.log("player is dead get better scrub");
        }
        else{
            console.log("you lived. good job");
        }

    }
}

hippo.hippoAttack(player);

//while loops
function sendHelp(){
    console.log('help me right now.')

}
let i=20;
while(i>0){
    sendHelp();
    i--;
    // i=i-1
    // i-=1
}

for(let a=10;a>0;a--){
    console.log('haha')
    sendHelp();
}

//practice

let me={
    health: 100,
    armor: 0,
    hungry: false,
    items:{
        potions: 3,
        food: 1,
        bombs: -1
    }
};

console.log(me);

function attackMonster(monsterHP){
    monsterHP=100;
    if (me.health > 25 && me.items.bombs >= 1) {
        me.health-=10;
        me.items.bombs--;
        monsterHP-=50;
        console.log(me.health)
        console.log(monsterHP)
    }
    else if (me.health > 25 && me.items.bombs == 0) {
        me.health-=10;
        monsterHP-=20;
        console.log(me.health)
        console.log(monsterHP)
    }
    else if (me.health <= 25 && me.items.bombs >= 1) {
        me.health=0;
        monsterHP=0;
        me.items.bombs--;
        console.log(me.health)
        console.log(monsterHP)
        console.log('you went out with a bang and died. get better loser')
    }
    else if (me.health <= 25 && me.items.bombs == 0) {
        me.health=0;
        console.log(me.health)
        console.log(monsterHP)
        console.log('you died. get better loser')
    }
    else {
        console.log('you broke the game. reported for cheating and/or haxing')
    }
    
};

attackMonster();
console.log(me);

















//NOTES! NOT PART OF MY PROJECT!

//arrays

// let list=[
//     'cheese whiz','tasty','gives me bad stomach aches',
// ]

// console.log(list);

// //changing the information
// list[2]='still pretty good';
// console.log(list);

// //access information

// let cheezy=list[0];
// console.log(cheezy);

// list[1] = 'tastes bad';
// console.log(cheezy);
// console.log(list[1]);

// //access the last piece of our list

// let cheddar=list[list.length-1];
// console.log(cheddar);
// console.log(list.length);

// //add items into a list

// list.push('colby jack');
// console.log(list);

// //delete last item of the list

// list.pop();
// console.log(list);

// //iterating over arrays

// let highScores=[100,95,88];

// //increase all scores by 1

// let h=0;
// while(h<highScores.length){
//     highScores[h]++;
//     h++;
// }

// console.log(highScores);

// let cheeseWhiz=[
//     {
//         title: 'Cheesy',
//         worth: 'Invauble',
//         person: 'Sebastian S. Perkins'

//     },
//     {
//         title: 'Not Cheezy',
//         worth: 'Low',
//         person: 'Sebastian S. Perkins'
//     },
//     {
//         title: 'Slightly Cheezy',
//         worth: 'Middle Range',
//         person: 'Sebastian S. Perkins'
//     }
// ]

// cheeseWhiz.forEach(function(entry){
    
//     if(entry.person=="Sebastian S. Perkins"){
//         entry.person='Everyone';
//     }

//     else{
//         entry.person='Sebastian S. Perkins';

//     }
// })

// console.log(cheeseWhiz)

// //multidimentional arrays

// let fourthDimention=[[4,9,5],[3,8,1],[2,7,6]];

// console.log(fourthDimention);

// console.log(fourthDimention[0][0]);

// let biomes=[
//     ['desert','extreme desert','semi-arid steppe','tundra'],
//     ['tropical rainforest','swamp','semi-arid steppe','ice sheet'],
//     ['temperate forest','boreal forest','tundra','ice sheet']
// ];

// console.log(biomes);

// biomes[1][3]='desert';  
// biomes[0][3]='temperate forest';   //reminder, start at 0!

// console.log(biomes);



// //unrelated
// console.warn('help me');
// console.error('you did not help');

// let te;
// te = 4 % 2;
// console.log(te);