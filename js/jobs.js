// jobs.js (updated)
document.addEventListener("DOMContentLoaded", function () {
  const jobForm = document.getElementById("jobApplicationForm");
  const formMessage = document.getElementById("applicationMessage");
  const submitButton = jobForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  // Helper to show status
  function showMessage(message, type = "info") {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";
    if (type === "success") {
      setTimeout(() => (formMessage.style.display = "none"), 6000);
    }
  }

  function validateFormData(formData) {
    const email = (formData.get("applicantEmail") || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return false;
    }
    // basic phone digits check (10 digits)
    const phone = (formData.get("applicantPhone") || "").replace(/\D/g, "");
    if (phone && phone.length > 0 && phone.length < 10) {
      showMessage("Please enter a valid 10-digit phone number.", "error");
      return false;
    }
    return true;
  }

  // phone formatting 
  function formatPhoneNumber(value) {
    const phone = value.replace(/\D/g, "");
    if (phone.length === 0) return "";
    if (phone.length <= 3) return `(${phone}`;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  }
  const phoneInput = document.getElementById("applicantPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      e.target.value = formatPhoneNumber(e.target.value);
    });
  }

  jobForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    formMessage.style.display = "none";

    const formData = new FormData(jobForm);

    if (!validateFormData(formData)) return;

    // file checks
    const resumeFile = formData.get("resume");
    if (resumeFile && resumeFile.size > 0) {
      const maxBytes = 5 * 1024 * 1024; // 5MB
      if (resumeFile.size > maxBytes) {
        showMessage("Resume is too large (max 5MB).", "error");
        return;
      }
      const allowed = ["application/pdf", "application/msword",
                       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                       "text/plain"];
      if (resumeFile.type && !allowed.includes(resumeFile.type)) {
        showMessage("Unsupported resume file type.", "error");
        return;
      }
    }

    // disable button
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    submitButton.classList.add("loading");

    try {
      // Use sendForm to include file uploads automatically.
      // SERVICE_ID and TEMPLATE_ID as you had them.
      const SERVICE_ID = "service_q4ctasa";
      const TEMPLATE_ID = "template_webj6gc";

      // Optionally include additional template params (these are also sent when using sendForm)
      const templateParams = {
        applicant_name: `${formData.get("applicantFirstName")} ${formData.get("applicantLastName")}`,
        to_email: "brianramirezbro@gmail.com",
        reply_to: formData.get("applicantEmail"),
      };

      // emailjs.sendForm(service, template, formElement, ???options)
      // If you used emailjs.init() earlier, you can omit the 4th param.
      const resp = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, jobForm, /* options if needed */);
      console.log("EmailJS response:", resp);
      showMessage("Thank you for applying! We will review your application and contact you soon.", "success");
      jobForm.reset();
    } catch (err) {
      console.error("Error sending application:", err);
      showMessage("Sorry, there was a problem submitting your application. Please try again later.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      submitButton.classList.remove("loading");
    }
  });

  // highlight required fields
  const requiredFields = jobForm.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    field.addEventListener("blur", function () {
      this.style.borderColor = this.value.trim() ? "#ddd" : "#ff6b6b";
    });
  });
});
