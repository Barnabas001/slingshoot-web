// BUSINESS STATUS (TOP BAR)
function updateBusinessStatus() {
  const statusEl = document.getElementById("businessStatus");
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let openTime, closeTime;

  // Sunday: 2PM – 6PM
  if (day === 0) {
    openTime = 14 * 60;
    closeTime = 18 * 60;
  } else {
    // Mon–Sat: 8AM – 6PM
    openTime = 8 * 60;
    closeTime = 18 * 60;
  }

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${suffix}`;
  };

  if (currentMinutes >= openTime && currentMinutes < closeTime) {
    const minsLeft = closeTime - currentMinutes;

    if (minsLeft <= 30) {
      statusEl.textContent = `🟠 Closing soon • ${minsLeft} mins left`;
      statusEl.style.color = "#fb923c";
    } else {
      statusEl.textContent = `🟢 Currently Open • Closes ${formatTime(
        closeTime,
      )}`;
      statusEl.style.color = "#22c55e";
    }
  } else if (currentMinutes >= closeTime) {
    statusEl.textContent = `🔴 Closed for the day`;
    statusEl.style.color = "#ef4444";
  } else {
    const minsToOpen = openTime - currentMinutes;
    const h = Math.floor(minsToOpen / 60);
    const m = minsToOpen % 60;

    statusEl.textContent = `🟡 Yet to open • Opens in ${h}h ${m}m`;
    statusEl.style.color = "#facc15";
  }
}

updateBusinessStatus();
setInterval(updateBusinessStatus, 60000);

//STICKY SHRINKING HEADER
const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("shrink", window.scrollY > 60);
  }
});

//SCROLL REVEAL ANIMATIONS
const revealEls = document.querySelectorAll(
  ".card, .rate-card-item, .hero-text, .footer",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("reveal");
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => revealObserver.observe(el));

//MOBILE MENU
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".mobile-close");

  if (!menuBtn || !mobileNav || !closeBtn) return;

  menuBtn.addEventListener("click", () => {
    mobileNav.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});
