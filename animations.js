// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Three.js background animation
    const canvas = document.getElementById('hero-canvas');
    
    if (canvas) {
        // Use the global THREE variable from CDN instead of import
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Materials
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x8a2be2, // Purple color
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        // Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Add some ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        // Camera position
        camera.position.z = 5;
        
        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;
        
        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - window.innerWidth / 2) / 100;
            mouseY = (event.clientY - window.innerHeight / 2) / 100;
        }
        
        document.addEventListener('mousemove', onDocumentMouseMove);
        
        // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        window.addEventListener('resize', onWindowResize);
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            // Follow mouse
            particlesMesh.rotation.x += mouseY * 0.0005;
            particlesMesh.rotation.y += mouseX * 0.0005;
            
            renderer.render(scene, camera);
        };
        
        animate();
    }

    // Add animation classes to elements
    const addAnimationClasses = () => {
        // About section animations
        document.querySelector('.about-image')?.classList.add('fade-in-right');
        document.querySelector('.about-text')?.classList.add('fade-in-left');
        
        // Service cards animations
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('fade-in-up');
        });
        
        // Contact info animations
        const infoItems = document.querySelectorAll('.info-item');
        infoItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in-left');
        });
        
        // Form animations
        document.querySelector('.contact-form')?.classList.add('fade-in-right');
    };
    
    // Call once on page load
    setTimeout(addAnimationClasses, 500);

    // Scroll animations using Intersection Observer
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('animate-on-scroll', 'fade-in-down');
    });
    
    document.querySelectorAll('.section-line').forEach(line => {
        line.classList.add('animate-on-scroll', 'width-animate');
    });
    
    document.querySelectorAll('.section-description').forEach(desc => {
        desc.classList.add('animate-on-scroll', 'fade-in-up');
    });
    
    // Call animate on scroll
    animateOnScroll();

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        /* Animation Classes */
        .section-hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease;
        }
        
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-in-up {
            animation: fadeInUp 1s ease forwards;
        }
        
        .fade-in-down {
            animation: fadeInDown 1s ease forwards;
        }
        
        .fade-in-left {
            animation: fadeInLeft 1s ease forwards;
        }
        
        .fade-in-right {
            animation: fadeInRight 1s ease forwards;
        }
        
        .width-animate {
            animation: widthAnimate 1.5s ease forwards;
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes widthAnimate {
            from {
                width: 0;
            }
            to {
                width: 80px;
            }
        }
    `;
    
    document.head.appendChild(style);
});