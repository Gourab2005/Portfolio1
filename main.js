// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 2000);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });

    // Add hover effect for links and buttons
    const hoverElements = document.querySelectorAll('a, button, .service-card, .skill-item, .day:not(.empty):not(.disabled), .time-slot');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '0';
            cursor.style.height = '0';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderWidth = '3px';
            cursorFollower.style.backgroundColor = 'rgba(138, 43, 226, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderWidth = '2px';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });

    // Typing effect
    const typingElement = document.querySelector('.typing');
    const words = ['MERN Stack Developer', 'IT Student', 'Web Designer', 'Freelancer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingDelay);
    }
    
    setTimeout(type, 1000);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Skills tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Trigger skill progress animation
            animateSkillBars();
        });
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    
    function openModal() {
        modal.classList.add('active');
    }
    
    function closeModalFunc() {
        modal.classList.remove('active');
    }
    
    closeModal.addEventListener('click', closeModalFunc);
    modalCloseBtn.addEventListener('click', closeModalFunc);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars if skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('section-hidden');
    });

    // Function to animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // For demo purposes, we'll just show a success message
            document.getElementById('modal-title').textContent = 'Message Sent';
            document.getElementById('modal-body').innerHTML = '<p>Thank you for your message! I will get back to you soon.</p>';
            document.getElementById('modal-confirm-btn').style.display = 'none';
            document.getElementById('modal-close-btn').textContent = 'Close';
            
            openModal();
            contactForm.reset();
        });
    }

    // Session booking form submission
    const sessionForm = document.getElementById('session-form');
    
    if (sessionForm) {
        sessionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const sessionType = document.getElementById('session-type').value;
            const dateTime = document.getElementById('selected-datetime').textContent;
            
            // In a real application, you would send the booking data to a server
            // For demo purposes, we'll just show a confirmation message
            document.getElementById('modal-title').textContent = 'Booking Confirmation';
            document.getElementById('modal-body').innerHTML = `
                <p>Thank you for booking a session!</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Session Type:</strong> ${sessionType}</p>
                <p><strong>Date & Time:</strong> ${dateTime}</p>
            `;
            document.getElementById('modal-confirm-btn').style.display = 'none';
            document.getElementById('modal-close-btn').textContent = 'Close';
            
            openModal();
            sessionForm.reset();
            document.getElementById('booking-form').classList.add('hidden');
        });
    }
});