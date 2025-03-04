// span to display number of items
const itemsInCart = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".cart__container");
const totalToPay = document.querySelector("#total-amount");
const totalToPayContainer = document.querySelector(".total-container");
const emptyCartContainer = document.querySelector(".cart__empty");
const btnCheckout = document.querySelector("#btn-checkout");
const bill = document.querySelector("#bill");
const paymentWindow = document.querySelector(".payment-window");
const goBackBtn = document.querySelector("#go-back");
const payNowBtn = document.querySelector("#pay-now");

paymentWindow.style.display = "none";
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
    productImg.src = item.image;

    const itemDetailsContainer = document.createElement("div");
    itemDetailsContainer.classList.add("item-details");
    const itemName = document.createElement("h3");
    itemName.textContent = item.name;
    const itemPrice = document.createElement("p");
    itemPrice.textContent = `$${item.price}`;
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    const closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    // closeButton.textContent = "X";
    const controlButtons = document.createElement("div");
    controlButtons.classList.add("control-btns");
    // control btns
    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn-circle");
    btnRemove.textContent = "-";
    const amountOfItems = document.createElement("span");
    amountOfItems.classList.add("item-quantity");
    amountOfItems.textContent = "1";

    const btnAdd = document.createElement("button");
    btnAdd.classList.add("btn-circle");
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
    // check later whats the best solution

    btnCheckout.onclick = () => {
      paymentWindow.style.display = "block";
      totalToPayContainer.style.display = "none";
      // cartItemContainer.style.display = "none";
      document.querySelectorAll(".cart-item").forEach((item) => {
        item.style.display = "none";
      });
    };
    goBackBtn.onclick = () => {
      paymentWindow.style.display = "none";
      totalToPayContainer.style.display = "flex";
      cartItemContainer.style.display = "flex";
    };
    payNowBtn.onclick = () => {
      const paymentSuccessContainer = document.querySelector(
        ".payment-success-container"
      );
      const pizzaTruck = document.getElementById("pizza-truck");
      const honkSound = document.getElementById("honk-sound");
      // delete items from cart
      localStorage.removeItem("cart");
      cartItemContainer.innerHTML = "";
      itemsInCart.textContent = "0";

      paymentWindow.style.display = "none";
      paymentSuccessContainer.style.display = "flex";

      // pizza truck animation
      setTimeout(() => {
        pizzaTruck.style.animation = "drivePizzaTruck 4s linear forwards";
        honkSound.play();

        // Drop a pizza box every second
        let dropInterval = setInterval(() => {
          let pizzaBox = document.createElement("div");
          pizzaBox.classList.add("pizza-box");
          pizzaTruck.appendChild(pizzaBox);
          pizzaBox.style.animation = "dropPizzaBox 1.5s ease-out forwards";

          setTimeout(() => {
            pizzaBox.remove();
          }, 1500);
        }, 1000);

        setTimeout(() => {
          clearInterval(dropInterval);
        }, 4000);
      }, 500);

      setTimeout(() => {
        paymentSuccessContainer.style.display = "none";
        emptyCartContainer.style.display = "block";
      }, 4500);
    };
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
    emptyCartContainer.style.display = "none";
  });
  calcTotal();
} else {
  totalToPayContainer.style.display = "none";
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
  bill.textContent = `$${total.toFixed(2)}`;
}
