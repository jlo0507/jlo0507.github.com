(function(){
    'use strict';

    let pageTop;
    const bodyTag = document.querySelector('body');
    window.addEventListener('scroll', function(){
        pageTop = window.pageYOffset;
        console.log(pageTop);
        switch(true){
            case pageTop < 500: bodyTag.className="colorBG1"; break;
            case pageTop < 1000: bodyTag.className="colorBG2"; break;
            case pageTop < 1500: bodyTag.className="colorBG3"; break;
            default: bodyTag.class="colorBG4";
        }
    });

    
}());