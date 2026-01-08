// home.js - Home Page Specific Functionality
// Home page initialization
function initializeHomePage() {
  console.log('Initializing Home Page');
  
  // Setup hero section interactions
  setupHeroSection();
  
  // Setup any home page specific animations
  setupHomeAnimations();
  
  // Update navigation for home page
  highlightCurrentPage();
}

// Setup hero section
function setupHeroSection() {
  // Add scroll animation for hero stats
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    // Animate numbers when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
  }
}

// Animate number counting
function animateNumber(element) {
  const target = parseInt(element.textContent.replace('+', ''));
  const duration = 2000; // 2 seconds
  const step = target / (duration / 16); // 60fps
  
  let current = 0;
  const increment = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current) + '+';
      requestAnimationFrame(increment);
    } else {
      element.textContent = target + '+';
    }
  };
  
  increment();
}

// Setup home page animations
function setupHomeAnimations() {
  // Add fade-in animations for cards
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// Parallax effect for hero section
function setupParallaxEffect() {
  const heroSection = document.querySelector('.hero-transition');
  if (!heroSection) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    heroSection.style.transform = `translateY(${rate}px)`;
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHomePage);
} else {
  initializeHomePage();
}