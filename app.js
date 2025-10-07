
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#62d84e' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#62d84e',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', function () {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Engagement Meter
function updateEngagementMeter() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    const circle = document.getElementById('progressCircle');
    const text = document.getElementById('engagementText');
    const circumference = 264;
    const offset = circumference - (scrollPercent / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    text.textContent = Math.round(scrollPercent) + '%';
}

window.addEventListener('scroll', updateEngagementMeter);
window.addEventListener('resize', updateEngagementMeter);

// Add hover effect to engagement meter
document.querySelector('.engagement-meter').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Effect for Hero Title (Optional Enhancement)
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;
let charIndex = 0;

function typeWriter() {
    if (charIndex < originalText.length) {
        heroTitle.textContent = originalText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Uncomment to enable typing effect
// heroTitle.textContent = '';
// setTimeout(typeWriter, 500);

// Add parallax effect to profile image
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        const rate = scrolled * 0.3;
        profileContainer.style.transform = `translateY(${rate}px)`;
    }
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                let currentValue = 0;
                const increment = numericValue / 50;
                const suffix = finalValue.replace(/[0-9]/g, '');

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        stat.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(currentValue) + suffix;
                    }
                }, 30);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsDashboard = document.querySelector('.stats-dashboard');
if (statsDashboard) {
    statsObserver.observe(statsDashboard);
}

// Form Submission Handler
(function () {
    emailjs.init("OKuR8aHc7DFdHJWPc"); // ✅ Replace with your EmailJS public key
})();

const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        // Show loading popup
        Swal.fire({
            title: 'Sending...',
            text: 'Please wait while we send your message.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        emailjs.send("service_x9enwg6", "template_spwnyz9", {
            from_name: name,
            from_email: email,
            message: message,
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for reaching out, I will get back to you soon.',
                    confirmButtonColor: '#62d84e',
                    backdrop: `
            rgba(0,0,0,0.4)
            url("https://media.giphy.com/media/111ebonMs90YLu/giphy.gif")
            center top
            no-repeat
          `
                });
                this.reset();
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Something went wrong. Please try again later.',
                    confirmButtonColor: '#d33'
                });
                console.error("Email error:", err);
            });
    });
}

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor trail effect (optional)
let cursor = {
    x: 0,
    y: 0
};

document.addEventListener('mousemove', function (e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});

// Add glow effect on mouse move over cards
const cards = document.querySelectorAll('.project-card, .skill-category, .cert-card, .logo-card');
cards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// Add 3D tilt effect to project cards
cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transition = 'transform 0.3s ease';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add glowing cursor effect
const glowCursor = document.createElement('div');
glowCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(98, 216, 78, 0.8), transparent);
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
            display: none;
        `;
document.body.appendChild(glowCursor);

document.addEventListener('mousemove', function (e) {
    glowCursor.style.left = e.clientX + 'px';
    glowCursor.style.top = e.clientY + 'px';
    glowCursor.style.display = 'block';
});

document.addEventListener('mouseleave', function () {
    glowCursor.style.display = 'none';
});

// Add scroll reveal animation for timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-50px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);

            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', function () {
    updateEngagementMeter();

    // Add entrance animation to hero section
    setTimeout(() => {
        document.querySelector('.hero-section').style.opacity = '1';
    }, 200);
});

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handler
const throttledScroll = throttle(function () {
    updateEngagementMeter();
}, 50);

window.addEventListener('scroll', throttledScroll);

// Add Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation keyframes
const style = document.createElement('style');
style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
document.head.appendChild(style);

console.log('%c👋 Welcome to my portfolio!', 'color: #62d84e; font-size: 24px; font-weight: bold;');
console.log('%c🚀 Built with passion and ServiceNow expertise', 'color: #293E40; font-size: 16px;');
console.log('%c💼 Let\'s connect: rajeshofficial1002@gmail.com', 'color: #62d84e; font-size: 14px;');