//GALLERY DATA
const galleryData = {
  studio: [
    "images/gallery/studio/Slingshot_Studios_03.jpg",
    "images/gallery/studio/Slingshot_Studios_04.jpg",
    "images/gallery/studio/Slingshot_Studios_05.jpg",
  ],
  wedding: [
    "images/gallery/wedding/Weddings - Slingshot Studios.jpg",
    "images/gallery/wedding/Weddings - Slingshot Studios 2.jpg",
    "images/gallery/wedding/Weddings - Slingshot Studios 3.jpg",
  ],
  corporate: [
    "images/gallery/corporate/Slingshot_Studios_01.jpg",
    "images/gallery/corporate/Slingshot_Studios_02.jpg",
  ],
  outdoor: [
    "images/gallery/outdoor/Outdoor Shoot - Slingshot Studios.jpg",
    "images/gallery/outdoor/Outdoor Shoot 2.jpg",
  ],
  event: [
    "images/gallery/event/Events - Slingshot Studios.jpg",
    "images/gallery/event/event2.jpg",
  ],
};

const galleryCards = document.querySelectorAll(".gallery-categories .card");
const categoriesSection = document.getElementById("galleryCategories");
const galleryView = document.getElementById("galleryView");
const galleryGrid = document.getElementById("galleryGrid");
const galleryTitle = document.getElementById("galleryTitle");
const closeGalleryBtn = document.getElementById("closeGallery");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

//OPEN / CLOSE GALLERY
function openGallery(key, title) {
  const images = galleryData[key];
  if (!images) return;

  galleryTitle.textContent = title;
  renderGallery(images);

  categoriesSection.classList.add("hidden");
  galleryView.classList.add("active");

  history.pushState({ gallery: key }, "", `?gallery=${key}`);
}

function closeGallery() {
  galleryView.classList.remove("active");
  categoriesSection.classList.remove("hidden");

  history.pushState({}, "", window.location.pathname);
}

//CATEGORY CLICK
galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    openGallery(card.dataset.gallery, card.textContent);
  });
});

closeGalleryBtn.addEventListener("click", closeGallery);

//URL SYNC (BACK BUTTON SUPPORT)
window.addEventListener("popstate", () => {
  galleryView.classList.remove("active");
  categoriesSection.classList.remove("hidden");
});

const params = new URLSearchParams(window.location.search);
const initialGallery = params.get("gallery");

if (initialGallery && galleryData[initialGallery]) {
  const card = document.querySelector(`[data-gallery="${initialGallery}"]`);
  openGallery(initialGallery, card?.textContent || "");
}

// RENDER GALLERY
function renderGallery(images) {
  galleryGrid.innerHTML = images
    .map(
      (src, i) => `
        <img
          data-src="${src}"
          data-index="${i}"
          alt=""
        />
      `,
    )
    .join("");

  setupLazyImages();

  document.querySelectorAll(".gallery-grid img").forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(images, Number(img.dataset.index));
    });
  });
}

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
    { threshold: 0.15 },
  );

  imgs.forEach((img) => observer.observe(img));
}

//LIGHTBOX + SWIPE LEFT / RIGHT
let currentImages = [];
let currentIndex = 0;
let startX = 0;

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;

  lightboxImg.src = images[index];
  lightbox.classList.add("active");
}

closeLightbox.addEventListener("click", () =>
  lightbox.classList.remove("active"),
);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const diff = startX - e.changedTouches[0].clientX;

  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentIndex < currentImages.length - 1) {
      currentIndex++;
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
    }
    lightboxImg.src = currentImages[currentIndex];
  }
});

//SWIPE DOWN TO CLOSE GALLERY (MOBILE)
let startY = 0;
let endY = 0;

galleryView.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

galleryView.addEventListener("touchend", (e) => {
  endY = e.changedTouches[0].clientY;

  if (endY - startY > 120) {
    closeGallery();
  }
});
