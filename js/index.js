// // Smooth scrolling for navigation links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });

// // Add active class to navigation items
// window.addEventListener('scroll', function() {
//     const sections = document.querySelectorAll('section[id]');
//     const navLinks = document.querySelectorAll('.nav-links a');
    
//     let current = '';
//     sections.forEach(section => {
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.clientHeight;
//         if (pageYOffset >= (sectionTop - 200)) {
//             current = section.getAttribute('id');
//         }
//     });

//     navLinks.forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('href') === '#' + current) {
//             link.classList.add('active');
//         }
//     });
// });

// // Mobile menu toggle functionality (if needed for future mobile menu)
// function toggleMobileMenu() {
//     const navLinks = document.querySelector('.nav-links');
//     navLinks.classList.toggle('mobile-active');
// }

// // Add scroll effect to hero section (optional parallax effect)
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// // Form validation (for future contact forms)
// function validateForm(form) {
//     const requiredFields = form.querySelectorAll('[required]');
//     let isValid = true;
    
//     requiredFields.forEach(field => {
//         if (!field.value.trim()) {
//             field.classList.add('error');
//             isValid = false;
//         } else {
//             field.classList.remove('error');
//         }
//     });
    
//     return isValid;
// }

// // Animation on scroll (intersection observer)
// const observerOptions = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
// };

// const observer = new IntersectionObserver(function(entries) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('animate-in');
//         }
//     });
// }, observerOptions);

// // Observe all service cards and features for animation
// document.addEventListener('DOMContentLoaded', function() {
//     const animatedElements = document.querySelectorAll('.service-card, .feature, .section-title');
//     animatedElements.forEach(el => {
//         observer.observe(el);
//     });
// });

// // Phone number formatting (for contact forms)
// function formatPhoneNumber(input) {
//     let value = input.value.replace(/\D/g, '');
//     let formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    
//     if (value.length === 10) {
//         input.value = formattedValue;
//     }
// }

// // Email validation
// function validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// // Service request tracking (for analytics)
// function trackServiceRequest(service) {
//     console.log(`Service request tracked: ${service}`);
//     // Add analytics tracking code here if needed
// }

// // Contact button click tracking
// document.addEventListener('DOMContentLoaded', function() {
//     const contactButtons = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
    
//     contactButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const action = this.href.includes('tel:') ? 'phone_call' : 'email_click';
//             console.log(`Contact action: ${action}`);
//             // Add analytics tracking here if needed
//         });
//     });
// });

// // Lazy loading for images (for future image galleries)
// function lazyLoadImages() {
//     const images = document.querySelectorAll('img[data-src]');
//     const imageObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 img.src = img.dataset.src;
//                 img.classList.remove('lazy');
//                 imageObserver.unobserve(img);
//             }
//         });
//     });

//     images.forEach(img => imageObserver.observe(img));
// }

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     lazyLoadImages();
    
//     // Add any initialization code here
//     console.log('Aguirre\'s Landscaping Services website loaded successfully!');
// });