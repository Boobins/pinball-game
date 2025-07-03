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
    alert("🎉 Correct! You win!");
    resetGame();
    return;
  }

  lives--;
  guessStage++;
  updateImage();

  if (lives <= 0) {
   showGameOver();
  } else {
    document.getElementById("status").innerText = `${lives} lives remaining`;
  }
}

function skip() {
  guessStage++;
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
  lives = 5;
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
