// Animate the hero image with a scaling effect
gsap.from(".hero-image", {
    duration: 1.5,
    x: -200,
    opacity: 0,
    ease: "power3.out",
    delay: 1
});

// Slide in from left for the main title
gsap.from("h1.join-text", {
    duration: 1.5,
    x: -200,
    opacity: 0,
    ease: "power3.out",
    delay: 1
});

// Add a pulse effect to the buttons
buttons.forEach((button) => {
    gsap.to(button, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
        paused: true
    });

    button.addEventListener("mouseenter", () => {
        gsap.globalTimeline.play();
    });

    button.addEventListener("mouseleave", () => {
        gsap.globalTimeline.pause();
    });
});

// Animate the container with a slide-in effect
gsap.from(".container", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power2.out",
    delay: 1.5
});

// Create a text reveal effect for the nav items
const navItems = document.querySelectorAll("#navbarNav .nav-item");
navItems.forEach((item, index) => {
    gsap.from(item, {
        duration: 0.6,
        opacity: 0,
        x: -50,
        delay: index * 0.2,
        ease: "power1.out"
    });
});

// Add a shake effect to the buttons on click
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        gsap.to(button, {
            x: 10,
            duration: 0.1,
            yoyo: true,
            repeat: 3,
            ease: "power1.inOut"
        });
    });
});

// Animate the background of the main content section
gsap.from("main", {
    backgroundColor: "#ffffff",
    duration: 2,
    ease: "power1.inOut",
    delay: 2
});

// Create a subtle zoom effect on the hero image during scroll
gsap.to(".hero-image", {
    scale: 1.1,
    scrollTrigger: {
        trigger: ".hero-image",
        start: "top 75%",
        end: "bottom 25%",
        scrub: true
    }
});

// Animate the buttons to reveal on scroll
gsap.from(buttons, {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".container",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
    }
});

// Create a rotating effect on the Join Us text when hovered
gsap.to(".join-text", {
    rotation: 10,
    duration: 0.3,
    paused: true,
    ease: "power2.out"
});
const joinText = document.querySelector(".join-text");
joinText.addEventListener("mouseenter", () => {
    gsap.to(joinText, { rotation: 10, duration: 0.3 });
});
joinText.addEventListener("mouseleave", () => {
    gsap.to(joinText, { rotation: 0, duration: 0.3 });
});

// Animate a gradient background transition on the body
gsap.to("body", {
    background: "linear-gradient(45deg, #ff6b6b, #f7d08a)",
    duration: 3,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true
});

// Animate the footer text to bounce into view
const footerText = document.createElement("div");
footerText.textContent = "© 2024 LINEAGE-2 - All Rights Reserved";
document.body.appendChild(footerText);
gsap.from(footerText, {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "bounce.out",
    delay: 3
});
