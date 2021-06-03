(function(){
    'use strict';
    console.log("reading js");
    alert("Hello there! Please note that (1) Make sure your viewport is 1366x768px for best experience, (2) Scroll vertically to see each image and then a horizonta gallery of their stories, (3) There are some placeholder text, so please just enjoy the UI and UX of this page! Thanks :D");

    window.addEventListener('load', function(event){
        event.preventDefault();
    });

    // Move to the next page when arrow is clicked
    document.getElementById("first-page").addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = '#backstory';
    });

    document.getElementById("backstory").addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = '#wk1page1';
    });


    /* switch pictures in slideshow */
    var slideIndex = [1, 1];

    for(var i = 0; i < slideIndex.length; i++){
        showSlides(i, slideIndex[i]);
        showButton('prev', i+1, false);
        showButton('next', i+1, true);
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

    function showSlides(slidesArrayInd, n) {
        var slides = document.getElementsByClassName(`slide${slidesArrayInd+1}`);
        if (n > slides.length) {
            slideIndex[slidesArrayInd] = 1;
        }
        if (n < 1) {
            slideIndex[slidesArrayInd] = slides.length;
        }

        if (n == slides.length){
            showButton('next', slidesArrayInd+1, false);
            showButton('prev', slidesArrayInd+1, true);
        } else if (n == 1){
            showButton('next', slidesArrayInd+1, true);
            showButton('prev', slidesArrayInd+1, false);
        } else {
            showButton('next', slidesArrayInd+1, true);
            showButton('prev', slidesArrayInd+1, true);
        }
        
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        console.log(`what is current slide: slide${slidesArrayInd}`);
        console.log(`what is current view: ${slideIndex[slidesArrayInd]}`);
        // display the current slide
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

    function showButton(type, ind, show){
        console.log(`what is ${type}${ind}`);
        if (show){
            document.getElementById(`${type}${ind}`).className = `${type} slidebuttons showing`;
        } else {
            document.getElementById(`${type}${ind}`).className = `${type} slidebuttons hidden`;
        }
    }



}());
