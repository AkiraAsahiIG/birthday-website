// --- Page 1: Video ---
const welcome = document.getElementById('welcome');
const videoScreen = document.getElementById('videoScreen');
const video = document.getElementById('birthdayVideo');
const countdown = document.getElementById('countdown');
const finalScreen = document.getElementById('finalScreen');
const errorMsg = document.getElementById('errorMsg');
const playButton = document.getElementById('playButton');

let interval;

setTimeout(() => {
  welcome.style.display = "none";
  videoScreen.style.display = "block";
}, 4000);

playButton.addEventListener('click', () => {
  video.play().then(() => {
    playButton.style.display = 'none';
    startCountdown();
  }).catch(() => {
    errorMsg.innerText = "⚠️ Video not found. Check items/1.mp4";
    setTimeout(() => finalScreen.style.display = 'block', 2000);
  });
});

function startCountdown() {
  let count = 3;
  countdown.style.display = "block";
  countdown.innerText = count;
  interval = setInterval(() => {
    count--;
    if (count > 0) countdown.innerText = count;
    else if (count === 0) countdown.innerText = "🎉";
    else {
      clearInterval(interval);
      countdown.style.display = "none";
    }
  }, 1000);
}

video.addEventListener("ended", () => {
  clearInterval(interval);
  videoScreen.style.display = "none";
  startBalloonGame();
});

// --- Page 2: Balloon Game ---
const funScreen = document.getElementById('funScreen');
const balloonContainer = document.getElementById('balloonContainer');
const balloonMsg = document.getElementById('balloonMsg');
const nextGameBtn = document.getElementById('nextGameBtn');

const balloonTexts = [
  "+1 Smile 😎",
  "You unlocked: Best Sister Award 🏆",
  "Memory unlocked 💭",
  "Oops… balloon gone! 😆"
];

function startBalloonGame() {
  funScreen.style.display = "block";
  for (let i=0;i<4;i++){
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.innerText = "🎈";
    balloonContainer.appendChild(balloon);

    balloon.addEventListener('click', () => {
      const text = balloonTexts[i];
      balloonMsg.innerText = text;
      balloon.style.visibility = "hidden";
      balloonConfetti();
      if (i === 3) nextGameBtn.style.display = "block";
    });
  }
}

function balloonConfetti() {
  balloonMsg.style.color = "#fffa65";
  // Could add animation here
}

// --- Questions Cards ---
const questionScreen = document.getElementById('questionScreen');
const questionText = document.getElementById('questionText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

const questions = [
  "Are you ready for a mini game? 🎮",
  "Do you like Strawberry cake? 🍓",
  "Am I still your favorite sibling? 😎",
  "Will you promise to always let me annoy you a little? 😆",
  "Do you want one last surprise? 💖"
];

let qIndex = 0;

nextGameBtn.addEventListener('click', () => {
  funScreen.style.display = "none";
  questionScreen.style.display = "block";
  loadQuestion();
});

function loadQuestion() {
  questionText.innerText = questions[qIndex];
}

// Example yes/no flow
yesBtn.addEventListener('click', () => {
  nextQuestion();
});
noBtn.addEventListener('click', () => {
  if (questions[qIndex]==="Are you ready for a mini game? 🎮"){
    questionText.innerText="Why not? I will force you 😂 Press Yes!";
  } else if (questions[qIndex]==="Am I still your favorite sibling? 😎"){
    questionText.innerText="😭😞";
  } else if (questions[qIndex]==="Will you promise to always let me annoy you a little? 😆"){
    questionText.innerText="Why not?! I will annoy you more 😂 Press Yes!";
  } else if (questions[qIndex]==="Do you want one last surprise? 💖"){
    questionText.innerText="Still, I have a surprise! Press Yes!";
  }
});

function nextQuestion(){
  qIndex++;
  if (qIndex<questions.length){
    loadQuestion();
  } else {
    questionScreen.style.display = "none";
    startKBC();
  }
}

// --- KBC Type Question ---
const kbcScreen = document.getElementById('kbcScreen');
const kbcQuestion = document.getElementById('kbcQuestion');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');

function startKBC(){
  kbcScreen.style.display = "block";
  kbcQuestion.innerText = "If I could make one wish come true for you today, what would you pick?";

  option1.innerText = "🍰 All the birthday cake to myself";
  option2.innerText = "💖 A hug from my awesome brother";
  option3.innerText = "🧠💡 Mind Reading";
  option4.innerText = "🌈 A day full of magical surprises";

  const kbcOptions = [option1, option2, option3, option4];
  kbcOptions.forEach(btn=>{
    btn.addEventListener('click', ()=>finishBirthday());
  });
}

function finishBirthday(){
  kbcScreen.style.display = "none";
  finalScreen.style.display = "block";
}