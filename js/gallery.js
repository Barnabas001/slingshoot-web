//GALLERY MODULE (HOME + GALLERY VIEW)
const galleryRoot = document.getElementById("galleryView");
const categoriesSection = document.getElementById("galleryCategories");

if (!galleryRoot || !categoriesSection) {
  console.info("Gallery JS skipped (not on this page)");
} else {
  //DATA
  const galleryData = {
    studio: [
      "images/gallery/studio/Slingshot_Studios_03.jpg",
      "images/gallery/studio/Slingshot_Studios_03.jpg",
      "images/gallery/studio/Slingshot_Studios_03.jpg",
    ],
    wedding: [
      "images/gallery/wedding/Weddings - Slingshot Studios.jpg",
      "images/gallery/wedding/Weddings - Slingshot Studios.jpg",
    ],
    corporate: [
      "images/gallery/corporate/Slingshot_Studios_01.jpg",
      "images/gallery/corporate/Slingshot_Studios_01.jpg",
    ],
    outdoor: [
      "images/gallery/outdoor/Outdoor Shoot - Slingshot Studios.jpg",
      "images/gallery/outdoor/Outdoor Shoot - Slingshot Studios.jpg",
    ],
    event: [
      "images/gallery/event/event1.jpg",
      "images/gallery/event/Events - Slingshot Studios.jpg",
    ],
  };

  //ELEMENTS
  const cards = document.querySelectorAll(".gallery-categories .card");
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryTitle = document.getElementById("galleryTitle");
  const closeGalleryBtn = document.getElementById("closeGallery");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");

  //STATE
  let currentImages = [];
  let currentIndex = 0;

  let startX = 0;
  let startY = 0;

  //OPEN GALLERY
  function openGallery(key, titleText) {
    const images = galleryData[key];
    if (!images) return;

    galleryTitle.textContent = titleText;
    renderGallery(images);

    categoriesSection.classList.add("hidden");
    galleryRoot.classList.add("active");
    document.body.classList.add("gallery-open");

    history.pushState({ gallery: key }, "", `?gallery=${key}`);
    window.scrollTo({ top: 0 });
  }

  //CLOSE GALLERY
  function closeGallery() {
    galleryRoot.classList.remove("active");
    categoriesSection.classList.remove("hidden");
    document.body.classList.remove("gallery-open");

    history.pushState({}, "", window.location.pathname);
  }

  closeGalleryBtn?.addEventListener("click", closeGallery);

  window.addEventListener("popstate", () => {
    closeGallery();
  });

  //CATEGORY CLICK
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      openGallery(card.dataset.gallery, card.textContent.trim());
    });
  });

  //AUTO OPEN FROM URL
  window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const galleryKey = params.get("gallery");

    if (galleryKey && galleryData[galleryKey]) {
      const card = document.querySelector(
        `.gallery-categories .card[data-gallery="${galleryKey}"]`,
      );

      openGallery(galleryKey, card?.textContent || galleryKey);
    }
  });

  //RENDER GRID
  function renderGallery(images) {
    currentImages = images;

    galleryGrid.innerHTML = images
      .map(
        (src, i) => `
          <img
            data-src="${src}"
            data-index="${i}"
            alt=""
            class="gallery-img"
          />
        `,
      )
      .join("");

    setupLazyLoading();

    galleryGrid.querySelectorAll("img").forEach((img) => {
      img.addEventListener("click", () => {
        openLightbox(Number(img.dataset.index));
      });
    });
  }

  // LAZY LOAD
  function setupLazyLoading() {
    const imgs = galleryGrid.querySelectorAll("img");

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

  // LIGHTBOX
  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = currentImages[index];
    lightbox.classList.add("active");
  }

  function closeLB() {
    lightbox.classList.remove("active");
  }

  closeLightbox?.addEventListener("click", closeLB);

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLB();
  });

  // LIGHTBOX SWIPE
  lightbox?.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox?.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < currentImages.length - 1) currentIndex++;
      if (diff < 0 && currentIndex > 0) currentIndex--;
      lightboxImg.src = currentImages[currentIndex];
    }
  });

  //SWIPE DOWN TO CLOSE GALLERY

  galleryRoot.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  galleryRoot.addEventListener("touchend", (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = endY - startY;

    if (diff > 120) {
      closeGallery();
    }
  });
}
