document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    loadNavbar();
    loadFooter();
    loadContactForm();
    loadOwnGames();
    // displayOutcomeMessage();
}
function JumpToSpecificPosition(namePostion: string) {

    const element = document.getElementById(namePostion);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

    }

}
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.innerHTML = data;
            }
            
        })
    }
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footer = document.getElementById('footer');
            if (footer) {
                footer.innerHTML = data;
            }
        })
    }
function loadContactForm() {
    fetch('contactinfo.html')
        .then(response => response.text())
        .then(data => {
            const contactForm = document.getElementById('contactform');
            if (contactForm) {
                contactForm.innerHTML = data;
            }
        })
    }
function loadOwnGames() {
    fetch('portfolio_3D_2D.html')
        .then(response => response.text())
        .then(data => {
            const ownGames = document.getElementById('owngames');
            if (ownGames) {
                ownGames.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading own games:', error));
}


// function displayOutcomeMessage() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const success = urlParams.get('success');
//     const outcomeLabel = document.getElementById('outcome');
//     if (outcomeLabel) {
//         if (success === '1') {
//             outcomeLabel.textContent = "Your message has been sent successfully!";
//             outcomeLabel.style.color = "green";
//         } else if (success === '0') {
//             outcomeLabel.textContent = "There was an error sending your message. Please try again.";
//             outcomeLabel.style.color = "red";
//         }
//     }
// }



