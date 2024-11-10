document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP animations
    gsap.from('.logo', {
        duration: 1,
        y: -20,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.auth-container', {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.form-group', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.6
    });

    gsap.from('.btn-submit', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: 'power3.out',
        delay: 1
    });

    gsap.from('.auth-link', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: 'power3.out',
        delay: 1.2
    });
});

// Alert handling
function showAlert(message) {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.classList.add('show');
    
    setTimeout(() => {
        alert.classList.remove('show');
    }, 3000);
}