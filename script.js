document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  let cart = [];

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });

  function addToCart(event) {
    const productElement = event.target.closest('.product');
    const productName = productElement.querySelector('h3').textContent;
    const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

    const product = {
      name: productName,
      price: productPrice
    };

    cart.push(product);
    updateCartDisplay();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  }

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="remove-from-cart" data-index="${index}">Remove</button>`;
      cartItemsContainer.appendChild(li);
      total += item.price;
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;

    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        removeFromCart(index);
      });
    });
  }
});

