const CART_BTN = document.querySelector(".cart_btn");
const MAIN_PAGE = document.querySelector(".mainPage");
const CART_PAGE = document.querySelector(".cartPage");
const EMPTY_PAGE = document.querySelector(".emptyPage");
const RETURN_PAGE = document.querySelector(".returnMain");
const CART_ITEMS = document.querySelector(".cart_items");
const TRASH_BTN = document.querySelector(".trash_text");
const RETURN_BTN = document.querySelector(".returnMainInEmpty");

let PIZZA_TEMP_CART = PIZZA_CART;

CART_BTN.addEventListener("click", () => {
  CART_PAGE.classList.remove("none");
  MAIN_PAGE.classList.add("none");

  const pizzasCart = displayPizzaCardinCart(PIZZA_TEMP_CART);
  CART_ITEMS.innerHTML = pizzasCart.join("");
});

RETURN_PAGE.addEventListener("click", () => {
  CART_PAGE.classList.add("none");
  MAIN_PAGE.classList.remove("none");
});

TRASH_BTN.addEventListener("click", () => {
  PIZZA_CART = [];
  CART_PAGE.classList.add("none");
  EMPTY_PAGE.classList.remove("none");
});

RETURN_BTN.addEventListener("click", () => {
  EMPTY_PAGE.classList.add("none");
  MAIN_PAGE.classList.remove("none");
});

function displayPizzaCardinCart(array) {
  let items = [];

  for (let i = 0; i < array.length; i++) {
    const id_image = array[i].id.split("_")[0];

    items.push(`
            <div class="cart_item">
              <div class="cart_wrapper">
                  <div class="item_info">
                      <img src="./assets/pizzas/${id_image}.jpg" alt="" />
                      <div class="item_info_description">
                          <h1>${array[i].name}</h1>
                          <p>${array[i].type} тесто</p>
                      </div>
                  </div>
                  <div class="item_count">
                      <button onclick='calcPizzaInCart("-", "${array[i].id}")'>
                          <p>-</p>
                      </button>
                      <p>${array[i].count}</p>
                      <button onclick='calcPizzaInCart("+", "${array[i].id}")'>
                          <p>+</p>
                      </button>
                  </div>
              </div>
              <div class="cart_wrapper">
                  <h1 class="item_price">${
                    array[i].count * Number(array[i].price)
                  } &#8376;</h1>
                  <button class="remove" onclick='removeTypePizzas("${
                    array[i].id
                  }")'>
                      <img src="./assets/icons/remove.png" alt="remove" />
                  </button>
              </div>
          </div>`);
  }

  return items;
}

function removeTypePizzas(id) {
  const remove = PIZZA_TEMP_CART.filter((elem) => elem.id != id);
  PIZZA_TEMP_CART = remove;

  const pizzasCart = displayPizzaCardinCart(remove);
  CART_ITEMS.innerHTML = pizzasCart.join("");
}

function calcPizzaInCart(operator, id) {
  if (operator === "+") {
    const plus = PIZZA_TEMP_CART.map((elem) =>
      elem.id === id ? { ...elem, count: elem.count + 1 } : elem
    );
    PIZZA_TEMP_CART = plus;
    const pizzasCart = displayPizzaCardinCart(plus);
    CART_ITEMS.innerHTML = pizzasCart.join("");
  } else {
    const minus = PIZZA_TEMP_CART.map((elem) =>
      elem.id === id ? { ...elem, count: elem.count - 1 } : elem
    );

    PIZZA_TEMP_CART = minus;
    const pizzasCart = displayPizzaCardinCart(minus);
    CART_ITEMS.innerHTML = pizzasCart.join("");
  }
}
