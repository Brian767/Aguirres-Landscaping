window.addEventListener('scroll', function() {
    const contactBar = document.querySelector('.contact-bar');
    if (!contactBar) return;

    if (window.scrollY > 0) {
        contactBar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, .2)';
    } else {
        contactBar.style.boxShadow = 'none';
    }
});