const STORAGE_KEY = "equipmentData";
const ADMIN_PASSWORD = "sling123";
let isAdmin = false;

let equipmentData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  {
    id: 1,
    name: "Canon 700D",
    category: "Cameras",
    image: "images/rentals/Canon 700D.jpeg",
  },
  {
    id: 1,
    name: "Canon 5d Mark II",
    category: "Cameras",
    image: "images/rentals/canon 5d m2.jpeg",
  },
  {
    id: 2,
    name: "Tripod",
    category: "Cameras",
    image: "images/rentals/Tripod.jpeg",
  },
  {
    id: 3,
    name: "Speedite",
    category: "Lighting",
    image: "images/rentals/speedlite tt520.jpeg",
  },
  {
    id: 4,
    name: "Ziyun S Gimbal",
    category: "Tools",
    image: "images/rentals/gimbal.jpeg",
  },
];

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(equipmentData));
}

const grid = document.getElementById("rentalGrid");
const filters = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const rentModal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const whatsappBtn = document.getElementById("whatsappBtn");

/* ================= ADMIN UI ================= */
const adminWrapper = document.createElement("div");
adminWrapper.innerHTML = `
<div id="adminLogin" style="margin-top:2rem">
<h3>Admin Login</h3>
<input id="adminPass" type="password" placeholder="Password" style="width:100%;padding:0.6rem;margin-bottom:0.5rem" />
<button class="rent-btn" onclick="loginAdmin()">Login</button>
</div>


<div id="adminPanel" style="display:none;margin-top:2rem">
<button class="close-btn" style="margin-bottom:1rem" onclick="logoutAdmin()">Logout</button>
<h3>Add Equipment</h3>
<input id="adminName" placeholder="Equipment Name" style="width:100%;padding:0.6rem;margin-bottom:0.5rem" />
<input id="adminCategory" placeholder="Category" style="width:100%;padding:0.6rem;margin-bottom:0.5rem" />
<input id="adminImage" placeholder="Image URL" style="width:100%;padding:0.6rem;margin-bottom:0.5rem" />
<button class="rent-btn" onclick="addEquipment()">Add Equipment</button>
</div>
`;
document.querySelector(".container").appendChild(adminWrapper);

function loginAdmin() {
  if (document.getElementById("adminPass").value === ADMIN_PASSWORD) {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    isAdmin = true;
    renderItems(equipmentData);
  } else {
    alert("Wrong password");
  }
}

function logoutAdmin() {
  isAdmin = false;
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("adminPass").value = "";
  renderItems(equipmentData);
}

/* ================= RENDER ================= */
function renderFilters() {
  const categories = ["All", ...new Set(equipmentData.map((e) => e.category))];
  filters.innerHTML = categories
    .map(
      (cat) =>
        `<button class="filter-btn" onclick="filterCategory('${cat}', this)">${cat}</button>`,
    )
    .join("");
  filters.firstChild.classList.add("active");
}

function renderItems(items) {
  grid.innerHTML = items
    .map(
      (item) => `
<div class="rental-card">
<img src="${item.image}" alt="${item.name}" />
<div class="rental-info">
<h3>${item.name}</h3>
<button class="rent-btn" onclick="openModal('${item.name}')">Rent</button>
${
  isAdmin
    ? `
<div style="display:flex;gap:0.5rem;margin-top:0.5rem">
<button class="close-btn" onclick="editItem(${item.id})">Edit</button>
<button class="close-btn" onclick="deleteItem(${item.id})">Delete</button>
</div>`
    : ``
}
</div>
</div>
`,
    )
    .join("");
}

/* ================= ACTIONS ================= */
function filterCategory(category, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  if (category === "All") return renderItems(equipmentData);
  renderItems(equipmentData.filter((i) => i.category === category));
}

searchInput.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderItems(equipmentData.filter((i) => i.name.toLowerCase().includes(q)));
});

function addEquipment() {
  const name = adminName.value;
  const category = adminCategory.value;
  const image = adminImage.value || "https://via.placeholder.com/400x300";
  if (!name || !category) return alert("All fields required");

  equipmentData.push({ id: Date.now(), name, category, image });
  saveData();
  renderFilters();
  renderItems(equipmentData);

  adminName.value = adminCategory.value = adminImage.value = "";
}

function editItem(id) {
  const item = equipmentData.find((i) => i.id === id);
  const newName = prompt("Edit equipment name", item.name);
  if (!newName) return;
  item.name = newName;
  saveData();
  renderItems(equipmentData);
}

function deleteItem(id) {
  if (!confirm("Delete this equipment?")) return;
  equipmentData = equipmentData.filter((i) => i.id !== id);
  saveData();
  renderFilters();
  renderItems(equipmentData);
}

function openModal(name) {
  modalTitle.textContent = name;
  whatsappBtn.onclick = () => {
    const msg = encodeURIComponent(
      `Hello, I'm interested in renting the ${name}.`,
    );
    window.open(`https://wa.me/2348037662197?text=${msg}`, "_blank");
  };
  rentModal.classList.add("active");
}

function closeRentModal() {
  rentModal.classList.remove("active");
}

renderFilters();
renderItems(equipmentData);
saveData();
