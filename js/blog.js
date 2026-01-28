let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
const ADMIN_PASSWORD = "sling123";
let isAdmin = false;

const grid = document.getElementById("blogGrid");
const filters = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("blogModal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalImage = document.getElementById("modalImage");
const modalContent = document.getElementById("modalContent");

function saveBlogs() {
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
}

function renderFilters() {
  const categories = ["All", ...new Set(blogPosts.map((b) => b.category))];
  filters.innerHTML = categories
    .map(
      (cat) =>
        `<button class="filter-btn" onclick="filterCategory('${cat}', this)">${cat}</button>`,
    )
    .join("");
  if (filters.firstChild) filters.firstChild.classList.add("active");
}

function renderBlogs(items) {
  grid.innerHTML = items
    .map(
      (b) => `
<div class="blog-card">
<div class="image-wrap"><img src="${b.image}" alt="${b.title}"></div>
<div class="blog-info">
<h3>${b.title}</h3>
<p class="excerpt">${b.content.substring(0, 100)}...</p>
<p class="meta">By ${b.author} | ${b.date} | ${b.category}</p>
<button class="read-btn" onclick="openBlogModal(${b.id})">Read More</button>
${
  isAdmin
    ? `<div style='margin-top:0.5rem; display:flex; gap:0.5rem;'>
<button onclick='editBlog(${b.id})'>Edit</button>
<button onclick='deleteBlog(${b.id})'>Delete</button>
</div>`
    : ""
}
</div>
</div>
`,
    )
    .join("");
}

function filterCategory(category, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderBlogs(
    category === "All"
      ? blogPosts
      : blogPosts.filter((b) => b.category === category),
  );
}

searchInput.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderBlogs(
    blogPosts.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q),
    ),
  );
});

function openBlogModal(id) {
  const blog = blogPosts.find((b) => b.id === id);
  modalTitle.textContent = blog.title;
  modalAuthor.textContent = `By ${blog.author} | ${blog.date} | ${blog.category}`;
  modalImage.src = blog.image;
  modalContent.textContent = blog.content;
  modal.classList.add("active");
}

function closeBlogModal() {
  modal.classList.remove("active");
}

function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === ADMIN_PASSWORD) {
    isAdmin = true;
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    renderBlogs(blogPosts);
  } else {
    alert("Wrong password");
  }
}

function logoutAdmin() {
  isAdmin = false;
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("adminPanel").style.display = "none";
  renderBlogs(blogPosts);
}

function addBlog() {
  const title = document.getElementById("adminTitle").value;
  const category = document.getElementById("adminCategory").value;
  const author = document.getElementById("adminAuthor").value;
  const date = document.getElementById("adminDate").value;
  const image =
    document.getElementById("adminImage").value ||
    "https://via.placeholder.com/600x400";
  const content = document.getElementById("adminContent").value;
  if (!title || !category || !author || !date || !content)
    return alert("All fields required");
  blogPosts.push({
    id: Date.now(),
    title,
    category,
    author,
    date,
    image,
    content,
  });
  saveBlogs();
  renderBlogs(blogPosts);
  document.getElementById("adminTitle").value = "";
  document.getElementById("adminCategory").value = "";
  document.getElementById("adminAuthor").value = "";
  document.getElementById("adminDate").value = "";
  document.getElementById("adminImage").value = "";
  document.getElementById("adminContent").value = "";
}

function deleteBlog(id) {
  if (!confirm("Are you sure?")) return;
  blogPosts = blogPosts.filter((b) => b.id !== id);
  saveBlogs();
  renderBlogs(blogPosts);
}

function editBlog(id) {
  const blog = blogPosts.find((b) => b.id === id);
  const newTitle = prompt("Edit Title", blog.title);
  if (newTitle) blog.title = newTitle;
  const newContent = prompt("Edit Content", blog.content);
  if (newContent) blog.content = newContent;
  saveBlogs();
  renderBlogs(blogPosts);
}

renderFilters();
renderBlogs(blogPosts);
saveBlogs();
