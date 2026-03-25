// Initialize Theme
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme && savedTheme !== 'default') {
    document.body.classList.add(savedTheme);
}

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.style.display = 'none', 600);
        }, 800);
    }
});

// --- Custom Cursor Logic ---
const cursor = document.getElementById('cursor-main');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // LERP for smooth follower effect
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    if(cursor) {
        cursor.style.transform = `translate3d(${cursorX - 6}px, ${cursorY - 6}px, 0)`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Logic ---
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        const themes = ['', 'theme-purple', 'theme-ocean', 'theme-sunset', 'theme-forest', 'theme-midnight'];
        themeBtn.addEventListener('click', () => {
            // Find current theme
            let currentTheme = '';
            for (const theme of themes) {
                if (theme && document.body.classList.contains(theme)) {
                    currentTheme = theme;
                    break;
                }
            }
            
            let currentIndex = themes.indexOf(currentTheme);
            let nextIndex = (currentIndex + 1) % themes.length;
            let nextTheme = themes[nextIndex];
            
            // Clear current theme classes
            themes.forEach(t => {
                if (t) document.body.classList.remove(t);
            });
            
            // Add next theme
            if (nextTheme) {
                document.body.classList.add(nextTheme);
            }
            
            localStorage.setItem('portfolio-theme', nextTheme || 'default');
            
            // Optional: animate button
            themeBtn.style.transform = 'scale(0.8)';
            setTimeout(() => themeBtn.style.transform = 'scale(1)', 150);
        });
    }
    
    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu functionality
    // Simplistic approach for static build: toggle class or implement basic overlay
    hamburger.addEventListener('click', () => {
        // We will just do a simple toggle of inline styles for mobile view
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--bg-glass)';
            navLinks.style.backdropFilter = 'blur(12px)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid var(--border-glass)';
        }
    });

    // Close menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHref = link.getAttribute('href');
            
            // Check if it's one of the tabbed sections
            if (['#skills', '#projects', '#experience', '#education'].includes(targetHref)) {
                e.preventDefault();
                
                // Scroll to portfolio section
                const portfolioSec = document.getElementById('portfolio');
                if (portfolioSec) {
                    const topPos = portfolioSec.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top: topPos, behavior: 'smooth' });
                }
                
                // Click the corresponding tab button to show the content
                if (targetHref === '#skills') {
                    const btn = document.querySelector('[data-target="tech-stack-tab"]');
                    if(btn) btn.click();
                } else if (targetHref === '#projects') {
                    const btn = document.querySelector('[data-target="projects-tab"]');
                    if(btn) btn.click();
                } else if (targetHref === '#experience') {
                    const btn = document.querySelector('[data-target="certificates-tab"]');
                    if(btn) btn.click();
                } else if (targetHref === '#education') {
                    const btn = document.querySelector('[data-target="education-tab"]');
                    if(btn) btn.click();
                }
            }

            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Ensure reset on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.borderBottom = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Cursor Hover Effects ---
    const hoverElements = document.querySelectorAll('a, button, .glass, .tech-card, .project-card, input, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursor) cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if(cursor) cursor.classList.remove('hover');
        });
    });

    // Immediate reveal for hero elements
    setTimeout(() => {
        const heroRevels = document.querySelectorAll('#hero .reveal');
        heroRevels.forEach(el => el.classList.add('active'));
    }, 100);

    // --- Tab Switching Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none'; // Ensure its hidden
                // Reset animation
                p.classList.remove('tab-content-anim', 'tab-content-anim-left', 'tab-content-anim-right');
            });

            // Add active class to clicked button
            btn.classList.add('active');

            // Show target pane
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            
            if (targetPane) {
                targetPane.style.display = 'block';

                let animClass = 'tab-content-anim-left';
                if (targetId === 'certificates-tab' || targetId === 'education-tab') {
                    animClass = 'tab-content-anim-right';
                }

                // Small timeout to allow display:block to apply before adding animation class
                setTimeout(() => {
                    targetPane.classList.add('active', animClass);
                }, 10);
            }
        });
    });

    // --- Modal Logic for Certificates ---
    window.openCertModal = function(imageSrc) {
        const modal = document.getElementById("certModal");
        const modalImg = document.getElementById("certModalImg");
        if (modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = imageSrc;
        }
    };

    window.closeCertModal = function() {
        const modal = document.getElementById("certModal");
        if (modal) {
            modal.style.display = "none";
        }
    };

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById("certModal");
        if (modal && e.target === modal) {
            modal.style.display = "none";
        }
    });

    // --- Soft Skills Wheel Logic ---
    const softSkills = [
        { desc: "Always on time & reliable" }, // 0: Punctual
        { desc: "Collaborates effectively" },  // 1: Team Player
        { desc: "Quick to learn & adjust" },   // 2: Adaptability
        { desc: "Innovative problem solver"}   // 3: Creativity
    ];

    const skillNodes = document.querySelectorAll('.skill-content');
    const skillDescEl = document.getElementById('skill-desc');
    let currentSkillIndex = 0;
    let skillInterval;

    function updateSkill(index) {
        skillNodes.forEach(node => node.classList.remove('active'));
        if (skillNodes[index]) {
            skillNodes[index].classList.add('active');
            if (skillDescEl) {
                skillDescEl.style.opacity = '0';
                setTimeout(() => {
                    skillDescEl.textContent = softSkills[index].desc;
                    skillDescEl.style.opacity = '1';
                }, 300);
            }
        }
    }

    function startSkillCycle() {
        if(skillInterval) clearInterval(skillInterval);
        skillInterval = setInterval(() => {
            currentSkillIndex = (currentSkillIndex + 1) % softSkills.length;
            updateSkill(currentSkillIndex);
        }, 3500);
    }

    if (skillNodes.length > 0) {
        updateSkill(currentSkillIndex);
        startSkillCycle();

        const skillsContainer = document.querySelector('.skills-circle-container');
        if (skillsContainer) {
            skillsContainer.addEventListener('mouseenter', () => clearInterval(skillInterval));
            skillsContainer.addEventListener('mouseleave', () => startSkillCycle());
        }

        skillNodes.forEach((node, index) => {
            node.addEventListener('mouseenter', () => {
                currentSkillIndex = index;
                updateSkill(currentSkillIndex);
            });
        });
    }

    // --- Custom Cursor Trail ---
    const cursorDots = [];
    const numDots = 15; // Number of trailing dots

    // Prevent rendering dots on mobile
    if (window.innerWidth > 768) {
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            if (i === 0) dot.classList.add('main'); // Add a specific class to the head
            document.body.appendChild(dot);
            
            cursorDots.push({
                el: dot,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            });
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursorTrail() {
            // Main dot follows mouse
            cursorDots[0].x += (mouseX - cursorDots[0].x) * 0.4; // 0.4 lerp for fast head
            cursorDots[0].y += (mouseY - cursorDots[0].y) * 0.4;
            
            let scaleHead = 1;
            if (cursorDots[0].el.classList.contains('hover')) {
                scaleHead = 3.5;
            }

            // The main dot translation (subtracting 6px offset since width is 12px)
            cursorDots[0].el.style.transform = `translate3d(${cursorDots[0].x - 6}px, ${cursorDots[0].y - 6}px, 0) scale(${scaleHead})`;

            // Trailing dots follow the previous dot
            for (let i = 1; i < numDots; i++) {
                const prevDot = cursorDots[i - 1];
                const currentDot = cursorDots[i];

                // Heavier lerp for trail (creates the smooth liquid path)
                currentDot.x += (prevDot.x - currentDot.x) * 0.35;
                currentDot.y += (prevDot.y - currentDot.y) * 0.35;

                // Opacity fades out naturally across array.
                // Scale fades out nicely as well.
                const scale = 1 - (i / numDots);
                const opacity = 1 - (i / numDots);

                // For the inner dots, we don't scale up on hover
                currentDot.el.style.transform = `translate3d(${currentDot.x - 6}px, ${currentDot.y - 6}px, 0) scale(${scale})`;
                currentDot.el.style.opacity = opacity;
            }

            requestAnimationFrame(animateCursorTrail);
        }

        animateCursorTrail();

        // Add interactive hover states for UI elements
        const interactables = document.querySelectorAll('a, button, .hover-lift, .tab-btn, .skill-content, .cv-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDots[0].el.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorDots[0].el.classList.remove('hover'));
        });
    }

});
