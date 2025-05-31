// Game state for Zephyr's needs
let gameState = {
    hunger: 50,
    thirst: 50,
    health: 100,
    hygiene: 100,
    fun: 100,
    education: 100,
    turn: 1,
    maxNeeds: 100,
    gameOver: false,
    unlockedNeeds: ['hunger', 'thirst', 'health']
};

// Game settings that Zephyr can modify
let gameSettings = {
    hungerDecayRate: 5,
    thirstDecayRate: 8,
    healthDecayRate: 2,
    hygieneDecayRate: 3,
    funDecayRate: 4,
    educationDecayRate: 2,
    feedAmount: 25,
    waterAmount: 30,
    medicineAmount: 20,
    restAmount: 15,
    bathAmount: 30,
    playAmount: 25,
    learnAmount: 20,
    slipChance: 0.5,
    slipDamage: 10
};

// Initialize the game
function initGame() {
    updateActionButtons();
    updateDisplay();
    updateMessage("Welcome! Zephyr needs your help to stay healthy and happy!");
}

// Feed Zephyr
function feedZephyr() {
    if (gameState.gameOver) return;
    
    gameState.hunger = Math.min(gameState.maxNeeds, gameState.hunger + gameSettings.feedAmount);
    updateDisplay();
    updateMessage("Yum! Zephyr enjoyed the food and feels less hungry! 🍎");
}

// Give water to Zephyr
function giveWater() {
    if (gameState.gameOver) return;
    
    gameState.thirst = Math.min(gameState.maxNeeds, gameState.thirst + gameSettings.waterAmount);
    updateDisplay();
    updateMessage("Refreshing! Zephyr drank some water and feels much better! 💧");
}

// Give medicine to Zephyr
function giveMedicine() {
    if (gameState.gameOver) return;
    
    gameState.health = Math.min(gameState.maxNeeds, gameState.health + gameSettings.medicineAmount);
    updateDisplay();
    updateMessage("Medicine helped! Zephyr's health is improving! 💊");
}

// Let Zephyr rest
function letRest() {
    if (gameState.gameOver) return;
    
    gameState.health = Math.min(gameState.maxNeeds, gameState.health + gameSettings.restAmount);
    updateDisplay();
    updateMessage("Zzz... Zephyr had a nice rest and recovered health! 😴");
}

// Give Zephyr a bath
function giveBath() {
    if (gameState.gameOver) return;
    
    gameState.hygiene = Math.min(gameState.maxNeeds, gameState.hygiene + gameSettings.bathAmount);
    updateDisplay();
    updateMessage("Splash! Zephyr is all clean and feels fresh! 🛁");
}

// Play with Zephyr
function playWithZephyr() {
    if (gameState.gameOver) return;
    
    gameState.fun = Math.min(gameState.maxNeeds, gameState.fun + gameSettings.playAmount);
    updateDisplay();
    updateMessage("Wheee! Zephyr had so much fun playing! 🎮");
}

// Teach Zephyr something
function teachZephyr() {
    if (gameState.gameOver) return;
    
    gameState.education = Math.min(gameState.maxNeeds, gameState.education + gameSettings.learnAmount);
    updateDisplay();
    updateMessage("Wow! Zephyr learned something new and feels smarter! 📚");
}

// Advance to next turn
function nextTurn() {
    if (gameState.gameOver) return;
    
    // Needs naturally decrease over time
    gameState.hunger = Math.max(0, gameState.hunger - gameSettings.hungerDecayRate);
    gameState.thirst = Math.max(0, gameState.thirst - gameSettings.thirstDecayRate);
    
    // Progressive needs decrease if unlocked
    if (gameState.unlockedNeeds.includes('hygiene')) {
        gameState.hygiene = Math.max(0, gameState.hygiene - gameSettings.hygieneDecayRate);
    }
    if (gameState.unlockedNeeds.includes('fun')) {
        gameState.fun = Math.max(0, gameState.fun - gameSettings.funDecayRate);
    }
    if (gameState.unlockedNeeds.includes('education')) {
        gameState.education = Math.max(0, gameState.education - gameSettings.educationDecayRate);
    }
    
    // Health decreases if any basic needs are too low
    let lowNeeds = 0;
    if (gameState.hunger < 20) lowNeeds++;
    if (gameState.thirst < 20) lowNeeds++;
    if (gameState.unlockedNeeds.includes('hygiene') && gameState.hygiene < 20) lowNeeds++;
    
    if (lowNeeds > 0) {
        gameState.health = Math.max(0, gameState.health - (gameSettings.healthDecayRate * lowNeeds));
    }
    
    // Random chance for "Zephyr slips!" event
    if (Math.random() < gameSettings.slipChance) {
        gameState.health = Math.max(0, gameState.health - gameSettings.slipDamage);
        updateDisplay();
        updateMessage("Oops! Zephyr slipped and got a little hurt! 😵 Health decreased!");
        gameState.turn++;
        updateDisplay();
        checkUnlockableNeeds();
        checkGameState();
        return;
    }
    
    gameState.turn++;
    updateDisplay();
    checkUnlockableNeeds();
    checkGameState();
}

