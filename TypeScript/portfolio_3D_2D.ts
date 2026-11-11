document.addEventListener('DOMContentLoaded', GetAllImages);

const changeVideoButton = document.getElementById('ChangeVideo');
const UnityVideo = document.getElementById('UnityVideo') as HTMLVideoElement | null;

let UnityVideoSrc1 = "VIDEOS/Windmill_Breakdown_Colin_Berens.mp4";
let UnityVideoSrc2 = "VIDEOS/Windmill_Final_Colin_Berens.mp4";

// Initialize flag according to HTML video src
let showingFirst = false; // false because HTML video initially uses Src2

if (changeVideoButton && UnityVideo) {
    changeVideoButton.addEventListener('click', () => {
        // Update button text first
        if (showingFirst) {
            changeVideoButton.textContent = "Blockout";
        } else {
            changeVideoButton.textContent = "Final";
        }
        
        // Then switch the video
        if (showingFirst) {
            UnityVideo.src = UnityVideoSrc2;
        } else {
            UnityVideo.src = UnityVideoSrc1;
        }
        
        showingFirst = !showingFirst;
        UnityVideo.play();
    });
}


let imageArray: string[] = [];
let index = 19;
const preloadedImages: HTMLImageElement[] = [];

function Change(number : number){
    index += number;
    if(index >= 19)
    {
        index = 0
    }
    if(index <0)
    {
        index = 18
    }
    switchImage();
}

imageArray.forEach((src) => {
  const img = new Image();
  img.src = src;
  preloadedImages.push(img);
});

function switchImage(): void {
  const imageElement = document.getElementById('solarpunkimage') as HTMLImageElement | null;
  if (imageElement) {
    imageElement.src = imageArray[index];
  }
}
function GetAllImages() {

    imageArray = [];
    const numberOfImages = 19;
    for (let i = 1; i <= numberOfImages; i++) {
        imageArray.push(`IMAGES/SolarPunkConcept/p${i}.png`);
    }
    console.log("Loaded images:", imageArray);
}
