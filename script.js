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
            image: itemImage
        };
        cart.push(cartItem);
    }

    button.classList.add('added-to-cart');
    var currentItem = cart.find(item => item.name === itemName);
    button.textContent = ' (' + currentItem.quantity + ')';
    button.classList.add('red-button');

    createQuantityButtons(button, cart.find(item => item.name === itemName));

    updateCart();


}


function createQuantityButtons(button, cartItem) {
  button.innerHTML = ''; 

  var decreaseButton = document.createElement('button');
  decreaseButton.textContent = '-';
  decreaseButton.classList.add('quantity-decrease');
  decreaseButton.style.marginRight = '5px';
  decreaseButton.style.borderRadius='15px';
  decreaseButton.style.border='2px solid white';
  decreaseButton.style.backgroundColor='transparent';
  decreaseButton.style.Color='white';
  decreaseButton.style.marginRight='25px';




  decreaseButton.addEventListener('click', function () {
      if (cartItem.quantity > 1) {
          cartItem.quantity--;
          updateCart();
          button.querySelector('.quantity-display').textContent = cartItem.quantity;
      }
  });


  var quantityDisplay = document.createElement('span');
  quantityDisplay.textContent = cartItem.quantity;
  quantityDisplay.classList.add('quantity-display');
  quantityDisplay.style.margin = '0 10px';

  var increaseButton = document.createElement('button');
  increaseButton.textContent = '+';
  increaseButton.classList.add('quantity-increase');
  increaseButton.style.borderRadius='15px';
  increaseButton.style.border='2px solid white';
  increaseButton.style.backgroundColor='transparent';
  increaseButton.style.marginLeft='25px';
  increaseButton.style.marginTop='5px';



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

        // 
        cartItemsList.style.borderBottom="1px solid #2b1d178a" ;

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
    cart.splice(index, 1);
    updateCart();
}

for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart);
}



var confirmOrderButton = document.getElementById('confirm-order');
confirmOrderButton.addEventListener('click', function () {
    if (cart.length > 0) {
        var orderItemsList = document.getElementById('order-items');
        orderItemsList.innerHTML = '';

        for (var i = 0; i < cart.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = cart[i].name + ' - $' + cart[i].price + ' x ' + cart[i].quantity;
            orderItemsList.appendChild(listItem);
        }
        document.querySelector('.order-summary').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
    } else {
        alert('Your cart is empty.');
    }
});

var backToShopButton = document.getElementById('back-to-shop');
backToShopButton.addEventListener('click', function () {
    document.querySelector('.order-summary').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
});



var increaseButtons = document.querySelectorAll('.button-add');
var decreaseButtons = document.querySelectorAll('.button-min');


increaseButtons.forEach(button => {
    button.addEventListener('click', function (event) {

    });
});

decreaseButtons.forEach(button => {
    button.addEventListener('click', function (event) {

    });


});


const cartItems = [
    { name: 'Waffle with Berries', price: 6.50, image: 'assets/images/image-waffle-desktop.jpg' },
    { name: 'Vanilla Bean Crème Brûlée', price: 7.00, image: 'assets/images/image-creme-brulee-desktop.jpg' },
];


function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const listItem = document.createElement('li');

        const productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.alt = item.name;
        listItem.appendChild(productImage);


        const productInfo = document.createElement('span');
        productInfo.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        listItem.appendChild(productInfo);

        orderItemsContainer.appendChild(listItem);
    });
}

document.getElementById('confirm-order').addEventListener('click', function () {
    displayOrderSummary();
    document.querySelector('.order-summary').style.display = 'block';

});



















function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = '';

    let totalOrderPrice = 0;

    // عرض المنتجات المضافة إلى السلة في order summary
    cart.forEach(item => {
        const listItem = document.createElement('li');

        // إنشاء عنصر الصورة
        const productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.alt = item.name;
        productImage.style.width = '50px';  // تعديل عرض الصورة حسب الحاجة
        productImage.style.marginRight = '5px';  // إضافة مسافة بين الصورة والنص
        productImage.style.marginLeft = '5px';  
        productImage.style.marginTop = '5px'; 


        // معلومات المنتج (بجانب الصورة)
        const productInfo = document.createElement('span');
        productInfo.textContent = `${item.name} - $${(item.price * item.quantity).toFixed(2)} `;
        productInfo.style.color = 'black';  // جعل النص أسود
        // إنشاء عنصر للكمية باللون البرتقالي
        const productQuantity = document.createElement('span');
        productQuantity.textContent = `x ${item.quantity}`;
        productQuantity.style.color = 'orange';  // جعل الكمية باللون البرتقالي
        productQuantity.style.margin = '9px';

        // إضافة الصورة والمعلومات إلى العنصر
        listItem.appendChild(productImage);
        listItem.appendChild(productInfo);
        listItem.appendChild(productQuantity);  // إضافة الكمية بجانب المعلومات

        // إضافة العنصر إلى order summary
        orderItemsContainer.appendChild(listItem);

        // حساب إجمالي السعر
        totalOrderPrice += item.price * item.quantity;
    });

    // عرض إجمالي السعر في نهاية القائمة
    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `Total: $${totalOrderPrice.toFixed(2)}`;
    totalPriceElement.style.fontWeight = 'bold'; // لجعل النص عريضاً
    totalPriceElement.style.color = 'black';  // جعل النص أسود
    totalPriceElement.style.textAlign = 'center';
    totalPriceElement.style.fontSize = "20px";

    orderItemsContainer.appendChild(totalPriceElement);
}

// إضافة حدث عند تأكيد الطلب
document.getElementById('confirm-order').addEventListener('click', function () {
    displayOrderSummary();
    document.querySelector('.order-summary').style.display = 'block';
});


















document.addEventListener('DOMContentLoaded', () => {
    const quantityControls = document.querySelectorAll('.quantity-control');
    
    quantityControls.forEach(control => {
      const decreaseBtn = control.querySelector('.decrease-quantity');
      const increaseBtn = control.querySelector('.increase-quantity');
      const quantityDisplay = control.querySelector('.quantity');
      let quantity = parseInt(quantityDisplay.textContent);
  
      // Decrease quantity
      decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          quantityDisplay.textContent = quantity;
        }
      });
  
      // Increase quantity
      increaseBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
      });
    });
  });
  
