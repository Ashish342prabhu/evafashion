let bagItems;
async function load() {
  try {
    const res = await fetch('/products/getproducts?category=Womens')
    const data = await res.json()
    const bagItemsstr = JSON.stringify(data);
    bagItems = bagItemsstr ? JSON.parse(bagItemsstr) : [];
    displayItems(data.products);
    displayBagItemCount();
  }
  catch (error) {
    console.log(error)
  }
}

// function addToBag(itemId) {
//   bagItems.push(itemId);
//   localStorage.setItem('bagItems', JSON.stringify(bagItems));
//   displayBagItemCount();
// }

function displayBagItemCount() {
  let item_Count = document.querySelector('.bsag-item-count');
  if (bagItems.length > 0) {
    item_Count.style.visibility = 'visible';
    item_Count.innerText = bagItems.length;
  } else {
    item_Count.style.visibility = 'hidden';
  }
}


function displayItems(data) {
  let containerElement = document.querySelector('.container');
  if (!containerElement) {
    return;
  }
  let innerHTML = '';
  data.forEach(product => {
    innerHTML += `<div class="item-container">
      <img class="item-img" src="${product.images}" alt="item1">
      <div class="rating">
          ${product.rating} ⭐ | ${product.rating_count}
          <button onclick="addToWhishlist('${product._id}')"><img class="wish-img" src="images/heart.png"></img></button>
      </div>
      <div class="company-name">${product.brand}</div>
      <div class="itme-name">${product.title}</div>
      <div class="price">
          <span class="cureent-price">Rs ${product.discounted_price}</span>
          <span class="mrp"><del>Rs ${product.strike_price}</del></span>
          <span class="discount">${product.discount}</span>
      </div>
      <button onclick="addToBag('${product._id}')" class="btn-addcart">Add to Cart</button>
    </div>`;
  });
  containerElement.innerHTML = innerHTML;
}
