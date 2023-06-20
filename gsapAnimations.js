gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    CustomEase,
    SplitText
);

gsap.registerPlugin(Observer);


//
document.querySelector(".skip-down-btn").addEventListener("click", () => {
    menuClick(".work-section");
});

function menuClick(section) {
    gsap.to(window, { duration: 2, scrollTo: { y: section } });
}


if (document.querySelector(".hero__title")) {
    const childSplit = new SplitText(".hero__title", {
        type: "lines",
        linesClass: "split-child"
    });

    const parentSplit = new SplitText(".hero__title", {
        linesClass: "split-parent"
    });

    gsap.from(childSplit.lines, {
        duration: 1.5,
        yPercent: 100,
        ease: "power4",
        stagger: 0.2,
        delay: 0.8,
    });



}
setTimeout(() => {
    // menuClick(".test");
    gsap.to(".hero-container", {
            y: "-100%",
            display: "none",
            duration: 2.5
        })
        // gsap.to(".hero__content", {
        //         y: "-100%",
        //         display: "none",
        //         duration: 1
        //     })
        // document.querySelector(".hero-container").style.display = "none";
}, 2500)
const childSplit1 = new SplitText(".section-create h5", {
    type: "lines",
    linesClass: "split-child1"
});

const parentSplit1 = new SplitText(".section-create h5", {
    linesClass: "split-parent1"
});

