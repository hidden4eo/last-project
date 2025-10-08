// ===== Mobile Menu =====
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.querySelector("ul").classList.toggle("show");
});

// ===== Promise Example: Package Loading =====
const exploreBtn = document.querySelector('.hero .btn');
const packagesSection = document.querySelector('#packages');

const loaderHTML = `
  <div class="loader-container">
    <div class="spinner"></div>
    <p>Loading packages...</p>
  </div>
`;

function loadPackages() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Packages loaded successfully!"), 2000);
  });
}

exploreBtn.addEventListener('click', (e) => {
  e.preventDefault();
  packagesSection.scrollIntoView({ behavior: 'smooth' });
  packagesSection.innerHTML = loaderHTML;

  loadPackages().then(() => {
    packagesSection.innerHTML = `
      <h2>Travel Packages</h2>
      <div class="package-grid fade-in">
        <div class="package">
          <h3>Adventure Getaway</h3>
          <p>7-day guided tour with hiking, rafting, and mountain views.</p>
          <button class="btn book-btn">Book Now</button>
        </div>
        <div class="package">
          <h3>Luxury Escape</h3>
          <p>5-star accommodations with spa and gourmet dining included.</p>
          <button class="btn book-btn">Book Now</button>
        </div>
        <div class="package">
          <h3>Beach Paradise</h3>
          <p>Relax on pristine beaches with sunset cruises and island tours.</p>
          <button class="btn book-btn">Book Now</button>
        </div>
      </div>
    `;
    setupBookingModals();
  });
});

// ===== Toast Notification for Contact Form =====
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast("Message sent successfully!");
  contactForm.reset();
});

// Toast Function
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== Modal for "Book Now" Buttons =====
function setupBookingModals() {
  const bookButtons = document.querySelectorAll('.book-btn');
  bookButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      openBookingModal(btn.closest('.package').querySelector('h3').textContent);
    });
  });
}

function openBookingModal(packageName) {
  // Remove any existing modal
  const oldModal = document.querySelector('.modal-overlay');
  if (oldModal) oldModal.remove();

  // Create overlay
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>Book Your Travel</h2>
      <form class="booking-form">
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <input type="text" placeholder="Preferred Destination" required>
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div style="flex:1;">
            <label style="font-size:0.95rem;">From</label>
            <input type="date" required>
          </div>
          <div style="flex:1;">
            <label style="font-size:0.95rem;">To</label>
            <input type="date" required>
          </div>
        </div>
        <button type="submit" class="btn">Confirm Booking</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal on X
  modal.querySelector('.close-btn').onclick = () => modal.remove();

  // Close modal on overlay click
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  // Optional: handle form submit
  modal.querySelector('form').onsubmit = function(e) {
    e.preventDefault();
    modal.remove();
    showToast("Booking submitted!");
  };
}

// Attach modal logic to all book buttons
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.onclick = () => openBookingModal();
});



