/**
 * ============================================================================
 * PORTFOLIO JAVASCRIPT
 * Bedir Abdelhamid Mohamed Alzomor - Data Engineer | Database Design & SQL
 * Pure Vanilla JavaScript - Lightweight, Accessible, Production-Ready
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DATA STRUCTURES & PROJECT MODAL DETAILS
  // --------------------------------------------------------------------------
  const projectDetails = {
    depi: {
      title: 'DEPI Data Engineering Team Project',
      category: 'Data Engineering | Team Project (Ongoing)',
      status: 'Ongoing Project',
      statusClass: 'ongoing-badge',
      overview:
        'A collaborative Data Engineering project developed as part of the prestigious Digital Egypt Pioneers Initiative (DEPI). The project focuses on organizing data and establishing the foundation for a structured data workflow using relational database design, dataset cleaning, data modeling, and foundational ETL principles.',
      technologies: [
        'Python',
        'Pandas',
        'SQL Server / MySQL',
        'Relational Schema Design',
        'Entity-Relationship Diagrams (ERDs)',
        'Data Cleaning & Deduplication',
        'Data Modeling Fundamentals',
        'ETL Fundamentals'
      ],
      contributions: [
        'Designed the core relational database structure from requirements.',
        'Created the complete Entity-Relationship Diagram (ERD) defining entities, attributes, and foreign keys.',
        'Performed dataset auditing and data cleaning using Python and Pandas (handling missing values, data type coercion, and deduplication).',
        'Contributed to defining explicit relationships, constraints, and referential integrity between database entities.',
        'Collaborated with team members to ensure data model consistency across all project domains.'
      ],
      progress:
        'Database Design, ERD Design, and Data Cleaning have been successfully implemented. ETL, Data Pipelines, and additional Python/Pandas automation are currently in active development within the DEPI training track.',
      codeSample: `-- Relational Table Blueprint Definition
CREATE TABLE Customers (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email_address VARCHAR(120) UNIQUE NOT NULL,
    city_location VARCHAR(50),
    region_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (region_id) REFERENCES Regions(region_id)
);

CREATE TABLE Transactions (
    trans_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    gross_amount DECIMAL(10,2) CHECK (gross_amount >= 0),
    status_code VARCHAR(20) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);`
    },

    linear: {
      title: 'Linear System Solver',
      category: 'C# | Desktop Application | Academic Project (Completed)',
      status: 'Completed Academic Project',
      statusClass: 'completed-badge',
      overview:
        'A desktop application developed independently using C# and Windows Forms to solve systems of linear equations through numerical elimination methods. The application provides an organized interface for entering equations and displaying results while handling fractional arithmetic with high numerical accuracy.',
      technologies: [
        'C# (.NET)',
        'Windows Forms UI',
        'Object-Oriented Programming (OOP)',
        'DataGridView Controls',
        'Custom Fraction Class',
        'Gaussian Elimination',
        'Gauss-Jordan Elimination'
      ],
      contributions: [
        'Independently conceptualized, architected, and built the entire desktop application from scratch.',
        'Engineered a custom Fraction class with greatest common divisor (GCD) reduction to eliminate floating-point precision degradation.',
        'Implemented both Gaussian Elimination (forward elimination and back-substitution) and Gauss-Jordan Elimination (reduced row echelon form).',
        'Built an intuitive graphical user interface utilizing DataGridView controls for matrix input and dynamic step-by-step output.',
        'Added robust error handling for inconsistent systems (no solutions) and dependent systems (infinite solutions).'
      ],
      progress:
        'Fully completed and tested for 3x3 and variable linear systems. Developed as an independent academic computer science application.',
      codeSample: `// Custom Fraction Class Arithmetic Snippet in C#
public class Fraction
{
    public long Numerator { get; private set; }
    public long Denominator { get; private set; }

    public Fraction(long num, long den = 1)
    {
        if (den == 0) throw new DivideByZeroException("Denominator cannot be zero.");
        if (den < 0) { num = -num; den = -den; }
        long gcd = GreatestCommonDivisor(Math.Abs(num), den);
        Numerator = num / gcd;
        Denominator = den / gcd;
    }

    public static Fraction operator +(Fraction a, Fraction b) =>
        new Fraction(a.Numerator * b.Denominator + b.Numerator * a.Denominator, a.Denominator * b.Denominator);

    public override string ToString() =>
        Denominator == 1 ? Numerator.ToString() : $"{Numerator}/{Denominator}";
}`
    },

    car: {
      title: 'Car Company Database System',
      category: 'Database Design | SQL | Database Management (Completed)',
      status: 'Completed Database Project',
      statusClass: 'completed-badge',
      overview:
        'A comprehensive relational database system designed for a car import and sales enterprise. The project focuses on organizing business data, designing a relational database structure, cleaning data, defining table relationships, and writing SQL queries to support data management and analysis.',
      technologies: [
        'Microsoft SQL Server',
        'SQL (DDL, DML, DQL)',
        'Relational Database Design',
        'Database Management & SSMS',
        '3NF Normalization',
        'Referential Integrity'
      ],
      contributions: [
        'Engineered the database architecture from scratch based on automotive import, inventory, and sales workflows.',
        'Developed a normalized relational schema up to Third Normal Form (3NF) to eliminate anomalies.',
        'Created a detailed Entity-Relationship Diagram (ERD) defining entities: Suppliers, Vehicles, Customers, Sales Transactions, and Maintenance.',
        'Defined primary keys, foreign keys, cascade rules, and check constraints.',
        'Cleaned and organized raw vehicle and transaction datasets before database loading.',
        'Wrote performant SQL queries incorporating multi-table JOINs, GROUP BY, HAVING, subqueries, and aggregation for business analysis.'
      ],
      progress:
        'Schema design, table creation, normalization, constraint enforcement, and query suites completed.',
      codeSample: `-- Analytical SQL Query: Dealership Sales & Average Value
SELECT 
    v.make_model AS VehicleModel,
    COUNT(s.sale_id) AS UnitsSold,
    SUM(s.final_sale_price) AS TotalRevenue,
    AVG(s.final_sale_price) AS AverageSalePrice
FROM Vehicles v
INNER JOIN Sales_Transactions s 
    ON v.vin_number = s.vin_number
WHERE s.sale_date >= DATEADD(month, -12, GETDATE())
GROUP BY v.make_model
HAVING COUNT(s.sale_id) >= 1
ORDER BY TotalRevenue DESC;`
    }
  };

  // --------------------------------------------------------------------------
  // 2. THEME MANAGEMENT (DARK / LIGHT MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const THEME_STORAGE_KEY = 'bedir_portfolio_theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Default to Dark Mode as per prompt specifications
      applyTheme('dark');
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 3. RESPONSIVE MOBILE NAVIGATION
  // --------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu(isOpen) {
    const open = typeof isOpen === 'boolean' ? isOpen : !navMenu.classList.contains('open');
    if (open) {
      navMenu.classList.add('open');
      mobileToggleBtn.classList.add('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
    } else {
      navMenu.classList.remove('open');
      mobileToggleBtn.classList.remove('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close mobile nav when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !mobileToggleBtn.contains(e.target)
      ) {
        toggleMobileMenu(false);
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMobileMenu(false);
        mobileToggleBtn.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. SCROLLSPY & HEADER ELEVATION
  // --------------------------------------------------------------------------
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header elevation shadow
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link updates
    const scrollPos = scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 5. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
  // --------------------------------------------------------------------------
  function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      revealElements.forEach((el) => observer.observe(el));
    } else {
      // Fallback
      revealElements.forEach((el) => el.classList.add('revealed'));
    }
  }

  // --------------------------------------------------------------------------
  // 6. HERO BACKGROUND INTERACTIVE CANVAS (DATA NODES & PIPELINES)
  // --------------------------------------------------------------------------
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;
    let isVisible = true;

    const PARTICLE_COUNT = 38;
    const CONNECT_DISTANCE = 140;

    function resize() {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1.2;
        this.isSpecial = Math.random() > 0.75; // Cyan or violet data packet
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (this.isSpecial) {
          ctx.fillStyle = '#00d2ff';
          ctx.shadowColor = '#00d2ff';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = '#8b5cf6';
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 3;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const alpha = (1 - dist / CONNECT_DISTANCE) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        initParticles();
      }, 150);
    });

    // Pause when hero is out of view to save battery and GPU cycles
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            animate();
          }
        });
      });
      heroObserver.observe(canvas.parentElement);
    }
  }

  // --------------------------------------------------------------------------
  // 7. SKILLS FILTERING TABS
  // --------------------------------------------------------------------------
  function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-chip');
    const skillCards = document.querySelectorAll('.skill-category-card');

    if (!filterButtons.length || !skillCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active chip state
        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter cards
        skillCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. PROJECT DETAILS MODAL
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectCat = document.getElementById('modal-project-cat');
  const modalProjectBody = document.getElementById('modal-project-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = projectModal ? projectModal.querySelector('.modal-overlay') : null;
  let lastActiveElement = null;

  function openProjectModal(projectKey) {
    const data = projectDetails[projectKey];
    if (!data || !projectModal) return;

    lastActiveElement = document.activeElement;

    modalProjectTitle.textContent = data.title;
    modalProjectCat.textContent = data.category;

    const techPills = data.technologies.map((t) => `<span>${t}</span>`).join('');
    const contribList = data.contributions.map((c) => `<li>${c}</li>`).join('');

    modalProjectBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="project-status-tag ${data.statusClass}" style="position: static; display: inline-flex; margin-bottom: 1rem;">
          ${data.status}
        </span>
        <p>${data.overview}</p>
      </div>

      <h4>Technologies &amp; Architecture Concepts</h4>
      <div class="project-tech-pills" style="margin-bottom: 1.4rem;">
        ${techPills}
      </div>

      <h4>Key Contributions &amp; Implementation Details</h4>
      <ul style="margin-bottom: 1.4rem;">
        ${contribList}
      </ul>

      <h4>Current Development Status</h4>
      <p style="background: rgba(56, 189, 248, 0.08); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-accent); margin-bottom: 1.4rem;">
        ${data.progress}
      </p>

      <h4>Technical Blueprint / Code Structure</h4>
      <pre class="modal-code-snippet"><code>${escapeHtml(data.codeSample)}</code></pre>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
      lastActiveElement = null;
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Modal triggers
  document.querySelectorAll('.modal-trigger-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 9. EXTERNAL LINK PLACEHOLDERS (GITHUB, YOUTUBE, FACEBOOK)
  // --------------------------------------------------------------------------
  const toast = document.getElementById('placeholder-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close');
  let toastTimeout;

  function showToast(title, message) {
    if (!toast) return;
    clearTimeout(toastTimeout);
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add('visible');
    toast.setAttribute('aria-hidden', 'false');

    toastTimeout = setTimeout(() => {
      hideToast();
    }, 5500);
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove('visible');
    toast.setAttribute('aria-hidden', 'true');
  }

  if (toastClose) {
    toastClose.addEventListener('click', hideToast);
  }

  document.querySelectorAll('.placeholder-link-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-type') || 'external profile';
      const repoName = btn.getAttribute('data-repo');

      if (repoName) {
        showToast(
          `Repository Placeholder (${repoName})`,
          `The official repository for "${repoName}" is currently private or in development. It will be updated here once published.`
        );
      } else {
        showToast(
          `${capitalize(type)} Profile Placeholder`,
          `This ${type} profile link is an identified placeholder until Bedir's profile is officially published. You can connect with Bedir directly on LinkedIn.`
        );
      }
    });
  });

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // --------------------------------------------------------------------------
  // 10. CONTACT FORM VALIDATION & FRONTEND SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedbackModal = document.getElementById('form-feedback-modal');
  const formFeedbackClose = document.getElementById('form-feedback-close');
  const formFeedbackBody = document.getElementById('form-feedback-body');
  const formFeedbackOverlay = formFeedbackModal ? formFeedbackModal.querySelector('.modal-overlay') : null;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(fieldId, errorId, isValid) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (!field || !error) return isValid;

    if (!isValid) {
      field.classList.add('is-invalid');
      error.classList.add('visible');
    } else {
      field.classList.remove('is-invalid');
      error.classList.remove('visible');
    }
    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      const isNameValid = setFieldError('contact-name', 'name-error', nameVal.length >= 2);
      const isEmailValid = setFieldError('contact-email', 'email-error', validateEmail(emailVal));
      const isSubjectValid = setFieldError('contact-subject', 'subject-error', subjectVal.length >= 3);
      const isMessageValid = setFieldError('contact-message', 'message-error', messageVal.length >= 10);

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Construct mailto link
        const mailtoLink = `mailto:?subject=${encodeURIComponent(
          subjectVal
        )}&body=${encodeURIComponent(
          `From: ${nameVal} (${emailVal})\n\nMessage:\n${messageVal}`
        )}`;

        // Display transparent frontend confirmation dialog (no false claims of email sent)
        if (formFeedbackModal && formFeedbackBody) {
          formFeedbackBody.innerHTML = `
            <div style="margin-bottom: 1.25rem;">
              <span class="badge-status-ongoing" style="margin-bottom: 0.75rem;">
                Client-Side Validation Passed ✓
              </span>
              <p>
                Thank you, <strong>${escapeHtml(nameVal)}</strong>! Your input has been validated.
              </p>
              <p style="background: rgba(56, 189, 248, 0.08); padding: 0.9rem; border-radius: var(--radius-md); border: 1px solid var(--border-accent); font-size: 0.9rem; color: var(--text-primary);">
                <strong>Important Notice:</strong> As this is a pure frontend demonstration without a backend server, your message was not transmitted to a live email inbox.
              </p>
            </div>

            <h4>Send via Your Default Email Client:</h4>
            <p>You can click below to launch your email client with your message prefilled:</p>
            <div style="margin: 1.25rem 0;">
              <a href="${mailtoLink}" class="btn btn-primary" style="display: inline-flex;">
                <span>Launch Email Client</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>

            <h4>Backend Connection Guide for Bedir:</h4>
            <p style="font-size: 0.86rem; color: var(--text-muted);">
              To enable automatic email delivery for production deployment, simply connect this form to a service like Formspree (e.g. <code>action="https://formspree.io/f/your-id" method="POST"</code>) or integrate EmailJS.
            </p>
          `;

          formFeedbackModal.classList.add('active');
          formFeedbackModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }
    });

    // Real-time input validation cleanup
    ['contact-name', 'contact-email', 'contact-subject', 'contact-message'].forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('is-invalid');
          const errorMsg = document.getElementById(`${id.replace('contact-', '')}-error`);
          if (errorMsg) errorMsg.classList.remove('visible');
        });
      }
    });
  }

  function closeFormFeedback() {
    if (!formFeedbackModal) return;
    formFeedbackModal.classList.remove('active');
    formFeedbackModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (formFeedbackClose) formFeedbackClose.addEventListener('click', closeFormFeedback);
  if (formFeedbackOverlay) formFeedbackOverlay.addEventListener('click', closeFormFeedback);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formFeedbackModal && formFeedbackModal.classList.contains('active')) {
      closeFormFeedback();
    }
  });

  // --------------------------------------------------------------------------
  // 11. DYNAMIC COPYRIGHT YEAR & BACK TO TOP
  // --------------------------------------------------------------------------
  const copyrightYearElem = document.getElementById('copyright-year');
  if (copyrightYearElem) {
    copyrightYearElem.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. INITIALIZATION ON DOM READY
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollReveal();
    initHeroCanvas();
    initSkillsFilter();
    handleScroll();
  });
})();
