console.log("Gallery JS loaded"); // sanity check

const galleryData = {
  studio: [
    "images/gallery/studio/Slingshot_Studios_03.jpg",
    "images/gallery/studio/Slingshot_Studios_03.jpg",
    ,
    "images/gallery/studio/Slingshot_Studios_03.jpg",
  ],

  wedding: [
    "images/gallery/wedding/Weddings - Slingshot Studios.jpg",
    "images/gallery/wedding/Weddings - Slingshot Studios.jpg",
    "images/gallery/wedding/Weddings - Slingshot Studios.jpg",
  ],

  corporate: [
    "images/gallery/corporate/Slingshot_Studios_01.jpg",
    "images/gallery/corporate/Slingshot_Studios_01.jpg",
    ,
    "images/gallery/corporate/Slingshot_Studios_01.jpg",
  ],

  outdoor: [
    "images/gallery/outdoor/Outdoor Shoot - Slingshot Studios.jpg",
    "images/gallery/outdoor/Outdoor Shoot - Slingshot Studios.jpg",
    ,
    "images/gallery/outdoor/Outdoor Shoot - Slingshot Studios.jpg",
  ],

  event: [
    "images/gallery/event/event1.jpg",
    "images/gallery/event/Events - Slingshot Studios.jpg",
    "images/gallery/event/Events - Slingshot Studios.jpg",
  ],
};

const cards = document.querySelectorAll(".gallery-categories .card");
const categories = document.querySelector(".gallery-categories");
const galleryView = document.getElementById("galleryView");
const galleryGrid = document.getElementById("galleryGrid");
const galleryTitle = document.getElementById("galleryTitle");
const backBtn = document.getElementById("closeGallery");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.gallery;
    const images = galleryData[key];
    if (!images) return;

    galleryTitle.textContent = card.textContent;
    galleryGrid.innerHTML = images
      .map((src) => `<img src="${src}" alt="">`)
      .join("");

    categories.style.display = "none";
    galleryView.style.display = "block";
    window.scrollTo(0, 0);
  });
});

backBtn.addEventListener("click", () => {
  galleryView.style.display = "none";
  categories.style.display = "grid";
});
