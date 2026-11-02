// Bright Beginnings Learning Foundation - Part 3 JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Dynamic copyright year
  document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.querySelector(".sr-only").textContent = isOpen ? "Close menu" : "Open menu";
    });
    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.closest(".faq-item").querySelector(".faq-answer");
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      answer.hidden = expanded;
      const symbol = button.querySelector("span");
      if (symbol) symbol.textContent = expanded ? "+" : "−";
    });
  });

  // Programme search and grade filter
  const search = document.getElementById("programmeSearch");
  const grade = document.getElementById("gradeFilter");
  const cards = [...document.querySelectorAll(".programme-item")];
  const noResults = document.getElementById("noResults");
  const filterStatus = document.getElementById("filterStatus");
  function filterProgrammes() {
    if (!search || !grade) return;
    const term = search.value.trim().toLowerCase();
    const selectedGrade = grade.value;
    let visible = 0;
    cards.forEach(card => {
      const matchesText = (card.dataset.search || "").includes(term);
      const cardGrade = card.dataset.grade;
      const matchesGrade = selectedGrade === "all" || cardGrade === selectedGrade || cardGrade === "all-grades";
      const show = matchesText && matchesGrade;
      card.hidden = !show;
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible !== 0;
    if (filterStatus) filterStatus.textContent = `${visible} programme${visible === 1 ? "" : "s"} shown.`;
  }
  if (search && grade) {
    search.addEventListener("input", filterProgrammes);
    grade.addEventListener("change", filterProgrammes);
    filterProgrammes();
  }

  // Image gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  if (lightbox && lightboxImage && lightboxCaption) {
    const close = () => {
      lightbox.classList.remove("show");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
    };
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.addEventListener("click", () => {
        lightboxImage.src = item.dataset.image;
        lightboxImage.alt = item.dataset.alt || "";
        lightboxCaption.textContent = item.dataset.alt || "";
        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
        lightbox.querySelector(".lightbox-close").focus();
      });
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.addEventListener("click", event => { if (event.target === lightbox) close(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
  }

  // AJAX submission for Netlify Forms (enquiry, enrolment and volunteer).
  // These submissions work after the website is deployed to Netlify.
  document.querySelectorAll("form[data-netlify='true']").forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      let feedback = form.querySelector(".form-feedback");
      if (!feedback) {
        feedback = document.createElement("p");
        feedback.className = "form-feedback";
        feedback.setAttribute("aria-live", "polite");
        form.appendChild(feedback);
      }

      const submitButton = form.querySelector("button[type='submit']");
      const originalText = submitButton ? submitButton.textContent : "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }
      feedback.textContent = "";

      try {
        const formData = new FormData(form);
        const encoded = new URLSearchParams(formData).toString();
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encoded
        });
        if (!response.ok) throw new Error("Submission failed");
        feedback.textContent = "Thank you. Your submission has been received.";
        form.reset();
      } catch (error) {
        feedback.textContent = "We could not submit the form. Please check your connection and try again, or contact the foundation.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    });
  });

  // Contact form: prepares a message in the visitor's email application.
  // Replace this with the foundation's verified email address before publishing.
  const CONTACT_EMAIL = "REPLACE-WITH-VERIFIED-EMAIL@example.com";
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const feedback = document.getElementById("contactFeedback");
      if (!contactForm.reportValidity()) return;
      if (CONTACT_EMAIL.startsWith("REPLACE-")) {
        feedback.textContent = "The website owner must add the foundation's verified email address in script.js before this form can prepare an email.";
        return;
      }
      const data = new FormData(contactForm);
      const subject = `Website enquiry: ${data.get("messageType")}`;
      const body = `Name: ${data.get("name")}\\nEmail: ${data.get("email")}\\nPhone: ${data.get("phone") || "Not provided"}\\n\\nMessage:\\n${data.get("message")}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      feedback.textContent = "Your email application should open. Review the message and press Send there.";
    });
  }
});