function myFunction(x) {
    if (!x.matches) {
        const nav = document.querySelectorAll(".expertise-section-list a");

        let sections = document.querySelectorAll(".expertise-section section"),
            images = document.querySelectorAll(".bg"),
            headings = gsap.utils.toArray(".section-heading"),
            outerWrappers = gsap.utils.toArray(".outer"),
            innerWrappers = gsap.utils.toArray(".inner"),
            splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })),
            currentIndex = -1,
            wrap = gsap.utils.wrap(0, sections.length),
            animating;

        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });

        function gotoSection(index, direction) {
            index = wrap(index);
            animating = true;
            let fromTop = direction === -1,
                dFactor = fromTop ? -1 : 1,
                tl = gsap.timeline({
                    defaults: { duration: 0.8, ease: "power1.inOut" },
                    onComplete: () => animating = false
                });
            if (currentIndex >= 0) {

                gsap.set(sections[currentIndex], { zIndex: 0 });
                tl.to(images[currentIndex], { yPercent: -15 * dFactor })
                    .set(sections[currentIndex], { autoAlpha: 0 });
            }
            if (!fromTop) {
                nav.forEach(el => el.classList.remove("expertise-btn--active"));
                nav[index].classList.add("expertise-btn--active");
                index !== 0 && nav[index - 1].classList.remove("expertise-btn--active");
            } else {
                nav.forEach(el => el.classList.remove("expertise-btn--active"));
                nav[index].classList.add("expertise-btn--active");
                index !== 5 && nav[index + 1].classList.remove("expertise-btn--active");
            }

            // if (index === 5) {
            //     menuClick(".work-section");
            // }
            gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
            tl.fromTo([outerWrappers[index], innerWrappers[index]], {
                    yPercent: i => i ? -100 * dFactor : 100 * dFactor
                }, {
                    yPercent: 0
                }, 0)
                .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
                .fromTo(splitHeadings[index].chars, {
                    autoAlpha: 0,
                    yPercent: 300 * dFactor,
                    opacity: 0
                }, {
                    autoAlpha: 1,
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2",
                    stagger: {
                        each: 0.03,
                        from: "random"
                    }
                }, 0.2);

            currentIndex = index;
        }


        var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

        function preventDefault(e) {
            e.preventDefault();
        }

        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }

        var supportsPassive = false;
        try {
            window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
                get: function() { supportsPassive = true; }
            }));
        } catch (e) {}

        var wheelOpt = supportsPassive ? { passive: false } : false;
        var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';


        function disableScroll() {
            window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
            window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
            window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
            window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        }

        function enableScroll() {
            console.log("enable")
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
            window.removeEventListener('touchmove', preventDefault, wheelOpt);
            window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        }


        let last = false;
        let first = false;
        let index = 0;
        const testSection = ScrollTrigger.create({
            trigger: ".expertise-section",
            // scrub: true,
            // start: "top top",
            // end: "bottom",
            pin: true,
            // markers: true,
            onEnter: () => {
                Observer.create({
                    type: "wheel,touch,pointer",
                    wheelSpeed: -1,
                    onDown: () => {
                        if (testSection.isActive && currentIndex !== 0) {
                            !animating && gotoSection(currentIndex - 1, -1);
                        }
                        if (currentIndex >= 0 && currentIndex < 5) {

                            disableScroll();
                            first = true;


                        }

                    },
                    onUp: () => {

                        if (testSection.isActive && currentIndex !== 5) {
                            !animating && gotoSection(currentIndex + 1, 1);
                            index = 0;
                        }
                        if (currentIndex === 5) {

                            // menuClick(".work-section");
                            // enableScroll();
                            last = true;
                            index++;

                        }
                        if (currentIndex !== 5) {
                            last = false;
                        }
                        if (last && index > 1) {
                            console.log(index)
                            menuClick(".work-section");
                            testSection.disble();
                        }
                        console.log(index)
                            // if (currentIndex === 0) {
                            //     enableScroll()
                            // }
                            // if (last && currentIndex === 0) {
                            //     currentIndex = 5;
                            //     menuClick(".work-section");
                            // }
                    },
                    tolerance: 10,
                    // preventDefault: true
                });
                disableScroll();

            },
            onEnterBack: () => {
                Observer.create({
                    type: "wheel,touch,pointer",
                    wheelSpeed: -1,
                    onDown: () => {
                        disableScroll();
                        if (testSection.isActive && currentIndex !== 0) {
                            !animating && gotoSection(currentIndex - 1, -1);
                        }
                        if (currentIndex >= 0 && currentIndex < 5) {

                            disableScroll();
                            first = true;

                        }

                    },
                    onUp: () => {

                        if (testSection.isActive && currentIndex !== 5) {
                            !animating && gotoSection(currentIndex + 1, 1);
                            index = 0;
                        }
                        if (currentIndex === 5) {
                            // enableScroll();
                            last = true;
                            index++;

                        }
                        if (currentIndex !== 5) {
                            last = false;
                        }
                        if (last && index > 1) {
                            console.log(index)
                            menuClick(".work-section");
                            testSection.disble();
                        }
                    },
                    tolerance: 10,
                    // preventDefault: true
                });
                disableScroll();
            },
            onLeave: () => {
                enableScroll();
                last = false;
                index = 0;
            },
            onLeaveBack: () => {
                enableScroll();
                last = false;
                index = 0;
                // Observer.disconnect();
            },

        });


        gotoSection(0, 1);



        gsap.utils.toArray(".expertise-section-list a").forEach((a, index) => {


            a.addEventListener("click", () => {
                gotoSection(index, 1);
                nav.forEach(el => el.classList.remove("expertise-btn--active"));
                nav[index].classList.add("expertise-btn--active");

            })
        })


        //////////


        let workSections = document.querySelectorAll(".work-item"),
            workOuterWrappers = gsap.utils.toArray(".outer-work"),
            workInnerWrappers = gsap.utils.toArray(".inner-work"),
            currentIndexWork = -1,
            wrapWork = gsap.utils.wrap(0, workSections.length),
            animatingWork;

        gsap.set(workOuterWrappers, { yPercent: 100 });
        gsap.set(workInnerWrappers, { yPercent: -100 });

        function gotoSectionWork(index, direction) {
            index = wrapWork(index);
            animatingWork = true;
            let fromTop = direction === 1,
                dFactor = fromTop ? -1 : 1,
                tl = gsap.timeline({
                    defaults: { duration: 1.25, ease: "power1.inOut" },
                    onComplete: () => animatingWork = false
                });
            if (currentIndexWork >= 0) {

                gsap.set(workSections[currentIndexWork], { zIndex: 0 });

                tl.set(workSections[currentIndexWork], { autoAlpha: 0 });
            }
            // if (index === 3) {
            //     setTimeout(() => {
            //         menuClick(".section-agencies");
            //     }, 2000)

            // }
            gsap.set(workSections[index], { autoAlpha: 1, zIndex: 1 });
            tl.fromTo([workOuterWrappers[index], workInnerWrappers[index]], {
                yPercent: i => i ? -100 * dFactor : 100 * dFactor
            }, {
                yPercent: 0
            }, 0)


            currentIndexWork = index;
        }


        let workSectionLast = false;
        let workSecIndex = 0;

        const workSection = ScrollTrigger.create({
            trigger: ".work-section",
            // scrub: true,
            // start: "top top",
            // end: "bottom",
            pin: true,
            // markers: true,

            onEnter: () => {

                Observer.create({
                    type: "wheel,touch,pointer",
                    wheelSpeed: -1,
                    onDown: () => {
                        workSectionLast = false;
                        if (workSection.isActive && currentIndexWork !== 0) {
                            !animatingWork && gotoSectionWork(currentIndexWork - 1, -1);
                        }
                        if (currentIndexWork === 0) {
                            enableScroll();
                        }
                    },
                    onUp: () => {

                        if (workSection.isActive && currentIndexWork !== 3) {
                            !animatingWork && gotoSectionWork(currentIndexWork + 1, 1);
                            workSecIndex = 0;
                        }
                        if (currentIndexWork === 3) {
                            console.log("test")
                                // enableScroll();
                            workSectionLast = true;
                            workSecIndex++;
                        }
                        if (currentIndexWork !== 3) {
                            workSectionLast = false;
                        }
                        if (workSectionLast && workSecIndex > 1) {
                            console.log(workSecIndex)
                            menuClick(".section-agencies");
                            workSection.disble();
                        }
                    },
                    tolerance: 10,
                    // preventDefault: true
                });
                disableScroll();
            },
            onEnterBack: () => {

                Observer.create({
                    type: "wheel,touch,pointer",
                    wheelSpeed: -1,
                    onDown: () => {
                        // workSectionLast = false;
                        if (workSection.isActive && currentIndexWork !== 0) {
                            !animatingWork && gotoSectionWork(currentIndexWork - 1, -1);
                        }
                        if (currentIndexWork === 0) {
                            enableScroll();
                        }
                    },
                    onUp: () => {

                        if (workSection.isActive && currentIndexWork !== 3) {
                            !animatingWork && gotoSectionWork(currentIndexWork + 1, 1);
                            workSecIndex = 0;
                        }
                        if (currentIndexWork === 3) {
                            // enableScroll();
                            workSectionLast = true;
                            workSecIndex++;
                        }
                        if (currentIndexWork !== 3) {
                            workSectionLast = false;
                        }
                        if (workSectionLast && workSecIndex > 1) {
                            console.log(index)
                            menuClick(".section-agencies");
                            workSection.disble();
                        }
                    },
                    tolerance: 10,
                    // preventDefault: true
                });

            },
            onLeave: () => {
                enableScroll();
                workSectionLast = false;
                workSecIndex = 0;

            },
            onLeaveBack: () => {
                enableScroll();
                workSectionLast = false;
                workSecIndex = 0;
                // Observer.disconnect();
            },

        });
        gotoSectionWork(0, 1);
    } else {

        gsap.utils.toArray(".expertise-section-list a").forEach((a, index) => {


            a.addEventListener("click", () => {
                document.querySelectorAll(".expertise-section section").forEach(el => {
                    el.style.visibility = "hidden";
                    document.querySelector(`.expertise-section section:nth-child(${index+1})`).style.visibility = "visible";
                })
                nav.forEach(el => el.classList.remove("expertise-btn--active"));
                nav[index].classList.add("expertise-btn--active");

            })
        })
    }
}

