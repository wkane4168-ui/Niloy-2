// ১. কাউন্টডাউন টাইমার লজিক
function startCountdown(targetDate, elementId) {
  const timerElement = document.getElementById(elementId);
  if (!timerElement) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    if (distance < 0) {
      timerElement.innerHTML = "<b>শুভ উৎসব শুরু হয়েছে!</b>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.innerHTML = `
      <div class="time-box"><span>${days}</span><small>দিন</small></div>
      <div class="time-box"><span>${hours}</span><small>ঘণ্টা</small></div>
      <div class="time-box"><span>${minutes}</span><small>মিন</small></div>
      <div class="time-box"><span>${seconds}</span><small>সেক</small></div>
    `;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// কাউন্টডাউন চালু
startCountdown("2026-10-10T00:00:00+06:00", "mahalaya-timer");
startCountdown("2026-10-16T00:00:00+06:00", "puja-timer");


// ২. জামাকাপড়ের অপশন ও পার্সেন্টেজ লজিক
const choicesContainer = document.getElementById('choices');
const resultList = document.getElementById('resultList');
const totalText = document.getElementById('total');

// লোকাল স্টোরেজ থেকে ডেটা নিয়ে আসা
let votes = JSON.parse(localStorage.getItem('puja_clothes_votes')) || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
let hasVoted = localStorage.getItem('puja_clothes_has_voted') || false;

function renderChoices() {
  if (!choicesContainer) return;
  choicesContainer.innerHTML = '';

  const bnNumbers = ['১', '২', '৩', '৪', '৫', '৬'];

  for (let i = 1; i <= 6; i++) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.cssText = `
      padding: 10px 15px;
      margin: 5px;
      border: 1px solid #d9534f;
      background: #fff;
      color: #8b0000;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    `;
    btn.innerHTML = `${bnNumbers[i-1]} সেট`;
    
    btn.addEventListener('click', () => submitVote(i));
    choicesContainer.appendChild(btn);
  }

  updateResults();
}

function submitVote(setNum) {
  votes[setNum] = (votes[setNum] || 0) + 1;
  localStorage.setItem('puja_clothes_votes', JSON.stringify(votes));
  localStorage.setItem('puja_clothes_has_voted', 'true');
  hasVoted = true;
  updateResults();
}

function updateResults() {
  if (!resultList || !totalText) return;

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  totalText.textContent = `মোট ${totalVotes} জন`;

  resultList.innerHTML = '';
  const bnNumbers = ['১', '২', '৩', '৪', '৫', '৬'];

  for (let i = 1; i <= 6; i++) {
    const count = votes[i] || 0;
    const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0;

    const row = document.createElement('div');
    row.style.cssText = `
      margin-bottom: 8px;
      text-align: left;
      font-size: 0.85rem;
    `;
    row.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
        <span><b>${bnNumbers[i-1]} সেট:</b> ${count} জন</span>
        <span><b>${percentage}%</b></span>
      </div>
      <div style="background: #eee; height: 8px; border-radius: 4px; overflow: hidden;">
        <div style="background: #d9534f; width: ${percentage}%; height: 100%;"></div>
      </div>
    `;
    resultList.appendChild(row);
  }
}

// সেকশন রান করা
renderChoices();


// ৩. ঢাক অন/অফ লজিক
const dhakBtn = document.getElementById('dhak');
const dhakAudio = document.getElementById('dhakAudio');
const statusText = document.getElementById('status');
const dhakStateText = document.getElementById('dhakStateText');

if (dhakBtn && dhakAudio) {
  dhakBtn.addEventListener('click', () => {
    if (dhakAudio.paused) {
      dhakAudio.play();
      if (statusText) statusText.textContent = '🟢 ঢাক বাজছে... (থামাতে চাপুন)';
      if (dhakStateText) dhakStateText.textContent = 'থামান';
    } else {
      dhakAudio.pause();
      dhakAudio.currentTime = 0;
      if (statusText) statusText.textContent = '🔴 ঢাক বাজাতে চাপ দিন';
      if (dhakStateText) dhakStateText.textContent = 'বাজান';
    }
  });

  dhakAudio.addEventListener('ended', () => {
    if (statusText) statusText.textContent = '🔴 ঢাক বাজাতে চাপ দিন';
    if (dhakStateText) dhakStateText.textContent = 'বাজান';
  });
      }
