// ================================
// EMAILJS INITIALIZATION
// ================================
emailjs.init('0tbP01ileIUeXT3Gs');

// ================================
// NAVIGATION ACTIVE STATE & HAMBURGER MENU
// ================================
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    setupFormHandling();
    setupHamburgerMenu();
    setupModalHandling();
});

function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

function updateActiveNavLink() {
    // Get current page from URL
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Compare paths
        if (currentPage.includes(href) || 
            (currentPage === '/' && href === 'index.html') ||
            (currentPage.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ================================
// SMOOTH SCROLLING
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// FORM HANDLING
// ================================
function setupFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Debug: Log form submission
        console.log('Contact form submitted');
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            title: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        if (!data.name || !data.email || !data.title || !data.message) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email
        if (!isValidEmail(data.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Debug: Log data to be sent
        console.log('Sending EmailJS data:', data);

        // Some EmailJS setups require template_params as a key
        emailjs.send('service_7pbr7yr', 'template_1af8kle', { ...data })
            .then(
                function(response) {
                    console.log('Email sent successfully!', response);
                    showMessageSentModal();
                    form.reset();
                },
                function(error) {
                    console.error('Failed to send email:', error);
                    if (error && error.text) {
                        showFormStatus('Error: ' + error.text, 'error');
                    } else {
                        showFormStatus('Failed to send message. Please try again or email me directly at bridget.kimball@icloud.com', 'error');
                    }
                }
            );
    });
}

function showFormStatus(message, type) {
    const statusElement = document.getElementById('form-status');
    if (!statusElement) return;

    statusElement.textContent = message;
    statusElement.style.display = 'block';
    statusElement.style.color = type === 'success' ? 'var(--secondary-color)' : 'var(--accent-color)';
    statusElement.style.fontWeight = '600';

    // Hide message after 5 seconds
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

function setupModalHandling() {
    const modal = document.getElementById('messageSentModal');
    const closeBtn = document.getElementById('closeModalBtn');

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeMessageSentModal();
        });
    }

    // Close modal when clicking outside of it
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeMessageSentModal();
            }
        });
    }
}

function showMessageSentModal() {
    const modal = document.getElementById('messageSentModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeMessageSentModal() {
    const modal = document.getElementById('messageSentModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ================================
// PROJECT CARD HOVER EFFECTS
// ================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections for animation
document.querySelectorAll('.card, section, .project-card').forEach(element => {
    element.style.opacity = '0.8';
    element.style.transform = 'translateY(10px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ================================
// MOBILE MENU (if needed)
// ================================
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (nav.style.display === 'none') {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
}

// ================================
// KEYBOARD NAVIGATION
// ================================
document.addEventListener('keydown', function(e) {
    // Skip to main content on keyboard focus
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('click', function() {
    document.body.classList.remove('keyboard-nav');
});

// ================================
// PRINT OPTIMIZATION
// ================================
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('nav, footer').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    document.querySelectorAll('nav, footer').forEach(el => {
        el.style.display = '';
    });
});

// ================================
// ANALYTICS & TRACKING (optional)
// ================================
function trackPageView(pageName) {
    // This is a placeholder for analytics tracking
    // In a real application, you would send this to Google Analytics or similar
    console.log('Page viewed:', pageName);
}

// Track page view on page load
document.addEventListener('DOMContentLoaded', function() {
    const pageName = document.title || 'Unknown';
    trackPageView(pageName);
});