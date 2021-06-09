(function () {
    'use strict';

    /* Slideshow javascript */

    var slideIndex = 1;
    console.log(`what is ${slideIndex}`);
    showDivs(slideIndex);

    
    document.getElementById("prev").addEventListener("click", function(){
        plusDivs(-1);
    });
    document.getElementById("next").addEventListener("click", function(){
        plusDivs(+1);
    });

    function plusDivs(n) {
        showDivs(slideIndex += n);
    }

    function showDivs(n) {
        console.log(`what is ${n -1} and ${slideIndex}`);
        var i;
        var x = document.getElementsByClassName("slideshow");
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length} ;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        console.log(`what is ${n} and ${slideIndex}`);
        x[slideIndex-1].style.display = "block";
    }

    /* Adapted from https://dev.to/albertomontalesi/javascript-tutorial-create-a-smooth-scroll-navigation-17kp */
    const listOfLinks = document.querySelectorAll("a[href^='#selection");
    
    listOfLinks.forEach(function (link) {
        link.addEventListener('click', () => {
            // add and remove the #selected class for color change
            listOfLinks.forEach((link) => {
                if (link.classList.contains('selected')) {
                    link.classList.remove('selected');
                }
            });

            link.classList.add('selected');
            let ref = link.href.split('#selection');
            ref = "#selection" + ref[1];
            
            window.scroll({
                behavior: 'smooth',
                left: 0,
                // determine the offset from the top of the section
                top: document.querySelector(ref).offsetTop
            });
        })
    })

})();


// use window load to make sure all the images are loaded
// before we find the pixels of their locations
window.addEventListener('load', function(){
    'use strict';

    const navLinks = document.querySelectorAll('nav ul li a');
    const posts = document.querySelectorAll('section');
    let postTops = [];
    let pagetop;
    let counter = 1;
    let prevCounter  = 1;

    posts.forEach(function(post){
        postTops.push(
            Math.floor(post.getBoundingClientRect().top) + window.pageYOffset
        );
    });
    console.log(postTops);

    window.addEventListener('scroll', function(){
        pagetop = window.pageYOffset + 250; // add 250 to see the bit more down the page 

        if (pagetop > postTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
        } 
        
        else if (counter > 1 && pagetop < postTops[ counter - 1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }

        // Add the #selected class when needed when scroll by mouse
        if (counter != prevCounter) {
            navLinks.forEach(function(eachLink){
                eachLink.removeAttribute('class');                
            });

            const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
            thisLink.className = 'selected';
            prevCounter = counter;
        }
    });
});
