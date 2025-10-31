function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

locomotiveAnimation();

function navAnimation() {
  let nav = document.querySelector("nav");

  nav.addEventListener("mouseenter", function () {
    let tl = gsap.timeline();

    // নিচের ব্যাকগ্রাউন্ড ধীরে খুলবে
    tl.to(".nav-bottom", {
      height: "21vh",
      duration: 0.4,
      ease: "power2.out",
    });

    // h5 গুলোকে দৃশ্যমান করা (display:block এর বদলে opacity ব্যবহার)
    tl.to(".menu h5", {
      opacity: 1,
      duration: 0,
      display: "block",
    });

    // প্রতিটি span নিচ থেকে উপরে আসবে
    tl.to(
      ".menu h5 span",
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    );
  });

  nav.addEventListener("mouseleave", function () {
    let tl = gsap.timeline();

    // span গুলো নিচে যাবে
    tl.to(".menu h5 span", {
      y: 25,
      opacity: 0,
      stagger: 0.05,
      duration: 0.2,
      ease: "power1.in",
    });

    // মেনু fade হয়ে অদৃশ্য হবে
    tl.to(".menu h5", {
      opacity: 0,
      duration: 0,
      display: "none",
    });

    // ব্যাকগ্রাউন্ড বন্ধ হবে
    tl.to(".nav-bottom", {
      height: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  });
}

navAnimation();

function page2Animation() {
  let rightElems = document.querySelectorAll(".right-elem");

  rightElems.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 1,
        scale: 1,
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 0,
        scale: 0,
      });
    });
    elem.addEventListener("mousemove", function (dets) {
      gsap.to(elem.childNodes[3], {
        x: dets.x - elem.getBoundingClientRect().x - 50,
        y: dets.y - elem.getBoundingClientRect().y - 130,
      });
    });
  });
}

page2Animation();

function page3VideoAnimation() {
  let page3Center = document.querySelector(".page3-center");
  let video = document.querySelector(".page3 video");

  page3Center.addEventListener("click", function () {
    video.play();
    gsap.to(video, {
      transform: "scaleX(1) scaleY(1)",
      opacity: 1,
      borderRadius: 0,
    });
  });

  video.addEventListener("click", function () {
    video.pause();
    gsap.to(video, {
      transform: "scaleX(0.7) scaleY(0)",
      opacity: 0,
      borderRadius: "30px",
    });
  });

  let sections = document.querySelectorAll(".section-right");

  sections.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      elem.childNodes[3].style.opacity = 1;
      elem.childNodes[3].play();
    });
    elem.addEventListener("mouseleave", function () {
      elem.childNodes[3].style.opacity = 0;
      elem.childNodes[3].load();
    });
  });
}

page3VideoAnimation();

function page8Animations() {
  gsap.from(".btm8-part2 h4", {
    x: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".btm8-part2",
      scroller: "#main",
      start: "top 80%",
      end: "top 10%",
      scrub: true,
    },
  });
}

page8Animations();

function lodingAnimation() {
  let tl = gsap.timeline();

  tl.from(".page1", {
    opacity: 0,
    duration: 0.2,
    delay: 0.2,
  });

  tl.from(".page1", {
    transform: "scaleX(0.7) scaleY(0.2) translateY(100%)",
    borderRadius: "100px",
    duration: 2,
    ease: "expo.out",
  });

  tl.from("nav", {
    opacity: 0,
    delay: -0.2,
  });

  tl.from(".page1 h1, .page1 p, .page1 div", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
  });
}

lodingAnimation();
