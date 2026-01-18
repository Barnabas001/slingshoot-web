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
  studio_personal: {
    title: "Studio – Personal Shoot",
    tiers: [
      {
        name: "Basic",
        price: "₦15,000",
        details: ["30 mins session", "1 outfit", "5 edited photos"],
      },
      {
        name: "Standard",
        price: "₦25,000",
        details: ["1 hour session", "2 outfits", "10 edited photos"],
      },
      {
        name: "Premium",
        price: "₦40,000",
        details: ["2 hours", "4 outfits", "20 edited photos"],
      },
      {
        name: "Premium + package",
        price: "₦50,000",
        details: ["2 hours", "4 outfits", "20 edited photos", "16*24 frame"],
      },
      {
        name: "VIP package",
        price: "₦100,000",
        details: [
          "4 hours",
          "up to 7 outfits",
          "40 edited photos",
          " 16*24 frame",
          "Mini Photobook",
        ],
      },
    ],
  },

  studio_family: {
    title: "Studio – Family Shoot",
    tiers: [
      {
        name: "Basic",
        price: "₦35,000",
        details: [
          "1 hour",
          "1 outfit",
          "Max 4 family members",
          "9 edited photos",
        ],
      },
      {
        name: "Standard",
        price: "₦60,000",
        details: [
          "2 hours",
          "up to 2 outfits",
          "20 edited pictures",
          "Max 6 family members",
          "12*16 frame",
        ],
      },
      {
        name: "Premium",
        price: "₦100,000",
        details: [
          "2-4 hours",
          "30 edited pictures",
          "up to 4 outfits",
          "16*24 frame",
          "Mini Photobook",
        ],
      },
    ],
  },

  home_personal: {
    title: "Home Service – Personal Shoot",
    tiers: [
      {
        name: "Basic",
        price: "₦30,000",
        details: ["1 hour session", "1 outfit", "7 edited photos"],
      },
      {
        name: "Standard",
        price: "₦55,000",
        details: [
          "2 hour session",
          "2-3 outfits",
          "15 edited photos",
          "10*12 frame",
        ],
      },
      {
        name: "Premium",
        price: "₦120,000",
        details: [
          "2-4 hours session",
          "4-6 outfits",
          "30 edited photos",
          "16*24 frame",
        ],
      },
    ],
  },

  prewedding: {
    title: "Pre-Wedding Shoot",
    tiers: [
      {
        name: "Basic",
        price: "₦50,000",
        details: [
          "1 hour session",
          "1 location",
          "1 outfits",
          "10 edited pictures",
        ],
      },
      {
        name: "Standard",
        price: "₦75,000",
        details: [
          "2-3 hours",
          "up to 2 locations",
          "up to 2 outfits",
          "20 edited photos",
        ],
      },
      {
        name: "Premium",
        price: "₦150,000",
        details: [
          "Full day session",
          "Multiple locations",
          "30 edited photos",
          "1 frame",
          "Mini Photobook",
        ],
      },
    ],
  },
  wedding: {
    title: "Wedding",
    tiers: [
      {
        name: "Basic",
        price: "₦300,000",
        details: [
          "1 professional photographer",
          "150 Edited Pictures",
          "Online Gallery for downloads",
          "20 page photo album",
          "One 12*16 Photo frame",
        ],
      },
      {
        name: "Standard",
        price: "₦500,000",
        details: [
          "Pre-wedding shoot",
          "1 professional photographer",
          "300 Edited Pictures",
          "Online Gallery for downloads",
          "30 page photo album",
          "Two 12*16 Photo frames",
          "One 16*24 photo frame",
        ],
      },
      {
        name: "Premium",
        price: "₦800,000",
        details: [
          "Pre-wedding shoot",
          "2 professional photographer",
          "500 Edited Pictures",
          "Online Gallery for downloads",
          "USB drive with edithed images",
          "40 page Luxury Photo album",
          "Two 12*16 Photo frames",
          "Two 16*20 photo frame",
        ],
      },
    ],
  },
};

// MODAL LOGIC
const modal = document.getElementById("rateModal");
const titleEl = document.getElementById("rateTitle");
const tierGrid = document.getElementById("tierGrid");

