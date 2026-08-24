// ===== THEME SWITCHER =====
const themeBtns = document.querySelectorAll('.theme-btn');
const html = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateActiveBtns(savedTheme);

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateActiveBtns(theme);
    });
});

function updateActiveBtns(theme) {
    themeBtns.forEach(btn => {
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const animateElements = document.querySelectorAll('.animate-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

animateElements.forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const business = document.getElementById('business').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const serviceLabels = {
        'criacao': 'Criar um site do zero',
        'modernizacao': 'Modernizar site existente',
        'landing-page': 'Landing page',
        'outro': 'Outro'
    };

    let whatsappMessage = `Olá! Gostaria de solicitar um orçamento.\n\n`;
    whatsappMessage += `*Nome:* ${name}\n`;
    whatsappMessage += `*E-mail:* ${email}\n`;
    if (phone) whatsappMessage += `*WhatsApp:* ${phone}\n`;
    if (business) whatsappMessage += `*Negócio:* ${business}\n`;
    whatsappMessage += `*Serviço:* ${serviceLabels[service] || service}\n`;
    if (message) whatsappMessage += `*Mensagem:* ${message}\n`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/5500000000000?text=${encodedMessage}`, '_blank');

    contactForm.reset();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Mensagem enviada!';
    btn.style.background = '#25d366';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
});

// ===== COUNTER ANIMATION FOR STEP NUMBERS =====
const stepNumbers = document.querySelectorAll('.step-number');
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

stepNumbers.forEach(num => {
    num.style.opacity = '0';
    num.style.transform = 'translateY(20px)';
    num.style.transition = 'all 0.5s ease';
    stepObserver.observe(num);
});
