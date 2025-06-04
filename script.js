const startBtn = document.getElementById("start-btn");
const questionArea = document.getElementById("question-area");
const choicesDiv = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

let score = 0;

const progressions = [
    {name: "I - IV - V", chords: ["C4", "F4", "G4"]},
    {name: "I - V - vi", chords: ["C4", "G4", "A4"]},
    {name: "I - vi - IV", chords: ["C4", "A4", "F4"]}
];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function playProgression(chords) {
    const synth = new Tone.PolySynth().toDestination();
    let now = Tone.now();
    chords.forEach((chord, i) => {
        synth.triggerAttackRelease(chord, "1n", now + i);
    });
}

function startGame() {
    questionArea.classList.remove("hidden");
    feedback.textContent = "";
    const progression = progressions[Math.floor(Math.random() * progressions.length)];
    playProgression(progression.chords);
    const options = shuffle([...progressions]);
    choicesDiv.innerHTML = "";
    options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.name;
        btn.onclick = () => {
            if (option.name === progression.name) {
                feedback.textContent = "✅ Correct!";
                score++;
            } else {
                feedback.textContent = "❌ Try again!";
            }
            scoreDisplay.textContent = `Score: ${score}`;
        };
        choicesDiv.appendChild(btn);
    });
}

startBtn.addEventListener("click", () => {
    Tone.start();
    startGame();
});
