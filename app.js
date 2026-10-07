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
