document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     FILTERING
  =============================== */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectPhotos = document.querySelectorAll(".project-photo");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter photos
      projectPhotos.forEach(photo => {
        const category = photo.dataset.category;

        if (filter === "all" || category === filter) {
          photo.classList.remove("hidden");
        } else {
          photo.classList.add("hidden");
        }
      });
    });
  });


  /* ===============================
     MODAL / LIGHTBOX
  =============================== */

  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");
  const backdrop = modal.querySelector(".modal-backdrop");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const counter = document.getElementById("carouselCounter");

  let images = [];
  let currentIndex = 0;

  // Open modal when clicking a project
  projectPhotos.forEach(photo => {
    photo.addEventListener("click", () => {
      images = photo.dataset.images.split(",");
      currentIndex = 0;
      openModal();
    });
  });

  function openModal() {
    modal.classList.add("active");
    updateImage();
    toggleCarousel();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateImage() {
    modalImage.src = images[currentIndex];
    counter.textContent =
      images.length > 1 ? `${currentIndex + 1} / ${images.length}` : "";
  }

  function toggleCarousel() {
    const show = images.length > 1;
    prevBtn.style.display = show ? "block" : "none";
    nextBtn.style.display = show ? "block" : "none";
    counter.style.display = show ? "block" : "none";
  }

  /* ===============================
     CAROUSEL CONTROLS
  =============================== */

  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });

  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  });

  /* ===============================
     CLOSE EVENTS
  =============================== */

  modalClose.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight" && images.length > 1) nextBtn.click();
    if (e.key === "ArrowLeft" && images.length > 1) prevBtn.click();
  });

});

  /* ===============================
     SWIPE SUPPORT (MOBILE)
  =============================== */

  let touchStartX = 0;
  let touchEndX = 0;

  const swipeThreshold = 50; // minimum swipe distance

  modalImage.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modalImage.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (images.length <= 1) return;

    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
      // swipe left → next image
      nextBtn.click();
    } else if (diff < -swipeThreshold) {
      // swipe right → previous image
      prevBtn.click();
    }
  }

