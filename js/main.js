(() => {
  "use strict";

  const sections = [...document.querySelectorAll(".slide")];
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  const currentSlide = document.getElementById("currentSlide");
  const totalSlides = document.getElementById("totalSlides");
  const progress = document.getElementById("progress");
  const previousButton = document.getElementById("prevSection");
  const nextButton = document.getElementById("nextSection");
  const topButton = document.getElementById("topButton");
  const menuButton = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const keyboardHint = document.getElementById("keyboardHint");
  let activeIndex = 0;
  let scrollTicking = false;

  totalSlides.textContent = String(sections.length).padStart(2, "0");

  const scrollToSection = (index) => {
    const targetIndex = Math.max(0, Math.min(index, sections.length - 1));
    sections[targetIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  };

  const closeMenu = () => {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  const setActiveSection = (index) => {
    activeIndex = Math.max(0, Math.min(index, sections.length - 1));
    const activeId = sections[activeIndex].id;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    currentSlide.textContent = String(activeIndex + 1).padStart(2, "0");
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === sections.length - 1;
  };

  const updatePageState = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, scrollProgress))}%`;

    const marker = window.scrollY + window.innerHeight * 0.42;
    let closestIndex = 0;

    sections.forEach((section, index) => {
      if (section.offsetTop <= marker) {
        closestIndex = index;
      }
    });

    setActiveSection(closestIndex);
    scrollTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updatePageState);
      scrollTicking = true;
    }
  }, { passive: true });

  navLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(index);
    });
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetIndex = sections.findIndex((section) => section.id === button.dataset.go);
      if (targetIndex >= 0) scrollToSection(targetIndex);
    });
  });

  previousButton.addEventListener("click", () => scrollToSection(activeIndex - 1));
  nextButton.addEventListener("click", () => scrollToSection(activeIndex + 1));
  topButton.addEventListener("click", () => scrollToSection(0));

  menuButton.addEventListener("click", () => {
    const willOpen = !mainNav.classList.contains("open");
    mainNav.classList.toggle("open", willOpen);
    menuButton.setAttribute("aria-expanded", String(willOpen));
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    const tagName = document.activeElement?.tagName;
    if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") return;

    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      scrollToSection(activeIndex + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      scrollToSection(activeIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      scrollToSection(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      scrollToSection(sections.length - 1);
    }

    if (event.key === "Escape") closeMenu();
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const hintCloseButton = keyboardHint.querySelector("button");
  hintCloseButton.addEventListener("click", () => keyboardHint.classList.add("hidden"));
  window.setTimeout(() => keyboardHint.classList.add("hidden"), 6500);

  updatePageState();
})();