var x = window.matchMedia("(max-width: 992px)");
myFunction(x);
x.addListener(myFunction);
//const panels = gsap.utils.toArray(".expertise-content");


ScrollTrigger.create({
    trigger: ".work-section",
    // scrub: true,
    start: "-100px top",
    // markers: true,
    // end: "bottom",
    onEnter: () => {
        gsap.to("header", {
            background: "white",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "black"
        })
        gsap.to(".header__logo svg rect", {
            fill: "black"
        })
        gsap.to(".header__search circle", {
            stroke: "black"
        })
        gsap.to(".header__search line", {
            stroke: "black"
        })
        gsap.to(".header__burger rect", {
            fill: "black"
        })
    },
    onEnterBack: () => {
        gsap.to("header", {
            background: "white",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "black"
        })
        gsap.to(".header__logo svg rect", {
            fill: "black"
        })
        gsap.to(".header__search circle", {
            stroke: "black"
        })
        gsap.to(".header__search line", {
            stroke: "black"
        })
        gsap.to(".header__burger rect", {
            fill: "black"
        })
    },
    onLeave: () => {
        gsap.to("header", {
            background: "black",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "white"
        })
        gsap.to(".header__logo svg rect", {
            fill: "white"
        })
        gsap.to(".header__search circle", {
            stroke: "white"
        })
        gsap.to(".header__search line", {
            stroke: "white"
        })
        gsap.to(".header__burger rect", {
            fill: "white"
        })
    },
    onLeaveBack: () => {
        gsap.to("header", {
            background: "black",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "white"
        })
        gsap.to(".header__logo svg rect", {
            fill: "white"
        })
        gsap.to(".header__search circle", {
            stroke: "white"
        })
        gsap.to(".header__search line", {
            stroke: "white"
        })
        gsap.to(".header__burger rect", {
            fill: "white"
        })
    },
})

