const pinballMachines = [
  { name: "Attack from Mars", key: "attackfrommars"},
  { name: "Iron Maiden - Legacy of the Beast", key: "ironmaiden"},
  { name: "Godzilla", key: "godzilla"},
  { name: "Scared Stiff", key: "scaredstiff"},
  { name: "Elton John", key: "eltonjohn"},
  { name: "Foo Fighters", key: "foofighters"},
  { name: "The Uncanny X-men", key: "xmen"},
  { name: "Medieval Madness", key: "medievalmadness"}
];

let selectedMachine = null;
let lives = 6;
let guessStage = 0;
const totalStages = 6;

function startGame() {
  const randomIndex = Math.floor(Math.random() * pinballMachines.length);
  selectedMachine = pinballMachines[randomIndex];
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
    alert("❌ Game over! The correct answer was: " + selectedMachine.name);
    resetGame();
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
    alert("❌ Out of lives! The correct answer was: " + selectedMachine.name);
    resetGame();
    return;
  }

  document.getElementById("status").innerText = `${lives} lives remaining`;
}

function updateImage() {
  const imagePath = `images/${selectedMachine.key}/${selectedMachine.key}-${guessStage}.jpg`;
  document.getElementById("coverImage").src = imagePath;
}

function resetGame() {
  lives = 6;
  guessStage = 0;
  selectedMachine = null;
  document.getElementById("guessInput").value = "";
  startGame();
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
