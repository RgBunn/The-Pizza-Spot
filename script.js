const bestSellerSection = document.querySelector("#best-sellers");

const pizzasBestSeller = [
  {
    id: 1,
    name: "Margherita",
    description: "A classic pizza with fresh mozzarella, tomatoes, and basil.",
    ingredients: ["mozzarella", "tomatoes", "basil", "olive oil"],
    price: 12.99,
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza-recipe.jpg",
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "A delicious pizza topped with pepperoni and mozzarella.",
    ingredients: ["pepperoni", "mozzarella", "tomato sauce"],
    price: 14.99,
    image:
      "https://atsloanestable.com/wp-content/uploads/2023/06/new-york-style-pizza2.jpg",
  },
  {
    id: 3,
    name: "Veggie Supreme",
    description:
      "A hearty pizza with bell peppers, mushrooms, olives, and spinach.",
    ingredients: [
      "bell peppers",
      "mushrooms",
      "olives",
      "spinach",
      "mozzarella",
    ],
    price: 15.99,
    image:
      "https://www.nordicware.com/wp-content/uploads/2021/05/46400_traditional_pizza_pan_02_e.jpg",
  },
];
pizzasBestSeller.forEach((pizza) => {
  const bestSellerItem = document.createElement("div");
  bestSellerItem.classList.add("best-seller__card");

  const bestSellerImageContainer = document.createElement("div");
  bestSellerImageContainer.classList.add("best-seller__product-image");

  const bestSellerImage = document.createElement("img");
  bestSellerImage.src = pizza.image;
  bestSellerImage.alt = pizza.name;

  const bestSellerTextContent = document.createElement("div");
  bestSellerTextContent.classList.add("best-seller__text-content");

  const bestSellerName = document.createElement("h3");
  bestSellerName.textContent = pizza.name;

  const bestSellerDescription = document.createElement("p");
  bestSellerDescription.textContent = pizza.description;

  const bestSellerPrice = document.createElement("span");
  bestSellerPrice.textContent = `$${pizza.price}`;
  bestSellerPrice.classList.add("price");

  const bestSellerCartBtn = document.createElement("button");
  bestSellerCartBtn.textContent = "Order Now";
  bestSellerCartBtn.classList.add("btn", "btn-dark");

  bestSellerItem.append(bestSellerImageContainer, bestSellerTextContent);

  bestSellerTextContent.append(
    bestSellerName,
    bestSellerDescription,
    bestSellerPrice,
    bestSellerCartBtn
  );
  bestSellerImageContainer.appendChild(bestSellerImage);

  // bestSellerSection.appendChild(bestSellerItem);
});

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
      const menuItemsArray = Object.values(menuItems);
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
        // menuItemDetails.appendChild(itemName, itemDescription);
        // // descriptionCard.appendChild(itemDescription);

        const itemPrice = document.createElement("span");
        itemPrice.textContent = `$${menuItem.price}`;
        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("btn", "btn-dark");
        addToCartBtn.textContent = "Add to cart";
        // descriptionCard.appendChild(itemPrice);
        menuItemPriceBtnContainer.append(itemPrice, addToCartBtn);

        const itemImage = document.createElement("img");
        itemImage.src = menuItem.img;
        itemImage.alt = `${menuItem.name} image`;
        imageCardContainer.appendChild(itemImage);

        menuCollectionPizza.appendChild(menuItemCardContainer);
      });
    })
    .catch((error) => console.error(error));
};
// /////////////////
// cart manipulation
