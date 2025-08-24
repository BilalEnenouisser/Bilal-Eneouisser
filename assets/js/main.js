// ===== MAIN JAVASCRIPT FILE =====

// Prevent multiple initializations
let appInitialized = false;

// Initialize all app functionality
function initializeApp() {
    if (appInitialized) {
        return;
    }
    
    try {
        initializeTheme();
        initializeNavigation();
        initializeSmoothScrolling();
        initializeTypingEffect();
        initializePortfolioFilters();
        initializeContactForm();
        initializeScrollEffects();
        initializeLanguageSwitcher();
        
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
        
            // Initialize mobile touch enhancements
    initializeMobileTouchEnhancements();
    
    // Initialize logo slider
    initializeLogoSider();
    
    appInitialized = true;
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
    
    // Set initial layout based on screen size
    function setInitialLayout() {
        if (window.innerWidth <= 767) {
            portfolioGrid.classList.remove('desktop-layout');
            portfolioGrid.classList.add('mobile-layout');
        } else {
            portfolioGrid.classList.remove('mobile-layout');
            portfolioGrid.classList.add('desktop-layout');
        }
    }
    
    // Set initial layout
    setInitialLayout();
    
    // Filter function that can be called from both click and touch events
    function applyFilter(filter, button) {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Track portfolio filter usage (only once per filter action)
        const category = button.textContent.trim();
        if (typeof trackPortfolioFilter === 'function') {
            trackPortfolioFilter(category);
        }
        
        let visibleCount = 0;
        
        // Filter items with better mobile handling
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-categories');
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                item.style.display = 'block';
                item.style.opacity = '';
                item.style.transform = '';
                item.style.visibility = '';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Force layout update for mobile
        if (window.innerWidth <= 767) {
            // Mobile: ensure single column layout
            portfolioGrid.classList.remove('desktop-layout');
            portfolioGrid.classList.add('mobile-layout');
            portfolioGrid.style.justifyContent = 'center';
            portfolioGrid.style.gridTemplateColumns = '1fr';
            portfolioGrid.style.gap = '1.5rem';
            
            // Force reflow to ensure filter works
            portfolioGrid.offsetHeight;
            
            // Additional mobile-specific styling
            portfolioGrid.style.maxWidth = '100%';
            portfolioGrid.style.margin = '0 auto';
            
            // Critical: Force filter to work on small mobile devices
            if (window.innerWidth <= 480) {
                // Double-check that hidden items are actually hidden
                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-categories');
                    const shouldShow = filter === 'all' || categories.includes(filter);
                    if (!shouldShow) {
                        item.style.setProperty('display', 'none', 'important');
                    }
                });
            }
        } else {
            // Desktop: show 3 columns
            portfolioGrid.classList.remove('mobile-layout');
            portfolioGrid.classList.add('desktop-layout');
            portfolioGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            portfolioGrid.style.gap = '2rem';
            
            if (visibleCount <= 3) {
                portfolioGrid.style.justifyContent = 'flex-start';
            } else {
                portfolioGrid.style.justifyContent = 'center';
            }
        }
    }

    filterButtons.forEach(button => {
        // Handle both click and touch events for better mobile support
        function handleFilterClick(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const filter = button.getAttribute('data-filter');
            applyFilter(filter, button);
        }
        
        // Add multiple event listeners for maximum compatibility
        button.addEventListener('click', handleFilterClick);
        
        // Touch events for mobile
        button.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            // Add visual feedback
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Reset visual feedback
            button.style.transform = '';
            // Apply filter
            setTimeout(() => handleFilterClick(), 10);
        });
        
        // Pointer events for modern touch devices
        if ('onpointerdown' in window) {
            button.addEventListener('pointerdown', function(e) {
                if (e.pointerType === 'touch') {
                    e.preventDefault();
                    handleFilterClick();
                }
            });
        }
    });
    
    // Handle resize events and viewport changes to maintain proper layout
    function updateLayout() {
        const currentFilter = document.querySelector('.filter-btn.active');
        const filter = currentFilter ? currentFilter.getAttribute('data-filter') : 'all';
        
        if (window.innerWidth <= 767) {
            // Mobile: always show 1 column
            portfolioGrid.classList.remove('desktop-layout');
            portfolioGrid.classList.add('mobile-layout');
            portfolioGrid.style.gridTemplateColumns = '1fr';
            portfolioGrid.style.gap = '1.5rem';
            portfolioGrid.style.justifyContent = 'center';
            portfolioGrid.style.maxWidth = '100%';
            portfolioGrid.style.margin = '0 auto';
            
            // Ensure filter state is maintained on mobile
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-categories');
                const shouldShow = filter === 'all' || categories.includes(filter);
                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.opacity = '';
                    item.style.transform = '';
                    item.style.visibility = '';
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            // Desktop: restore proper grid layout
            const visibleItems = Array.from(portfolioItems).filter(item => {
                const categories = item.getAttribute('data-categories');
                return filter === 'all' || categories.includes(filter);
            });
            
            portfolioGrid.classList.remove('mobile-layout');
            portfolioGrid.classList.add('desktop-layout');
            
            // For filtered results with 3 or fewer items, adjust spacing
            if (visibleItems.length <= 3) {
                portfolioGrid.style.justifyContent = 'flex-start';
            } else {
                portfolioGrid.style.justifyContent = 'center';
            }
        }
    }
    
    // Listen for resize events
    window.addEventListener('resize', updateLayout);
    
    // Listen for orientation changes (mobile devices)
    window.addEventListener('orientationchange', function() {
        // Add a small delay to ensure the orientation change is complete
        setTimeout(updateLayout, 100);
    });
    
    // Listen for viewport changes (when switching between mobile/desktop in dev tools)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateLayout);
    }
    
    // Add media query listener for more reliable viewport detection
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    mediaQuery.addEventListener('change', function(e) {
        if (e.matches) {
            // Switched to mobile - force mobile layout
            portfolioGrid.classList.remove('desktop-layout');
            portfolioGrid.classList.add('mobile-layout');
            portfolioGrid.style.gridTemplateColumns = '1fr';
            portfolioGrid.style.gap = '1.5rem';
            portfolioGrid.style.justifyContent = 'center';
            // Refresh filter state on mobile
            updateLayout();
        } else {
            // Switched to desktop
            portfolioGrid.classList.remove('mobile-layout');
            portfolioGrid.classList.add('desktop-layout');
            portfolioGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            portfolioGrid.style.gap = '2rem';
            // Refresh filter state on desktop
            updateLayout();
        }
    });
    
    // Handle page visibility changes (helps with browser dev tools)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Page became visible again, refresh layout
            setTimeout(updateLayout, 100);
        }
    });
    
    // Periodic check to ensure filter state is maintained on small mobile devices
    if (window.innerWidth <= 480) {
        setInterval(function() {
            const currentFilter = document.querySelector('.filter-btn.active');
            if (currentFilter) {
                const filter = currentFilter.getAttribute('data-filter');
                // Force reapply filter to ensure it's working
                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-categories');
                    const shouldShow = filter === 'all' || categories.includes(filter);
                    if (!shouldShow && item.style.display !== 'none') {
                        item.style.setProperty('display', 'none', 'important');
                    }
                });
            }
        }, 1000); // Check every second
    }
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

