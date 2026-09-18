// js/script.js

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. SCROLL NAVBAR LOGIC
    const navbar = document.getElementById('desktop-nav');
    const navBrand = document.getElementById('nav-brand');
    const navLinks = document.getElementById('nav-links');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-royal/95', 'backdrop-blur-md', 'py-3', 'shadow-lg');
                navbar.classList.remove('bg-transparent', 'py-6');
                if(navBrand) navBrand.classList.replace('text-royal', 'text-white');
                if(navLinks) navLinks.classList.replace('text-royal', 'text-white');
            } else {
                navbar.classList.remove('bg-royal/95', 'backdrop-blur-md', 'py-3', 'shadow-lg');
                navbar.classList.add('bg-transparent', 'py-6');
                if(navBrand) navBrand.classList.replace('text-white', 'text-royal');
                if(navLinks) navLinks.classList.replace('text-white', 'text-royal');
            }
        });
    }

    // 3. RANDOM COLOR TABS LOGIC
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            this.style.setProperty('color', randomColor, 'important');
        });
    });

    // 4. FADE-UP ANIMATION OBSERVER
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach((element) => { 
        observer.observe(element); 
    });

    // 5. ON-DEMAND / LAZY MEDIA LOADING LOGIC (Saves Data until clicked/scrolled)
    let mediaLoaded = false;
    
    function loadLibraryMedia() {
        if (mediaLoaded) return;
        document.querySelectorAll('.library-media').forEach(media => {
            if (media.tagName.toLowerCase() === 'img') {
                if (media.dataset.src) {
                    media.src = media.dataset.src;
                    media.onload = () => media.classList.add('loaded');
                }
            } else if (media.tagName.toLowerCase() === 'video') {
                let source = media.querySelector('source');
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    media.load();
                    media.play().catch(e => console.log("Auto-play prevented by browser"));
                    media.classList.add('loaded');
                }
            }
        });
        mediaLoaded = true;
    }

    // Trigger load when clicking Library tab
    document.querySelectorAll('.lib-trigger').forEach(tab => {
        tab.addEventListener('click', loadLibraryMedia);
    });

    // Trigger load if user manually scrolls down to the Library section
    const librarySection = document.getElementById('library');
    if (librarySection) {
        const libraryObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadLibraryMedia();
                libraryObserver.disconnect();
            }
        }, { threshold: 0.1 });
        
        libraryObserver.observe(librarySection);
    }

});