// contact.js - Complete working contact form with EmailJS

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key (already in HTML)
    // Make sure emailjs is initialized in your HTML with your public key
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // EmailJS configuration
    const SERVICE_ID = 'service_q4ctasa'; // Replace with your EmailJS service ID
    const TEMPLATE_ID = 'template_tri310o'; // Replace with your EmailJS template ID
    
    // Form validation
    function validateForm(formData) {
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        return true;
    }
    
    // Show message function
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide message after 5 seconds for success
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Format phone number
    function formatPhoneNumber(value) {
        const phone = value.replace(/\D/g, '');
        if (phone.length === 0) return '';
        if (phone.length <= 3) return `(${phone}`;
        if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
        return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
    }
    
    // Phone number formatting on input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const formatted = formatPhoneNumber(e.target.value);
            e.target.value = formatted;
        });
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous messages
        formMessage.style.display = 'none';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Prepare template parameters for EmailJS
        const templateParams = {
            from_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone') || 'Not provided',
            service: formData.get('service') || 'Not specified',
            message: formData.get('message'),
            newsletter: formData.get('newsletter') ? 'Yes' : 'No',
            to_email: 'brianramirezbro@gmail.com', // Your email
            reply_to: formData.get('email')
        };
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.classList.add('loading');
        
        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            
            // Show success message
            showMessage(
                'Thank you for your message! We\'ll get back to you within 24 hours.',
                'success'
            );
            
            // Reset form
            contactForm.reset();
            
            // Optional: Track form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
            
        } catch (error) {
            console.error('Error sending email:', error);
            
            // Show error message
            showMessage(
                'Sorry, there was an error sending your message. Please try again.',
                'error'
            );
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            submitButton.classList.remove('loading');
        }
    });
    
    // Optional: Add character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 1000;
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter';
        counterDiv.style.fontSize = '12px';
        counterDiv.style.color = '#666';
        counterDiv.style.marginTop = '5px';
        counterDiv.style.textAlign = 'right';
        messageField.parentElement.appendChild(counterDiv);
        
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counterDiv.textContent = `${remaining} characters remaining`;
            
            if (remaining < 100) {
                counterDiv.style.color = '#ff6b6b';
            } else {
                counterDiv.style.color = '#666';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
    
    // Form field validation on blur
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    });
});

