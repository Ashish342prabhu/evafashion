// loadwhishlist();
// function loadwhishlist() {
//     displayWhishlistcount()
// }
let rating = document.querySelector('.wish-img');

function isUserLoggedIn() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = "/login";
        return Promise.resolve(false);
    }
    return Promise.resolve(true);
}

function addToWhishlist(itemId) {
    const isLoggedIn = isUserLoggedIn();
    userId = localStorage.getItem('userId');
    if (isLoggedIn) {
        fetch('/whish/newWhish', {
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
                    console.log("added");
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





async function displayWhishlistcount() {
    const item_CountElement = document.querySelector('.bag-item-count');
    const isLoggedIn = isUserLoggedIn();
    if (isLoggedIn) {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch(`/whish/MyWhish/${userId}`);
            const WhishItemsData = await response.json();
            console.log(WhishItemsData);
            if (!WhishItemsData.success) {
                console.error('Error fetching orders:', WhishItemsData);
                return;
            }
            // const productIds = new Set(
            //     WhishItemsData.ItemsData[0].WhishItems.map((WhishItem) => WhishItem.product)
            // );
            const productIds = new Set(
                (WhishItemsData && WhishItemsData.whishs && WhishItemsData.whishs.length > 0) ?
                  WhishItemsData.whishs.map(wishItem => wishItem.WhishItems.map(item => item.product))
                    .flat() : []
              );
              
            const productDetails = await Promise.all(
                Array.from(productIds).map((productId) =>
                fetch(`/products/orderproduct/${productId}`).then((response) => response.json())
                )
                );
                console.log(productDetails)

            displayWhishlist(productDetails)
            item_CountElement.textContent = productDetails.length;
        } catch (error) {
            // console.error('Error fetching orders or product details:', error);
        }
    } else {
        console.log('You need to be logged in');
    }
}

function displayWhishlist(items) {
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
