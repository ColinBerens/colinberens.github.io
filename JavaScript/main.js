"use strict";
document.addEventListener('DOMContentLoaded', initPage);
let imageArray = [];
function initPage() {
    loadNavbar();
    loadFooter();
    loadContactForm();
    loadOwnGames();
    GetAllImages();
    displayOutcomeMessage();
}
const aboutMeButton = document.getElementById('aboutMeButton');
const seeMoreButton = document.getElementById('seemorebutton');
const changeVideoButton = document.getElementById('ChangeVideo');
const UnityVideo = document.getElementById('UnityVideo');
let UnityVideoSrc1 = "VIDEOS/Windmill_Breakdown_Colin_Berens.mp4";
let UnityVideoSrc2 = "VIDEOS/Windmill_Final_Colin_Berens.mp4";
// Initialize flag according to HTML video src
let showingFirst = false; // false because HTML video initially uses Src2
if (changeVideoButton && UnityVideo) {
    changeVideoButton.addEventListener('click', () => {
        // Update button text first
        if (showingFirst) {
            changeVideoButton.textContent = "Blockout";
        }
        else {
            changeVideoButton.textContent = "Final";
        }
        // Then switch the video
        if (showingFirst) {
            UnityVideo.src = UnityVideoSrc2;
        }
        else {
            UnityVideo.src = UnityVideoSrc1;
        }
        showingFirst = !showingFirst;
        UnityVideo.play();
    });
}
if (aboutMeButton) {
    aboutMeButton.addEventListener('click', function () {
        window.location.href = 'aboutMe.html';
    });
}
if (seeMoreButton) {
    seeMoreButton.addEventListener('click', function () {
        window.location.href = 'work.html';
    });
}
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.innerHTML = data;
        }
    });
}
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
        const footer = document.getElementById('footer');
        if (footer) {
            footer.innerHTML = data;
        }
    });
}
function loadContactForm() {
    fetch('contactform.html')
        .then(response => response.text())
        .then(data => {
        const contactForm = document.getElementById('contactform');
        if (contactForm) {
            contactForm.innerHTML = data;
        }
    });
}
function loadOwnGames() {
    fetch('owngames.html')
        .then(response => response.text())
        .then(data => {
        const ownGames = document.getElementById('owngames');
        if (ownGames) {
            ownGames.innerHTML = data;
        }
    })
        .catch(error => console.error('Error loading own games:', error));
}
function displayOutcomeMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const outcomeLabel = document.getElementById('outcome');
    if (outcomeLabel) {
        if (success === '1') {
            outcomeLabel.textContent = "Your message has been sent successfully!";
            outcomeLabel.style.color = "green";
        }
        else if (success === '0') {
            outcomeLabel.textContent = "There was an error sending your message. Please try again.";
            outcomeLabel.style.color = "red";
        }
    }
}
let imagesLoaded = false;
function GetAllImages() {
    if (imagesLoaded)
        return;
    imagesLoaded = true;
    imageArray = [];
    const numberOfImages = 19;
    for (let i = 1; i <= numberOfImages; i++) {
        imageArray.push(`IMAGES/SolarPunkConcept/p${i}.png`);
    }
    console.log("Loaded images:", imageArray);
}
function Change(number) {
    index += number;
    if (index >= 19) {
        index = 0;
    }
    if (index < 0) {
        index = 18;
    }
    switchImage();
}
let index = 19;
function switchImage() {
    const imageElement = document.getElementById('solarpunkimage');
    if (imageElement) {
        imageElement.src = imageArray[index];
    }
}
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('show');
    }
}
const preloadedImages = [];
imageArray.forEach((src) => {
    const img = new Image();
    img.src = src;
    preloadedImages.push(img);
});