ScrollTrigger.create({
    trigger: ".cards-slider",
    // scrub: true,
    start: "top top",
    // end: "bottom",
    onEnter: () => {
        gsap.to("header", {
            background: "white",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "black"
        })
        gsap.to(".header__logo svg rect", {
            fill: "black"
        })
        gsap.to(".header__search circle", {
            stroke: "black"
        })
        gsap.to(".header__search line", {
            stroke: "black"
        })
        gsap.to(".header__burger rect", {
            fill: "black"
        })
    },
    onEnterBack: () => {
        gsap.to("header", {
            background: "white",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "black"
        })
        gsap.to(".header__logo svg rect", {
            fill: "black"
        })
        gsap.to(".header__search circle", {
            stroke: "black"
        })
        gsap.to(".header__search line", {
            stroke: "black"
        })
        gsap.to(".header__burger rect", {
            fill: "black"
        })
    },
    onLeave: () => {
        gsap.to("header", {
            background: "black",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "white"
        })
        gsap.to(".header__logo svg rect", {
            fill: "white"
        })
        gsap.to(".header__search circle", {
            stroke: "white"
        })
        gsap.to(".header__search line", {
            stroke: "white"
        })
        gsap.to(".header__burger rect", {
            fill: "white"
        })
    },
    onLeaveBack: () => {
        gsap.to("header", {
            background: "black",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "white"
        })
        gsap.to(".header__logo svg rect", {
            fill: "white"
        })
        gsap.to(".header__search circle", {
            stroke: "white"
        })
        gsap.to(".header__search line", {
            stroke: "white"
        })
        gsap.to(".header__burger rect", {
            fill: "white"
        })
    },
})


ScrollTrigger.create({
    trigger: ".section-create",
    // scrub: true,
    start: "top top",
    // end: "bottom",
    onEnter: () => {
        gsap.to("header", {
            background: "white",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "black"
        })
        gsap.to(".header__logo svg path", {
            fill: "black"
        })
        gsap.to(".header__logo svg rect", {
            fill: "black"
        })
        gsap.to(".header__search circle", {
            stroke: "black"
        })
        gsap.to(".header__search line", {
            stroke: "black"
        })
        gsap.to(".header__burger rect", {
            fill: "black"
        })
    },
    onEnterBack: () => {
        gsap.to("header", {
            background: "white",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "black"
        })
        gsap.to(".header__logo svg path", {
            fill: "black"
        })
        gsap.to(".header__logo svg rect", {
            fill: "black"
        })
        gsap.to(".header__search circle", {
            stroke: "black"
        })
        gsap.to(".header__search line", {
            stroke: "black"
        })
        gsap.to(".header__burger rect", {
            fill: "black"
        })
    },
    onLeave: () => {
        gsap.to("header", {
            background: "black",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "white"
        })
        gsap.to(".header__logo svg rect", {
            fill: "white"
        })
        gsap.to(".header__search circle", {
            stroke: "white"
        })
        gsap.to(".header__search line", {
            stroke: "white"
        })
        gsap.to(".header__burger rect", {
            fill: "white"
        })
    },
    onLeaveBack: () => {
        gsap.to("header", {
            background: "black",
            duration: 0.2
        })
        gsap.to(".header__logo svg path", {
            fill: "white"
        })
        gsap.to(".header__logo svg rect", {
            fill: "white"
        })
        gsap.to(".header__search circle", {
            stroke: "white"
        })
        gsap.to(".header__search line", {
            stroke: "white"
        })
        gsap.to(".header__burger rect", {
            fill: "white"
        })
    },
})



const anim = gsap.from(childSplit1.lines, {
    duration: 1.5,
    yPercent: 100,
    ease: "power4",
    stagger: 0.2,
    delay: 0.8,
});
ScrollTrigger.create({
    trigger: ".section-create h5",
    animation: anim,
});

ScrollTrigger.create({
    trigger: ".journal-container",
    // markers: true,
    onEnter: () => {

        gsap.fromTo(".journal-item", {
            opacity: 0,
            y: -200,

        }, {
            opacity: 1,
            delay: 0.5,
            y: 0,
            stagger: 0.3,
            duration: 0.5,
        });
        gsap.fromTo(".journal-section h4", {
            opacity: 0,

        }, {
            opacity: 1,
            delay: 0.5,
            duration: 0.5,
        });
    },
});


