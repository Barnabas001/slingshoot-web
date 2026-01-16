function updateBusinessStatus() {
  const statusEl = document.getElementById("businessStatus");
  const now = new Date();

  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  let openTime, closeTime, label;

  if (day === 0) {
    // Sunday: 2PM - 6PM
    openTime = 14 * 60;
    closeTime = 18 * 60;
    label = "Sunday";
  } else {
    // Mon–Sat: 8AM - 6PM
    openTime = 8 * 60;
    closeTime = 18 * 60;
    label = "Today";
  }

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${suffix}`;
  };

  if (currentMinutes >= openTime && currentMinutes < closeTime) {
    const minutesLeft = closeTime - currentMinutes;

    if (minutesLeft <= 30) {
      statusEl.textContent = `🟠 Closing soon • ${minutesLeft} mins left`;
      statusEl.style.color = "#fb923c";
    } else {
      statusEl.textContent = `🟢 Currently Open • Closes ${formatTime(
        closeTime
      )}`;
      statusEl.style.color = "#22c55e";
    }
  } else if (currentMinutes >= closeTime) {
    statusEl.textContent = `🔴 Closed for the day`;
    statusEl.style.color = "#ef4444";
  } else {
    // NOT YET OPEN → COUNTDOWN
    const minutesToOpen = openTime - currentMinutes;
    const hrs = Math.floor(minutesToOpen / 60);
    const mins = minutesToOpen % 60;

    statusEl.textContent = `🟡 Yet to open • Opens in ${hrs}h ${mins}m`;
    statusEl.style.color = "#facc15";
  }
}

updateBusinessStatus();

// Update every minute
setInterval(updateBusinessStatus, 60000);

const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

const reveals = document.querySelectorAll(".card, .hero-text, .footer");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => revealObserver.observe(el));

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
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
