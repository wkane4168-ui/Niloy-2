// ১. কাউন্টডাউন টাইমার
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

startCountdown("2026-10-10T00:00:00+06:00", "mahalaya-timer");
startCountdown("2026-10-16T00:00:00+06:00", "puja-timer");

// ২. কাপড়ের পছন্দ ও পার্সেন্টেজ হিসাব
let votes = JSON.parse(localStorage.getItem('puja_clothes_votes')) || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

function submitVote(setNum) {
  votes[setNum] = (votes[setNum] || 0) + 1;
  localStorage.setItem('puja_clothes_votes', JSON.stringify(votes));
  updateResults();
}

function updateResults() {
  const resultList = document.getElementById('resultList');
  const totalText = document.getElementById('total');
  if (!resultList || !totalText) return;

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  totalText.textContent = `মোট ${totalVotes} জন`;

  resultList.innerHTML = '';
  const bnNumbers = ['১', '২', '৩', '৪', '৫', '৬'];

  for (let i = 1; i <= 6; i++) {
    const count = votes[i] || 0;
    const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0;

    const row = document.createElement('div');
    row.style.cssText = 'margin-bottom: 8px; text-align: left; font-size: 0.85rem;';
    row.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
        <span><b>${bnNumbers[i-1]} সেট:</b> ${count} জন</span>
        <span><b>${percentage}%</b></span>
      </div>
      <div style="background: #e9ecef; height: 8px; border-radius: 4px; overflow: hidden;">
        <div style="background: #d9534f; width: ${percentage}%; height: 100%;"></div>
      </div>
    `;
    resultList.appendChild(row);
  }
}

// পেজ লোড হলে রেজাল্ট দেখাবে
updateResults();

// ৩. ঢাক অন/অফ
const dhakBtn = document.getElementById('dhak');
const dhakAudio = document.getElementById('dhakAudio');
const statusText = document.getElementById('status');
const dhakStateText = document.getElementById('dhakStateText');

if (dhakBtn && dhakAudio) {
  dhakBtn.addEventListener('click', () => {
    if (dhakAudio.paused) {
      dhakAudio.play();
      if (statusText) statusText.textContent = '🟢 ঢাক বাজছে... (বন্ধ করতে আবার চাপ দিন)';
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
