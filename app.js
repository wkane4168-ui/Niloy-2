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

// কাউন্টডাউন চালু করা
startCountdown("2026-10-10T00:00:00+06:00", "mahalaya-timer");
startCountdown("2026-10-16T00:00:00+06:00", "puja-timer");


// ২. ঢাক অন/অফ লজিক
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
