var addToCartButtons = document.querySelectorAll('.add-to-cart');
var cartItemsList = document.getElementById('cart-items');
var totalPriceElement = document.getElementById('total-price');
var cartHeader = document.querySelector('.cake-top');
var cart = [];

function addToCart(event) {
    var button = event.target;
    var card = button.parentElement;
    var itemImageElement = card.querySelector('img');

    var cakeImageElement = document.querySelector('.cake img');
    if (cakeImageElement) {
        cakeImageElement.remove();
    }

    cartHeader.style.position = 'absolute';
    cartHeader.style.top = '10px';
    cartHeader.style.left = '10px';
    cartHeader.style.display = 'block';

    if (!itemImageElement.classList.contains('red-border')) {
        itemImageElement.classList.add('red-border');
    }

    var itemName = card.querySelector('h2').textContent;
    var itemPrice = parseFloat(card.querySelector('.par-mony').textContent.replace('$', ''));
    var itemImage = card.querySelector('img').src;

    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === itemName) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }

    if (!found) {
        var cartItem = {
            name: itemName,
            price: itemPrice,
            quantity: 1,
            image: itemImage,
            button: button, 
            itemImageElement: itemImageElement 
        };
        cart.push(cartItem);
    }

    button.classList.add('added-to-cart');
    var currentItem = cart.find(item => item.name === itemName);
    button.textContent = ' (' + currentItem.quantity + ')';
    button.classList.add('red-button');

    createQuantityButtons(button, currentItem);

    updateCart();
}

function createQuantityButtons(button, cartItem) {
    button.innerHTML = ''; 

    var decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.classList.add('quantity-decrease');
    decreaseButton.style.marginRight = '5px';
    decreaseButton.style.borderRadius = '15px';
    decreaseButton.style.border = '2px solid white';
    decreaseButton.style.backgroundColor = 'transparent';
    decreaseButton.style.color = 'white';
    decreaseButton.style.marginRight = '25px';

    decreaseButton.addEventListener('click', function () {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
            updateCart();
            button.querySelector('.quantity-display').textContent = cartItem.quantity;
        } else {
            removeItemFromCart(cart.indexOf(cartItem));
        }
    });

    var quantityDisplay = document.createElement('span');
    quantityDisplay.textContent = cartItem.quantity;
    quantityDisplay.classList.add('quantity-display');
    quantityDisplay.style.margin = '0 10px';

    var increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.classList.add('quantity-increase');
    increaseButton.style.borderRadius = '15px';
    increaseButton.style.border = '2px solid white';
    increaseButton.style.backgroundColor = 'transparent';
    increaseButton.style.marginLeft = '25px';
    increaseButton.style.marginTop = '5px';

    increaseButton.addEventListener('click', function () {
        cartItem.quantity++;
        updateCart();
        button.querySelector('.quantity-display').textContent = cartItem.quantity;
    });

    button.appendChild(decreaseButton);
    button.appendChild(quantityDisplay);
    button.appendChild(increaseButton);
}

function updateCart() {
    cartItemsList.innerHTML = '';
    var total = 0;

    cart.forEach((item, index) => {
        var listItem = document.createElement('li');
        listItem.textContent = item.name + ' - $' + item.price + ' x ' + item.quantity;

        var cancelButton = document.createElement('button');
        cancelButton.textContent = 'x';
        cancelButton.classList.add('cancel-button');
        cancelButton.style.backgroundColor = 'white';
        cancelButton.style.border = '2px solid black';
        cancelButton.style.borderRadius = '50px';
        cancelButton.style.width = '30px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.marginLeft = '10px';
        cancelButton.style.fontSize = "20px";

        cartItemsList.style.borderBottom = "1px solid #2b1d178a";

        cancelButton.addEventListener('click', function () {
            removeItemFromCart(index);
        });

        listItem.appendChild(cancelButton);
        cartItemsList.appendChild(listItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);

    var totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    cartHeader.textContent = 'Your Cart (' + totalItems + ')';
}

function removeItemFromCart(index) {
    var cartItem = cart[index];


    var cartIcon = document.createElement('img');
    cartIcon.src = 'assets/images/icon-add-to-cart.svg'; 
    cartIcon.alt = 'add-to-cart';
    cartIcon.style.width = '50px';
    cartIcon.style.marginRight = '5px';
    cartIcon.style.zIndex = '10000';


    if (cartItem.itemImageElement) {
        cartItem.itemImageElement.classList.remove('red-border');
    }

    if (cartItem.button) {
        cartItem.button.textContent = 'Add to Cart';
        cartItem.button.classList.remove('red-button', 'added-to-cart');

        //
    }

    cart.splice(index, 1);
    updateCart();
}

for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart);
}

function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = ''; 


    let totalOrderPrice = 0;


    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.style.display = 'flex'; 
        listItem.style.alignItems = 'center';  

        const productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.alt = item.name;
        productImage.style.width = '50px'; 
        productImage.style.marginRight = '10px';  

        const productInfo = document.createElement('span');
        productInfo.textContent = `${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
        productInfo.style.flex = '1';  
        productInfo.style.color = 'black';  

        const productQuantity = document.createElement('span');
        productQuantity.textContent = `x ${item.quantity}`;
        productQuantity.style.color = 'orange'; 
        productQuantity.style.marginLeft = '10px'; 

        listItem.appendChild(productImage);
        listItem.appendChild(productInfo);
        listItem.appendChild(productQuantity);


        orderItemsContainer.appendChild(listItem);


        totalOrderPrice += item.price * item.quantity;
    });


    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `Total: $${totalOrderPrice.toFixed(2)}`;
    totalPriceElement.style.fontWeight = 'bold';  
    totalPriceElement.style.color = 'black';  
    totalPriceElement.style.textAlign = 'center';
    totalPriceElement.style.marginTop = '20px';  


    orderItemsContainer.appendChild(totalPriceElement);
}

document.getElementById('confirm-order').addEventListener('click', function () {
    displayOrderSummary(); 
    document.querySelector('.order-summary').style.display = 'block'; 
    document.querySelector('.overlay').style.display = 'block';  
});


document.getElementById('back-to-shop').addEventListener('click', function () {
    document.querySelector('.order-summary').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
});
