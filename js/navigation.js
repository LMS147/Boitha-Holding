// navigation.js - Clean, reliable mobile menu toggle

function toggleMenu() {
  const nav = document.getElementById("navigation");
  const hamburger = document.querySelector(".hamburger");

  if (!nav || !hamburger) return;

  const isActive = nav.classList.contains("mobile-active");

  if (isActive) {
    nav.classList.remove("mobile-active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
  } else {
    nav.classList.add("mobile-active");
    hamburger.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeMenu() {
  const nav = document.getElementById("navigation");
  const hamburger = document.querySelector(".hamburger");

  if (nav && nav.classList.contains("mobile-active")) {
    nav.classList.remove("mobile-active");
    if (hamburger) hamburger.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function highlightCurrentPage() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll("#navigation a");

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");
    if (!href) return;

    // Handle home page
    if (
      (path === "/" || path.includes("index.html") || path === "") &&
      href === "./index.html"
    ) {
      link.classList.add("active");
    }
    // Match other pages
    else if (path.includes(href.replace("./", ""))) {
      link.classList.add("active");
    }
  });
}

// Set up everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelectorAll("#navigation a");

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking a nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const nav = document.getElementById("navigation");
    if (!nav) return;

    const isClickInside =
      nav.contains(e.target) ||
      e.target.classList.contains("hamburger") ||
      e.target.closest(".hamburger");
    if (!isClickInside && nav.classList.contains("mobile-active")) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Highlight current page
  highlightCurrentPage();
});
