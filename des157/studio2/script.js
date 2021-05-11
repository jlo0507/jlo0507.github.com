(function () {
    'use strict';

    // Take care of the Automatic SlideShow Effect here: //
    let slide_ind = 0;
    
    carousel();
    
    function carousel() {
        // get every week's className to perform automatic slideshow
        // I hard-coded in the "3" here because I know there's exactly 4 weeks
        // x is the week's index (4 weeks total)
        for (let x = 1; x <= 4; x++){
            let slides = document.getElementsByClassName(`week${x}slides`);
            for (let i = 0; i < slides.length; i++) {
                // hide all the images initially
                slides[i].style.display = "none";  
            }
            slide_ind++;
            // if slide index is going out of bound, reset it
            if (slide_ind > slides.length) {
                slide_ind = 1;
            }   
            slides[slide_ind-1].style.display = "block";
        
            // For every 2 seconds, the carousel function is called
            // and the slide_ind keeps iterating to display all the images
            setTimeout(carousel, 2000); 
        }       
      }

    // Take care of the Scrolling Effect here: //
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function(eachLink){
        // leave out the parenthesis so the page doesn't fire
        // until event occurs
        eachLink.addEventListener('click', smothScroll);
    });

    function smothScroll(event){
        event.preventDefault();
        
        const targetID = event.target.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);
        // console.log(targetAnchor.getBoundingClientRect().top);

        const orignalTop = Math.floor(targetAnchor.getBoundingClientRect().top) - 200;
        // console.log(orignalTop);
        window.scrollBy({top:orignalTop, left:0, behavior:'smooth'});
    }
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
    let doneResizing;
    // resetPagePosition();

    // the pageYOffset will make sure 
    // we are constly getting how far our section is 
    // from the top of the page despite us scrolling down
    // the page

    // this gets us the pixels we have from the top of the page
    //console.log(posts[0].getBoundingClientRect().top + window.pageYOffset);

    posts.forEach(function(post){
        postTops.push(
            Math.floor(post.getBoundingClientRect().top) + window.pageYOffset
        );
    });
    console.log(postTops);

    window.addEventListener('scroll', function(){
        pagetop = window.pageYOffset + 250; // add 250 to see the bit more down the page 

        // if the current window is hitting the pixel a specific section is on,
        // that means that section must be on the current viewport!
        
        //two conditions:
        // (1) you are at the top of the page scrolling down
        //  increment counter to see other sections
        if (pagetop > postTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
        } 
        // (2) somewhere further down the page scrolling up
        //  decrement counter to see previous sections
        else if (counter > 1 && pagetop < postTops[ counter - 1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }

        // remove the pink link color on the top nav bar
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