// Check if new needs should be unlocked
function checkUnlockableNeeds() {
    let newUnlock = false;
    
    // Unlock hygiene at turn 5
    if (gameState.turn >= 5 && !gameState.unlockedNeeds.includes('hygiene')) {
        gameState.unlockedNeeds.push('hygiene');
        updateMessage("New need unlocked! Zephyr now needs to stay clean! 🛁");
        newUnlock = true;
    }
    
    // Unlock fun at turn 10
    if (gameState.turn >= 10 && !gameState.unlockedNeeds.includes('fun')) {
        gameState.unlockedNeeds.push('fun');
        updateMessage("New need unlocked! Zephyr wants to have fun! 🎮");
        newUnlock = true;
    }
    
    // Unlock education at turn 15
    if (gameState.turn >= 15 && !gameState.unlockedNeeds.includes('education')) {
        gameState.unlockedNeeds.push('education');
        updateMessage("New need unlocked! Zephyr wants to learn new things! 📚");
        newUnlock = true;
    }
    
    // 20-day milestone message (not win condition)
    if (gameState.turn === 20) {
        updateMessage("Amazing! You've cared for Zephyr for 20 days! Keep going! 🎉");
    }
    
    if (newUnlock) {
        updateActionButtons();
        updateDisplay();
    }
}

// Update the visual display
function updateDisplay() {
    // Update meter fills for basic needs
    document.getElementById('hunger-fill').style.width = gameState.hunger + '%';
    document.getElementById('thirst-fill').style.width = gameState.thirst + '%';
    document.getElementById('health-fill').style.width = gameState.health + '%';
    
    // Update text values for basic needs
    document.getElementById('hunger-text').textContent = gameState.hunger + '/100';
    document.getElementById('thirst-text').textContent = gameState.thirst + '/100';
    document.getElementById('health-text').textContent = gameState.health + '/100';
    
    // Update progressive needs if unlocked
    if (gameState.unlockedNeeds.includes('hygiene')) {
        const hygieneEl = document.getElementById('hygiene-fill');
        const hygieneText = document.getElementById('hygiene-text');
        if (hygieneEl && hygieneText) {
            hygieneEl.style.width = gameState.hygiene + '%';
            hygieneText.textContent = gameState.hygiene + '/100';
        }
    }
    
    if (gameState.unlockedNeeds.includes('fun')) {
        const funEl = document.getElementById('fun-fill');
        const funText = document.getElementById('fun-text');
        if (funEl && funText) {
            funEl.style.width = gameState.fun + '%';
            funText.textContent = gameState.fun + '/100';
        }
    }
    
    if (gameState.unlockedNeeds.includes('education')) {
        const educationEl = document.getElementById('education-fill');
        const educationText = document.getElementById('education-text');
        if (educationEl && educationText) {
            educationEl.style.width = gameState.education + '%';
            educationText.textContent = gameState.education + '/100';
        }
    }
    
    // Update turn counter
    document.getElementById('turn-counter').textContent = gameState.turn;
    
    // Update meter colors based on levels
    updateMeterColors();
}

