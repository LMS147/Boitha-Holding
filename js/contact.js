// contact.js - Contact Page Functionality
// Contact page initialization
function setupContactPage() {
  console.log("Initializing Contact Page");

  // Setup contact form if exists
  setupContactForm();

  // Setup map integration if needed
  setupMapIntegration();

  // Update navigation for contact page
  highlightCurrentPage();
}

// Setup contact form
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", submitContactForm);
  }
}

// Submit contact form
async function submitContactForm(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    subject: document.getElementById("service").value.trim(),
    message: document.getElementById("message").value.trim(),
    submittedAt: new Date().toISOString(),
  };

  // Validate required fields
  if (!formData.name || !formData.email || !formData.message) {
    showAlert("Please fill in all required fields", "error");
    return;
  }

  // Validate email
  if (!validateEmail(formData.email)) {
    showAlert("Please enter a valid email address", "error");
    return;
  }

  // Send contact email
  await sendContactEmail(formData);

  // Show success message
  showAlert("Message sent successfully! We will contact you soon.", "success");

  // Reset form
  event.target.reset();
}

//EMAIL VALIDATION
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//EMAIL SENDING
function sendContactEmail(data) {
  const subject = `Website Query: ${data.service || "General Inquiry"}`;

  const body = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Service: ${data.service || "Not specified"}

Message:
${data.message}

Submitted on: ${new Date(data.submittedAt).toLocaleString()}
  `.trim();

  const mailtoLink = `mailto:admin@boitha.co.za?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
}

// ALERT HANDLING
function showAlert(message, type) {
  let alertBox = document.querySelector(".form-alert");

  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.className = "form-alert";
    document.querySelector(".contact-form").prepend(alertBox);
  }

  alertBox.textContent = message;
  alertBox.classList.remove("error", "success");
  alertBox.classList.add(type);

  setTimeout(() => {
    alertBox.remove();
  }, 4000);
}

//INIT
document.addEventListener("DOMContentLoaded", setupContactPage);