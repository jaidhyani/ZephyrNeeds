// Zephyr's Game Configuration
// Hi Zephyr! You can change these numbers to make the game easier or harder!

// How much needs decrease each turn (higher = gets hungry/thirsty faster)
const HUNGER_DECREASE = 5;    // How fast Zephyr gets hungry (1-10)
const THIRST_DECREASE = 8;    // How fast Zephyr gets thirsty (1-10)
const HEALTH_DECREASE = 2;    // How fast health goes down when hungry/thirsty (1-5)
const HYGIENE_DECREASE = 3;   // How fast Zephyr gets dirty (1-8)
const FUN_DECREASE = 4;       // How fast Zephyr gets bored (1-8)
const EDUCATION_DECREASE = 2; // How fast Zephyr forgets things (1-5)

// How much each action helps (higher = more helpful)
const FOOD_HELPS = 25;        // How much food fills hunger (10-50)
const WATER_HELPS = 30;       // How much water helps thirst (10-50)
const MEDICINE_HELPS = 20;    // How much medicine helps health (10-40)
const REST_HELPS = 15;        // How much rest helps health (10-25)
const BATH_HELPS = 30;        // How much a bath helps hygiene (15-50)
const PLAY_HELPS = 25;        // How much playing helps fun (15-40)
const LEARN_HELPS = 20;       // How much learning helps education (10-35)

// Random slip event settings
const SLIP_CHANCE = 15;       // Chance Zephyr slips each turn (0-30, where 15 = 15%)
const SLIP_DAMAGE = 10;       // How much health Zephyr loses when slipping (5-20)

// Special settings
const STARTING_HUNGER = 50;   // How hungry Zephyr starts (0-100)
const STARTING_THIRST = 50;   // How thirsty Zephyr starts (0-100)
const STARTING_HEALTH = 100;  // How healthy Zephyr starts (50-100)

// Apply these settings to the game
// (Don't change this part - it connects your settings to the game)
if (typeof gameSettings !== 'undefined') {
    gameSettings.hungerDecayRate = HUNGER_DECREASE;
    gameSettings.thirstDecayRate = THIRST_DECREASE;
    gameSettings.healthDecayRate = HEALTH_DECREASE;
    gameSettings.hygieneDecayRate = HYGIENE_DECREASE;
    gameSettings.funDecayRate = FUN_DECREASE;
    gameSettings.educationDecayRate = EDUCATION_DECREASE;
    gameSettings.feedAmount = FOOD_HELPS;
    gameSettings.waterAmount = WATER_HELPS;
    gameSettings.medicineAmount = MEDICINE_HELPS;
    gameSettings.restAmount = REST_HELPS;
    gameSettings.bathAmount = BATH_HELPS;
    gameSettings.playAmount = PLAY_HELPS;
    gameSettings.learnAmount = LEARN_HELPS;
    gameSettings.slipChance = SLIP_CHANCE / 100;
    gameSettings.slipDamage = SLIP_DAMAGE;
}

if (typeof gameState !== 'undefined') {
    gameState.hunger = STARTING_HUNGER;
    gameState.thirst = STARTING_THIRST;
    gameState.health = STARTING_HEALTH;
}