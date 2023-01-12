var payNowBtnID = "pay-now-button";
var QRBtnID = "QR-button";
var helpBtnID = "help-button";


var menuDivID = "menu";
var cartDivID = "cart";

var menu = document.getElementById("menu");
var cart = document.getElementById("cart");

var basketKey = "basket";
var basket = JSON.parse(localStorage.getItem(basketKey)) || [];

var restaurantInfo, restaurantMenu;

const halal = "Halal";
const veg = "Vegetarian";
const gf = "Gluten-Free";
const nuts = "No-Nuts";
const lowFat = "Low-Fat";
const noSugar = "No-Sugar";

var getInfo = () => {
  if(restaurantKey in localStorage
    && restaurantData.some((x) => x["restaurantID"] === localStorage[restaurantKey])
    && foodData.some((y) => y["restaurantID"] === localStorage[restaurantKey])){
    restaurantInfo = restaurantData.find((x) => x["restaurantID"] === localStorage[restaurantKey]);
    restaurantMenu = foodData.find((x) => x["restaurantID"] === localStorage[restaurantKey])["Menu"];
    console.log("match");
  }else{
    alert("This restaurant hasn't been added yet, sorry!");
    window.history.go(-1);
  }
}

// Render menu
var renderMenu = () => {
  console.log("Rendering Menu");
  var { name, mfHours, location, } = restaurantInfo;
  var header = `
    <div class="restaurant-page-title-container">

    <div>
      <p class="restaurant-page-title">
        ${name}
      </p>
    </div>
    
    <div class="restaurant-hours-location-container">
      <p class="hours-location-title">
        &#2022; Hours: ${mfHours}
      </p>
      <p class="hours-location-title">
        &#2022; Location: ${location}
      </p>
    </div>

    </div>
  `;
  var body = restaurantMenu.filter((x) => enabledSettings.every((y) => x["tags"].includes(y))).map((x) => {
    var { id, name, desc, img, price, tags } = x;
    var search = basket.find((x) => x.id == id) || [];
    return `
      <div class="food-card-container">

        <div class="food-picture-container">
          <img class="food-picture" src="pictures/${img}">
        </div>

        <div class="food-card-description-container">
          <p class="food-name">${name}</p>
          <p class="food-description">${desc}</p>
        </div>

        <div class="tags-container">
          ${tags.includes(halal) ? '<img class="tag-picture" src="pictures/halal.png"  title="Halal">' : ''}
          ${tags.includes(veg) ? '<img class="tag-picture" src="pictures/vegitarian.png" title="Vegeterian">' : ''}
          ${tags.includes(gf) ? '<img class="tag-picture" src="pictures/gluten free.png" title="Gluten-free">' : ''}
          ${tags.includes(nuts) ? '<img class="tag-picture" src="pictures/contains nuts.png" title="Contain nuts">' : ''}
          ${tags.includes(lowFat) ? '<img class="tag-picture" src="pictures/low fat.png" title="Low-fat">' : ''}
          ${tags.includes(noSugar) ? '<img class="tag-picture" src="pictures/no sugar.png" title="No sugar">' : ''}
        </div>

        <div class="price-and-counter-container">
          <p class="price">$${price}</p>
          <div class="counter-container">
            
            <div class="item-count-container">
              <p class="item-count">${search.item === undefined ? 0 : search.item}</p>
            </div>

            <div class="button-container">
              <button class="plus-button"><p class="plus-text" onclick="increment(${id})">+</p></button>
              <button class="minus-button"><p class="minus-text" onclick="decrement(${id})">-</p></button>
            </div>

          </div>
        </div>
        
      </div>
    `;
  }).join("");
  menu.innerHTML = header + body;
};

