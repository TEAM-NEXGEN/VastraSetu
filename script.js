
// DEMO NGO PARTNERS
// These are sample entries, not verified real organizations.

const ngos = [
  {
    name: "Hope Foundation",
    location: "Nagpur",
    work: "Clothing and community support",
    category: "All clothing"
  },
  {
    name: "Helping Hands NGO",
    location: "Nagpur",
    work: "Community donation initiatives",
    category: "All clothing"
  },
  {
    name: "Green Earth Initiative",
    location: "Nagpur",
    work: "Textile reuse and recycling",
    category: "Recycling"
  }
];

// LOCAL DEMO STORAGE

let donations = JSON.parse(
  localStorage.getItem("vastrasetuDonations") || "[]"
);

let selectedDonation = null;

function saveData() {
  localStorage.setItem(
    "vastrasetuDonations",
    JSON.stringify(donations)
  );
}

// NAVIGATION

function goTo(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

function toggleMenu() {
  document.getElementById("nav").classList.toggle("show");
}

function closeMenu() {
  document.getElementById("nav").classList.remove("show");
}

// DISPLAY NGO CARDS

function renderNGOs() {
  document.getElementById("ngoList").innerHTML =
    ngos.map((ngo, index) => `
      <div class="ngo-card">
        <div style="font-size:32px">🏢</div>
        <h3>${ngo.name}</h3>
        <p>📍 ${ngo.location}, Maharashtra</p>
        <p>❤️ ${ngo.work}</p>
        <p>👕 ${ngo.category}</p>
        <span class="status">Demo Partner</span>
        <br>
        <button class="primary"
          onclick="acceptNGO(${index})">
          Select NGO →
        </button>
      </div>
    `).join("");
}

// SUBMIT DONATION

document.getElementById("donationForm")
.addEventListener("submit", function(event) {

  event.preventDefault();

  const donation = {
    id: "VS" + Date.now(),
    donor: document.getElementById("donor").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    category: document.getElementById("category").value,
    quantity: Number(document.getElementById("quantity").value),
    condition: document.getElementById("condition").value,
    location: document.getElementById("location").value.trim(),
    collection: document.getElementById("collection").value,
    address: document.getElementById("address").value.trim(),
    ngo: "",
    status: "Donation Submitted"
  };

  if (!donation.donor || !donation.location ||
      donation.quantity < 1) {
    alert("Please enter valid donation details.");
    return;
  }

  donations.push(donation);
  saveData();

  selectedDonation = donation.id;

  document.getElementById("formResult").style.display = "block";

  document.getElementById("formResult").innerHTML = `
    <h3>🎉 Donation Submitted Successfully!</h3>
    <p>Donor: ${escapeHTML(donation.donor)}</p>
    <p>Donation ID: <strong>${donation.id}</strong></p>
    <p>Clothing Pieces: ${donation.quantity}</p>
    <p>Next: Select an NGO below to continue.</p>
  `;

  this.reset();
  document.getElementById("location").value =
    "Nagpur, Maharashtra";

  renderAll();
  goTo("ngos");
});

// SELECT NGO - DEMO SIMULATION

function acceptNGO(index) {

  if (!donations.length) {
    alert("Please submit a donation first!");
    goTo("donate");
    return;
  }

  const donation = donations.find(
    item => item.id === selectedDonation
  );

  if (!donation) {
    alert("Please submit a new donation first.");
    goTo("donate");
    return;
  }

  const ngo = ngos[index];

  donation.ngo = ngo.name;
  donation.status = "Accepted (Demo)";
  saveData();

  alert(
    ngo.name + " has accepted your donation in this demo!"
  );

  renderAll();
  goTo("tracking");
}

// DASHBOARD

function renderDashboard() {

  document.getElementById("totalDonations").textContent =
    donations.length;

  document.getElementById("totalClothes").textContent =
    donations.reduce((sum, d) => sum + d.quantity, 0);

  document.getElementById("acceptedCount").textContent =
    donations.filter(d => d.ngo !== "").length;
}

// TRACKING

function renderTracking() {

  const container = document.getElementById("trackingList");

  if (!donations.length) {
    container.innerHTML = `
      <div class="card">
        No donations submitted yet. Start by donating clothes!
      </div>
    `;
    return;
  }

  container.innerHTML = donations.slice().reverse().map(d => `
    <div class="track-item">
      <div class="track-icon">📦</div>
      <div>
        <h3>${escapeHTML(d.donor)}</h3>
        <small>${d.id} | ${d.quantity} pieces</small>
        <p>NGO: ${escapeHTML(d.ngo || "Not selected yet")}</p>
        <span class="status">${escapeHTML(d.status)}</span>
      </div>
    </div>
  `).join("");
}

// BASIC HTML ESCAPING

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// REFRESH ALL SECTIONS

function renderAll() {
  renderNGOs();
  renderDashboard();
  renderTracking();
}

renderAll();