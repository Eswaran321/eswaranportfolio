document.addEventListener("DOMContentLoaded", () => {

      // -----------------------------------------
      // A. CUSTOM LAG CURSOR
      // -----------------------------------------
      const cursor = document.getElementById("custom-cursor");
      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;
      
      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function animateCursor() {
        // Linear interpolation logic for smooth trailing effect
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      // Expand cursor on hovering interactive elements
      const interactiveEls = document.querySelectorAll("a, button, .project-card, .stat-card, .cert-card, .navbar .logo");
      interactiveEls.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
      });

      // -----------------------------------------
      // B. GLITCH TEXT SCRAMBLE ON NAME LOAD
      // -----------------------------------------
      const glitchName = document.getElementById("glitch-name");
      const targetText = "ESWARAN S";
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@?$*";
      let iterations = 0;
      
      const scrambleInterval = setInterval(() => {
        glitchName.innerText = targetText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            if (char === " ") return " ";
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");
        
        if (iterations >= targetText.length) {
          clearInterval(scrambleInterval);
        }
        
        iterations += 1/3; // Scramble speed factor
      }, 30);

      // -----------------------------------------
      // C. TYPEWRITER TITLE ANIMATION
      // -----------------------------------------
      const typewriterSpan = document.getElementById("typewriter");
      const titles = [
        "Full Stack Developer.",
        "React.js Enthusiast.",
        "SIH Hackathon Participant.",
        "Problem Solver."
      ];
      let titleIdx = 0;
      let charIdx = 0;
      let isDeleting = false;
      let typingSpeed = 100;

      function handleTypewriter() {
        const currentTitle = titles[titleIdx];
        
        if (!isDeleting) {
          typewriterSpan.innerText = currentTitle.substring(0, charIdx + 1);
          charIdx++;
          typingSpeed = 80;
          
          if (charIdx === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full string
          }
        } else {
          typewriterSpan.innerText = currentTitle.substring(0, charIdx - 1);
          charIdx--;
          typingSpeed = 40;
          
          if (charIdx === 0) {
            isDeleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
            typingSpeed = 500; // Pause before typing next
          }
        }
        setTimeout(handleTypewriter, typingSpeed);
      }
      setTimeout(handleTypewriter, 1000);

      // -----------------------------------------
      // D. NAVBAR SHRINK ON SCROLL & MOBILE DRAWER
      // -----------------------------------------
      const navbar = document.getElementById("main-navbar");
      const hamburger = document.getElementById("btn-hamburger");
      const mobileMenu = document.getElementById("overlay-mobile-menu");
      const mobileLinks = document.querySelectorAll(".mobile-link-item");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
          navbar.classList.add("shrink");
        } else {
          navbar.classList.remove("shrink");
        }
      });

      // Toggle Hamburger open/close states
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        document.body.classList.toggle("no-scroll"); // Prevent page scrolling when open
      });

      // Close mobile drawer on link selection
      mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          mobileMenu.classList.remove("open");
          document.body.classList.remove("no-scroll");
        });
      });

      // -----------------------------------------
      // E. BACK TO TOP BUTTON
      // -----------------------------------------
      const backToTopBtn = document.getElementById("btn-back-to-top");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      });

      // -----------------------------------------
      // F. INTERSECTION OBSERVER FOR FADE-UP ANIMATIONS
      // -----------------------------------------
      const fadeElements = document.querySelectorAll(".fade-up");
      const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      };

      const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Trigger once
          }
        });
      }, observerOptions);

      fadeElements.forEach(el => fadeObserver.observe(el));

      // -----------------------------------------
      // G. ABOUT STATS COUNT-UP ANIMATION
      // -----------------------------------------
      const statNumbers = document.querySelectorAll(".stat-number");
      
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const numEl = entry.target;
            const targetVal = parseFloat(numEl.getAttribute("data-target"));
            const decimals = parseInt(numEl.getAttribute("data-decimal")) || 0;
            const suffix = numEl.innerText.includes("+") ? "+" : (numEl.innerText.includes("x") ? "x" : "");
            
            animateCounter(numEl, targetVal, decimals, suffix);
            observer.unobserve(numEl); // Only animate once
          }
        });
      }, { threshold: 0.5 });

      statNumbers.forEach(num => statsObserver.observe(num));

      function animateCounter(element, target, decimals, suffix) {
        let startTime = null;
        const duration = 1200; // 1.2s duration

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const currentVal = progress * target;
          
          element.innerText = currentVal.toFixed(decimals) + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            element.innerText = target.toFixed(decimals) + suffix;
          }
        }
        requestAnimationFrame(step);
      }

      // -----------------------------------------
      // H. SKILL CIRCULAR PROGRESS ARCS FILLS
      // -----------------------------------------
      const progressBars = document.querySelectorAll(".progress-ring-bar");
      
      const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const percent = parseInt(bar.getAttribute("data-percent"));
            const radius = bar.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            
            // Set initial parameters
            bar.style.strokeDasharray = `${circumference} ${circumference}`;
            bar.style.strokeDashoffset = circumference;
            
            // Force reflow for transitions to kick in
            bar.getBoundingClientRect();
            
            const offsetValue = circumference - (percent / 100) * circumference;
            bar.style.strokeDashoffset = offsetValue;
            
            // Animate local label percentage text alongside
            const container = bar.closest(".progress-container");
            const textEl = container.querySelector(".progress-text");
            animateSkillLabel(textEl, percent);
            
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.2 });

      progressBars.forEach(bar => skillsObserver.observe(bar));

      function animateSkillLabel(element, maxPercent) {
        let current = 0;
        const speed = 1500 / maxPercent; // duration match
        const timer = setInterval(() => {
          if (current >= maxPercent) {
            element.innerText = `${maxPercent}%`;
            clearInterval(timer);
          } else {
            current++;
            element.innerText = `${current}%`;
          }
        }, speed);
      }

      // -----------------------------------------
      // I. PROJECTS 3D CARD TILT ON HOVER
      // -----------------------------------------
      const projectCards = document.querySelectorAll(".project-card");

      projectCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left; // Mouse relative X inside card
          const y = e.clientY - rect.top;  // Mouse relative Y inside card
          
          // Offset relative to center of the card
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Normalized offsets (-0.5 to 0.5)
          const deltaX = (x - centerX) / rect.width;
          const deltaY = (y - centerY) / rect.height;
          
          // Rotate multipliers (scale up to max 12 deg tilt)
          const rotateXVal = -deltaY * 15;
          const rotateYVal = deltaX * 15;
          
          card.style.transform = `perspective(800px) rotateX(${rotateXVal}deg) rotateY(${rotateYVal}deg) scale(1.02)`;
        });

        card.addEventListener("mouseleave", () => {
          // Snap card smoothly back to original flat state
          card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
      });

      // -----------------------------------------
      // J. ACTIVE SECTION SCROLL HIGHLIGHTING
      // -----------------------------------------
      const sections = document.querySelectorAll("section");
      const navLinkItems = document.querySelectorAll(".nav-link-item");
      const mobileLinkItems = document.querySelectorAll(".mobile-link-item");

      const sectionHighlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute("id");
            
            navLinkItems.forEach(item => {
              if (item.getAttribute("href") === `#${activeId}`) {
                item.classList.add("active");
              } else {
                item.classList.remove("active");
              }
            });

            mobileLinkItems.forEach(item => {
              if (item.getAttribute("href") === `#${activeId}`) {
                item.classList.add("active");
              } else {
                item.classList.remove("active");
              }
            });
          }
        });
      }, { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" });

      sections.forEach(sec => sectionHighlightObserver.observe(sec));

      // -----------------------------------------
      // K. CERTIFICATE MODAL SYSTEM
      // -----------------------------------------

      // Certificate image file paths
      const CERT_JAVA = "assets/certs/java_certificate.jpg";
      const CERT_AWS = "assets/certs/aws_certificate.jpg";
      const CERT_GENAI = "assets/certs/genai_certificate.jpg";
      const CERT_ACCENTURE = "assets/certs/accenture_certificate.jpg";
      const CERT_PYTHON = "assets/certs/python_certificate.jpg";

      // Certificate data — base64 images embedded inline
      const certData = {
        java: {
          title: "Java Programming",
          issuer: "Mindluster",
          src: CERT_JAVA
        },
        aws: {
          title: "Solutions Architecture Job Simulation",
          issuer: "Amazon AWS · Forage",
          src: CERT_AWS
        },
        genai: {
          title: "Introduction to Generative AI Studio",
          issuer: "Simplilearn · Google Cloud",
          src: CERT_GENAI
        },
        accenture: {
          title: "Software Engineering Job Simulation",
          issuer: "Accenture · Forage",
          src: CERT_ACCENTURE
        },
        python: {
          title: "Basics of Python",
          issuer: "Infosys Springboard",
          src: CERT_PYTHON
        }
      };

      const certOverlay  = document.getElementById("cert-modal-overlay");
      const certModalImg = document.getElementById("cert-modal-img");
      const certModalTitle  = document.getElementById("cert-modal-title");
      const certModalIssuer = document.getElementById("cert-modal-issuer");
      const certModalClose  = document.getElementById("cert-modal-close");

      function openCertModal(certId) {
        const cert = certData[certId];
        if (!cert) return;
        certModalImg.src = cert.src;
        certModalImg.alt = cert.title + " Certificate";
        certModalTitle.textContent = cert.title;
        certModalIssuer.textContent = "· " + cert.issuer;
        certOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
      }

      function closeCertModal() {
        certOverlay.classList.remove("open");
        document.body.style.overflow = "";
        // Clear src after transition to free memory
        setTimeout(() => { certModalImg.src = ""; }, 350);
      }

      // Attach click to every cert card
      document.querySelectorAll(".cert-card[data-cert-id]").forEach(card => {
        card.addEventListener("click", () => openCertModal(card.dataset.certId));
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openCertModal(card.dataset.certId);
          }
        });
      });

      // Close on button or overlay background click
      certModalClose.addEventListener("click", closeCertModal);
      certOverlay.addEventListener("click", (e) => {
        if (e.target === certOverlay) closeCertModal();
      });

      // Close on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && certOverlay.classList.contains("open")) closeCertModal();
      });

      // -----------------------------------------
      // L. CONTACT COPY EMAIL TO CLIPBOARD
      // -----------------------------------------
      const copyEmailBtn = document.getElementById("btn-copy-email");
      const copyTooltip = document.getElementById("email-copy-tooltip");
      const emailAddress = "eswaraneswaran877@gmail.com";

      copyEmailBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(emailAddress).then(() => {
          copyTooltip.classList.add("show");
          setTimeout(() => {
            copyTooltip.classList.remove("show");
          }, 2500);
        }).catch(err => {
          console.error("Failed to copy text: ", err);
        });
      });

    });

    // -----------------------------------------
    // M. DYNAMIC RESUME GENERATOR & DOWNLOAD
    // -----------------------------------------
    function downloadMockCV() {
      const cvContent = `ESWARAN S - Full Stack Web Developer
Coimbatore, Tamil Nadu, India
Email: eswaraneswaran877@gmail.com
Phone: +91 8220520093
GitHub: https://github.com/Eswaran321
LinkedIn: https://linkedin.com/in/eswaran-it

==================================================
SUMMARY
==================================================
Information Technology final-year student and Full-Stack Web Developer. 
Experienced in designing, building, and deploying responsive web products 
and android applications. Possesses strong database design capabilities and 
practical problem-solving skills derived from multiple Smart India Hackathons.

==================================================
EDUCATION
==================================================
* B.Tech in Information Technology | CGPA: 8.0
  Park College of Engineering and Technology, Coimbatore (2022 - 2026)
  
* Higher Secondary Certificate (Class 12) | Score: 67.5%
  Velumanickam Mont Matric HSS, Ramanathapuram (2021)

==================================================
EXPERIENCE & POSITIONS
==================================================
* Full Stack Web Developer Course Student
  QSpiders (2026)
  Mastering React.js, Node.js, and modern databases stacks.

* Cultural Secretary & Management Team Member
  Park College of Engineering and Technology (2025)
  Coordinated intra-college logistics and events for 500+ participants.

* Cultural Secretary & Technical Lead
  Park College of Engineering and Technology (2024)
  Spearheaded tech integrations for campus systems and festival management.

==================================================
TECHNICAL SKILLS
==================================================
* Core Web Tech: HTML5, CSS3, Vanilla JavaScript
* Libraries & Frameworks: React.js
* Languages: Core Java, SQL
* Development Tools: Android Studio, Git, Figma, Vite
* Architecture: REST APIs, Object-Oriented Programming, Responsive Web Layouts

==================================================
PROJECTS
==================================================
1. Explainable AI Co-pilot (2026)
   - VSCode extension to scan, score, and detect AI vs human content.
   - Built with full-stack technologies to interpret explainability scores.

2. Automated Bus Route Scheduler (2025)
   - Intelligent route planner optimizing city bus paths.
   - Smart India Hackathon Project.

3. Money Matters (2025)
   - Personal budget & expenses manager Android application.
   - Built under the Naan Muthalvan program using Android Studio and SQLite.

4. EV Revolution Solar System (2024)
   - Microgrid hybrid solar battery EV charging prototype.
   - Smart India Hackathon Project.

5. Theft Detection Alarm Robot (2019)
   - Sensor-based robotics alarm security system using microcontrollers.
   - High school design engineering experiment.

==================================================
CERTIFICATIONS
==================================================
* Java Programming - Mindluster
* Solution Architecture - Amazon AWS
* Generative AI Studio - Simplilearn & SkillUp
* Data Analytics Job Simulation - Deloitte
* Python Programming Basics - Infosys
`;

      const blob = new Blob([cvContent], { type: "text/plain;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Eswaran_S_Resume.txt");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }