// I'm sending astronauts to Saturn's moon Titan.

// Fuel:

console.log("Fuel: ");

let liquidFuel = 7500;              // lbs
let solidFuel = 5000;                // lbs
let fuelUsageL = liquidFuel * 75;   // 1 lb of liquid fuel = 75 miles travelled
let fuelUsageS = solidFuel * 100;    // 1 lb of solid fuel = 100 miles travelled  
let totalUsage = fuelUsageL + fuelUsageS;   // Combined range

// Sorts the different types of fuel by least to greatest when displayed on the console.
if (liquidFuel > solidFuel) {
    console.log("There is " + liquidFuel + " lbs of liquid fuel");
    console.log("There is " + fuelUsageL + " miles of liquid fuel range");
    console.log("There is " + solidFuel + " lbs of solid fuel");
    console.log("There is " + fuelUsageS + " miles of solid fuel range");
    console.log("There is " + totalUsage + " miles of combined range");
}

else {
    console.log("There is " + solidFuel + " lbs of solid fuel");
    console.log("There is " + fuelUsageS + " miles of solid fuel range");
    console.log("There is " + liquidFuel + " lbs of liquid fuel");
    console.log("There is " + fuelUsageL + " miles of liquid fuel range");
    console.log("There is " + totalUsage + " miles of combined range");
}


const titanDistance = 1000000;  // miles

// Calculates if the amount of fuel within the spacecraft is sufficient to reach Titan
if (totalUsage == titanDistance) {
    console.log("There is JUST ENOUGH fuel to arrive at Titan.");
}

else if (totalUsage < titanDistance) {
    console.log("You need more fuel to arrive at Titan.");
}

else if (totalUsage > titanDistance) {
    console.log("There is a sufficient amount of fuel to safely arrive at Titan.");
}

// Makes putting enough fuel in the spaceship is a PRIORITY before continuing 
if (totalUsage >= titanDistance) {
    console.log("Crew: ");

    let totalCrew = 3;
    let totalOxygen = 1000000;   // liters
    const oxygenUsage = 11000;     // liters per day consumed by one human
    let oxygenPerDay = oxygenUsage * totalCrew;   // how many oxygen is used up in one day.

    console.log("You have " + totalCrew + " crew members.");
    console.log("You have " + totalOxygen + " liters of oxygen on-board");

    const travelTime = 30;   // days to reach Titan from Earth (this is the future ok???)
    let daysOxygen = totalOxygen / oxygenPerDay;    // days the oxygen will last for on board

    console.log("You have " + daysOxygen + " days of oxygen on-board.");

    if (daysOxygen < travelTime) {
        console.log("You don't have enough oxygen to support the crew! Either add more oxygen or remove crew members.");
    }

    else if (daysOxygen >= travelTime) {
        console.log("You have enough oxygen to support the crew!");
    }

    // Makes putting enough oxygen in the spaceship a PRIORITY before continuing
    if (daysOxygen >= travelTime) {
        console.log("Food: ");

        let Food = 90;  // Servings of healthy food per person (One Meal)
        let foodSpoiled = false;    // Is the food spoiled?
        let foodTotal = Food / totalCrew;   // How many days of food on-board
        
        console.log("You have " + Food + " servings of food on-board");
        console.log("You have " + foodTotal + " days of food on-board");

        // If there is too many days worth of food on-board, some of it will go bad.
        if (foodTotal > 40) {
            foodSpoiled++;
        }

        // Is there enough food to support everyone on the trip, and is it good-to-eat?

        if (foodTotal < travelTime) {
            console.log("You need more food to support your crew! Either add more food or remove crew members.");
        }

        else if (foodTotal >= travelTime && foodSpoiled == true) {
            console.log("You have too much food, some of it will go bad! Remove some of the food on the ship.");
        }

        else if (foodTotal >= travelTime && foodSpoiled != true) {
            console.log("You have enough food to support the crew!");

            const shipReady = true; // When all the numbers work, the launch is able to begin! 
            console.log("The launch should go well with these parameters!");
        }



    }

}

if (shipReady == true) {

    let shipDamage = 0  // percent damaged
}