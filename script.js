const pinballMachines = [
  { name: "Attack from Mars", key: "attackfrommars"},
  { name: "Iron Maiden - Legacy of the Beast", key: "ironmaiden"},
  { name: "Godzilla", key: "godzilla"},
  { name: "Scared Stiff", key: "scaredstiff"},
  { name: "Elton John", key: "eltonjohn"},
  { name: "Foo Fighters", key: "foofighters"},
  { name: "The Uncanny X-men", key: "xmen"},
  { name: "Monster Bash", key: "monsterbash"},
  { name: "Creature from the Black Lagoon", key: "creature"},
  { name: "Rush", key: "rush"},
  { name: "Avengers: Infinity Quest", key: "avengers"},
  { name: "James Bond 007", key: "bond"},
  { name: "World Cup Soccer", key: "soccer"},
  { name: "The Addams Family", key: "addams"},
  { name: "Whirlwind", key: "whirlwind"},
  { name: "Junk Yard", key: "junkyard"},
  { name: "Jaws", key: "jaws"},
  { name: "TRON: Legacy", key: "tron"},
  { name: "Metallica", key: "metallica"},
  { name: "Deadpool", key: "deadpool"},
  { name: "Medieval Madness", key: "medievalmadness"}
];

let selectedMachine = null;
let lives = 5;
let guessStage = 0;
let guesses = 1;
const totalStages = 5;
let availableMachines = [...pinballMachines];

function startGame() {
  if (availableMachines.length === 0) {
    alert("🎉 You've guessed all the pinball machines!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableMachines.length);
  selectedMachine = availableMachines[randomIndex];

  // Remove it from the pool
  availableMachines.splice(randomIndex, 1);

  updateImage();
  document.getElementById("status").innerText = `${lives} lives remaining`;
}

function makeGuess() {
  const userGuess = document.getElementById("guessInput").value;

  // Check if the input matches a valid pinball machine
  const validNames = pinballMachines.map(m => m.name);
  if (!validNames.includes(userGuess)) {
    alert("⚠️ Please select a valid pinball machine from the list.");
    return;
  }


  if (userGuess === selectedMachine.name) {
    showWinModal(); 
    return;
  }

  lives--;
  guessStage++;
  updateImage();
  guesses ++;
  if (lives <= 0) {
   showGameOver();
  } else {
    document.getElementById("status").innerText = `${lives} lives remaining`;
  }
}

function skip() {
  guessStage++;
  guesses ++;
  lives--;


  if (guessStage >= totalStages) {
    guessStage = totalStages - 1;
  }

  updateImage();

  if (lives <= 0) {
    showGameOver();
    return;
  }

  document.getElementById("status").innerText = `${lives} lives remaining`;
}

function updateImage() {
  const imagePath = `images/${selectedMachine.key}/${selectedMachine.key}-${guessStage}.jpg`;
  document.getElementById("coverImage").src = imagePath;
}

function resetGame() {
  document.getElementById("guessInput").value = "";
  document.getElementById("gameOverModal").classList.add("hidden");
  document.getElementById("winModal").classList.add("hidden");
  lives = 5;
  guesses = 1;
  guessStage = 0;
  startGame();
}

function showGameOver() {
  const modal = document.getElementById("gameOverModal");
  const finalImage = document.getElementById("finalImage");
  const message = document.getElementById("gameOverMessage");

  finalImage.src = `images/${selectedMachine.key}/${selectedMachine.key}-5.jpg`;
  message.innerText = `Game over! The correct answer was: ${selectedMachine.name}`;
  modal.classList.remove("hidden");
}

function showWinModal() {
  const modal = document.getElementById("winModal");
  const finalImage = document.getElementById("finalWinImage");
  const message = document.getElementById("winMessage");

  finalImage.src = `images/${selectedMachine.key}/${selectedMachine.key}-5.jpg`;
  message.innerText = `🎉 Correct! The machine was: ${selectedMachine.name}\nYou guessed it in ${guesses} ${guesses === 1 ? 'try' : 'tries'}!`;
  modal.classList.remove("hidden");

  launchConfetti(); // Optional: trigger confetti!
}

function launchConfetti() {
  const confettiCanvas = confetti.create(null, {
    resize: true,
    useWorker: true,
  });

  confettiCanvas({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  // 🆕 Move confetti canvas to top layer
  const canvas = document.querySelector("canvas");
  if (canvas) {
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "2000"; // Higher than modal (1000)
  }
}


function showSuggestions() {
  const input = document.getElementById("guessInput").value.toLowerCase();
  const suggestionBox = document.getElementById("suggestions");

  // Clear previous suggestions
  suggestionBox.innerHTML = "";

  if (input.length === 0) return;

  // Filter pinball machine names
  const matches = pinballMachines.filter(machine =>
    machine.name.toLowerCase().startsWith(input)
  );

  matches.forEach(machine => {
    const div = document.createElement("div");
    div.innerText = machine.name;
    div.onclick = () => {
      document.getElementById("guessInput").value = machine.name;
      suggestionBox.innerHTML = "";
    };
    suggestionBox.appendChild(div);
  });
}



// Start the game when the page loads
window.onload = startGame;