document.querySelectorAll(".rate-card-item").forEach((card) => {
  card.addEventListener("click", () => {
    const data = rateData[card.dataset.rate];
    if (!data) return;

    titleEl.textContent = data.title;
    tierGrid.innerHTML = "";

    data.tiers.forEach((tier) => {
      const message = `Hello Slingshot Studios 👋
I want to book the ${tier.name} package for ${data.title}.
Price: ${tier.price}`;

      const tierEl = document.createElement("div");
      tierEl.className = "tier-card";
      tierEl.innerHTML = `
        <h4>${tier.name}</h4>
        <p class="tier-price">${tier.price}</p>
        <ul>${tier.details.map((d) => `<li>${d}</li>`).join("")}</ul>
        <a class="whatsapp-btn"
          target="_blank"
          href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}">
          Book ${tier.name}
        </a>
      `;
      tierGrid.appendChild(tierEl);
    });

    modal.classList.add("active");
  });
});

document.getElementById("closeRate").onclick = () =>
  modal.classList.remove("active");

modal.onclick = (e) => {
  if (e.target === modal) modal.classList.remove("active");
};

/*************************************************
 * RATE MODAL LOGIC
 *************************************************/

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
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const pageLoader = document.getElementById("pageLoader");

if (pageLoader) {
  document.querySelectorAll("a[href]").forEach((link) => {
    if (
      link.target === "_blank" ||
      link.href.startsWith("javascript:") ||
      link.href.includes("#")
    ) {
      return;
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();
      pageLoader.classList.add("active");
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    });
  });
}

/*************************************************
 * GALLERY DATA
 *************************************************/
// const galleryData = {
//   studio: [
//     "images/gallery/studio/studio1.jpg",
//     // "images/gallery/studio2.jpg",
//     // "images/gallery/studio3.jpg",
//   ],
//   wedding: [
//     "images/gallery/wedding/Weddings - Slingshot Studios.jpg",
//     // "images/gallery/wedding2.jpg",
//     // "images/gallery/wedding3.jpg",
//   ],
//   corporate: ["images/gallery/corporate1.jpg", "images/gallery/corporate2.jpg"],
//   outdoor: ["images/gallery/outdoor1.jpg", "images/gallery/outdoor2.jpg"],
//   event: ["images/gallery/event1.jpg", "images/gallery/event2.jpg"],
// };

const galleryData = {
  studio: ["images/gallery/studio/Slingshot_Studios_03.jpg"],

  wedding: ["images/gallery/wedding/Weddings - Slingshot Studios.jpg"],

  corporate: ["images/gallery/corporate/Slingshot_Studios_01.jpg"],

  outdoor: ["images/gallery/outdoor/Outdoor Shoot - Slingshot Studios.jpg"],

  event: [
    "images/gallery/event/event1.jpg",
    "images/gallery/event/Events - Slingshot Studios.jpg",
  ],
};

const galleryCards = document.querySelectorAll(".gallery-categories .card");
const galleryView = document.getElementById("galleryView");
const galleryGrid = document.getElementById("galleryGrid");
const galleryTitle = document.getElementById("galleryTitle");
const closeGallery = document.getElementById("closeGallery");

/*************************************************
 * CATEGORY CLICK → OPEN GALLERY
 *************************************************/
galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.gallery;
    const images = galleryData[key];
    if (!images) return;

    galleryTitle.textContent = card.textContent;

    renderGallery(images);

    galleryView.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

closeGallery?.addEventListener("click", () => {
  galleryView.classList.remove("active");
});

/*************************************************
 * LAZY LOAD + BLUR UP
 *************************************************/
function setupLazyImages() {
  const imgs = document.querySelectorAll(".gallery-grid img");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;

          img.onload = () => img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    { threshold: 0.15 }
  );

  imgs.forEach((img) => observer.observe(img));
}

/*************************************************
 * LIGHTBOX + SWIPE
 *************************************************/
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

let startX = 0;
let currentIndex = 0;
let currentImages = [];

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;
  lightboxImg.src = images[index];
  lightbox.classList.add("active");
}

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

/* Swipe gestures */
lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentIndex < currentImages.length - 1) {
      currentIndex++;
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
    }
    lightboxImg.src = currentImages[currentIndex];
  }
});

/*************************************************
 * RENDER GALLERY (THIS IS THE ONLY innerHTML)
 *************************************************/
function renderGallery(images) {
  galleryGrid.innerHTML = images
    .map(
      (src, i) => `
        <img
          data-src="${src}"
          data-index="${i}"
          alt=""
        />
      `
    )
    .join("");

  setupLazyImages();

  document.querySelectorAll(".gallery-grid img").forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(images, Number(img.dataset.index));
    });
  });
}
