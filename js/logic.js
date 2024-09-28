const dropdowns = document.querySelectorAll('.dropdown');
var city = "Tashkent";

window.onload = function() {
    document.body.style.zoom = "100%"; // Resets CSS zoom (not browser zoom)
};

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.dropdown-select');
    const caret = dropdown.querySelector('.dropdown-caret');
    const menu = dropdown.querySelector('.dropdown-menu');
    const options = dropdown.querySelectorAll('.dropdown-menu li');
    const selected = dropdown.querySelector('.city-name');

    select.addEventListener('click', () => {
        select.classList.toggle('dropdown-select-clicked');

        caret.classList.toggle('dropdown-caret-rotate');

        menu.classList.toggle('dropdown-menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            city = option.innerText;
            localStorage.setItem('city', city);
            select.classList.remove('dropdown-select-clicked');
            caret.classList.remove('dropdown-caret-rotate');
            menu.classList.remove('dropdown-menu-open');
            location.reload();
        });
    });
});

function setText() {
    city = localStorage.getItem('city');
    if(city){
        document.getElementById('city-text').innerText = city;
    }
}

function societyLoad() {
    city = localStorage.getItem('city');
    if(city){
        document.getElementById('city-text').innerText = city;
        document.getElementById('city-text2').innerText = city;
    }
}

let button = document.getElementById("apply-button");
let orig_button = document.getElementById("submit-button");

let select_file1 = document.getElementById("select-file1");
let select_file2 = document.getElementById("select-file2");
let logo_file = document.getElementById("logo");
let gallery_file = document.getElementById("gallery");

select_file1.addEventListener("click", function(){
    logo_file.click();
});

select_file2.addEventListener("click", function(){
    gallery_file.click();
});

logo_file.addEventListener("change", function( ) {
    var fileName = this.files.length > 0 ? this.files[0].name : "No file chosen";
    var fileDisplay = document.getElementById("selected-file1");

    fileDisplay.textContent = fileName;

    fileDisplay.style.fontSize = "16px";
    fileDisplay.style.color = "#000000";
    fileDisplay.style.letterSpacing = "0px";
    fileDisplay.style.display = "inline-block";
});

gallery_file.addEventListener("change", function( ) {
    //var fileName = this.files.length > 0 ? this.files[0].name : "No file chosen";

    //document.getElementById("selected-file2").textContent = fileName;

    var fileList = this.files;
    var fileNames = "";
    var fileDisplay = document.getElementById("selected-file2");

    if (fileList.length > 0) {
        for (var i = 0; i < fileList.length; i++) {
            fileNames += fileList[i].name + (i < fileList.length - 1 ? ", " : "");
        }
    } else {
        fileNames = "No files chosen";
    }

    fileDisplay.textContent = fileNames;

    fileDisplay.style.fontSize = "16px";
    fileDisplay.style.color = "#000000";
    fileDisplay.style.letterSpacing = "0px";
    fileDisplay.style.display = "inline-block";
});

button.addEventListener("click", function(){

    orig_button.click();
});

orig_button.addEventListener("click", function(){

    let logoUploaded = logo_file.files.length > 0;
    let galleryUploaded = gallery_file.files.length > 0;

    if (!logoUploaded) {
        // If no logo is uploaded, make the text red
        document.getElementById("selected-file1").style.color = "red";
    }

    if (!galleryUploaded) {
        // If no gallery files are uploaded, make the text red
        document.getElementById("selected-file2").style.color = "red";
    }
});

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let organization = document.getElementById("organization").value;
    let email = document.getElementById("email").value;
    let location = document.getElementById("location").value;
    let description = document.getElementById("description").value;
    let logo = document.getElementById("logo").files[0]; // Single logo file
    let gallery = document.getElementById("gallery").files; // Multiple gallery files

    // Create a FormData object to send the files and text data
    let formData = new FormData();
    formData.append("organization", organization);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("logo", logo); // Single file
    for (let i = 0; i < gallery.length; i++) {
        formData.append("gallery" + i, gallery[i]);  // Give each file a unique key
    }    

    // Send the form data to Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbyuYIReslBVqAKnQ37HDp5_4VP188pIDXTgBPL014n2dDkGLgMIMi6Zo-39MvezP59QLQ/exec", {
        method: "POST",
        body: formData,
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.text())  // Use .text() instead of .json() if Apps Script returns plain text
    .then(result => {
        console.log(result);  // Log the response from Google Apps Script
        alert("Form submitted successfully: " + result);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error submitting form: " + error);
    });
    
    /*.then(response => {
        if (response.ok) {
            alert("Form submitted successfully.");
        } else {
            alert("There was an error submitting the form.");
        }
    })
    .catch(error => {
        console.error("Error submitting form: ", error);
        alert("There was an error submitting the form. Please try again.");
    });*/
});
