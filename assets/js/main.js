// ═══════════════════════════════════════════════════
//  TUSHAR PATIL — PORTFOLIO — MAIN JAVASCRIPT
// ═══════════════════════════════════════════════════

'use strict';

// ── Project Data ────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    name: 'AI Image & Data Classifier',
    category: 'ai',
    short: 'A deployed AI web app for image classification, CSV data analysis, and prediction history.',
    desc: 'An end-to-end AI and data classification web application built with Python and Flask. It supports image classification using a trained machine learning model, CSV data processing, and a dashboard for reviewing prediction history and statistics.',
    tech: ['Python', 'Flask', 'TensorFlow', 'Pandas', 'Machine Learning'],
    features: [
      'Image classification using a trained model',
      'CSV data processing and classification',
      'Prediction history and dashboard statistics',
      'Web interface built with Flask',
    ],
    github: 'https://github.com/tushpatil2005-arch/AI-Image-Data-Classifier-',
    demo: 'https://ai-image-data-classifier-1.onrender.com/',
  },

  {
    id: 2,
    name: 'Responsive Web Portfolio',
    category: 'web',
    short: 'Modern, fully responsive web portfolio built with HTML5, CSS3 and Bootstrap following best practices.',
    desc: 'A clean, mobile-first responsive web portfolio/showcase built using HTML5, CSS3, and Bootstrap. Focused on modern layout techniques, accessibility standards, and cross-device compatibility. Developed during web development internship at Codsoft.',
    tech: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Responsive Design'],
    features: [
      'Fully responsive layout compatible with all screen sizes',
      'Modern CSS techniques including Flexbox and Grid layouts',
      'Bootstrap component integration and customization',
      'Clean semantic HTML5 structure for SEO and accessibility',
    ],
    github: 'https://github.com/tushpatil2005-arch',
    demo: null,
  },
  {
    id: 3,
    name: 'C++ Data Structures & Algorithms',
    category: 'cpp',
    short: 'Comprehensive collection of C++ programs implementing core data structures and algorithms for competitive programming.',
    desc: 'A structured collection of C++ implementations covering fundamental data structures and algorithmic problem-solving. Covers arrays, linked lists, stacks, queues, trees, sorting, and searching algorithms with clean code and comments.',
    tech: ['C++', 'Data Structures', 'Algorithms', 'OOP'],
    features: [
      'Implementations of arrays, linked lists, stacks, and queues',
      'Sorting algorithms: Bubble, Selection, Insertion, Merge, Quick Sort',
      'Tree traversal and binary search tree operations',
      'Object-oriented design patterns applied in C++',
    ],
    github: 'https://github.com/tushpatil2005-arch',
    demo: null,
  },
  {
    id: 4,
    name: 'Java Programming Projects',
    category: 'java',
    short: 'Collection of Java programs demonstrating object-oriented programming, core Java concepts, and problem-solving.',
    desc: 'A set of Java programs covering core Java features including OOP concepts, collections, exception handling, and basic application development. Demonstrates solid understanding of Java fundamentals and software design.',
    tech: ['Java', 'OOP', 'Collections', 'Exception Handling'],
    features: [
      'Object-oriented design with inheritance and polymorphism',
      'Java Collections Framework usage',
      'Exception handling and robust error management',
      'Console-based application development',
    ],
    github: 'https://github.com/tushpatil2005-arch',
    demo: null,
  },
  {
    id: 5,
    name: 'Python Data Analysis Scripts',
    category: 'ai',
    short: 'Python scripts for data cleaning, analysis, and visualization tasks developed during AI internship.',
    desc: 'A collection of Python scripts used for data preprocessing, exploratory data analysis (EDA), and basic visualization. Developed practical skills in handling datasets, identifying patterns, and preparing data for machine learning workflows.',
    tech: ['Python', 'Data Analysis', 'NumPy', 'Matplotlib', 'Pandas'],
    features: [
      'Data loading, cleaning, and preprocessing pipelines',
      'Exploratory data analysis with statistical summaries',
      'Basic data visualization charts and plots',
      'Script-based modular workflow for reproducible analysis',
    ],
    github: 'https://github.com/tushpatil2005-arch',
    demo: null,
  },
];

// ── DOM Helpers ─────────────────────────────────────
const qs  = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

