import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


/* =========================================================
   SIDE MENU
========================================================= */

const menuToggle = document.querySelector("#menuToggle");
const sideMenu = document.querySelector("#sideMenu");
const menuOverlay = document.querySelector("#menuOverlay");

function openMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("active");
    menuToggle.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("active");
    menuToggle.classList.remove("active");

    document.body.style.overflow = "";
}

menuToggle?.addEventListener("click", () => {
    if (sideMenu.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

menuOverlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


/* =========================================================
   SIDE PROJECT DROPDOWN
========================================================= */

const sideProjectButton =
    document.querySelector("#sideProjectButton");

const sideSubmenu =
    document.querySelector("#sideSubmenu");

sideProjectButton?.addEventListener("click", () => {
    sideSubmenu.classList.toggle("open");
    sideProjectButton.classList.toggle("open");
});


/* =========================================================
   HERO PARTICLES
========================================================= */

const particleContainer =
    document.querySelector("#particles");

if (particleContainer) {

    const amount = 28;

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        const x =
            Math.random() * 100;

        const y =
            55 + Math.random() * 45;

        const size =
            Math.random() * 2.5 + 1;

        const duration =
            Math.random() * 8 + 6;

        const delay =
            Math.random() * 10;

        particle.style.left =
            `${x}%`;

        particle.style.top =
            `${y}%`;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.animationDuration =
            `${duration}s`;

        particle.style.animationDelay =
            `${delay}s`;

        particleContainer.appendChild(particle);
    }
}


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroContent =
    document.querySelector(".hero-content");

window.addEventListener("scroll", () => {

    if (!heroContent) {
        return;
    }

    const scroll =
        window.scrollY;

    if (scroll < window.innerHeight) {

        heroContent.style.transform =
            `translateY(${scroll * 0.08}px)`;
    }
});


/* =========================================================
   GOTHIC 3D PROJECT CAROUSEL
========================================================= */

const carouselElement =
    document.querySelector("#gothicCarousel");

const carouselPrev =
    document.querySelector("#carouselPrev");

const carouselNext =
    document.querySelector("#carouselNext");

const carouselProjectNumber =
    document.querySelector("#carouselProjectNumber");

const carouselProjectTitle =
    document.querySelector("#carouselProjectTitle");

const carouselProjectCategory =
    document.querySelector("#carouselProjectCategory");

const carouselDots =
    document.querySelector("#carouselDots");


if (carouselElement) {


    /* =====================================================
       DE 3 SHOWCASES
    ===================================================== */

    const projects = [

        {
            title: "Spil",
            category: "Spil & interaktive oplevelser",
            image: "assets/images/project-02.png",
            link: "games.html"
        },

        {
            title: "Hjemmesider",
            category: "Webdesign & udvikling",
            image: "assets/images/project-01.png",
            link: "websites.html"
        },

        {
            title: "Andet arbejde",
            category: "Design · 3D · Kreativt arbejde",
            image: "assets/images/project-05.png",
            link: "other.html"
        }

    ];


    /* =====================================================
       THREE.JS SCENE
    ===================================================== */

    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            34,
            carouselElement.clientWidth /
            carouselElement.clientHeight,
            0.1,
            100
        );


    camera.position.set(
        0,
        0.15,
        9.2
    );


    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            1
        )
    );


    renderer.setSize(
        carouselElement.clientWidth,
        carouselElement.clientHeight
    );


    renderer.setClearColor(
        0x000000,
        0
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;


    renderer.toneMappingExposure =
        1.05;


    carouselElement.appendChild(
        renderer.domElement
    );


    /* =====================================================
       LYS
    ===================================================== */

    const hemisphereLight =
        new THREE.HemisphereLight(
            0xd8dfc9,
            0x16140d,
            2.1
        );


    scene.add(
        hemisphereLight
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffe0ac,
            3
        );


    keyLight.position.set(
        3,
        5,
        7
    );


    scene.add(
        keyLight
    );


    const fillLight =
        new THREE.DirectionalLight(
            0x7f9a72,
            1.2
        );


    fillLight.position.set(
        -5,
        2,
        4
    );


    scene.add(
        fillLight
    );


    /* =====================================================
       LOADERS
    ===================================================== */

    const gltfLoader =
        new GLTFLoader();


    const textureLoader =
        new THREE.TextureLoader();


    const slides =
        [];


    let currentPosition = 0;
    let targetPosition = 0;
    let lastDisplayedIndex = -1;


    /* =====================================================
       HELPERS
    ===================================================== */

    function normalizedIndex(value) {

        const length =
            projects.length;

        return (
            (value % length) +
            length
        ) % length;
    }


    function wrapOffset(value) {

        const length =
            projects.length;

        return THREE.MathUtils.euclideanModulo(
            value + length / 2,
            length
        ) - length / 2;
    }


    /* =====================================================
       BILLEDE MATERIAL
    ===================================================== */

    function createImageMaterial(imagePath) {

        const material =
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                transparent: true,
                alphaTest: 0.01
            });


        textureLoader.load(

            imagePath,

            texture => {

                texture.colorSpace =
                    THREE.SRGBColorSpace;

                texture.anisotropy =
                    Math.min(
                        8,
                        renderer.capabilities.getMaxAnisotropy()
                    );

                material.map =
                    texture;

                material.needsUpdate =
                    true;


                /*
                 * Billedet er nu færdig-loadet.
                 * Tegn scenen igen, så teksturen
                 * vises med det samme.
                 */

                renderer.render(
                    scene,
                    camera
                );
            },

            undefined,

            error => {

                console.error(
                    "Kunne ikke indlæse billede:",
                    imagePath,
                    error
                );
            }
        );


        return material;
    }


    /* =====================================================
       KLARGØR 3D-RAMME
    ===================================================== */

    function prepareFrameModel(model) {

        model.rotation.y =
            -Math.PI / 2;


        model.updateMatrixWorld(
            true
        );


        const box =
            new THREE.Box3().setFromObject(
                model
            );


        const size =
            new THREE.Vector3();


        const center =
            new THREE.Vector3();


        box.getSize(size);
        box.getCenter(center);


        model.position.sub(
            center
        );


        const targetHeight =
            5.25;


        const scale =
            targetHeight /
            size.y;


        model.scale.setScalar(
            scale
        );


        model.traverse(child => {

            if (!child.isMesh) {
                return;
            }

            child.frustumCulled =
                true;


            if (child.material) {

                const materials =
                    Array.isArray(child.material)
                        ? child.material
                        : [child.material];


                materials.forEach(material => {

                    material.side =
                        THREE.DoubleSide;

                    material.needsUpdate =
                        true;
                });
            }
        });


        return model;
    }


    /* =====================================================
       OPRET SLIDE
    ===================================================== */

    function createSlide(
        frameTemplate,
        project,
        index
    ) {

        const slide =
            new THREE.Group();


        /*
         * Gemmer hvilket projekt denne
         * 3D-ramme hører til.
         */

        slide.userData.index =
            index;


        const frame =
            frameTemplate.clone(true);


        slide.add(
            frame
        );


        /*
         * Billedet ligger som et separat
         * plan inde i 3D-rammen.
         */

        const imageGeometry =
            new THREE.PlaneGeometry(
                3.0,
                4.65
            );


        const imageMaterial =
            createImageMaterial(
                project.image
            );


        const imagePlane =
            new THREE.Mesh(
                imageGeometry,
                imageMaterial
            );


        imagePlane.position.set(
            0.02,
            0.15,
            0.18
        );


        slide.add(
            imagePlane
        );


        scene.add(
            slide
        );


        slides.push(
            slide
        );
    }


    /* =====================================================
       TEKST UNDER KARRUSEL
    ===================================================== */

    function updateProjectInfo(
        force = false
    ) {

        const index =
            normalizedIndex(
                Math.round(
                    currentPosition
                )
            );


        if (
            !force &&
            index === lastDisplayedIndex
        ) {
            return;
        }


        lastDisplayedIndex =
            index;


        const project =
            projects[index];


        carouselProjectNumber.textContent =
            `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;


        carouselProjectTitle.textContent =
            project.title;


        carouselProjectCategory.textContent =
            project.category;


        document
            .querySelectorAll(".carousel-dot")
            .forEach(
                (dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === index
                    );

                }
            );
    }


    /* =====================================================
       PLACERING AF 3D-RAMMERNE
    ===================================================== */

    function updateSlides() {

        const radius = 6.4;
        const angleStep = 0.42;

        slides.forEach((slide, index) => {

            const offset =
                wrapOffset(
                    index - currentPosition
                );

            const angle =
                offset * angleStep;


            /* ---------------------------------
               POSITION PÅ DEN USYNLIGE BUE
            --------------------------------- */

            const x =
                Math.sin(angle) *
                radius;

            const z =
                (
                    Math.cos(angle) *
                    radius
                ) -
                radius;


            slide.position.x = x;

            slide.position.z = z;


            /* ---------------------------------
               SMOOTH HØJDE

               Før blev højden ændret direkte
               efter distance.

               Nu bruger vi en blød kurve.
            --------------------------------- */

            const distance =
                Math.abs(offset);


            const smoothDistance =
                THREE.MathUtils.smoothstep(
                    distance,
                    0,
                    1.5
                );


            slide.position.y =
                THREE.MathUtils.lerp(
                    -0.10,
                    -0.18,
                    smoothDistance
                );


            /* ---------------------------------
               SMOOTH ROTATION
            --------------------------------- */

            slide.rotation.y =
                -angle;


            /* ---------------------------------
               SMOOTH SCALE

               Midten = 1.0
               Siderne bliver gradvist mindre.
            --------------------------------- */

            const targetScale =
                THREE.MathUtils.lerp(
                    1,
                    0.70,
                    smoothDistance
                );


            slide.scale.setScalar(
                targetScale
            );


            /* ---------------------------------
               VISIBILITY
            --------------------------------- */

            slide.visible =
                distance < 2.35;

        });


        updateProjectInfo();
    }


    /* =====================================================
       DOTS
    ===================================================== */

    projects.forEach(
        (_, index) => {


            const dot =
                document.createElement(
                    "button"
                );


            dot.className =
                "carousel-dot";


            dot.type =
                "button";


            dot.setAttribute(
                "aria-label",
                `Vis kategori ${index + 1}`
            );


            dot.addEventListener(
                "click",
                () => {


                    const currentIndex =
                        normalizedIndex(
                            Math.round(
                                targetPosition
                            )
                        );


                    let difference =
                        index -
                        currentIndex;


                    const half =
                        projects.length /
                        2;


                    if (difference > half) {

                        difference -=
                            projects.length;

                    }


                    if (difference < -half) {

                        difference +=
                            projects.length;

                    }


                    targetPosition +=
                        difference;

                }
            );


            carouselDots.appendChild(
                dot
            );

        }
    );


    /* =====================================================
       PILE
    ===================================================== */

    carouselPrev?.addEventListener(
        "click",
        () => {

            targetPosition -=
                1;

        }
    );


    carouselNext?.addEventListener(
        "click",
        () => {

            targetPosition +=
                1;

        }
    );


    /* =====================================================
       DRAG / SWIPE
    ===================================================== */

    let dragging =
        false;


    let dragStartX =
        0;


    let dragStartPosition =
        0;


    let pointerDownX =
        0;


    renderer.domElement.addEventListener(
        "pointerdown",
        event => {


            dragging =
                true;


            dragStartX =
                event.clientX;


            pointerDownX =
                event.clientX;


            dragStartPosition =
                targetPosition;


            renderer.domElement.setPointerCapture(
                event.pointerId
            );

        }
    );


    renderer.domElement.addEventListener(
        "pointermove",
        event => {


            if (!dragging) {
                return;
            }


            const delta =
                event.clientX -
                dragStartX;


            targetPosition =
                dragStartPosition -
                delta / 280;

        }
    );


    renderer.domElement.addEventListener(
        "pointerup",
        () => {


            if (!dragging) {
                return;
            }


            dragging =
                false;


            targetPosition =
                Math.round(
                    targetPosition
                );

        }
    );


    renderer.domElement.addEventListener(
        "pointercancel",
        () => {


            dragging =
                false;


            targetPosition =
                Math.round(
                    targetPosition
                );

        }
    );


    /* =====================================================
       KLIK PÅ 3D-RAMME
    ===================================================== */

    const raycaster =
        new THREE.Raycaster();


    const pointer =
        new THREE.Vector2();


    renderer.domElement.addEventListener(
        "click",
        event => {


            /*
             * Hvis musen er blevet trukket,
             * skal det tælle som drag og IKKE klik.
             */

            const moved =
                Math.abs(
                    event.clientX -
                    pointerDownX
                );


            if (moved > 8) {
                return;
            }


            const rect =
                renderer.domElement.getBoundingClientRect();


            pointer.x =
                (
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width
                ) *
                2 -
                1;


            pointer.y =
                -(
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height
                ) *
                2 +
                1;


            raycaster.setFromCamera(
                pointer,
                camera
            );


            const intersections =
                raycaster.intersectObjects(
                    slides,
                    true
                );


            if (
                intersections.length === 0
            ) {
                return;
            }


            let clickedObject =
                intersections[0].object;


            /*
             * Finder slide-gruppen
             * som objektet ligger inde i.
             */

            while (
                clickedObject &&
                clickedObject.parent &&
                clickedObject.userData.index === undefined
                ) {

                clickedObject =
                    clickedObject.parent;

            }


            const index =
                clickedObject?.userData?.index;


            if (
                index === undefined
            ) {
                return;
            }


            const project =
                projects[index];


            /*
             * Sender brugeren til den
             * tilhørende projektside.
             */

            if (project?.link) {

                window.location.href =
                    project.link;

            }

        }
    );


    /* =====================================================
       MUSEMARKØR
    ===================================================== */

    renderer.domElement.addEventListener(
        "pointermove",
        event => {


            if (dragging) {
                return;
            }


            const rect =
                renderer.domElement.getBoundingClientRect();


            pointer.x =
                (
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width
                ) *
                2 -
                1;


            pointer.y =
                -(
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height
                ) *
                2 +
                1;


            raycaster.setFromCamera(
                pointer,
                camera
            );


            const intersections =
                raycaster.intersectObjects(
                    slides,
                    true
                );


            renderer.domElement.style.cursor =
                intersections.length
                    ? "pointer"
                    : "grab";

        }
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {


            if (
                event.key ===
                "ArrowLeft"
            ) {

                targetPosition -=
                    1;

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                targetPosition +=
                    1;

            }

        }
    );


    /* =====================================================
       LOAD 3D-MODEL
    ===================================================== */

    gltfLoader.load(

        "assets/models/gothic-frame.glb",

        gltf => {


            const frameTemplate =
                prepareFrameModel(
                    gltf.scene
                );


            projects.forEach(
                (project, index) => {


                    createSlide(
                        frameTemplate,
                        project,
                        index
                    );

                }
            );


            updateProjectInfo(
                true
            );


            updateSlides();


            /*
             * Første render efter modellerne
             * er blevet indlæst.
             */

            renderer.render(
                scene,
                camera
            );

        },


        undefined,


        error => {

            console.error(
                "Kunne ikke indlæse gothic-frame.glb:",
                error
            );

        }

    );


    /* =====================================================
       RESPONSIVE
    ===================================================== */

    function resizeCarousel() {


        const width =
            carouselElement.clientWidth;


        const height =
            carouselElement.clientHeight;


        camera.aspect =
            width /
            height;


        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height,
            false
        );


        camera.position.z =
            width < 750
                ? 10.4
                : 9.2;


        /*
         * Tegn scenen igen efter resize.
         */

        renderer.render(
            scene,
            camera
        );

    }


    window.addEventListener(
        "resize",
        resizeCarousel
    );


    resizeCarousel();

    /* =====================================================
       ANIMATION · PERFORMANCE OPTIMERET
    ===================================================== */

    function animate() {

        requestAnimationFrame(animate);


        /*
         * Tjek om karrusellen rent faktisk bevæger sig.
         */

        const difference =
            Math.abs(
                targetPosition -
                currentPosition
            );


        const isMoving =
            difference > 0.0005;


        /*
         * Hvis karrusellen står stille
         * og brugeren ikke dragger:
         *
         * Stop her.
         *
         * Ingen positionsberegninger.
         * Ingen updateSlides().
         * Ingen Three.js render.
         */

        if (
            !isMoving &&
            !dragging
        ) {
            return;
        }


        /*
         * Smooth bevægelse mod næste slide.
         */

        currentPosition =
            THREE.MathUtils.lerp(
                currentPosition,
                targetPosition,
                0.055
            );


        /*
         * Når vi er ekstremt tæt på målet,
         * snapper vi præcist på plads.
         */

        if (
            Math.abs(
                targetPosition -
                currentPosition
            ) <
            0.0005
        ) {

            currentPosition =
                targetPosition;

        }


        /*
         * Opdater kun 3D-modellerne,
         * mens noget faktisk bevæger sig.
         */

        updateSlides();


        /*
         * Render kun Three.js-scenen
         * mens den har ændret sig.
         */

        renderer.render(
            scene,
            camera
        );

    }


    animate();

}