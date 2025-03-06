// menu
const API_URL = "https://test-fire-d4ef1-default-rtdb.firebaseio.com";
const menuCollectionPizza = document.querySelector(".menu__collection-pizzas");

window.onload = async () => {
  fetch(`${API_URL}/menu.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((menuItems) => {
      const menuItemsArray = Object.values(menuItems).map((pizza, i) => {
        return {
          ...pizza,
          id: Object.keys(menuItems)[i],
        };
      });
      const products = JSON.parse(localStorage.getItem("cart")) || [];
      menuItemsArray.forEach((menuItem) => {
        const menuItemCardContainer = document.createElement("div");
        menuItemCardContainer.classList.add("menu-item");

        const imageCardContainer = document.createElement("div");
        imageCardContainer.classList.add("menu-item__img-container");
        const descriptionCardContainer = document.createElement("div");
        descriptionCardContainer.classList.add("menu-item__description");
        menuItemCardContainer.append(
          imageCardContainer,
          descriptionCardContainer
        );
        const menuItemDetailsContainer = document.createElement("div");
        menuItemDetailsContainer.classList.add("menu-item__details");
        const menuItemPriceBtnContainer = document.createElement("div");
        menuItemPriceBtnContainer.classList.add("menu-item__price-button");
        descriptionCardContainer.append(
          menuItemDetailsContainer,
          menuItemPriceBtnContainer
        );

        const itemName = document.createElement("h3");
        itemName.textContent = menuItem.name;

        const itemDescription = document.createElement("p");
        itemDescription.textContent = menuItem.description;
        menuItemDetailsContainer.append(itemName, itemDescription);

        const itemPrice = document.createElement("span");
        itemPrice.textContent = `$${menuItem.price}`;
        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("btn", "btn-dark");
        addToCartBtn.textContent = "Add to cart";
        products.forEach((product) => {
          if (product.id === menuItem.id) {
            addToCartBtn.textContent = "In Cart Already";
          }
        });

        menuItemPriceBtnContainer.append(itemPrice, addToCartBtn);

        const itemImage = document.createElement("img");
        itemImage.src = menuItem.img;
        itemImage.alt = `${menuItem.name} image`;
        imageCardContainer.appendChild(itemImage);

        menuCollectionPizza.appendChild(menuItemCardContainer);

        // //////////////
        // Add event listener for Add to Cart button
        addToCartBtn.addEventListener("click", () => {
          // Get cart data from local storage or initialize an empty array if none exists
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          // Check if the item already exists in the cart (based on item ID)
          const existingItemIndex = cart.findIndex(
            (item) => item.id === menuItem.id
          );

          if (existingItemIndex !== -1) {
            // If item already exists in cart, increment quantity (optional)
            cart[existingItemIndex].quantity += 1;
          } else {
            // If item doesn't exist, add it to the cart with quantity 1
            cart.push({
              id: menuItem.id,
              name: menuItem.name,
              price: menuItem.price,
              image: menuItem.img,
              quantity: 1, // Set initial quantity to 1
            });
          }

          // Save the updated cart to local storage
          localStorage.setItem("cart", JSON.stringify(cart));
          itemsInCart.innerText = cart.length;
          addToCartBtn.textContent = "In Cart Already";
          // Optionally, show a message or update the UI to reflect the cart change
          console.log(`Item added to cart: ${menuItem.name}`);
          // /////////////
        });
      });
    });
};

// display amount of tems in cart
// span to display number of items
const itemsInCart = document.querySelector(".cart-count");

// Get the cart items stored in localStorage
const storageCartItems = JSON.parse(localStorage.getItem("cart")) || [];
// show amount of items on icon
itemsInCart.textContent = storageCartItems.length;
