(function(){
    'use strict';
    console.log("reading js");

    const surveyForm = document.querySelector('#survey');
    const madlib = document.querySelector('#result');
    let selectedStyle = document.querySelector('#musicStyle');
    
    // submit button should trigger the overlay window
    surveyForm.addEventListener('submit', function(event){
        event.preventDefault();

        const formData = document.querySelectorAll("input[type=text]");
        selectedStyle = document.querySelector('#musicStyle');

        processFormData(formData);
    });

    // handle error (e.g. empty fields)
    function processFormData(formData) {
        let emptyFields = 0;
        let wordsList = [];

        // check how many empty fields there are
        // to determine the next step to take
        for (let field of formData){
            if (field.value){
                wordsList.push(field.value);
                console.log(`the input is ${field.value}`);
            } 
            else{
                emptyFields++;
            }
        }
        if (emptyFields > 0) {
            // remind user to fill in all the fields to play
            // don't empty the fields here!
            madlib.innerHTML = "Please fill out all the fields!";
            madlib.style.color = "red";
        } 
        else {
            // clear all the fields if user enters all the fields!
            
            makeMadlib(wordsList);
            console.log(wordsList[0]);
            for (let field of formData) {
                field.value = "";
            }
            
            let overlayWindow = document.getElementById(selectedStyle.value);
            madlib.innerHTML = "";
            overlayWindow.className = 'overlay showing';
        }
    }

    // substitute the words into the right place
    function makeMadlib(words){
        document.getElementById(`${selectedStyle.value}-artist-name`).textContent = words[0];
        document.getElementById(`${selectedStyle.value}-song-name`).textContent = words[1];
        document.getElementById(`${selectedStyle.value}-adj1`).textContent = words[2];
        document.getElementById(`${selectedStyle.value}-noun1`).textContent = words[3];
        document.getElementById(`${selectedStyle.value}-noun2`).textContent = words[4];
        document.getElementById(`${selectedStyle.value}-verb1`).textContent = words[5];
        document.getElementById(`${selectedStyle.value}-noun3`).textContent = words[6];

        // for the "wicked" genre, there were multiple uses of the adjective
        // hence additional word substitutions are needed here
        if (selectedStyle.value == "wicked"){
            document.getElementById(`${selectedStyle.value}-adj2`).textContent = words[2];
            document.getElementById(`${selectedStyle.value}-adj3`).textContent = words[2];
            document.getElementById(`${selectedStyle.value}-adj4`).textContent = words[2];
        }
    }

    // triggered when user close the overlay button to create their next song
    document.querySelector('.close-overlay-button').addEventListener('click', function (event) {
        event.preventDefault();
        console.log(selectedStyle.value);
        document.getElementById(selectedStyle.value).className = 'overlay hidden';
        console.log("hello");
    });
    
}());