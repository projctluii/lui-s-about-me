// Clock (simple)
function updateClock() {
  const el = document.getElementById("time");
  const now = new Date();
  el.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
updateClock();
setInterval(updateClock, 10000);

// Tab switching
const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".page");

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const id = btn.dataset.tab;
    pages.forEach((p) => p.classList.remove("active"));

    // Profile is the main layout (already visible),
    // so we only show the extra pages when not profile.
    if (id === "profile") {
      document.querySelector(".content").style.display = "grid";
      document.querySelector(".stats").style.display = "flex";
      document.querySelector(".banner").style.display = "block";
      document.getElementById("profile").classList.add("active");
    } else {
      document.querySelector(".content").style.display = "none";
      document.querySelector(".stats").style.display = "none";
      document.querySelector(".banner").style.display = "none";
      document.getElementById(id).classList.add("active");
    }
  });
});

// Stat count animation
function animateCounts() {
  const counters = document.querySelectorAll(".num");

  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    let current = 0;

    const step = Math.max(1, Math.floor(target / 90));

    const tick = () => {
      current += step;
      if (current >= target) current = target;

      counter.textContent = current.toLocaleString();
      if (current < target) requestAnimationFrame(tick);
    };

    tick();
  });
}

animateCounts();

/* ===== MUSIC PLAYER ===== */
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Play / Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// Update button icon
audio.addEventListener("play", () => {
  playBtn.textContent = "❚❚";
});

audio.addEventListener("pause", () => {
  playBtn.textContent = "▶";
});

// When metadata loads (duration)
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Update progress while playing
audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);

  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    seekBar.value = percent;
  }
});

// Seek when slider changes
seekBar.addEventListener("input", () => {
  if (!audio.duration) return;
  const newTime = (seekBar.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Reset when song ends
audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  seekBar.value = 0;
});
