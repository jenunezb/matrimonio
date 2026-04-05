const pageLoader = document.querySelector("#page-loader");

function hidePageLoader() {
  if (!pageLoader) {
    document.body.classList.add("hero-ready");
    return;
  }

  pageLoader.classList.add("is-hidden");
  document.body.classList.remove("is-loading");
  document.body.classList.add("hero-ready");

  window.setTimeout(() => {
    pageLoader.remove();
  }, 750);
}

window.addEventListener("load", () => {
  window.setTimeout(hidePageLoader, 850);
});
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

  const tryPlayAudio = () =>
    backgroundAudio.play().then(() => true).catch(() => false);

  const unlockAudio = () => {
    tryPlayAudio();
  };

  document.addEventListener("pointerdown", unlockAudio, { passive: true, once: true });
  document.addEventListener("touchstart", unlockAudio, { passive: true, once: true });
  document.addEventListener("click", unlockAudio, { passive: true, once: true });
  document.addEventListener("keydown", unlockAudio, { once: true });
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

const memoryPhotos = Array.from(document.querySelectorAll(".memory-photo"));
const lightbox = document.querySelector("#photo-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCloseControls = document.querySelectorAll("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");

if (memoryPhotos.length && lightbox && lightboxImage && lightboxPrev && lightboxNext) {
  let activeIndex = 0;
  let lastTrigger = null;

  const updateLightboxImage = () => {
    const selectedImage = memoryPhotos[activeIndex]?.querySelector("img");

    if (!selectedImage) {
      return;
    }

    lightboxImage.src = selectedImage.currentSrc || selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
  };

  const openLightbox = (index) => {
    activeIndex = index;
    lastTrigger = memoryPhotos[index] || null;
    updateLightboxImage();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxCloseControls[0]?.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
    lastTrigger?.focus();
  };

  const showNextImage = () => {
    activeIndex = (activeIndex + 1) % memoryPhotos.length;
    updateLightboxImage();
  };

  const showPreviousImage = () => {
    activeIndex = (activeIndex - 1 + memoryPhotos.length) % memoryPhotos.length;
    updateLightboxImage();
  };

  memoryPhotos.forEach((photo, index) => {
    photo.tabIndex = 0;
    photo.setAttribute("role", "button");
    photo.setAttribute("aria-label", `Abrir foto ${index + 1} en grande`);

    photo.addEventListener("click", () => openLightbox(index));
    photo.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  lightboxCloseControls.forEach((control) => {
    control.addEventListener("click", closeLightbox);
  });

  lightboxNext.addEventListener("click", showNextImage);
  lightboxPrev.addEventListener("click", showPreviousImage);

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }
  });
}


