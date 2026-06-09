/* PORTFOLIO - VANILLA JAVASCRIPT */

const typewriterTexts = [
  'Full-Stack Developer',
  'Problem Solver',
  'Tech Enthusiast',
  'Innovator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriterEffect() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;
  
  const currentText = typewriterTexts[textIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typewriterEffect, 1500);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typewriterTexts.length;
  }

  const speed = isDeleting ? 50 : 100;
  setTimeout(typewriterEffect, speed);
}

document.addEventListener('DOMContentLoaded', typewriterEffect);

// NAVBAR & MOBILE MENU
const hamburger = document.getElementById('btn-hamburger');
const mobileMenu = document.getElementById('overlay-mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link-item');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('btn-back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// PROGRESS RINGS
function animateProgressRings() {
  const progressRings = document.querySelectorAll('.progress-ring-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const percent = parseInt(ring.getAttribute('data-percent'));
        const radius = 38;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;
        ring.style.strokeDashoffset = offset;
        const card = ring.closest('.skill-card');
        const progressText = card.querySelector('.progress-text');
        let currentPercent = 0;
        const increment = percent / 30;
        const interval = setInterval(() => {
          currentPercent += increment;
          if (currentPercent >= percent) {
            currentPercent = percent;
            clearInterval(interval);
          }
          progressText.textContent = Math.floor(currentPercent) + '%';
        }, 20);
        observer.unobserve(ring);
      }
    });
  }, { threshold: 0.5 });
  progressRings.forEach((ring) => observer.observe(ring));
}

document.addEventListener('DOMContentLoaded', animateProgressRings);

// STAT COUNTERS
function animateStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-target'));
        const isDecimal = element.hasAttribute('data-decimal');
        let current = 0;
        const increment = target / 30;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }, 30);
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach((num) => observer.observe(num));
}

document.addEventListener('DOMContentLoaded', animateStatCounters);

// CERTIFICATE MODAL
const certCards = document.querySelectorAll('.cert-card');
const certModalOverlay = document.getElementById('cert-modal-overlay');
const certModalClose = document.getElementById('cert-modal-close');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalIssuer = document.getElementById('cert-modal-issuer');
const certModalImg = document.getElementById('cert-modal-img');

const certificateData = {
  java: { title: 'Java Programming', issuer: 'Mindluster', image: 'java_certificate.jpg' },
  aws: { title: 'Solutions Architecture Job Simulation', issuer: 'Amazon AWS', image: 'aws_certificate.jpg' },
  genai: { title: 'Introduction to Generative AI Studio', issuer: 'Google Cloud', image: 'genai_certificate.jpg' },
  accenture: { title: 'Software Engineering Job Simulation', issuer: 'Accenture', image: 'accenture_certificate.jpg' },
  python: { title: 'Basics of Python', issuer: 'Infosys Springboard', image: 'python_certificate.jpg' }
};

certCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const certId = card.getAttribute('data-cert-id');
    const cert = certificateData[certId];
    if (cert) {
      certModalTitle.textContent = cert.title;
      certModalIssuer.textContent = cert.issuer;
      certModalImg.src = cert.image;
      certModalImg.alt = cert.title;
      certModalOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (certModalClose) {
  certModalClose.addEventListener('click', () => {
    certModalOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
  });
}

if (certModalOverlay) {
  certModalOverlay.addEventListener('click', (e) => {
    if (e.target === certModalOverlay) {
      certModalOverlay.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModalOverlay.classList.contains('show')) {
    certModalOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

// COPY EMAIL
const emailBtn = document.getElementById('btn-copy-email');
const emailTooltip = document.getElementById('email-copy-tooltip');

if (emailBtn) {
  emailBtn.addEventListener('click', async () => {
    const email = 'eswaraneswaran877@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      emailTooltip.classList.add('show');
      setTimeout(() => emailTooltip.classList.remove('show'), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}

// DOWNLOAD CV
function downloadMockCV() {
  const cvContent = `ESWARAN S\nFull-Stack Web Developer\nCoimbatore, Tamil Nadu\n\nEmail: eswaraneswaran877@gmail.com\nPhone: +91 8220520093\nGitHub: https://github.com/Eswaran321\nLinkedIn: https://linkedin.com/in/eswaran-it`;
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cvContent));
  element.setAttribute('download', 'Eswaran_S_CV.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

window.downloadMockCV = downloadMockCV;

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

console.log('%c🚀 Welcome to Eswaran\'s Portfolio!', 'color: #00D4FF; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore and get in touch!', 'color: #7B2FBE; font-size: 14px;');