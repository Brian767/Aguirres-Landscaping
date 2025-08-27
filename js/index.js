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
