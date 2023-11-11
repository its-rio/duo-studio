function init(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
init()

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove",function(dets){
    crsr.style.left = dets.x + 20+"px"
    crsr.style.top = dets.y + 20+"px"
})

gsap.from(".page1 h1,.page1 h2", {
    y: 10,
    rotate: -2,
    opacity: 0,
    delay: 0.3,
    duration: 0.5
})

var tl = gsap.timeline({
    scrollTrigger: {
        trigger:".page1 h1",
        scroller:".main", 
        // markers:true, 
        start:"top 27%", 
        end:"top 0", 
        scrub:2
    }
})


tl.to(".page1 h1", {
    x: -100,
    
}, "anim")

tl.to(".page1 h2", {
    x: 100
}, "anim")

tl.to(".page1 video", {
    width: "95%"
}, "anim")

// Page 2
var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger:".page1 h1",
        scroller:".main", 
        // markers:true, 
        start:"top -115%", 
        end:"top -120", 
        scrub:2
    }
})
tl2.to(".main", {
    backgroundColor: "#fff"
})

// Page 4
var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger:".page1 h1",
        scroller:".main", 
        // markers:true, 
        start:"top -400%", 
        end:"top -250", 
        scrub:3
    }
})
tl3.to(".main", {
    backgroundColor: "#0F0D0D"
})


var boxes = document.querySelectorAll(".box")
boxes.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        var att = elem.getAttribute("data-image")
        crsr.style.width = "300px"
        crsr.style.height = "250px"
        crsr.style.borderRadius = "0"
        crsr.style.backgroundImage = `url(${att})`
    })
    elem.addEventListener("mouseleave",function(){
        elem.style.backgroundColor = "transparent"
        crsr.style.width = "20px"
        crsr.style.height = "20px"
        crsr.style.borderRadius = "50%"
        crsr.style.backgroundImage = `none`
    })
})


var h4 = document.querySelectorAll("#nav h4")
var perple = document.querySelector("#perple")
h4.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        perple.style.display = "block"   
        perple.style.opacity = "1"
    })
    elem.addEventListener("mouseleave",function(){
        perple.style.display = "none"   
        perple.style.opacity = "0"
    })
})