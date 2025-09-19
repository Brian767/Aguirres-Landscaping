window.addEventListener("scroll", function () {
  const contactBar = document.querySelector(".contact-bar");
  if (!contactBar) return;

  if (window.scrollY > 5) {
    contactBar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, .2)";
    contactBar.style.background = "rgba(255, 255, 255, 1)";
  } else {
    contactBar.style.boxShadow = "none";
    contactBar.style.background = "none";
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu toggle button
  const nav = document.querySelector('.main-nav .container');
  const navLinks = document.querySelector('.nav-links');
  
  // Create hamburger menu button
  const mobileToggle = document.createElement('button');
  mobileToggle.className = 'mobile-menu-toggle';
  mobileToggle.innerHTML = '<span></span><span></span><span></span>';
  mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
  
  // Insert the toggle button after the logo
  nav.appendChild(mobileToggle);
  
  // Toggle mobile menu
  mobileToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('mobile-active');
    document.body.style.overflow = navLinks.classList.contains('mobile-active') ? 'hidden' : '';
  });
  
  // Close menu when clicking on a link
  const navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', function() {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('mobile-active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navLinks.classList.contains('mobile-active') && 
        !navLinks.contains(event.target) && 
        !mobileToggle.contains(event.target)) {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('mobile-active');
      document.body.style.overflow = '';
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('mobile-active');
      document.body.style.overflow = '';
    }
  });
});

// Updated scroll behavior for contact bar
window.addEventListener("scroll", function () {
  const contactBar = document.querySelector(".contact-bar");
  if (!contactBar) return;
  
  // Only apply scroll effects on larger screens
  if (window.innerWidth > 768) {
    if (window.scrollY > 5) {
      contactBar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, .2)";
      contactBar.style.background = "rgba(255, 255, 255, 1)";
    } else {
      contactBar.style.boxShadow = "none";
      contactBar.style.background = "none";
    }
  }
});