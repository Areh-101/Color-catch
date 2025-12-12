const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const targetColorText = document.getElementById("targetColorText");

let score = 0;
let lives = 3;

// Pastel color palette
const colors = [
    {name: "Pink", hex: "#ff9aa2"},
    {name: "Blue", hex: "#aec6cf"},
    {name: "Mint", hex: "#b5ead7"},
    {name: "Peach", hex: "#ffdac1"}
];

let targetColor = null;

// Pick a random target color
function chooseNewTarget() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetColorText.textContent = targetColor.name;
    document.getElementById("targetBar").style.background = targetColor.hex;
}
chooseNewTarget();

// Spawn shapes
function spawnShape() {
    const shape = document.createElement("div");
    shape.classList.add("shape");

    const chosen = colors[Math.floor(Math.random() * colors.length)];
    shape.style.background = chosen.hex;
    shape.dataset.color = chosen.name;

    const xPos = Math.random() * (window.innerWidth - 60);
    shape.style.left = xPos + "px";

    shape.style.top = "-70px";

    gameArea.appendChild(shape);

    // Falling animation
    let fallSpeed = 2 + Math.random() * 2;

    const fall = setInterval(() => {
        let currentTop = parseInt(shape.style.top);
        shape.style.top = currentTop + fallSpeed + "px";

        // Remove if falls out
        if (currentTop > window.innerHeight) {
            clearInterval(fall);
            shape.remove();
        }
    }, 16);

    // Click (tap) detection
    shape.addEventListener("click", () => {
        if (shape.dataset.color === targetColor.name) {
            score++;
            scoreDisplay.textContent = "Score: " + score;
        } else {
            lives--;
            updateLives();
        }
        shape.remove();
    });
}

function updateLives() {
    if (lives === 3) livesDisplay.textContent = "❤️❤️❤️";
    if (lives === 2) livesDisplay.textContent = "❤️❤️🖤";
    if (lives === 1) livesDisplay.textContent = "❤️🖤🖤";
    if (lives <= 0) {
        alert("Game Over! Final Score: " + score);
        window.location.reload();
    }
}

// Spawn a shape every 900ms
setInterval(spawnShape, 900);
