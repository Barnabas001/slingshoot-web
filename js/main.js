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

// Mobile menu

//MOBILE NAV TOGGLE
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const closeMenu = document.getElementById("closeMenu");
const mobileLinks = mobileNav?.querySelectorAll("a");

// Toggle menu (open ↔ close)
function toggleMenu() {
  mobileNav.classList.toggle("active");
  document.body.classList.toggle("nav-open");
}

// Close menu
function closeMobileMenu() {
  mobileNav.classList.remove("active");
  document.body.classList.remove("nav-open");
}

// ☰ Click
menuToggle?.addEventListener("click", toggleMenu);

// ✕ Click
closeMenu?.addEventListener("click", closeMobileMenu);

// Close on link click
mobileLinks?.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Header shrink
const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("shrink", window.scrollY > 40);
});

// Page loader
const pageLoader = document.getElementById("pageLoader");

if (pageLoader) {
  document.querySelectorAll("a[href]").forEach((link) => {
    if (
      link.target === "_blank" ||
      link.href.includes("#") ||
      link.href.startsWith("javascript:")
    )
      return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      pageLoader.classList.add("active");
      setTimeout(() => (window.location.href = link.href), 300);
    });
  });
}
