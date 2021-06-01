(function(){
    'use strict';
    console.log("reading js");

    alert("Hello there! Please note ");


    /* switch pictures in slideshow */
    var slideIndex = [1, 1];

    for(var i = 0; i < slideIndex.length; i++){
        console.log(`what slide index content${slideIndex[i]}`);
        showSlides(i, slideIndex[i]);
    }
    
    /* enable prev/next button to switch slides */
    document.getElementById("prev1").addEventListener("click", function(){
        showSlides(0, slideIndex[0] -= 1);
    });
    document.getElementById("next1").addEventListener("click", function(){
        showSlides(0, slideIndex[0] += 1);
    });

    document.getElementById("prev2").addEventListener("click", function(){
        showSlides(1, slideIndex[1] -= 1);
    });
    document.getElementById("next2").addEventListener("click", function(){
        showSlides(1, slideIndex[1] += 1);
    });

   /*  document.getElementById("prev3").addEventListener("click", function(){
        showSlides(2, slideIndex[2] -= 1);
    });
    document.getElementById("next3").addEventListener("click", function(){
        showSlides(2, slideIndex[2] += 1);
    });
 */

    /* my attempt to simplify the codes for buttons, but failed */
   /*  var prevButtons = document.getElementsByClassName("prev");
    for(var i = 0; i < prevButtons.length; i++){
        prevButtons[i].addEventListener("click", function(){
            showSlides(i, slideIndex[i] -= 1);
        });
    }

    var nextButtons = document.getElementsByClassName("next");
    for(var i = 0; i < nextButtons.length; i++){
        nextButtons[i].addEventListener("click", function(){
            console.log("The next button pressed ");
            console.log(`${slideIndex[i] += 1}`);
            showSlides(i, slideIndex[i] += 1);
        });
    } */

    function showSlides(slidesArrayInd, n) {
        var slides = document.getElementsByClassName(`slide${slidesArrayInd+1}`);
        console.log("The array of slides number: ");
        console.log(slideIndex[slidesArrayInd]);
        console.log(`What's the slide view: ${n}`);
        if (n > slides.length) {slideIndex[slidesArrayInd] = 1}
        if (n < 1) {slideIndex[slidesArrayInd] = slides.length}
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        console.log(`what is current slide: slide${slidesArrayInd}`);
        console.log(`what is current view: ${slideIndex[slidesArrayInd]}`);
        slides[slideIndex[slidesArrayInd] - 1].style.display = "block";
        changeImageTitle(slidesArrayInd, slideIndex[slidesArrayInd] - 1);

    }

    function changeImageTitle(slidesArrayInd, slideViewInd){
        /* if slideViewInd is 0, we're viewing the image itself */
        if ( slideViewInd == 0){
            document.getElementById(`content${slidesArrayInd+1}-title`).innerHTML = `#${slideViewInd + 1}`;
        } 
        /* if slideViewInd is 1, we're viewing the image's behind the scene */
        else if (slideViewInd == 1){
            document.getElementById(`content${slidesArrayInd+1}-title`).innerHTML = "behind the scene ";
        }
        /* otherwise it's the recipe */
        else{
            document.getElementById(`content${slidesArrayInd+1}-title`).innerHTML = "recipe";
        }
    }


}());