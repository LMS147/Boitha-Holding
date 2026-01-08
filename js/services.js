// services.js - Services Booking Functionality
// Services page initialization
function setupServicesPage() {
  console.log('Initializing Services Page');
  
  // Setup Book Now buttons
  setupBookNowButtons();
  
  // Setup booking form
  setupBookingForm();
  
  // Update navigation for services page
  highlightCurrentPage();
}

// Book Now buttons functionality
function setupBookNowButtons() {
  const bookButtons = document.querySelectorAll('.btn-book[data-service]');
  
  bookButtons.forEach(button => {
    button.addEventListener('click', function() {
      const serviceName = this.getAttribute('data-service');
      showBookingForm(serviceName);
    });
  });
}

// Setup booking form
function setupBookingForm() {
  const bookingForm = document.getElementById('bookingFormElement');
  if (bookingForm) {
    bookingForm.addEventListener('submit', submitBooking);
  }
  
  // Setup cancel button
  const cancelButton = document.querySelector('.btn-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', hideBookingForm);
  }
  
  // Set minimum date for event date to today
  const eventDateInput = document.getElementById('eventDate');
  if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.min = today;
  }
}

// Show booking form
function showBookingForm(serviceName) {
  currentService = serviceName;
  
  const serviceNameElement = document.getElementById('serviceName');
  const bookingForm = document.getElementById('bookingForm');
  const successMessage = document.getElementById('successMessage');
  
  if (serviceNameElement) {
    serviceNameElement.textContent = serviceName;
  }
  
  if (bookingForm) {
    bookingForm.classList.add('active');
    bookingForm.style.display = 'block';
  }
  
  if (successMessage) {
    successMessage.classList.remove('active');
  }
  
  // Scroll to booking form
  setTimeout(() => {
    if (bookingForm) {
      bookingForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 100);
}

// Hide booking form
function hideBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  const bookingFormElement = document.getElementById('bookingFormElement');
  const successMessage = document.getElementById('successMessage');
  
  if (bookingForm) {
    bookingForm.classList.remove('active');
    bookingForm.style.display = 'none';
  }
  
  if (bookingFormElement) {
    bookingFormElement.reset();
  }
  
  if (successMessage) {
    successMessage.classList.remove('active');
  }
}

// Submit booking
async function submitBooking(event) {
  event.preventDefault();

  const bookingData = {
    service: currentService,
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    company: document.getElementById('company').value,
    eventDate: document.getElementById('eventDate').value,
    eventType: document.getElementById('eventType').value,
    attendees: document.getElementById('attendees').value,
    location: document.getElementById('location').value,
    details: document.getElementById('details').value,
    submittedAt: new Date().toISOString()
  };

  // Validate required fields
  if (!bookingData.fullName || !bookingData.email || !bookingData.phone || !bookingData.eventDate || !bookingData.eventType || !bookingData.location) {
    showAlert('Please fill in all required fields', 'error');
    return;
  }

  // Validate email
  if (!validateEmail(bookingData.email)) {
    showAlert('Please enter a valid email address', 'error');
    return;
  }

  // Validate phone
  if (!validatePhone(bookingData.phone)) {
    showAlert('Please enter a valid phone number', 'error');
    return;
  }

  // Show loading state
  const submitButton = event.target.querySelector('.btn-submit');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = 'Processing...';

  try {
    // Send email notification
    await sendBookingEmailNotification(bookingData);

    // Show success message
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
      successMessage.classList.add('active');
    }

    // Reset form
    document.getElementById('bookingFormElement').reset();

    // Hide booking form
    hideBookingForm();

    // Scroll to success message
    setTimeout(() => {
      if (successMessage) {
        successMessage.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);

    showAlert('Booking request submitted successfully!', 'info');

  } catch (error) {
    console.error('Error submitting booking:', error);
    showAlert('Failed to submit booking. Please try again or contact us directly.', 'error');
  } finally {
    // Restore button
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
}

// Send booking email notification
async function sendBookingEmailNotification(data) {
  // Create email content
  const emailSubject = `New Booking Request: ${data.service}`;
  const emailBody = `
New Booking Request Received

Service: ${data.service}
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'N/A'}
Event Date: ${data.eventDate}
Event Type: ${data.eventType}
Attendees: ${data.attendees || 'N/A'}
Location: ${data.location}

Additional Details:
${data.details || 'None provided'}

Submitted: ${new Date(data.submittedAt).toLocaleString()}
  `.trim();

  // Create mailto link
  const mailtoLink = `mailto:admin@boitha.co.za?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
  // Open email client
  window.open(mailtoLink, '_blank');
  
  return Promise.resolve();
}

// Initialize services page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupServicesPage);
} else {
  setupServicesPage();
}