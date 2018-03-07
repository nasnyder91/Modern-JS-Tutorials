// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum){
    // Game over, won
    gameOver(true, `${winningNum} is correct!  YOU WIN!!!`);
  } else{
    // Subtract a guess
    guessLeft--;

    if(guessLeft === 0){
      // Game over, lost
      gameOver(false, `Game Over, you lost.  The correct number was ${winningNum}`)
    } else {
      // Change border color
      guessInput.style.borderColor = 'red';
      // Clear input
      guessInput.value = '';
      // Game continues, answer wrong
      setMessage(`${guess} is not correct, ${guessLeft} guesses left.`, 'red');
    }
  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set win message
  setMessage(msg, color);

  // Play Again?
  guessBtn.value = 'Play Again?';
  guessBtn.className += 'play-again';
}

// Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

// Get winning num
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
