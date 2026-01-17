/*************************************************
 * BUSINESS STATUS (TOP BAR)
 *************************************************/
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
        closeTime
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

/*************************************************
 * STICKY SHRINKING HEADER
 *************************************************/
const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("shrink", window.scrollY > 60);
  }
});

/*************************************************
 * SCROLL REVEAL ANIMATIONS
 *************************************************/
const revealEls = document.querySelectorAll(
  ".card, .rate-card-item, .hero-text, .footer"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("reveal");
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

/*************************************************
 * MOBILE MENU
 *************************************************/
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

/*************************************************
 * RATE DATA (SIMPLIFIED FROM YOUR SAMPLES)
 *************************************************/
const WHATSAPP_NUMBER = "2348164025181";

const rateData = {
  studio_basic: {
    title: "Studio Portrait – Basic",
    price: "₦15,000",
    details: ["30 minutes session", "1 outfit", "5 edited pictures"],
  },
  studio_standard: {
    title: "Studio Portrait – Standard",
    price: "₦25,000",
    details: ["1 hour session", "2 outfits", "10 edited pictures"],
  },
  studio_premium: {
    title: "Studio Portrait – Premium",
    price: "₦40,000",
    details: ["2 hours session", "4 outfits", "20 edited pictures"],
  },
  family_home: {
    title: "Home Service Family Shoot",
    price: "₦60,000+",
    details: [
      "1 hour session",
      "15 edited pictures",
      "Indoor only",
      "1 outfit",
    ],
  },
  wedding_basic: {
    title: "Wedding Package – Basic",
    price: "₦300,000",
    details: [
      "1 professional photographer",
      "150 edited pictures",
      "Online gallery",
      "20-page album",
    ],
  },
  wedding_premium: {
    title: "Wedding Package – Premium",
    price: "₦800,000",
    details: [
      "2 photographers",
      "500+ edited pictures",
      "Luxury photo album",
      "USB with images",
    ],
  },
};

/*************************************************
 * RATE MODAL LOGIC
 *************************************************/
const modal = document.getElementById("rateModal");
const titleEl = document.getElementById("rateTitle");
const priceEl = document.getElementById("ratePrice");
const detailsEl = document.getElementById("rateDetails");
const whatsappBtn = document.getElementById("whatsappBook");
const closeRateBtn = document.getElementById("closeRate");

document.querySelectorAll(".rate-card-item").forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.rate;
    const data = rateData[key];
    if (!data) return;

    titleEl.textContent = data.title;
    priceEl.textContent = data.price;
    detailsEl.innerHTML = data.details.map((d) => `<li>${d}</li>`).join("");

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const message = `
Hello Slingshot Studios 👋
I’m interested in the *${data.title}*.

Price: ${data.price}
Date: ${date}
Time: ${time}
    `.trim();

    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    modal.classList.add("active");
  });
});

closeRateBtn?.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

/*************************************************
 * PRICE FILTERS
 *************************************************/
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    document.querySelectorAll(".rate-card-item").forEach((card) => {
      if (filter === "all" || card.dataset.tier === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.target === "_blank") return;
    e.preventDefault();
    document.getElementById("pageLoader").classList.add("active");
    setTimeout(() => {
      window.location.href = link.href;
    }, 300);
  });
});
