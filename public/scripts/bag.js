// let bagItemsObjects;
// onload();
// function onload(){
//   loadBagItemObjects();
//   displayBagItems();
//   displayBagsummary();
// }  /cart/:id

function displayBagsummary(item) {
  let bagSummary = document.querySelector('.bag-summary');
  let totalItem = item.length;
  let totalMrp = 0;
  let totalDiscount = 0;
  item.forEach(item => {
    totalMrp += item.products.strike_price;
    totalDiscount += item.products.strike_price - item.products.discounted_price;
  })
  let finalPayment = totalMrp - totalDiscount + 99;

  bagSummary.innerHTML = `<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs${totalMrp}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs ${finalPayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;
}



function addToBag(itemId) {
  console.log(itemId);
  const isLoggedIn = isUserLoggedIn();
  userId = localStorage.getItem('userId');
  if (isLoggedIn) {
    fetch('/cart/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemIds: [{ itemId }] }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.headers.get('Content-Type') != 'application/json') {
          throw new Error(`Received content-type ${response.headers.get('Content-Type')}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          displayBagItemCount();
        } else {
          // There was an error
          console.error('Error:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    console.log('You need to be logged in to add items to cart');
  }
}

function isUserLoggedIn() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = "/login";
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
}


async function displayBagItemCount() {
  const item_CountElement = document.querySelector('.bag-item-count');
  const isLoggedIn = isUserLoggedIn();
  if (isLoggedIn) {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`/cart/myOrders/${userId}`);
      const ordersData = await response.json();
      if (!ordersData.success) {
        console.error('Error fetching orders:', ordersData);
        return;
      }
      const productIds = new Set(
        ordersData.orders[0].cartItems.map((cartItem) => cartItem.product)
      );
      console.log(productIds)
      const productDetails = await Promise.all(
        Array.from(productIds).map((productId) =>
          fetch(`/products/orderproduct/${productId}`).then((response) => response.json())
        )
      );
      displayBagItems(productDetails)
      displayBagsummary(productDetails)
      item_CountElement.textContent = productDetails.length;
    } catch (error) {
      console.error('Error fetching orders or product details:', error);
    }
  } else {
    console.log('You need to be logged in');
  }
}

function displayBagItems(items) {
  console.log(items);
  let containerElement = document.querySelector('.bag-items-container');
  if (!containerElement) {
    return;
  }
  let innerHTML = '';
  items.forEach(item => {
    innerHTML += `<div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="${item.products.images}"  alt="item1">
      </div>
      <div class="item-right-part">
        <div class="company">${item.products.brand}</div>
        <div class="item-name">${item.products.title}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.products.discounted_price}</span>
          <span class="original-price">Rs ${item.products.strike_price}</span>
          <span class="discount-percentage">(${item.products.discount}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">10 days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">10/04/2024</span>
        </div>
      </div>
    
      <div class="remove-from-cart" onclick="removeItem(${item.products._id})">X</div>
    </div>`;
  });
  containerElement.innerHTML = innerHTML;
}

async function removeItem(id) {
  var itemId = id
  var userId = localStorage.getItem('userId');
  console.log(itemId);
  console.log(userId);
  try {
    const response = await fetch(`/cart/${itemId}`, {
      method: 'POST',
      body: JSON.stringify({ userId, itemId }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Failed to remove item from cart: ${response.statusText}`);
    }
    loadBagItemObjects();
    displayBagItemCount();
    displayBagItems();
    displayBagsummary();
  } catch (error) {
    console.error("Error removing item:", error);
  }
}
