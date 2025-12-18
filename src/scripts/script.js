// ================================
// NAVIGATION ACTIVE STATE
// ================================
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    setupFormHandling();
});

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
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            phone: formData.get('phone') || 'Not provided'
        };

        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email
        if (!isValidEmail(data.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        // In a real application, you would send this to a backend service
        console.log('Form data:', data);
        
        // Show success message
        showFormStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        
        // Reset form
        this.reset();
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