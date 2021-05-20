(function(){
    'use strict';

        for (let i = 1; i <= 5; i++) {
            document.getElementById(`article${i}-column`).addEventListener("mouseover", function(){
                hoverOn(`article${i}`);
            });
    
            document.getElementById(`article${i}-column`).addEventListener("mouseout", function(){
                hoverOut(`article${i}`);
            });
        };        

    function hoverOn(i){
        document.getElementById(i).classList.remove("hidden");
        document.getElementById(`${i}-title`).classList.add("hidden");
    }

    function hoverOut(i){
        document.getElementById(i).classList.add("hidden");
        document.getElementById(`${i}-title`).classList.remove("hidden");
    }

}());
