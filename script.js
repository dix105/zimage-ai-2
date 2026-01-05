document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // --- Hero Animation (Floating Shapes - Memphis Style) ---
    const heroAnimationContainer = document.querySelector('.hero-bg-animation');
    if (heroAnimationContainer) {
        const shapes = ['circle', 'square', 'triangle'];
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            const type = shapes[Math.floor(Math.random() * shapes.length)];
            
            shape.classList.add('geo-shape', type);
            
            // Random positioning
            shape.style.left = Math.random() * 90 + 5 + '%';
            shape.style.top = Math.random() * 90 + 5 + '%';
            
            // Random sizing
            const size = Math.random() * 60 + 20;
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            
            // Random animation delay
            shape.style.animationDelay = Math.random() * 10 + 's';
            shape.style.animationDuration = (10 + Math.random() * 10) + 's';
            
            heroAnimationContainer.appendChild(shape);
        }
    }

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // --- Modals (Privacy & Terms) ---
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Event Listeners for Modal Triggers
    document.querySelectorAll('[data-modal-target]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    // Event Listeners for Modal Close Buttons
    document.querySelectorAll('[data-modal-close]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-close');
            closeModal(modalId);
        });
    });

    // Close Modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
});