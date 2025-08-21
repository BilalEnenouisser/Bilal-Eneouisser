// ===== MAIN JAVASCRIPT FILE =====

// Prevent multiple initializations
let appInitialized = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    if (!appInitialized) {
        initializeApp();
        appInitialized = true;
    }
});

// Initialize all app functionality
function initializeApp() {
    console.log('Initializing app...');
    
    try {
        initializeTheme();
        initializeNavigation();
        initializeSmoothScrolling();
        initializeTypingEffect();
        initializePortfolioFilters();
        initializeContactForm();
        initializeScrollEffects();
        initializeLanguageSwitcher();
        initializeBrandsSlider();
        
        // Initialize testimonials slider
        initializeTestimonialsSlider();
        
        // Initialize blog functionality
        initializeBlogFunctionality();
        
        // Initialize floating social media bar
        initializeFloatingSocialBar();
        
        // Initialize back to top button
        initializeBackToTop();
        
        // Initialize animations with a small delay to prevent flash
        setTimeout(() => {
            initializeAnimations();
        }, 100);
        
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(newTheme);
    }
    
    // Desktop theme toggle
    if (themeToggle) {
        updateThemeToggle(savedTheme);
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile theme toggle
    if (themeToggleMobile) {
        updateThemeToggle(savedTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
}

function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    
    // Update desktop toggle
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        themeToggle.setAttribute('aria-label', 
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }
    
    // Update mobile toggle
    if (themeToggleMobile) {
        const icon = themeToggleMobile.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        themeToggleMobile.setAttribute('aria-label', 
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update aria attributes
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Active navigation link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Prevent flash by ensuring element is visible before animation
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                
                // Add staggered animation for about section
                if (entry.target.classList.contains('about-content')) {
                    const aboutElements = entry.target.querySelectorAll('.about-image, .about-text, .about-stats, .contact-info');
                    aboutElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                } else {
                    // Smooth animation without flash
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with pre-set styles
    const animateElements = document.querySelectorAll('.service-card, .skill-category, .portfolio-card, .blog-card, .testimonial-card, .about-content');
    animateElements.forEach(el => {
        // Pre-set initial styles to prevent flash
        el.style.opacity = '0';
        el.style.visibility = 'visible';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Full Stack Developer',
        'UI/UX Designer',
        'E-Commerce Specialist'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    typeText();
}

// ===== PORTFOLIO FILTERS =====
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            let visibleCount = 0;
            
            // Filter items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-categories');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    visibleCount++;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Adjust grid layout based on visible items
            if (visibleCount <= 3) {
                portfolioGrid.style.justifyContent = 'flex-start';
                portfolioGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
            } else {
                portfolioGrid.style.justifyContent = 'center';
                portfolioGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }
        });
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Prepare WhatsApp message
        const whatsappMessage = `Hello! I'm ${name}.\n\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/212622608435?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        showNotification('Message sent! Opening WhatsApp...', 'success');
        
        // Reset form
        this.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        default:
            notification.style.backgroundColor = '#6366f1';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Header scroll effect with throttling
    const header = document.querySelector('.header');
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // Hero animations
    initializeHeroAnimations();
}

// ===== HERO ANIMATIONS =====
function initializeHeroAnimations() {
    // Add scroll-triggered animations for hero elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe hero elements for scroll animations
    const heroElements = document.querySelectorAll('.hero-text, .hero-greeting, .hero-text h1, .typing-container, .hero-description, .hero-actions, .tech-stack, .hero-image');
    heroElements.forEach(el => {
        observer.observe(el);
    });

    // Add hover effects for tech stack items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add pulse animation to hero buttons
    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        button.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

// ===== LANGUAGE SWITCHER =====
function initializeLanguageSwitcher() {
    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');
    
    // Function to handle language toggle
    function handleLanguageToggle(toggleElement) {
        const currentLang = toggleElement.querySelector('span').textContent;
        const languages = ['EN', 'FR', 'AR'];
        const currentIndex = languages.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languages.length;
        const newLang = languages[nextIndex];
        
        changeLanguage(newLang.toLowerCase());
        updateLanguageButton(newLang);
    }
    
    // Get saved language or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    updateLanguageButton(savedLang);
    
    // Desktop language toggle
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            handleLanguageToggle(this);
        });
    }
    
    // Mobile language toggle
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', function() {
            handleLanguageToggle(this);
        });
    }
}

function updateLanguageButton(lang) {
    const langToggle = document.getElementById('lang-toggle');
    const langToggleMobile = document.getElementById('lang-toggle-mobile');
    
    // Update desktop toggle
    if (langToggle) {
        const langSpan = langToggle.querySelector('span');
        if (langSpan) {
            langSpan.textContent = lang.toUpperCase();
        }
    }
    
    // Update mobile toggle
    if (langToggleMobile) {
        const langSpan = langToggleMobile.querySelector('span');
        if (langSpan) {
            langSpan.textContent = lang.toUpperCase();
        }
    }
}

function changeLanguage(lang) {
    const html = document.documentElement;
    
    // Set language and direction
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Save to localStorage
    localStorage.setItem('language', lang);
    
    // Load translations (if available)
    loadTranslations(lang);
}

function loadTranslations(lang) {
    // This would load translations from JSON files
    // For now, we'll just update some basic text
    const translations = {
        en: {
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-services': 'Services',
            'nav-portfolio': 'Portfolio',
            'nav-blog': 'Blog',
            'nav-contact': 'Contact',
            'download-cv': 'Download CV'
        },
        fr: {
            'nav-home': 'Accueil',
            'nav-about': 'À propos',
            'nav-services': 'Services',
            'nav-portfolio': 'Portfolio',
            'nav-blog': 'Blog',
            'nav-contact': 'Contact',
            'download-cv': 'Télécharger CV'
        },
        ar: {
            'nav-home': 'الرئيسية',
            'nav-about': 'حول',
            'nav-services': 'الخدمات',
            'nav-portfolio': 'الأعمال',
            'nav-blog': 'المدونة',
            'nav-contact': 'اتصل بنا',
            'download-cv': 'تحميل السيرة الذاتية'
        }
    };
    
    const currentTranslations = translations[lang] || translations.en;
    
    // Update navigation text
    Object.keys(currentTranslations).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            element.textContent = currentTranslations[key];
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Animate numbers counting up
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Call counter initialization
initializeCounters();

// ===== BRANDS SLIDER =====
function initializeBrandsSlider() {
    const brandsTrack = document.querySelector('.brands-track');
    const brandsSlider = document.querySelector('.brands-slider');
    if (!brandsTrack || !brandsSlider) return;
    
    // Prevent multiple initializations
    if (brandsTrack.dataset.initialized === 'true') return;
    brandsTrack.dataset.initialized = 'true';

    let isMouseDown = false;
    let startX;
    let startTransformX = 0;
    let currentTransformX = 0;
    let animationPaused = false;

    // Pause animation on mouse enter
    brandsTrack.addEventListener('mouseenter', () => {
        if (!isMouseDown) {
            brandsTrack.style.animationPlayState = 'paused';
            animationPaused = true;
        }
    });

    // Resume animation on mouse leave (if not dragging)
    brandsTrack.addEventListener('mouseleave', () => {
        if (!isMouseDown) {
            brandsTrack.style.animationPlayState = 'running';
            animationPaused = false;
        }
    });

    // Mouse down event
    brandsTrack.addEventListener('mousedown', (e) => {
        console.log('Mouse down detected on brands track');
        isMouseDown = true;
        startX = e.pageX - brandsTrack.offsetLeft;
        
        // Get current transform position
        const currentTransform = getComputedStyle(brandsTrack).transform;
        const matrix = new DOMMatrix(currentTransform);
        startTransformX = matrix.m41;
        currentTransformX = startTransformX;
        
        brandsTrack.style.cursor = 'grabbing';
        brandsTrack.style.animationPlayState = 'paused';
        brandsTrack.classList.add('dragging');
        animationPaused = true;
        
        // Temporarily disable CSS animation to allow manual scrolling
        brandsTrack.style.animation = 'none';
        
        console.log('Drag started - isMouseDown:', isMouseDown, 'startX:', startX, 'startTransformX:', startTransformX);
    });

    // Mouse move event
    brandsTrack.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        
        e.preventDefault();
        const x = e.pageX - brandsTrack.offsetLeft;
        const walk = (x - startX) * 2;
        
        // Calculate new transform position
        currentTransformX = startTransformX + walk;
        
        // Add boundary limits to prevent scrolling beyond content
        const trackWidth = brandsTrack.scrollWidth;
        const containerWidth = brandsSlider.offsetWidth;
        const maxScrollLeft = trackWidth - containerWidth;
        
        // Limit scrolling to content boundaries
        if (currentTransformX > 0) {
            currentTransformX = 0; // Don't scroll past the beginning
        } else if (currentTransformX < -maxScrollLeft) {
            currentTransformX = -maxScrollLeft; // Don't scroll past the end
        }
        
        // Apply transform for smooth dragging
        requestAnimationFrame(() => {
            brandsTrack.style.transform = `translateX(${currentTransformX}px)`;
            // Update opacity based on position
            updateBrandsOpacity();
        });
        
        console.log('Mouse move - isMouseDown:', isMouseDown, 'walk:', walk, 'currentTransformX:', currentTransformX, 'maxScrollLeft:', maxScrollLeft);
    });

    // Mouse up event
    brandsTrack.addEventListener('mouseup', () => {
        isMouseDown = false;
        brandsTrack.style.cursor = 'grab';
        brandsTrack.classList.remove('dragging');
        
        // Calculate where the CSS animation should continue from
        const currentPosition = currentTransformX;
        const trackWidth = brandsTrack.scrollWidth;
        const containerWidth = brandsSlider.offsetWidth;
        const maxScrollLeft = trackWidth - containerWidth;
        
        // Ensure position is within bounds
        let finalPosition = currentPosition;
        if (finalPosition > 0) finalPosition = 0;
        if (finalPosition < -maxScrollLeft) finalPosition = -maxScrollLeft;
        
        // Calculate animation delay to continue from current position
        const animationDuration = 30; // 30 seconds from CSS
        const progress = Math.abs(finalPosition) / maxScrollLeft; // 0 to 1
        const animationDelay = -(progress * animationDuration); // Negative for CSS animation
        
        // Apply the final position and restore CSS animation with calculated delay
        brandsTrack.style.transform = `translateX(${finalPosition}px)`;
        brandsTrack.style.animation = `scroll ${animationDuration}s linear infinite`;
        brandsTrack.style.animationDelay = `${animationDelay}s`;
        
        if (!animationPaused) {
            brandsTrack.style.animationPlayState = 'running';
        }
        
        console.log('Drag ended - finalPosition:', finalPosition, 'animationDelay:', animationDelay);
    });

    // Mouse leave event
    brandsTrack.addEventListener('mouseleave', () => {
        if (isMouseDown) {
            isMouseDown = false;
            brandsTrack.style.cursor = 'grab';
            brandsTrack.classList.remove('dragging');
            
            // Calculate where the CSS animation should continue from
            const currentPosition = currentTransformX;
            const trackWidth = brandsTrack.scrollWidth;
            const containerWidth = brandsSlider.offsetWidth;
            const maxScrollLeft = trackWidth - containerWidth;
            
            // Ensure position is within bounds
            let finalPosition = currentPosition;
            if (finalPosition > 0) finalPosition = 0;
            if (finalPosition < -maxScrollLeft) finalPosition = -maxScrollLeft;
            
            // Calculate animation delay to continue from current position
            const animationDuration = 30; // 30 seconds from CSS
            const progress = Math.abs(finalPosition) / maxScrollLeft; // 0 to 1
            const animationDelay = -(progress * animationDuration); // Negative for CSS animation
            
            // Apply the final position and restore CSS animation with calculated delay
            brandsTrack.style.transform = `translateX(${finalPosition}px)`;
            brandsTrack.style.animation = `scroll ${animationDuration}s linear infinite`;
            brandsTrack.style.animationDelay = `${animationDelay}s`;
        }
    });

    // Touch events for mobile
    brandsTrack.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.pageX - brandsTrack.offsetLeft;
        
        // Get current transform position
        const currentTransform = getComputedStyle(brandsTrack).transform;
        const matrix = new DOMMatrix(currentTransform);
        startTransformX = matrix.m41;
        currentTransformX = startTransformX;
        
        brandsTrack.style.animationPlayState = 'paused';
        brandsTrack.classList.add('dragging');
        animationPaused = true;
        
        // Temporarily disable CSS animation to allow manual scrolling
        brandsTrack.style.animation = 'none';
    });

    brandsTrack.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const x = touch.pageX - brandsTrack.offsetLeft;
        const walk = (x - startX) * 2;
        
        // Calculate new transform position
        currentTransformX = startTransformX + walk;
        
        // Add boundary limits to prevent scrolling beyond content
        const trackWidth = brandsTrack.scrollWidth;
        const containerWidth = brandsSlider.offsetWidth;
        const maxScrollLeft = trackWidth - containerWidth;
        
        // Limit scrolling to content boundaries
        if (currentTransformX > 0) {
            currentTransformX = 0; // Don't scroll past the beginning
        } else if (currentTransformX < -maxScrollLeft) {
            currentTransformX = -maxScrollLeft; // Don't scroll past the end
        }
        
        // Apply transform for smooth dragging
        requestAnimationFrame(() => {
            brandsTrack.style.transform = `translateX(${currentTransformX}px)`;
            // Update opacity based on position
            updateBrandsOpacity();
        });
    });

    brandsTrack.addEventListener('touchend', () => {
        brandsTrack.classList.remove('dragging');
        
        // Calculate where the CSS animation should continue from
        const currentPosition = currentTransformX;
        const trackWidth = brandsTrack.scrollWidth;
        const containerWidth = brandsSlider.offsetWidth;
        const maxScrollLeft = trackWidth - containerWidth;
        
        // Ensure position is within bounds
        let finalPosition = currentPosition;
        if (finalPosition > 0) finalPosition = 0;
        if (finalPosition < -maxScrollLeft) finalPosition = -maxScrollLeft;
        
        // Calculate animation delay to continue from current position
        const animationDuration = 30; // 30 seconds from CSS
        const progress = Math.abs(finalPosition) / maxScrollLeft; // 0 to 1
        const animationDelay = -(progress * animationDuration); // Negative for CSS animation
        
        // Apply the final position and restore CSS animation with calculated delay
        brandsTrack.style.transform = `translateX(${finalPosition}px)`;
        brandsTrack.style.animation = `scroll ${animationDuration}s linear infinite`;
        brandsTrack.style.animationDelay = `${animationDelay}s`;
        
        if (!animationPaused) {
            brandsTrack.style.animationPlayState = 'running';
        }
    });

    // Function to update opacity based on position
    function updateBrandsOpacity() {
        const brandItems = brandsTrack.querySelectorAll('.brand-item');
        const sliderWidth = brandsSlider.offsetWidth;
        
        brandItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const sliderRect = brandsSlider.getBoundingClientRect();
            const itemLeft = rect.left - sliderRect.left;
            const itemRight = itemLeft + rect.width;
            
            // Calculate opacity based on position
            let opacity = 1;
            
            // Fade out on left edge
            if (itemLeft < 100) {
                opacity = Math.max(0, itemLeft / 100);
            }
            
            // Fade out on right edge
            if (itemRight > sliderWidth - 100) {
                opacity = Math.max(0, (sliderWidth - itemRight) / 100);
            }
            
            item.style.opacity = opacity;
        });
    }

    // Initial opacity update
    updateBrandsOpacity();
    
    // Test event listener to verify events are working
    brandsTrack.addEventListener('click', (e) => {
        console.log('Click detected on brands track at:', e.clientX, e.clientY);
    });
    
    // Wheel event for mouse wheel scrolling
    brandsTrack.addEventListener('wheel', (e) => {
        e.preventDefault();
        const scrollAmount = e.deltaY > 0 ? 100 : -100;
        brandsTrack.scrollLeft += scrollAmount;
        updateBrandsOpacity();
    });

    // Update opacity on scroll
    brandsTrack.addEventListener('scroll', updateBrandsOpacity);
    
    // Add keyboard support for accessibility
    brandsTrack.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            brandsTrack.scrollLeft -= 100;
            updateBrandsOpacity();
        } else if (e.key === 'ArrowRight') {
            brandsTrack.scrollLeft += 100;
            updateBrandsOpacity();
        }
    });
    
    // Make brands track focusable for keyboard navigation
    brandsTrack.setAttribute('tabindex', '0');
    
    // Debug info
    console.log('Brands slider initialized successfully');
    console.log('Brands track element:', brandsTrack);
    console.log('Brands track scrollable:', brandsTrack.scrollWidth > brandsTrack.clientWidth);
    console.log('Brands track scrollLeft:', brandsTrack.scrollLeft);
}

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initializeTheme,
        initializeNavigation,
        initializeSmoothScrolling,
        initializeAnimations,
        initializeTypingEffect,
        initializePortfolioFilters,
        initializeContactForm,
        initializeScrollEffects,
        initializeLanguageSwitcher,
        initializeBrandsSlider,
        initializeTestimonialsSlider
    };
}

// ===== TESTIMONIALS SLIDER =====
function initializeTestimonialsSlider() {
    try {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const prevArrow = document.querySelector('.nav-arrow-prev');
        const nextArrow = document.querySelector('.nav-arrow-next');
        const track = document.querySelector('.testimonials-track');
        let currentIndex = 0;
        let autoplayInterval;

        if (!testimonialCards.length || !prevArrow || !nextArrow) {
            console.error('Testimonial elements not found');
            return;
        }

        // Function to show testimonial at specific index
        function showTestimonial(index) {
            // Remove active class from all cards
            testimonialCards.forEach(card => card.classList.remove('active'));

            // Add active class to current card
            testimonialCards[index].classList.add('active');

            // Calculate transform for the track to center the active card
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = 32; // 2rem gap
            const containerWidth = document.querySelector('.testimonials-container').offsetWidth;
            const centerOffset = (containerWidth - cardWidth) / 2;
            const offset = -(index * (cardWidth + gap)) + centerOffset;
            track.style.transform = `translateX(${offset}px)`;

            currentIndex = index;

            // Update arrow states
            updateArrowStates();
        }

        // Function to show next testimonial
        function nextTestimonial() {
            const nextIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(nextIndex);
        }

        // Function to show previous testimonial
        function prevTestimonial() {
            const prevIndex = currentIndex === 0 ? testimonialCards.length - 1 : currentIndex - 1;
            showTestimonial(prevIndex);
        }

        // Function to update arrow states
        function updateArrowStates() {
            prevArrow.disabled = currentIndex === 0;
            nextArrow.disabled = currentIndex === testimonialCards.length - 1;
        }

        // Add click event listeners to arrows
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                prevTestimonial();
                resetAutoplay();
            }
        });

        nextArrow.addEventListener('click', () => {
            if (currentIndex < testimonialCards.length - 1) {
                nextTestimonial();
                resetAutoplay();
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevTestimonial();
                resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                nextTestimonial();
                resetAutoplay();
            }
        });

        // Add touch/swipe support
        let startX = 0;
        let endX = 0;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    nextTestimonial();
                } else {
                    // Swipe right - previous
                    prevTestimonial();
                }
                resetAutoplay();
            }
        }

        // Autoplay functionality
        function startAutoplay() {
            autoplayInterval = setInterval(nextTestimonial, 5000);
        }

        function resetAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                startAutoplay();
            }
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        // Pause autoplay on hover (desktop only)
        track.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                stopAutoplay();
            }
        });
        track.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                startAutoplay();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });

        // Initialize first testimonial
        showTestimonial(0);
        
        // Only start autoplay on desktop (not mobile)
        if (window.innerWidth > 768) {
            startAutoplay();
        }

        console.log('Testimonials slider initialized successfully');
    } catch (error) {
        console.error('Error initializing testimonials slider:', error);
    }
}

// ===== BLOG FUNCTIONALITY =====
function initializeBlogFunctionality() {
    try {
        // Initialize blog category filtering
        initializeBlogCategories();
        
        // Initialize blog navigation
        initializeBlogNavigation();
        
        console.log('Blog functionality initialized successfully');
    } catch (error) {
        console.error('Error initializing blog functionality:', error);
    }
}

function initializeBlogCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card[data-category]');
    
    if (categoryBtns.length === 0 || blogCards.length === 0) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog posts with smooth animation
            blogCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeBlogNavigation() {
    // Add smooth scrolling to blog navigation links
    const blogNavLinks = document.querySelectorAll('.blog-post-navigation a');
    
    blogNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle internal links
            if (this.href.includes(window.location.origin) || this.href.startsWith('./') || this.href.startsWith('../')) {
                e.preventDefault();
                
                const targetUrl = this.href;
                
                // Add loading state
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Navigate to the target page
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            }
        });
    });
}

// ===== FLOATING SOCIAL MEDIA BAR =====
function initializeFloatingSocialBar() {
    try {
        const socialBar = document.querySelector('.floating-social-bar');
        if (!socialBar) return;
        
        // Social bar is always visible - no scroll hiding
        socialBar.style.transform = 'translateY(-50%) translateX(0)';
        socialBar.style.opacity = '1';
        
        // Add hover effects
        const socialIcons = socialBar.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // WhatsApp float hover effect
        const whatsappFloat = socialBar.querySelector('.whatsapp-float');
        if (whatsappFloat) {
            whatsappFloat.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            whatsappFloat.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        console.log('Floating social media bar initialized successfully');
    } catch (error) {
        console.error('Error initializing floating social media bar:', error);
    }
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    try {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('Back to top button initialized successfully');
    } catch (error) {
        console.error('Error initializing back to top button:', error);
    }
}

// ===== GOOGLE ANALYTICS ENHANCED TRACKING =====

// Track CV Downloads
function trackCvDownload() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cv_download', {
            'event_category': 'engagement',
            'event_label': 'CV Download',
            'value': 1
        });
        console.log('CV download tracked');
    }
}

// Track Portfolio Project Views
function trackProjectView(projectName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'project_view', {
            'event_category': 'portfolio',
            'event_label': projectName,
            'value': 1
        });
        console.log('Project view tracked:', projectName);
    }
}

// Track Contact Form Interactions
function trackContactInteraction(action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_interaction', {
            'event_category': 'contact',
            'event_label': label,
            'value': 1
        });
        console.log('Contact interaction tracked:', action, label);
    }
}

// Track Social Media Clicks
function trackSocialClick(platform) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'event_category': 'social',
            'event_label': platform,
            'value': 1
        });
        console.log('Social click tracked:', platform);
    }
}

// Track Scroll Depth
function initializeScrollTracking() {
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90];
    const trackedThresholds = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track scroll depth milestones
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            'event_category': 'engagement',
                            'event_label': `${threshold}%`,
                            'value': threshold
                        });
                    }
                    console.log(`Scroll depth ${threshold}% tracked`);
                }
            });
        }
    });
}

// Track Time on Page
function initializeTimeTracking() {
    const startTime = Date.now();
    
    // Track time every 30 seconds
    const timeInterval = setInterval(() => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'time_on_page', {
                'event_category': 'engagement',
                'event_label': 'Time Tracking',
                'value': timeSpent
            });
        }
    }, 30000); // 30 seconds
    
    // Track when user leaves the page
    window.addEventListener('beforeunload', function() {
        const totalTime = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_exit', {
                'event_category': 'engagement',
                'event_label': 'Total Time on Page',
                'value': totalTime
            });
        }
        
        clearInterval(timeInterval);
    });
}

// Track Portfolio Filter Usage
function trackPortfolioFilter(category) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'portfolio_filter', {
            'event_category': 'portfolio',
            'event_label': category,
            'value': 1
        });
        console.log('Portfolio filter tracked:', category);
    }
}

// Track Blog Interactions
function trackBlogInteraction(action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'blog_interaction', {
            'event_category': 'blog',
            'event_label': label,
            'value': 1
        });
        console.log('Blog interaction tracked:', action, label);
    }
}

// Initialize Enhanced Tracking
function initializeEnhancedTracking() {
    try {
        // Initialize scroll tracking
        initializeScrollTracking();
        
        // Initialize time tracking
        initializeTimeTracking();
        
        // Track CV download clicks
        const cvLinks = document.querySelectorAll('a[download*="CV"]');
        cvLinks.forEach(link => {
            link.addEventListener('click', trackCvDownload);
        });
        
        // Track portfolio filter clicks
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.textContent.trim();
                trackPortfolioFilter(category);
            });
        });
        
        // Track social media clicks
        const socialLinks = document.querySelectorAll('a[href*="instagram"], a[href*="linkedin"], a[href*="github"], a[href*="facebook"], a[href*="dribbble"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', function() {
                const href = this.href;
                let platform = 'other';
                if (href.includes('instagram')) platform = 'instagram';
                else if (href.includes('linkedin')) platform = 'linkedin';
                else if (href.includes('github')) platform = 'github';
                else if (href.includes('facebook')) platform = 'facebook';
                else if (href.includes('dribbble')) platform = 'dribbble';
                
                trackSocialClick(platform);
            });
        });
        
        // Track WhatsApp clicks
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackContactInteraction('whatsapp_click', 'WhatsApp Contact');
            });
        });
        
        // Track contact form submissions
        const contactForms = document.querySelectorAll('form');
        contactForms.forEach(form => {
            form.addEventListener('submit', function() {
                trackContactInteraction('form_submit', 'Contact Form Submission');
            });
        });
        
        console.log('Enhanced Google Analytics tracking initialized successfully');
    } catch (error) {
        console.error('Error initializing enhanced tracking:', error);
    }
}

// ===== DOM READY EVENT =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing app...');
    initializeApp();
    
    // Initialize enhanced tracking after app initialization
    setTimeout(() => {
        initializeEnhancedTracking();
    }, 1000);
});

// Fallback for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
    setTimeout(() => {
        initializeEnhancedTracking();
    }, 1000);
}
