let OtherWorkPage : string = 'portfolio_3D_2D.html';
let AboutMePage : string = 'aboutMe.html';
const aboutMeButton = document.getElementById('aboutMeButton');
const seeMoreButton = document.getElementById('seemorebutton');

if (aboutMeButton) {
  aboutMeButton.addEventListener('click', function() {
      window.location.href = AboutMePage;
  });
}

if (seeMoreButton) {
    seeMoreButton.addEventListener('click', function() {
        window.location.href = OtherWorkPage;
    });
}

