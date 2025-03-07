// display amount of tems in cart
// span to display number of items
const itemsInCart = document.querySelector(".cart-count");

// Get the cart items stored in localStorage
const storageCartItems = JSON.parse(localStorage.getItem("cart")) || [];
// show amount of items on icon
itemsInCart.textContent = storageCartItems.length;

// carousel
const images = document.querySelector("#images");
const btnPrev = document.querySelector("#previous");
const btnNext = document.querySelector("#next");

const slides = document.querySelectorAll("#images .slide");
console.log(slides);

let currentIndex = 0;

function showImage() {
  slides.forEach((slide) => {
    slide.style.display = "none";
    slides[currentIndex].style.display = "block";
  });
}
showImage();

btnPrev.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = slides.length - 1;
  }
  showImage();
};
btnNext.onclick = () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  showImage();
};
