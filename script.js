const weddingDate = new Date("2026-07-18T15:00:00-05:00");

const fields = {
  days: document.querySelector('[data-unit="days"]'),
  hours: document.querySelector('[data-unit="hours"]'),
  minutes: document.querySelector('[data-unit="minutes"]'),
  seconds: document.querySelector('[data-unit="seconds"]'),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, weddingDate.getTime() - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  fields.days.textContent = pad(days);
  fields.hours.textContent = pad(hours);
  fields.minutes.textContent = pad(minutes);
  fields.seconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);
const backgroundAudio = document.querySelector("#bg-audio");

if (backgroundAudio) {
  backgroundAudio.volume = 0.85;

  const tryPlayAudio = () => {
    backgroundAudio.play().catch(() => {});
  };

  tryPlayAudio();

  const unlockAudio = () => {
    tryPlayAudio();
    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("touchstart", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  };

  document.addEventListener("click", unlockAudio, { passive: true });
  document.addEventListener("touchstart", unlockAudio, { passive: true });
  document.addEventListener("keydown", unlockAudio);
}

const memoriesCard = document.querySelector('.memories-card');

if (memoriesCard) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          memoriesCard.classList.add('is-visible');
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(memoriesCard);
}


const revealElements = document.querySelectorAll(".section, .card, .countdown-item");
revealElements.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));
