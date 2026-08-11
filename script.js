// ===== DARK MODE TOGGLE =====
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark');
  modeToggle.textContent = '☀️';
}

modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  modeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-container')) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// ===== PROJECT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    // Filter projects
    projectCards.forEach(card => {
      if (filterValue === 'all') {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else if (card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// Set initial opacity for project cards
projectCards.forEach(card => {
  card.style.opacity = '1';
  card.style.transition = 'opacity 0.3s ease';
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Validation rules
const validateForm = () => {
  let isValid = true;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));

  // Name validation
  if (name.length < 2) {
    showError('name', 'Name must be at least 2 characters');
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Subject validation
  if (subject.length < 3) {
    showError('subject', 'Subject must be at least 3 characters');
    isValid = false;
  }

  // Message validation
  if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters');
    isValid = false;
  }

  return isValid;
};

const showError = (fieldId, message) => {
  const errorElement = document.getElementById(`${fieldId}Error`);
  errorElement.textContent = message;
  errorElement.classList.add('show');
};

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateForm()) {
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    console.log('Form submitted:', formData);

    // Show success message
    formMessage.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
    formMessage.classList.remove('error');
    formMessage.classList.add('success');

    // Reset form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('success');
    }, 5000);
  }
});

// ===== SKILL PROGRESS ANIMATION =====
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const progressBars = document.querySelectorAll('.skill-progress');
progressBars.forEach(bar => observer.observe(bar));

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 70;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== PROJECT MODAL (Optional) =====
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');

if (modalClose) {
  modalClose.addEventListener('click', () => {
    projectModal.style.display = 'none';
  });
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === projectModal) {
    projectModal.style.display = 'none';
  }
});

// ===== SCROLL ANIMATIONS =====
const scrollElements = document.querySelectorAll('[class*="card"], [class*="item"], .timeline-content');

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = () => {
  scrollElements.forEach((element) => {
    if (elementInView(element, 1.25)) {
      element.classList.add('scrolled');
    }
  });
};

// Add scrolled class for initial styling
const style = document.createElement('style');
style.textContent = `
  [class*="card"], [class*="item"], .timeline-content {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .scrolled {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
  displayScrollElement();
});

// Initial call
displayScrollElement();

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = 'var(--shadow-lg)';
  } else {
    navbar.style.boxShadow = 'var(--shadow)';
  }
});

// ===== TYPING ANIMATION (Optional Enhancement) =====
const typeText = (element, text, speed = 50) => {
  let index = 0;
  element.textContent = '';

  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };

  type();
};

// Uncomment to use typing animation on hero title
// const heroTitle = document.querySelector('.hero-content h1');
// if (heroTitle) {
//   const originalText = heroTitle.textContent;
//   heroTitle.textContent = '';
//   typeText(heroTitle, originalText, 50);
// }

// ===== PRELOAD IMAGES =====
const preloadImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const newImg = new Image();
    newImg.src = img.src;
  });
};

window.addEventListener('load', preloadImages);

// ===== PERFORMANCE OPTIMIZATION: Lazy Loading =====
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== LOCAL STORAGE FOR USER PREFERENCES =====
const saveUserPreference = (key, value) => {
  localStorage.setItem(key, value);
};

const getUserPreference = (key) => {
  return localStorage.getItem(key);
};

// ===== ANALYTICS & TRACKING (Optional) =====
// Track when user reaches different sections
const trackSectionView = () => {
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        console.log(`User viewed section: ${sectionId}`);
        // You could send this to an analytics service
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(section => sectionObserver.observe(section));
};

trackSectionView();

// ===== HANDLE KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape key
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }

  // Tab to first link in menu when menu is open
  if (e.key === 'Tab' && navMenu.classList.contains('active')) {
    const firstLink = navMenu.querySelector('a');
    if (firstLink && document.activeElement !== firstLink) {
      firstLink.focus();
    }
  }
});

// ===== FORM INPUT FOCUS STATES =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  });

  // Clear error message when user starts typing
  input.addEventListener('input', () => {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  });
});

// ===== INITIALIZE =====
console.log('Portfolio loaded successfully!');

// ===== CINEMA INTRO =====
const cinemaIntro = document.getElementById('cinemaIntro');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const introSeen = sessionStorage.getItem('cinemaSeen');
let typewriterStarted = false;
let cinemaFinished = false;

const finishCinema = () => {
  if (cinemaFinished) return;
  cinemaFinished = true;
  if (cinemaIntro) cinemaIntro.classList.add('intro-hidden');
  startTypewriter();
};

const startTypewriter = () => {
  if (typewriterStarted) return;
  typewriterStarted = true;

  const el = document.getElementById('typewriter');
  const cursor = document.getElementById('typewriterCursor');
  if (!el) return;

  const text = 'Full-Stack Developer | Mobile Apps | UI/UX & Graphic Design';

  if (reduceMotion) {
    el.textContent = text;
    if (cursor) cursor.classList.add('cursor-done');
    return;
  }

  let index = 0;
  const speed = 42;
  const type = () => {
    if (index <= text.length) {
      el.textContent = text.slice(0, index);
      index++;
      if (index <= text.length) {
        setTimeout(type, speed);
      } else if (cursor) {
        cursor.classList.add('cursor-done');
      }
    }
  };
  setTimeout(type, 250);
};

if (cinemaIntro) {
  if (introSeen || reduceMotion) {
    finishCinema();
  } else {
    sessionStorage.setItem('cinemaSeen', '1');
    setTimeout(() => {
      cinemaIntro.classList.add('intro-out');
      cinemaIntro.addEventListener('animationend', finishCinema);
      setTimeout(finishCinema, 1200);
    }, 2400);
  }
} else {
  startTypewriter();
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');

const updateScrollProgress = () => {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (scrollProgress) {
    scrollProgress.style.width = (ratio * 100) + '%';
  }

  const journeySection = document.getElementById('journey');
  const journeyFill = document.getElementById('journeyFill');
  if (journeySection && journeyFill) {
    const rect = journeySection.getBoundingClientRect();
    const trigger = window.innerHeight * 0.5;
    const progress = rect.height > 0
      ? Math.min(Math.max((trigger - rect.top) / rect.height, 0), 1)
      : 0;
    journeyFill.style.height = (progress * 100) + '%';
  }
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ===== SCROLL REVEAL ANIMATIONS =====
document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));

const aboutText = document.querySelector('.about-text');
const aboutImage = document.querySelector('.about-image');
if (aboutText) aboutText.classList.add('reveal-left');
if (aboutImage) aboutImage.classList.add('reveal-right');

const skillsVisual = document.querySelector('.skills-visual');
const skillsGrid = document.querySelector('.skills-grid');
if (skillsVisual) skillsVisual.classList.add('reveal-left');
if (skillsGrid) skillsGrid.classList.add('reveal-right');

const timelineEl = document.querySelector('.experience .timeline');
const projectsGrid = document.getElementById('projectsGrid');
const testimonialsGrid = document.querySelector('.testimonials-grid');
const contactContent = document.querySelector('.contact-content');
if (timelineEl) timelineEl.classList.add('reveal');
if (projectsGrid) projectsGrid.classList.add('reveal-zoom');
if (testimonialsGrid) testimonialsGrid.classList.add('reveal');
if (contactContent) contactContent.classList.add('reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .stagger, .journey-scene')
  .forEach(el => revealObserver.observe(el));

// ===== JOURNEY STAT COUNTERS =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));