const swiper = new Swiper('.swiper', {
    slidesPerView: "auto",
    spaceBetween: 12,
    grabCursor: true,
    slidesOffsetAfter: 300,
    breakpoints: {
        993: {
            slidesPerView: "auto",
            spaceBetween: 80,
            grabCursor: true,
            slidesOffsetAfter: 300,
        }
    }
});




let activeCardIndex = 0;

function updateActiveCardIndex(direction) {
    if (direction === 'up' && activeCardIndex < cards.length - 1) {
        activeCardIndex++;
    } else if (direction === 'down' && activeCardIndex > 0) {
        activeCardIndex--;
    }
}

const cards = document.querySelectorAll(".card");
let cardHeadings = gsap.utils.toArray(".card-title");
let splitCardHeadings = cardHeadings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" }));

document.querySelector(".arrow-down").addEventListener("click", () => {

    cards.forEach((card, index) => {
        if (index === activeCardIndex && index !== cards.length - 1) {
            gsap.to(card, {
                duration: 0.5,
                scale: 1,
                y: "100%"
            });
            card.classList.remove('active');
        } else if (index === activeCardIndex + 1 && activeCardIndex + 1 <= cards.length) {
            gsap.to(card, {
                duration: 0.5,
                scale: 1,
                y: 0,
                onStart: () => card.classList.add('active'),

            });
            gsap.fromTo(splitCardHeadings[index].chars, {
                opacity: 0,
                autoAlpha: 0,
                yPercent: 300,
            }, {
                opacity: 1,
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.6,
                delay: 0.3,
                ease: "power2",
                stagger: {
                    each: 0.03,
                    from: "random"
                }
            });
            gsap.fromTo(`.card:nth-child(${index+1}) a`, {
                opacity: 0
            }, {
                opacity: 1,
                delay: 1,
                duration: 0.5,
            });
        } else if (index === activeCardIndex + 2 && activeCardIndex + 2 <= cards.length) {
            gsap.to(card, {
                duration: 0.5,
                scale: 0.9,
                y: "-100px",
                onStart: () => card.classList.remove('active'),

            });
        } else if (index === activeCardIndex + 3 && activeCardIndex + 3 <= cards.length) {
            gsap.to(card, {
                duration: 0.5,
                scale: 0.8,
                y: "-200px",
                onStart: () => card.classList.remove('active'),

            });
        }
    });
    updateActiveCardIndex('up');
})

document.querySelector(".arrow-up").addEventListener("click", () => {
    console.log(activeCardIndex)
    cards.forEach((card, index) => {
        if (index === activeCardIndex && activeCardIndex !== 0) {
            gsap.to(card, {
                duration: 0.5,
                scale: 0.9,
                y: "-100px"
            });
            card.classList.remove('active');
        } else if (index === activeCardIndex - 1 && activeCardIndex + 1 >= 0) {
            gsap.to(card, {
                duration: 0.5,
                scale: 1,
                y: 0,
                onStart: () => card.classList.add('active'),

            });
            gsap.fromTo(splitCardHeadings[index].chars, {
                opacity: 0,
                autoAlpha: 0,
                yPercent: -300,
            }, {
                opacity: 1,
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.6,
                delay: 0.3,
                ease: "power2",
                stagger: {
                    each: 0.03,
                    from: "random"
                }
            });
            gsap.fromTo(`.card:nth-child(${index+1}) a`, {
                opacity: 0
            }, {
                opacity: 1,
                delay: 1,
                duration: 0.5,
            });
        } else if (index === activeCardIndex + 1 && activeCardIndex + 1 <= cards.length && activeCardIndex !== 0) {
            gsap.to(card, {
                duration: 0.5,
                scale: 0.8,
                y: "-200px",
                onStart: () => card.classList.remove('active'),

            });
        } else if (index === activeCardIndex + 2 && activeCardIndex + 2 <= cards.length && activeCardIndex !== 0) {
            gsap.to(card, {
                duration: 0.5,
                scale: 0.7,
                y: "-300px",
                onStart: () => card.classList.remove('active'),

            });
        }
    });
    updateActiveCardIndex("down");
})


ScrollTrigger.create({
    trigger: ".cards-slider",
    // markers: true,
    onEnter: () => {

        gsap.fromTo(splitCardHeadings[0].chars, {
            opacity: 0,
            autoAlpha: 0,
            yPercent: 300,
        }, {
            opacity: 1,
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.6,
            delay: 1,
            ease: "power2",
            stagger: {
                each: 0.03,
                from: "random"
            }
        });
        gsap.to(".card:nth-child(1) a", {
            opacity: 1,
            delay: 1,
            duration: 0.5,
        });
    },
});