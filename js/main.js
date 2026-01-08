// main.js - Core/Common Functionality
// Global variables
let currentService = "";
let bookPrice = 249; // Price per book in ZAR

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("Boitha Holdings Website Initialized");

  // Setup core functionality
  //setupNavigation();
  setupHeroButtons();
  setupClickableContactInfo();

  // Check current page and initialize page-specific scripts
  initializePageBasedOnCurrentPage();
});

// Initialize page-specific scripts based on current page
function initializePageBasedOnCurrentPage() {
  const currentPath = window.location.pathname;
  const currentPage = getCurrentPageName(currentPath);

  console.log("Current page:", currentPage);

  switch (currentPage) {
    case "services":
      if (typeof setupServicesPage === "function") {
        setupServicesPage();
      }
      break;
    case "author":
      if (typeof setupAuthorPage === "function") {
        setupAuthorPage();
      }
      break;
    case "contact":
      if (typeof setupContactPage === "function") {
        setupContactPage();
      }
      break;
    case "about":
      if (typeof setupAboutPage === "function") {
        setupAboutPage();
      }
      break;
    case "index":
    case "":
    default:
      // Home page is default
      if (typeof initializeHomePage === "function") {
        initializeHomePage();
      }
      break;
  }
}

// Helper function to get current page name
function getCurrentPageName(path) {
  if (!path || path === "/" || path.endsWith("index.html") || path === "") {
    return "index";
  }

  // Extract page name from path
  const pageMatch = path.match(/([^\/]+)\.html$/);
  if (pageMatch) {
    return pageMatch[1];
  }

  return "index";
}

// Setup hero buttons (for home page)
function setupHeroButtons() {
  const heroButtons = document.querySelectorAll(
    ".btn-hero-primary, .btn-hero-secondary"
  );
  heroButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // For buttons with href, let browser handle navigation
      const href = this.getAttribute("href");
      if (href && href.includes(".html")) {
        return; // Let browser navigate normally
      }

      event.preventDefault();

      // For buttons without href, navigate based on text
      const targetPage = this.textContent.includes("Services")
        ? "services.html"
        : "contact.html";
      window.location.href = targetPage;
    });
  });
}

// Setup clickable contact information
function setupClickableContactInfo() {
  // Wait a bit to ensure DOM is fully loaded
  setTimeout(() => {
    // Find all text nodes that contain phone numbers or emails
    document
      .querySelectorAll(".contact-item, .card, p, span")
      .forEach((element) => {
        // Skip elements that already have links or are in links
        if (element.closest("a") || element.tagName === "A") {
          return;
        }

        const text = element.textContent || "";

        // Handle South African phone numbers
        const phoneRegex = /(\+?27|0)[\s-]?(\d{2})[\s-]?(\d{3})[\s-]?(\d{4})/g;

        // Handle email addresses
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

        let newHTML = element.innerHTML;
        let updated = false;

        // Replace phone numbers with tel: links
        newHTML = newHTML.replace(phoneRegex, (match) => {
          updated = true;
          // Clean up the phone number for tel: link
          const cleanNumber = match.replace(/[\s-]/g, "");
          // Ensure it starts with +27 for international dialing
          const telNumber = cleanNumber.startsWith("0")
            ? "+27" + cleanNumber.substring(1)
            : cleanNumber.startsWith("27")
            ? "+" + cleanNumber
            : cleanNumber;
          return `<a href="tel:${telNumber}" class="clickable-contact">${match}</a>`;
        });

        // Replace email addresses with mailto: links
        newHTML = newHTML.replace(emailRegex, (match) => {
          updated = true;
          return `<a href="mailto:${match}" class="clickable-contact">${match}</a>`;
        });

        // Only update if changes were made
        if (updated && newHTML !== element.innerHTML) {
          element.innerHTML = newHTML;
        }
      });

    // Add clickable class to existing links in contact info
    document.querySelectorAll(".contact-item a").forEach((link) => {
      link.classList.add("clickable-contact");
    });
  }, 100);
}

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Phone validation helper
function validatePhone(phone) {
  const re = /^[\+]?[1-9][\d\s\-\(\)\.]{7,}$/;
  return re.test(phone);
}

// Generate order reference
function generateOrderReference() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `BOITHABK-${timestamp}${random}`;
}

// Save order to localStorage
function saveOrderToStorage(orderData) {
  try {
    let orders = JSON.parse(localStorage.getItem("boitha_book_orders") || "[]");
    orders.push(orderData);
    localStorage.setItem("boitha_book_orders", JSON.stringify(orders));
    console.log("Order saved to localStorage");
  } catch (error) {
    console.error("Error saving order:", error);
  }
}

// Alert helper for success messages
function showAlert(message, type = "info") {
  // Remove any existing alert
  const existingAlert = document.querySelector(".custom-alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert element
  const alert = document.createElement("div");
  alert.className = `custom-alert alert-${type}`;
  alert.innerHTML = `
    <div class="alert-content">
      <span class="alert-message">${message}</span>
      <button class="alert-close">&times;</button>
    </div>
  `;

  // Add styles if not already added
  if (!document.querySelector("#alert-styles")) {
    const styles = document.createElement("style");
    styles.id = "alert-styles";
    styles.textContent = `
      .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease;
      }
      
      .alert-content {
        padding: 15px 20px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .alert-info .alert-content {
        background: #d4edda;
        color: #155724;
        border-left: 4px solid #28a745;
      }
      
      .alert-error .alert-content {
        background: #f8d7da;
        color: #721c24;
        border-left: 4px solid #dc3545;
      }
      
      .alert-warning .alert-content {
        background: #fff3cd;
        color: #856404;
        border-left: 4px solid #ffc107;
      }
      
      .alert-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        margin-left: 20px;
        color: inherit;
      }
      
      .alert-close:hover {
        opacity: 0.7;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  document.body.appendChild(alert);

  // Add close button functionality
  alert.querySelector(".alert-close").addEventListener("click", () => {
    alert.remove();
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove();
    }
  }, 5000);
}

// Add clickable contact styles
function addClickableContactStyles() {
  if (!document.querySelector("#clickable-contact-styles")) {
    const style = document.createElement("style");
    style.id = "clickable-contact-styles";
    style.textContent = `
      .clickable-contact {
        color: #1a237e;
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
        border-bottom: 1px dashed #1a237e;
      }
      
      .clickable-contact:hover {
        color: #0d154d;
        text-decoration: none;
        border-bottom: 1px solid #0d154d;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize clickable contact styles on load
document.addEventListener("DOMContentLoaded", addClickableContactStyles);
