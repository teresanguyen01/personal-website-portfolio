// Portfolio JavaScript with Advanced Animations
document.addEventListener("DOMContentLoaded", function () {
  // Custom Cursor (optional - only if user prefers it)
  let cursor, cursorFollower;

  // Check if user wants custom cursor (you can disable this by setting to false)
  const enableCustomCursor = true;

  if (enableCustomCursor) {
    cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);

    cursorFollower = document.createElement("div");
    cursorFollower.className = "cursor-follower";
    document.body.appendChild(cursorFollower);

    // Mouse move handler for custom cursor
    document.addEventListener("mousemove", (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }

      if (cursorFollower) {
        cursorFollower.style.left = e.clientX - 20 + "px";
        cursorFollower.style.top = e.clientY - 20 + "px";
      }
    });
  }

  // Smooth scrolling for any anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Project card interactions with enhanced animations
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    // Add keyboard support
    card.setAttribute("tabindex", "0");

    // Enhanced hover effects with tilt
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) rotateX(5deg) rotateY(5deg)";
      this.style.boxShadow =
        "0px 20px 40px rgba(96, 165, 250, 0.3), 0px 0px 20px rgba(96, 165, 250, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateX(0) rotateY(0)";
      this.style.boxShadow = "none";
    });

    // Mouse move for dynamic tilt
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Handle focus events for keyboard navigation
    card.addEventListener("focus", function () {
      this.classList.add("focused");
    });

    card.addEventListener("blur", function () {
      this.classList.remove("focused");
    });

    // Handle click events for touch devices
    card.addEventListener("click", function (e) {
      // Prevent default if it's a link
      if (e.target.tagName === "A") {
        return;
      }

      // Toggle overlay visibility for touch devices
      const overlay = this.querySelector(".hover-overlay");
      if (overlay) {
        const isVisible = overlay.style.opacity === "1";
        overlay.style.opacity = isVisible ? "0" : "1";
        overlay.style.transform = isVisible
          ? "translateY(8px)"
          : "translateY(0)";
      }
    });
  });

  // Enhanced Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add staggered animation for project cards
        if (entry.target.classList.contains("project-card")) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            100;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, delay);
        }
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations (excluding main sections, timeline, and awards)
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .scale-in, .project-card"
  );

  animatedElements.forEach((el) => {
    if (!el.classList.contains("project-card")) {
      el.style.opacity = "0";
    }
    observer.observe(el);
  });

  // Add floating animation to avatar
  const avatar = document.querySelector(".avatar-placeholder");
  if (avatar) {
    avatar.classList.add("floating");
  }

  // Add pulse animation to social buttons
  const socialButtons = document.querySelectorAll(".social-btn");
  socialButtons.forEach((button, index) => {
    setTimeout(() => {
      button.classList.add("pulse");
    }, index * 200);
  });

  // Handle reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Disable animations for users who prefer reduced motion
    animatedElements.forEach((el) => {
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    });

    // Remove custom cursor if it exists
    if (cursor) cursor.style.display = "none";
    if (cursorFollower) cursorFollower.style.display = "none";
  }

  // Add ripple effect to social buttons
  socialButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Inertia scroll effect
  let isScrolling = false;
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      isScrolling = true;
      document.body.classList.add("scrolling");
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      document.body.classList.remove("scrolling");
    }, 150);
  });

  // Add CSS for ripple effect and scrolling states
  const style = document.createElement("style");
  style.textContent = `
    .social-btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .project-card.focused {
      outline: 2px solid #60a5fa;
      outline-offset: 2px;
    }

    .scrolling {
      scroll-behavior: smooth;
    }

    .project-card {
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .project-card:hover {
      transform: translateY(-12px) rotateX(5deg) rotateY(5deg) !important;
    }
  `;
  document.head.appendChild(style);

  // Parallax effect for background elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Add glitch effect to name on hover
  const nameElement = document.querySelector(".name");
  if (nameElement) {
    nameElement.addEventListener("mouseenter", () => {
      nameElement.style.animation = "glitch 0.3s ease-in-out";
    });

    nameElement.addEventListener("animationend", () => {
      nameElement.style.animation = "";
    });
  }
});
