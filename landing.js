// display amount of tems in cart
// span to display number of items
const itemsInCart = document.querySelector(".cart-count");

// Get the cart items stored in localStorage
const storageCartItems = JSON.parse(localStorage.getItem("cart")) || [];
// show amount of items on icon
itemsInCart.textContent = storageCartItems.length;