// Update meter colors based on need levels
function updateMeterColors() {
    const hungerFill = document.getElementById('hunger-fill');
    const thirstFill = document.getElementById('thirst-fill');
    const healthFill = document.getElementById('health-fill');
    
    // Hunger colors
    if (gameState.hunger < 20) {
        hungerFill.className = 'meter-fill danger';
    } else if (gameState.hunger < 50) {
        hungerFill.className = 'meter-fill warning';
    } else {
        hungerFill.className = 'meter-fill good';
    }
    
    // Thirst colors
    if (gameState.thirst < 20) {
        thirstFill.className = 'meter-fill danger';
    } else if (gameState.thirst < 50) {
        thirstFill.className = 'meter-fill warning';
    } else {
        thirstFill.className = 'meter-fill good';
    }
    
    // Health colors
    if (gameState.health < 30) {
        healthFill.className = 'meter-fill danger';
    } else if (gameState.health < 70) {
        healthFill.className = 'meter-fill warning';
    } else {
        healthFill.className = 'meter-fill good';
    }
    
    // Progressive need colors
    if (gameState.unlockedNeeds.includes('hygiene')) {
        const hygieneFill = document.getElementById('hygiene-fill');
        if (hygieneFill) {
            if (gameState.hygiene < 20) {
                hygieneFill.className = 'meter-fill danger';
            } else if (gameState.hygiene < 50) {
                hygieneFill.className = 'meter-fill warning';
            } else {
                hygieneFill.className = 'meter-fill good';
            }
        }
    }
    
    if (gameState.unlockedNeeds.includes('fun')) {
        const funFill = document.getElementById('fun-fill');
        if (funFill) {
            if (gameState.fun < 20) {
                funFill.className = 'meter-fill danger';
            } else if (gameState.fun < 50) {
                funFill.className = 'meter-fill warning';
            } else {
                funFill.className = 'meter-fill good';
            }
        }
    }
    
    if (gameState.unlockedNeeds.includes('education')) {
        const educationFill = document.getElementById('education-fill');
        if (educationFill) {
            if (gameState.education < 20) {
                educationFill.className = 'meter-fill danger';
            } else if (gameState.education < 50) {
                educationFill.className = 'meter-fill warning';
            } else {
                educationFill.className = 'meter-fill good';
            }
        }
    }
}

// Update action buttons visibility
function updateActionButtons() {
    // Show/hide buttons based on unlocked needs
    const bathBtn = document.getElementById('bath-btn');
    const playBtn = document.getElementById('play-btn');
    const learnBtn = document.getElementById('learn-btn');
    
    // Show/hide need meters based on unlocked needs
    const hygieneMeter = document.getElementById('hygiene-meter');
    const funMeter = document.getElementById('fun-meter');
    const educationMeter = document.getElementById('education-meter');
    
    if (bathBtn && hygieneMeter) {
        const show = gameState.unlockedNeeds.includes('hygiene');
        bathBtn.style.display = show ? 'block' : 'none';
        hygieneMeter.style.display = show ? 'flex' : 'none';
    }
    if (playBtn && funMeter) {
        const show = gameState.unlockedNeeds.includes('fun');
        playBtn.style.display = show ? 'block' : 'none';
        funMeter.style.display = show ? 'flex' : 'none';
    }
    if (learnBtn && educationMeter) {
        const show = gameState.unlockedNeeds.includes('education');
        learnBtn.style.display = show ? 'block' : 'none';
        educationMeter.style.display = show ? 'flex' : 'none';
    }
}

// Update game message
function updateMessage(message) {
    document.getElementById('message').textContent = message;
}

// Check game state for win/lose conditions
function checkGameState() {
    if (gameState.health <= 0) {
        gameState.gameOver = true;
        updateMessage("Oh no! Zephyr's health reached zero. Game over! Refresh to try again.");
        disableButtons();
        return;
    }
    
    // Check for urgent needs
    let urgentNeeds = [];
    if (gameState.hunger < 10) urgentNeeds.push("hungry 🍎");
    if (gameState.thirst < 10) urgentNeeds.push("thirsty 💧");
    if (gameState.unlockedNeeds.includes('hygiene') && gameState.hygiene < 10) urgentNeeds.push("dirty 🛁");
    if (gameState.unlockedNeeds.includes('fun') && gameState.fun < 10) urgentNeeds.push("bored 🎮");
    if (gameState.unlockedNeeds.includes('education') && gameState.education < 10) urgentNeeds.push("wanting to learn 📚");
    
    if (urgentNeeds.length > 0) {
        updateMessage(`Zephyr is very ${urgentNeeds.join(", ")}! Please help them soon!`);
    } else if (gameState.health < 30) {
        updateMessage("Zephyr isn't feeling well. Maybe some medicine or rest would help! 💊😴");
    } else {
        updateMessage("Zephyr is doing okay. Keep taking good care of them!");
    }
}

// Disable buttons when game is over
function disableButtons() {
    const buttons = document.querySelectorAll('.action-btn, .next-turn-btn');
    buttons.forEach(button => button.disabled = true);
}

// Start the game when page loads
window.addEventListener('load', initGame);