// Render cart
var renderCart = () => {
  console.log("Rendering Cart");
  var header = `
    <div class="cart-spacer"></div>

      <div class="cart-pane">
        <p class="cart-title">Your Order</p>
  `;
  var body = `
    <div class="cart-item">
      <p class="item-name">Cart is empty</p>
    </div>
  `;
  if (basket.length !== 0) {
    body = basket.map((x) => {
      var { id, item } = x;
      var search = restaurantMenu.find((y) => y.id == id) || [];
      return `
        <div class="cart-item">
          <p class="item-name">${item}x ${search.name}</p>
          <button class="item-clear-all-button" onclick="removeItem(${id})">
            <img class="delete-icon" src="icons/delete.png">
          </button>
        </div>
      `;
      }).join("");
  }
  var footer = `
    ${totalPrice() === undefined || totalPrice() == 0 ? `` : `
    <div class="price-total">
      <p>Total: $${totalPrice()}</p>
    </div>`}

    <div class="button-pane">

      <button id="`+payNowBtnID+`" class="pay-now-button">
        PAY NOW
      </button>

      <div class="QR-pane">
      <button id="`+QRBtnID+`" class="QR-button">Generate QR</button>
      <button id="`+ helpBtnID+`" class="help-button">?</button>

    </div>

  </div>

</div>

<div class="cart-spacer"></div>
  `;
  cart.innerHTML = header + body + footer;

  // Modal stuff

  const btnCloseModalPayNow = document.getElementById("close-modal-pay-now");
  const modalPayNowElm = document.getElementById("modal-pay-now");
  
  const btnOpenModalPayNow = document.getElementById("pay-now-button");
  
  
  
    btnOpenModalPayNow.addEventListener("click", function () {
      modalPayNowElm.classList.add("open");
    });
    
    
    btnCloseModalPayNow.addEventListener("click", function () {
      modalPayNowElm.classList.remove("open");
    });
  
    var modalPayNow = document.getElementById('modal-pay-now'); 
   
  // When the user clicks anywhere outside of the modal, close it 
  window.onclick = function(event) { 
    if (event.target == modalPayNow) { 
      console.log("Users just clicked outside the pay now model.");
      modalPayNowElm.classList.remove("open");
  
    }   
  }

  var continueShopping=document.getElementById("continue-shopping");
  continueShopping.addEventListener("click", function () {
      modalPayNowElm.classList.remove("open");
    });
  
  
  
  const btnCloseModalQR = document.getElementById("close-modal-QR");
  const modalQRElm = document.getElementById("modal-QR");
  
  const btnOpenModalQR = document.getElementById("QR-button");
  
  btnOpenModalQR.addEventListener("click", function () {
    modalQRElm.classList.add("open");
  });
  
  
  btnCloseModalQR.addEventListener("click", function () {
    modalQRElm.classList.remove("open");
  });
  
  

  
  // Get the modal 
  var modalQR = document.getElementById('modal-QR'); 
  var closeQR=document.getElementById("QR-button1");
   
  // When the user clicks anywhere outside of the modal, close it 
  window.onclick = function(event) { 
    if (event.target == modalQR ) { 
      modalQRElm.classList.remove("open");
    } 
  }
  
  closeQR.addEventListener("click", function()
  {
    modalQRElm.classList.remove("open");
  });

  // End modal stuff

  // Help modal  
  var helpBtn = document.getElementById(helpBtnID);  
  var helpModal =document.getElementById("QR-help-id"); 
  
  var helpModalClose = document.getElementById("QR-help-ok-button") 
 
  helpModalClose.addEventListener("click", function() 
  { 
    helpModal.classList.remove("open"); 
  });

  // When the user clicks anywhere outside of the modal, close it  
  window.onclick = function(event) {  
    if (event.target == helpModal ) {  
      helpModal.classList.remove("open"); 
    }  
  } 
   
  helpBtn.addEventListener("click", function() 
  { 
    helpModal.classList.add("open"); 
  }); 
 
  // End help modal
};

// Increment
var increment = (id) => {
  console.log("Increasing Amount");
  console.log(id);
  var search = basket.find((x) => x.id === id);

  console.log(search === undefined);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log("Amount Increased");
  console.log(id);
  updateCart();
};

// Decrement
var decrement = (id) => {
  var search = basket.find((x) => x.id === id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  console.log("Amount Decreased");
  console.log(id);
  updateCart();
};

// Remove item
var removeItem = (id) => {
  console.log("Removing Item");
  console.log(id);
  basket = basket.filter((x) => x.id !== id);
  console.log("Item Removed")
  console.log(id)
  updateCart();
};

// Clear cart
var clearCart = () => {
  console.log("Clearing Cart");
  basket = [];
  console.log("Cart Cleared");
  updateCart();
};

// Update cart
var updateCart = () => {
  console.log("Updating Cart");
  basket = basket.filter((x) => x.item !== 0);
  if(basket.length == 0)
    localStorage.removeItem("orderRestaurant");
  else
    localStorage.setItem("orderRestaurant", restaurantInfo["restaurantID"]);
  localStorage.setItem(basketKey, JSON.stringify(basket));
  renderMenu();
  renderCart();
  console.log("Cart Updated");
}

var totalPrice = () => {
  return basket.map((x) => x["item"]).reduce((x, y) => x + (y*(restaurantMenu.find((y) => y.id == '0').price)), 0).toFixed(2);
}



getInfo();
renderMenu();
renderCart();