// ── Navbar ───────────────────────────────────────────
function initNavbar() {
  const navbar    = qs('#navbar');
  const toggle    = qs('#nav-toggle');
  const mobileNav = qs('#nav-mobile');
  const mobileLinks = qsa('.mobile-nav-link');

  // Scroll shadow + active link
  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();

    // Back-to-top button
    const btt = qs('#back-to-top');
    if (window.scrollY > 400) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Active nav link on scroll
  function updateActiveLink() {
    const sections = qsa('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    qsa('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${current}`);
    });
  }

  // Mobile toggle
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      if (isOpen) {
        mobileNav.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        closeMobileMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  }
}

// ── Smooth Scroll ─────────────────────────────────────
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = qs(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
}

// ── Scroll Reveal ────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  qsa('.reveal, .reveal-left, .reveal-right, .stagger').forEach(el => observer.observe(el));
}

// ── Typed Text ───────────────────────────────────────
function initTyped() {
  const el = qs('#typed-text');
  if (!el) return;
  const words = ['Software Engineer', 'Problem Solver', 'ML Enthusiast', 'Web Developer'];
  let wIdx = 0, cIdx = 0, deleting = false;
  const speed = { type: 90, delete: 50, pause: 1800 };

  function tick() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) {
        deleting = true;
        setTimeout(tick, speed.pause);
        return;
      }
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? speed.delete : speed.type);
  }

  tick();
}

// ── Projects ─────────────────────────────────────────
function initProjects() {
  const grid = qs('#projects-grid');
  if (!grid) return;

  // Render cards
  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.dataset.category = p.category;
    card.style.transitionDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <div class="project-banner"></div>
      <div class="project-body">
        <div class="project-number">0${i + 1}</div>
        <h3 class="project-name">${p.name}</h3>
        <p class="project-desc">${p.short}</p>
        <div class="project-tech-stack">
          ${p.tech.map(t => `<span class="project-tech-badge">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal(${p.id})" aria-label="View details for ${p.name}">
            <i class="fas fa-eye"></i> View Details
          </button>
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="View source code on GitHub">
            <i class="fab fa-github"></i> Source Code
          </a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" aria-label="View live demo">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>` : ''}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Re-trigger observer for new cards
  qsa('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  setTimeout(() => {
    qsa('.project-card').forEach(card => observer.observe(card));
  }, 100);

  // Filter
  qsa('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      qsa('.project-card').forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ── Modal ────────────────────────────────────────────
function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  const overlay = qs('#project-modal');
  const box     = qs('#modal-content');

  box.innerHTML = `
    <button class="modal-close" onclick="closeModal()" aria-label="Close modal">
      <i class="fas fa-times"></i>
    </button>
    <div class="project-tech-badge" style="margin-bottom:0.75rem; display:inline-flex; align-items:center; gap:0.4rem;">
      <i class="fas fa-code"></i> ${p.tech[0]}
    </div>
    <h2 class="modal-title">${p.name}</h2>
    <p class="modal-subtitle">${p.tech.join(' · ')}</p>
    <p class="modal-desc">${p.desc}</p>
    
    ${p.id === 1 ? `
      <div class="project-modal-image">
        <img
          src="assets/images/image-classifier-result.png"
          alt="AI Image Classifier showing automobile prediction with 85.30% confidence"
          loading="lazy"
        />
        <p class="image-caption">AI Image Classification — Automobile prediction</p>
      </div>
    ` : ''}

    <div class="modal-features">
      <h4>Key Features</h4>
      <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
    <div class="modal-tech-stack">
      ${p.tech.map(t => `<span class="project-tech-badge">${t}</span>`).join('')}
    </div>
    <div class="modal-actions">
      ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <i class="fab fa-github"></i> View on GitHub
      </a>` : ''}
      ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
        <i class="fas fa-external-link-alt"></i> Live Demo
      </a>` : ''}
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  qs('.modal-close')?.focus();
}

function closeModal() {
  qs('#project-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Expose to global scope
window.openModal  = openModal;
window.closeModal = closeModal;

// Close modal on overlay click / Escape
document.addEventListener('DOMContentLoaded', () => {
  const overlay = qs('#project-modal');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});

// ── Contact Form ──────────────────────────────────────
function initContactForm() {
  const form = qs('#contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = qs('#cf-name', form).value.trim();
    const email   = qs('#cf-email', form).value.trim();
    const subject = qs('#cf-subject', form).value.trim();
    const message = qs('#cf-message', form).value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    // Use mailto: — opens visitor's email client with pre-filled content
    const mailtoBody = encodeURIComponent(
      `Hello Tushar,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
    );
    const mailtoSubject = encodeURIComponent(`[Portfolio Enquiry] ${subject}`);
    const mailtoLink = `mailto:tushpatil2005@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoLink;

    showToast('Your email client should open now. Thank you!', 'success');
    form.reset();
  });
}

// ── Toast ─────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const toast = qs('#toast');
  if (!toast) return;
  const icon = type === 'success' ? 'fa-check-circle success-icon' : 'fa-exclamation-circle error-icon';
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── Back to Top ───────────────────────────────────────
function initBackToTop() {
  const btn = qs('#back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Particles / Background Dots ──────────────────────
function initParticles() {
  const canvas = qs('#particles-canvas');
  if (!canvas) return;

  // Honour reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.r  = Math.random() * 1.2 + 0.3;
      this.a  = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.a})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(Math.floor(W * H / 18000), 80);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  let raf;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    raf = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  }, { passive: true });

  init();
  animate();
}

// ── Year in Footer ────────────────────────────────────
function updateYear() {
  const el = qs('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollReveal();
  initTyped();
  initProjects();
  initContactForm();
  initBackToTop();
  initParticles();
  updateYear();
});
