// span to display number of items
const itemsInCart = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".cart__container");
const totalToPay = document.querySelector("#total-amount");

// Get the cart items stored in localStorage
const storageCartItems = JSON.parse(localStorage.getItem("cart")) || [];
// show amount of items on icon
itemsInCart.textContent = storageCartItems.length;

// Check if there are any items in the cart
if (storageCartItems.length > 0) {
  storageCartItems.forEach((item) => {
    const cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add("cart-item");
    cartItemContainer.dataset.price = item.price; // Store price in dataset

    const productImageContainer = document.createElement("div");
    const productImg = document.createElement("img");
    // productImg.src = item.image;

    const itemDetailsContainer = document.createElement("div");
    const itemName = document.createElement("h3");
    itemName.textContent = item.name;
    const itemPrice = document.createElement("p");
    itemPrice.textContent = `$${item.price}`;
    const buttonsContainer = document.createElement("div");
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    const controlButtons = document.createElement("div");
    // control btns
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "-";
    const amountOfItems = document.createElement("span");
    amountOfItems.classList.add("item-quantity");
    amountOfItems.textContent = "1";

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "+";

    cartContainer.append(cartItemContainer);
    cartItemContainer.append(
      productImageContainer,
      itemDetailsContainer,
      buttonsContainer
    );
    productImageContainer.append(productImg);
    itemDetailsContainer.append(itemName, itemPrice);
    controlButtons.append(btnRemove, amountOfItems, btnAdd);
    buttonsContainer.append(closeButton, controlButtons);

    //
    btnRemove.onclick = () => {
      if (parseInt(amountOfItems.textContent) > 0) {
        amountOfItems.textContent = parseInt(amountOfItems.textContent) - 1;
        calcTotal();
      }
    };
    btnAdd.onclick = () => {
      amountOfItems.textContent = parseInt(amountOfItems.textContent) + 1;
      calcTotal();
    };
    closeButton.onclick = () => {
      // Find the item's index in the localStorage array
      const indexToRemove = storageCartItems.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (indexToRemove !== -1) {
        // Remove item from array
        storageCartItems.splice(indexToRemove, 1);

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(storageCartItems));

        // Remove item from the DOM
        cartItemContainer.remove();

        // Update the total and cart count
        calcTotal();
        itemsInCart.textContent = storageCartItems.length;
      }
    };
  });
  calcTotal();
} else {
  console.log("No items in the cart.");
}

// totals

console.log(storageCartItems); // This should show an array of objects

function calcTotal() {
  let total = 0;

  // Loop through all cart items to calculate the total
  document.querySelectorAll(".cart-item").forEach((cartItem) => {
    const price = parseFloat(cartItem.dataset.price); // Get price from dataset
    const quantity = parseInt(
      cartItem.querySelector(".item-quantity").textContent
    );
    total += price * quantity;
  });

  // Update total amount display
  totalToPay.textContent = `$${total.toFixed(2)}`;
}
