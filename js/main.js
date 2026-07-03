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
  java: { title: 'Java Programming', issuer: 'Mindluster', image: 'assets/images/certificates/java_certificate.jpg' },
  aws: { title: 'Solutions Architecture Job Simulation', issuer: 'Amazon AWS', image: 'assets/images/certificates/aws_certificate.jpg' },
  genai: { title: 'Introduction to Generative AI Studio', issuer: 'Google Cloud', image: 'assets/images/certificates/genai_certificate.jpg' },
  accenture: { title: 'Software Engineering Job Simulation', issuer: 'Accenture', image: 'assets/images/certificates/accenture_certificate.jpg' },
  python: { title: 'Basics of Python', issuer: 'Infosys Springboard', image: 'assets/images/certificates/python_certificate.jpg' }
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

// SCROLL REVEAL (FADE-UP ANIMATION)
function initScrollReveal() {
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add active class to trigger the transition
        entry.target.classList.add('active');
        // Stop observing once it has animated in
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });
  
  fadeElements.forEach((el) => observer.observe(el));
}

// PDF RESUME DOWNLOAD
function downloadResumePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4'
  });

  const resumeContent = [
    { text: 'ESWARAN S', fontSize: 18, fontStyle: 'bold', y: 20 },
    { text: 'Full-Stack Web Developer', fontSize: 11, y: 30 },
    { text: 'Coimbatore, Tamil Nadu', fontSize: 10, y: 36 },
    
    { text: 'CONTACT INFORMATION', fontSize: 12, fontStyle: 'bold', y: 50 },
    { text: 'Email: eswaraneswaran877@gmail.com | Phone: +91 8220520093', fontSize: 9, y: 57 },
    { text: 'GitHub: https://github.com/Eswaran321 | LinkedIn: https://linkedin.com/in/eswaran-it', fontSize: 9, y: 63 },
    
    { text: 'TECHNICAL SKILLS', fontSize: 12, fontStyle: 'bold', y: 75 },
    { text: '• Programming: JavaScript, Java, Python\n• Frontend: React, HTML, CSS, Responsive Design\n• Backend: Node.js, Express, REST APIs\n• Databases: SQL, MongoDB\n• Tools: Git, Docker, AWS, Google Cloud', fontSize: 9, y: 82 },
    
    { text: 'PROJECTS', fontSize: 12, fontStyle: 'bold', y: 115 },
    { text: '• Explainable AI Co-pilot (VSCode Extension) - AI-powered code explanations\n• Automated Bus Route Scheduler (SIH 2025) - Smart scheduling system\n• Money Matters - Android finance management app\n• EV Revolution Solar System (SIH 2024) - IoT renewable energy', fontSize: 9, y: 122 },
    
    { text: 'CERTIFICATIONS', fontSize: 12, fontStyle: 'bold', y: 152 },
    { text: '✓ Java Programming (Mindluster)\n✓ AWS Solutions Architecture (Amazon AWS)\n✓ Generative AI Studio (Google Cloud)\n✓ Software Engineering Simulation (Accenture)\n✓ Python Basics (Infosys Springboard)', fontSize: 9, y: 159 },
    
    { text: 'EDUCATION', fontSize: 12, fontStyle: 'bold', y: 190 },
    { text: 'B.Tech Information Technology\nPark College of Engineering and Technology (2022-2026)\nCGPA: 8.0', fontSize: 9, y: 197 }
  ];

  // Add content to PDF
  resumeContent.forEach(item => {
    const fontSize = item.fontSize || 10;
    const isBold = item.fontStyle === 'bold';
    
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont(undefined, 'bold');
    } else {
      doc.setFont(undefined, 'normal');
    }
    
    doc.text(item.text, 20, item.y, { maxWidth: 170, align: 'left' });
  });

  // Save the PDF
  doc.save('Eswaran_S_Resume.pdf');
}

window.downloadResumePDF = downloadResumePDF;

document.addEventListener('DOMContentLoaded', initScrollReveal);

console.log('%c🚀 Welcome to Eswaran\'s Portfolio!', 'color: #00D4FF; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore and get in touch!', 'color: #7B2FBE; font-size: 14px;');
