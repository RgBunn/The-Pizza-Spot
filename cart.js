// span to display number of items
const itemsInCart = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".cart__container");

// Get the cart items stored in localStorage
const storageCartItems = JSON.parse(localStorage.getItem("cart")) || [];
// show amount of items on icon
itemsInCart.textContent = storageCartItems.length;
console.log(storageCartItems);
// Check if there are any items in the cart
if (storageCartItems.length > 0) {
  storageCartItems.forEach((item) => {
    const cartItemContainer = document.createElement("div");

    const productImageContainer = document.createElement("div");
    const productImg = document.createElement("img");
    // productImg.src = item.image;

    const itemDetailsContainer = document.createElement("div");
    const itemName = document.createElement("h3");
    itemName.textContent = item.name;
    const itemPrice = document.createElement("p");
    itemPrice.textContent = item.price;
    const buttonsContainer = document.createElement("div");
    const closeButton = document.createElement("div");
    const controlButtons = document.createElement("div");
    // control btns
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "-";
    const amountOfItems = document.createElement("span");
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
    buttonsContainer.append(controlButtons);

    //
    btnRemove.onclick = () => {
      if (parseInt(amountOfItems.textContent) > 0) {
        amountOfItems.textContent = parseInt(count.textContent) - 1;
      }
    };
    btnAdd.onclick = () => {
      amountOfItems.textContent = parseInt(amountOfItems.textContent) + 1;
    };
    function calcTotal() {
      const result = itemPrice.value;
      console.log(result);
    }
    calcTotal();
  });
} else {
  console.log("No items in the cart.");
}

// totals
const totalToPay = document.querySelector("#total-amount");
