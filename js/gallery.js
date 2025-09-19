// gallery.js 

document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectPhotos = document.querySelectorAll('.project-photo');
  const projectsContainer = document.querySelector('.projects-container');
  
  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects with smooth animation
      projectPhotos.forEach(photo => {
        const category = photo.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          // Show with animation
          photo.style.display = 'block';
          setTimeout(() => {
            photo.classList.remove('hidden');
          }, 0);
        } else {
          // Hide with animation
          photo.classList.add('hidden');
          setTimeout(() => {
            photo.style.display = 'none';
          }, 0);
        }
      });
    });
  });
  
  projectPhotos.forEach(photo => {
    photo.addEventListener('click', function() {
      const category = this.querySelector('.photo-category').textContent;
      console.log('Clicked on:', category);
      // For now, just a simple animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 0);
    });
  });
  
  // Add smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});