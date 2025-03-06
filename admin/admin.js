const API_URL = "https://test-fire-d4ef1-default-rtdb.firebaseio.com";
const btnAdd = document.querySelector("#add-item");
const btnUpdate = document.querySelector("#update-item");
const btnDelete = document.querySelector("#delete-item");

// const menuCategory = document.querySelector("#category");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productImage = document.querySelector("#product-image");
const productDescription = document.querySelector("#product-description");

const btnAddProduct = document.querySelector("#add-product");

const addMenuContainer = document.querySelector(".add-menu-container");
const updateMenuContainer = document.querySelector(".update-menu-container");
const deleteMenuContainer = document.querySelector(".delete-menu-container");

btnAddProduct.onclick = (event) => {
  event.preventDefault();
  const menuItem = {
    // category: menuCategory.value,
    name: productName.value,
    price: productPrice.value,
    img: productImage.value,
    description: productDescription.value,
  };
  addMenuItem(menuItem);
};

function addMenuItem(menuItem) {
  // ${menuItem.category}
  fetch(`${API_URL}/menu.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItem),
  })
    .then(() => {
      productName.value = "";
      productPrice.value = "";
      productImage.value = "";
      productDescription.value = "";
    })
    .catch((err) => console.log(err));
}

btnAdd.onclick = () => {
  addMenuContainer.style.display = "block";
  updateMenuContainer.style.display = "none";
  deleteMenuContainer.style.display = "none";
};

btnUpdate.onclick = () => {
  addMenuContainer.style.display = "none";
  updateMenuContainer.style.display = "block";
  deleteMenuContainer.style.display = "none";
  showUpdateContainer();
};

btnDelete.onclick = () => {
  addMenuContainer.style.display = "none";
  updateMenuContainer.style.display = "none";
  deleteMenuContainer.style.display = "block";
  showDeleteContainer();
};
function showUpdateContainer() {
  updateMenuContainer.innerHTML = "";

  fetch(`${API_URL}/menu.json`)
    .then((response) => response.json())
    .then((menu) => {
      console.log(menu);

      const arr = Object.values(menu).map((menuItem, i) => {
        return {
          ...menuItem,
          id: Object.keys(menu)[i],
        };
      });
      arr.forEach((menuItem) => {
        const form = document.createElement("form");
        form.classList.add("edit-form__styles");
        const name = document.createElement("input");
        name.type = "text";
        name.value = menuItem.name;
        const price = document.createElement("input");
        price.type = "number";
        price.value = menuItem.price;
        const img = document.createElement("input");
        img.type = "text";
        img.value = menuItem.img;
        const description = document.createElement("textarea");
        description.value = menuItem.description;
        const btn = document.createElement("button");
        btn.textContent = "Update";

        btn.onclick = (event) => {
          event.preventDefault();
          const updatedMenu = {
            name: name.value,
            price: price.value,
            img: img.value,
            description: description.value,
          };
          updateMenu(menuItem.id, updatedMenu);
        };
        form.append(name, price, description, img, btn);
        updateMenuContainer.appendChild(form);
      });
    });
}

function updateMenu(id, pizza) {
  fetch(`${API_URL}/menu/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizza),
  })
    .then((res) => res.json())
    .then(() => {
      showUpdateContainer();
    })
    .catch((err) => console.log(err));
}

function showDeleteContainer() {
  deleteMenuContainer.innerHTML = "";

  fetch(`${API_URL}/menu.json`)
    .then((response) => response.json())
    .then((menu) => {
      console.log(menu);

      const arr = Object.values(menu).map((menuItem, i) => {
        return {
          ...menuItem,
          id: Object.keys(menu)[i],
        };
      });
      arr.forEach((menuItem) => {
        const form = document.createElement("form");
        const name = document.createElement("h4");
        name.innerText = menuItem.name;
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.classList.add("btn", "btn-dark");

        btn.onclick = (event) => {
          event.preventDefault();
          deleteItem(menuItem.id);
        };
        form.append(name, btn);
        deleteMenuContainer.appendChild(form);
      });
    });
}

function deleteItem(id) {
  fetch(`${API_URL}/menu/${id}.json`, {
    method: "DELETE",
  })
    .then(() => {
      showDeleteContainer();
    })
    .catch((err) => console.log(err));
}
