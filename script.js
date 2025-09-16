(function() {
    'use strict';

    function createElement(tag, className, children, attributes) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (attributes) {
            Object.keys(attributes).forEach(key => {
                if (key === 'children') return;
                element.setAttribute(key, attributes[key]);
            });
        }
        if (children) {
            if (Array.isArray(children)) {
                children.forEach(child => {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    } else if (child && child.nodeType) {
                        element.appendChild(child);
                    }
                });
            } else if (typeof children === 'string') {
                element.appendChild(document.createTextNode(children));
            } else if (children && children.nodeType) {
                element.appendChild(children);
            }
        }
        return element;
    }
    
    function createIcon(type, className) {
        const icon = document.createElement('div');
        icon.className = className || '';
        icon.innerHTML = getIconSVG(type);
        return icon;
    }
    
    function getIconSVG(type) {
        const icons = {
            arrow: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path></svg>',
            github: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076-.343-.93-.881-1.175-.881-1.175-.734-.489.048-.489.048-.489.783.049 1.224.832 1.224.832.734 1.223 1.859.88 2.3.685.048-.538.293-.88.489-1.076-1.762-.196-3.621-.881-3.621-3.964 0-.88.293-1.566.832-2.153-.05-.147-.343-.978.098-2.055 0 0 .685-.196 2.201.832.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.984 7.984 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0z"></path></svg>',
            email: '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>',
            linkedin: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>'
        };
        return icons[type] || '';
    }
    
    // ============================================================================
    // TYPEWRITER EFFECT
    // ============================================================================
    
    function createTypewriterEffect(element, words, speed = 100) {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            const currentText = currentWord.substring(0, charIndex);
            
            element.textContent = currentText;
            
            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, speed);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, speed / 2);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, isDeleting ? 1000 : 500);
            }
        }
        
        type();
    }
    
    // ============================================================================
    // SMOOTH SCROLLING
    // ============================================================================
    
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ============================================================================
    // PROJECT MODALS
    // ============================================================================
    
    function initProjectModals() {
        const projectCards = document.querySelectorAll('#projects .cursor-pointer');
        
        console.log('Found project cards:', projectCards.length);
        
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                console.log('Project card clicked!');
                const modal = this.querySelector('.project-modal');
                if (modal) {
                    console.log('Modal found, showing...');
                    modal.style.visibility = 'visible';
                    modal.style.opacity = '1';
                } else {
                    console.log('No modal found in this card');
                }
            });
        });
        
        // Close modals when clicking X
        document.addEventListener('click', function(e) {
            if (e.target.textContent === '×') {
                const modal = e.target.closest('.project-modal');
                if (modal) {
                    modal.style.visibility = 'hidden';
                    modal.style.opacity = '0';
                }
            }
        });
    }
    
    // ============================================================================
    // INITIALIZATION
    // ============================================================================
    
    function initPortfolio() {
        // Initialize typewriter effect
        const typewriterElement = document.querySelector('.text-orange.font-semibold span');
        if (typewriterElement) {
            const words = ['AI.', 'finance', 'software.', 'hacking.'];
            createTypewriterEffect(typewriterElement, words, 100);
        }
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize project modals
        initProjectModals();
        
        // Add hover effects to buttons
        const buttons = document.querySelectorAll('a[href^="#"], .border-2');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'all 0.2s ease';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ============================================================================
    // DOM READY
    // ============================================================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolio);
    } else {
        initPortfolio();
    }
    
    // ============================================================================
    // EXPOSE TO GLOBAL SCOPE (for debugging)
    // ============================================================================
    
    window.PortfolioApp = {
        init: initPortfolio,
        createTypewriterEffect: createTypewriterEffect,
        initSmoothScrolling: initSmoothScrolling,
        initProjectModals: initProjectModals
    };
    

})(); 
