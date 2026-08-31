/* =============================================
   HEADER SCROLL
============================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =============================================
   PROJECT SLIDERS
============================================= */

const sliderWrappers = document.querySelectorAll(".slider-wrapper");

sliderWrappers.forEach(wrapper => {

    const slider = wrapper.querySelector(".project-slider");

    const nextButton = wrapper.querySelector(".slider-next");
    const prevButton = wrapper.querySelector(".slider-prev");


    nextButton.addEventListener("click", () => {

        const card = slider.querySelector(".project-card");

        const cardWidth = card.offsetWidth;

        slider.scrollBy({
            left: cardWidth + 28,
            behavior: "smooth"
        });

    });


    prevButton.addEventListener("click", () => {

        const card = slider.querySelector(".project-card");

        const cardWidth = card.offsetWidth;

        slider.scrollBy({
            left: -(cardWidth + 28),
            behavior: "smooth"
        });

    });

});


/* =============================================
   SCROLL REVEAL
============================================= */

const revealItems = document.querySelectorAll(
    ".section-header, .project-card"
);


const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.15
});


revealItems.forEach(item => {

    observer.observe(item);

});


/* =============================================
   STAGGER CARDS
============================================= */

document
    .querySelectorAll(".project-slider")
    .forEach(slider => {

        const cards = slider.querySelectorAll(".project-card");

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });


/* =============================================
   HERO PARTICLES
============================================= */

const particleContainer =
    document.querySelector("#particles");


const particleAmount = 30;


for (let i = 0; i < particleAmount; i++) {

    const particle =
        document.createElement("div");

    particle.classList.add("particle");


    const randomX =
        Math.random() * 100;

    const randomY =
        60 + Math.random() * 40;

    const randomDuration =
        5 + Math.random() * 9;

    const randomDelay =
        Math.random() * 8;

    const randomSize =
        1 + Math.random() * 3;


    particle.style.left =
        `${randomX}%`;

    particle.style.top =
        `${randomY}%`;

    particle.style.width =
        `${randomSize}px`;

    particle.style.height =
        `${randomSize}px`;

    particle.style.animationDuration =
        `${randomDuration}s`;

    particle.style.animationDelay =
        `${randomDelay}s`;


    particleContainer.appendChild(particle);

}


/* =============================================
   SUBTLE HERO PARALLAX
============================================= */

const heroContent =
    document.querySelector(".hero-content");


window.addEventListener("scroll", () => {

    const scroll =
        window.scrollY;

    if (scroll < window.innerHeight) {

        heroContent.style.transform =
            `translateY(${scroll * 0.12}px)`;

        heroContent.style.opacity =
            1 - scroll /
            (window.innerHeight * 0.9);

    }

});


/* =============================================
   CARD MOUSE EFFECT
============================================= */

const cards =
    document.querySelectorAll(".project-card");


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;


            card.style.transform =
                `
                translateY(-12px)
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.01)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});