(function(){
    'use strict';
    console.log("reading js");

    
    /* enable prev/next button to switch slides */
    document.getElementById("prev").addEventListener("click", function(){
        showSlides(slideIndex -= 1);
    });
    document.getElementById("next").addEventListener("click", function(){
        showSlides(slideIndex += 1);
    });

    /* switch pictures in slideshow */
    var slideIndex = 1;
    showSlides(slideIndex);

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("slideshow");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        changeImageTitle(slideIndex - 1);
    }

    function changeImageTitle(slideInd){
        /* if slideInd is 0, we're viewing the image itself */
        if ( slideInd == 0){
            document.getElementById("content-title").innerHTML = `#${slideInd + 1}`;
        } 
        /* if slideInd is 1, we're viewing the image's behind the scene */
        else if (slideInd == 1){
            document.getElementById("content-title").innerHTML = "behind the scene ";
        }
        /* otherwise it's the recipe */
        else{
            document.getElementById("content-title").innerHTML = "recipe";
        }
    }


}());