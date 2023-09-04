const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  const expectedPrintOutputs = [
    "  Type 'r' for Rock",
    "  Type 'p' for Paper",
    "  Type 's' for Scissors",
    "  Type 'q' to quit",
    "  Type 'h' for a list of valid commands"
  ];
    console.log('\nHelp:\n')
    expectedPrintOutputs.forEach(ele =>{
      console.log(ele)
    })
};


function getWinner(move1, move2) {
  if (move1 !== move2){
    let  winon =   VALID_MOVES[move1]
    if(winon.winsAgainst === move2){
        return 1
    }
    return -1
}
return 0
}

function getCPUMove() {
  const validMoveKeys = ['r', 'p', 's'];
  const randomElement = validMoveKeys[Math.floor(Math.random() * validMoveKeys.length)]
  return randomElement
}

function processMove(cmd, cpu) {
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);

  let result = getWinner(cmd, cpu);
  if(result === 0){
     console.log("You tie")
      ties++;
  }else if(result === 1){
      console.log("You win!")
      wins++;
  }else if(result === -1){
      console.log("You lose...")
      losses++;
  }
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
};

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      printHelp();

    } else if (cmd === 'q') {
      rl.close();
      return;
      
    } else if (VALID_MOVES[cmd]){
      getCPUMove();
      const cpu = getCPUMove();
      processMove(cmd, cpu);

    } else {
      console.log("\nInvalid command.\n");
      printHelp()
    }

    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  printHelp()

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};