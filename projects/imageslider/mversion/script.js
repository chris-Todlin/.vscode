/* An image slider */

/* Get the button and when the event is focus set it in  */
const buttonsEl = document.querySelectorAll(".navigation-btn");
const imageHolderEl = document.querySelector(".foc")
const imageEl = document.getElementById('image');

// function to toggle
function toggleHover(btn) {
    btn.classList.remove('inactive')
    console.log('removed');
}

function toggleAdd(btn) {
    btn.classList.add('inactive')
    console.log('added');
}

imageHolderEl.addEventListener('mouseenter',(e)=>{
    buttonsEl.forEach((btn)=> setTimeout(btn.classList.remove('inactive'),1000))
});
imageHolderEl.addEventListener('mouseleave',(e)=>{
    buttonsEl.forEach((btn)=> setTimeout(btn.classList.add('inactive'),10000))
});

/* Get the images in the array */
const imagesPath = ['aleksandr-zaitsev-cRS3WCABL18-unsplash','alvan-nee-Dbng7f0lpmo-unsplash', 'jefferson-sees-p5XtL5hfHiI-unsplash','kristaps-ungurs-AIgaGMR60ZQ-unsplash','oskar-kadaksoo-jTFUjEaip80-unsplash'];
let currentPos = 0;

// function to move forwards
function fowardPic(){
    currentPos++; // Add the position

    // if the image position is greater than lenght
    if(currentPos === imagesPath.length) currentPos = 0;

    // render the other image
    imageEl.src = `./images/${imagesPath[currentPos]}.jpg`;
}

// the event listenre
document.getElementById("forward").addEventListener('click',fowardPic);

// function to move backwards
function backPic(){
    currentPos--; // Add the position

    // if the image position is greater than lenght
    if(currentPos < 0) currentPos = imagesPath.length - 1;

    // render the other image
    imageEl.src = `./images/${imagesPath[currentPos]}.jpg`;
}

// the event listenre
document.getElementById("back").addEventListener('click',backPic);
document.addEventListener('keydown',(e)=>{
    if(e.key === "ArrowRight") fowardPic();
})
document.addEventListener('keydown',(e)=>{
    if(e.key === "ArrowLeft") backPic();
})