// ===== LOGO SLIDER =====
function initializeLogoSider() {
    const logoSlider = document.querySelector('.logo-slider');
    if (!logoSlider) return;
    
    const swiper = new Swiper('.logo-slider', { 
        loop: true,
        speed: 1200,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        
        breakpoints: {
            960: {
                slidesPerView: 5,
                spaceBetween: 30
            },
            720: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            540: {
                slidesPerView: 2,
                spaceBetween: 4
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 2
            },
        }
    });
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
        initializeLogoSider,
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

        // console.log('Testimonials slider initialized successfully');
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
        
        // console.log('Blog functionality initialized successfully');
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
        
        // console.log('Floating social media bar initialized successfully');
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
        
        // console.log('Back to top button initialized successfully');
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
                    // console.log(`Scroll depth ${threshold}% tracked`);
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
        
        // Track portfolio filter clicks (moved to applyFilter function to prevent duplicates)
        
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
        
        
    } catch (error) {
        console.error('Error initializing enhanced tracking:', error);
    }
}

// ===== MOBILE TOUCH ENHANCEMENTS =====
function initializeMobileTouchEnhancements() {
    // Check if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        
        
        // Add touch feedback for skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
                this.style.background = 'var(--primary-color)';
                this.style.color = 'white';
                this.style.borderColor = 'var(--primary-color)';
                this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.2)';
            });
            
            tag.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
        
        // Add touch feedback for tech items
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.2)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
        
        // Add touch feedback for portfolio cards
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--shadow-xl)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
        
        // Add touch feedback for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--shadow-xl)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
        
        // Add touch feedback for buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = 'var(--shadow-lg)';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }
}

// ===== DOM READY EVENT =====
function initializeAppOnce() {
    if (appInitialized) {
        return;
    }
    
    initializeApp();
    
    // Initialize enhanced tracking after app initialization
    setTimeout(() => {
        initializeEnhancedTracking();
    }, 1000);
    
    appInitialized = true;
}

// Single event listener for DOM ready
document.addEventListener('DOMContentLoaded', initializeAppOnce);

// Fallback for older browsers - only if not already initialized
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, initialize immediately
    initializeAppOnce();
}
