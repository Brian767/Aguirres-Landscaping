// jobs.js - Job application form functionality

document.addEventListener("DOMContentLoaded", function () {
  const jobApplicationForm = document.getElementById("jobApplicationForm");
  const applicationMessage = document.getElementById("applicationMessage");
  const submitButton = jobApplicationForm.querySelector(
    'button[type="submit"]'
  );
  const originalButtonText = submitButton.textContent;

  // Form validation
  function validateForm(formData) {
    const email = formData.get("applicantEmail");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return false;
    }

    return true;
  }

  // Show message function
  function showMessage(message, type) {
    applicationMessage.textContent = message;
    applicationMessage.className = `form-message ${type}`;
    applicationMessage.style.display = "block";

    // Auto-hide message after 5 seconds for success
    if (type === "success") {
      setTimeout(() => {
        applicationMessage.style.display = "none";
      }, 5000);
    }
  }

  // Format phone number
  function formatPhoneNumber(value) {
    const phone = value.replace(/\D/g, "");
    if (phone.length === 0) return "";
    if (phone.length <= 3) return `(${phone}`;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  }

  // Phone number formatting on input
  const phoneInput = document.getElementById("applicantPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      const formatted = formatPhoneNumber(e.target.value);
      e.target.value = formatted;
    });
  }

  // File size validation
  const resumeInput = document.getElementById("resume");
  if (resumeInput) {
    resumeInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          showMessage(
            "File size must be less than 5MB. Please choose a smaller file.",
            "error"
          );
          e.target.value = "";
          return;
        }

        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];
        if (!allowedTypes.includes(file.type)) {
          showMessage("Please upload a PDF, DOC, DOCX, or TXT file.", "error");
          e.target.value = "";
          return;
        }
      }
    });
  }

  // Handle form submission
  jobApplicationForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Clear previous messages
    applicationMessage.style.display = "none";

    // Get form data
    const formData = new FormData(jobApplicationForm);

    // Validate form
    if (!validateForm(formData)) {
      return;
    }

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    submitButton.classList.add("loading");

    try {
      // For now, just simulate form submission
      // In a real implementation, you would send this to your server or email service
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

      // Show success message
      showMessage(
        "Thank you for your application! We'll review your submission and get back to you within 3 business days.",
        "success"
      );

      // Reset form
      jobApplicationForm.reset();

      // Optional: Track form submission
      if (typeof gtag !== "undefined") {
        gtag("event", "form_submit", {
          event_category: "Jobs",
          event_label: "Job Application",
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);

      // Show error message
      showMessage(
        "Sorry, there was an error submitting your application. Please try again or email us directly at aguirreservice@yahoo.com.",
        "error"
      );
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      submitButton.classList.remove("loading");
    }
  });

  // Form field validation on blur
  const requiredFields = jobApplicationForm.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    field.addEventListener("blur", function () {
      if (!this.value.trim()) {
        this.style.borderColor = "#ff6b6b";
      } else {
        this.style.borderColor = "#ddd";
      }
    });
  });

  // Character counter for text areas
  const textAreas = jobApplicationForm.querySelectorAll("textarea");
  textAreas.forEach((textArea) => {
    const maxLength = 500;
    const counterDiv = document.createElement("div");
    counterDiv.className = "character-counter";
    counterDiv.style.fontSize = "12px";
    counterDiv.style.color = "#666";
    counterDiv.style.marginTop = "5px";
    counterDiv.style.textAlign = "right";
    textArea.parentElement.appendChild(counterDiv);

    function updateCounter() {
      const remaining = maxLength - textArea.value.length;
      counterDiv.textContent = `${remaining} characters remaining`;

      if (remaining < 50) {
        counterDiv.style.color = "#ff6b6b";
      } else {
        counterDiv.style.color = "#666";
      }
    }

    textArea.addEventListener("input", updateCounter);
    updateCounter();
  });
});
