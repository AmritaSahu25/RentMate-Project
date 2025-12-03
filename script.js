// Basic demo data and interactivity for RentMate UI

const properties = [
  {
    id: 1,
    title: "2 BHK Apartment in City Center",
    location: "Bengaluru, Karnataka",
    type: "apartment",
    rent: 28000,
    beds: 2,
    baths: 2,
    area: "950 sqft",
    status: "available",
    updated: "2 days ago"
  },
  {
    id: 2,
    title: "Modern Studio near Tech Park",
    location: "Hyderabad, Telangana",
    type: "studio",
    rent: 18000,
    beds: 1,
    baths: 1,
    area: "520 sqft",
    status: "available",
    updated: "5 days ago"
  },
  {
    id: 3,
    title: "3 BHK Independent House",
    location: "Pune, Maharashtra",
    type: "house",
    rent: 42000,
    beds: 3,
    baths: 3,
    area: "1,600 sqft",
    status: "occupied",
    updated: "1 week ago"
  }
];

function formatCurrency(amount) {
  if (!amount && amount !== 0) return "₹—";
  return `₹${amount.toLocaleString("en-IN")}`;
}

function renderProperties(list) {
  const container = document.getElementById("property-list");
  if (!container) return;

  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML =
      '<p style="font-size:0.85rem;color:#6b7280;">No properties match your filters yet. Try adjusting the rent range or property type.</p>';
    return;
  }

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "rm-card";

    card.innerHTML = `
      <header class="rm-card-header">
        <div>
          <h3 class="rm-card-title">${p.title}</h3>
          <p style="font-size:0.8rem;color:#6b7280;">${p.location}</p>
        </div>
        <div class="rm-card-rent">${formatCurrency(p.rent)}/month</div>
      </header>
      <div class="rm-card-meta">
        <span><strong>${p.beds}</strong> bed</span>
        <span><strong>${p.baths}</strong> bath</span>
        <span>${p.area}</span>
        <span style="text-transform:capitalize;">${p.type}</span>
      </div>
      <span class="rm-card-status ${
        p.status === "available"
          ? "rm-card-status--available"
          : "rm-card-status--occupied"
      }">
        ${p.status === "available" ? "Available" : "Occupied"}
      </span>
      <footer class="rm-card-footer">
        <span>Updated ${p.updated}</span>
        <button class="rm-btn rm-btn-outline" type="button">View Details</button>
      </footer>
    `;

    container.appendChild(card);
  });
}

function setupSearch() {
  const form = document.getElementById("search-form");
  const result = document.getElementById("search-result");
  if (!form || !result) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const locationValue = document.getElementById("location")?.value.trim().toLowerCase();
    const typeValue = document.getElementById("type")?.value;
    const minRent = parseInt(document.getElementById("min-rent")?.value, 10);
    const maxRent = parseInt(document.getElementById("max-rent")?.value, 10);

    let filtered = [...properties];

    if (locationValue) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(locationValue)
      );
    }

    if (typeValue) {
      filtered = filtered.filter((p) => p.type === typeValue);
    }

    if (!Number.isNaN(minRent)) {
      filtered = filtered.filter((p) => p.rent >= minRent);
    }

    if (!Number.isNaN(maxRent)) {
      filtered = filtered.filter((p) => p.rent <= maxRent);
    }

    renderProperties(filtered);

    if (filtered.length) {
      result.textContent = `Showing ${filtered.length} matching rental${
        filtered.length > 1 ? "s" : ""
      } (demo data).`;
    } else {
      result.textContent = "No rentals found for the selected filters (demo data).";
    }
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const result = document.getElementById("contact-result");
  if (!form || !result) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();

    result.textContent = name
      ? `Thanks, ${name}! We’ve recorded your request (demo only).`
      : "Thanks! We’ve recorded your request (demo only).";

    form.reset();

    setTimeout(() => {
      result.textContent = "";
    }, 4000);
  });
}

function setupNav() {
  const nav = document.querySelector(".rm-nav");
  const links = document.querySelectorAll(".rm-nav-links a");
  const toggle = document.querySelector(".rm-nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("rm-nav--open");
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 72,
            behavior: "smooth"
          });
        }
      }

      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      if (nav && nav.classList.contains("rm-nav--open")) {
        nav.classList.remove("rm-nav--open");
      }
    });
  });
}

function setYear() {
  const el = document.getElementById("year");
  if (el) {
    el.textContent = new Date().getFullYear().toString();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProperties(properties);
  setupSearch();
  setupContactForm();
  setupNav();
  setYear();
});


