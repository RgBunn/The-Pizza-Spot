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
  //   bestSellerItem.append(
  //     bestSellerImageContainer,
  //     bestSellerImage,
  //     bestSellerName,
  //     bestSellerDescription,
  //     bestSellerPrice,
  //     bestSellerCartBtn
  //   );
  bestSellerTextContent.append(
    bestSellerName,
    bestSellerDescription,
    bestSellerPrice,
    bestSellerCartBtn
  );
  bestSellerImageContainer.appendChild(bestSellerImage);

  bestSellerSection.appendChild(bestSellerItem);
});
