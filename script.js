const products = {
  men: [
    { name: "Nike Air Max 90",
    price: 23280, 
    img: "AIR+MAX+90+PRM.jpeg" 
    },
    { name: "Nike Air Force 1", 
    price: 23000, 
    img: "AIR+FORCE+1+'07.jpeg" 
    }
  ],
  women: [
    { name: "Nike Air Max PORTAL", 
    price: 13000, 
    img: "1_77_a5ed5678-042c-467d-aa55-95397368d86f.webp" 
    },
    { name: "Nike Air Jordan 1", 
    price: 21000, 
    img: "AURORA_DC0774-162_PHSLH001-2000.webp" 
    }
  ],
  kids: [
    { name: "Junior Air MAX ", 
    price: 12000, 
    img: "74824824.jpeg" 
    },
    { name: "Nike AIR NOVA", 
    price: 8900, 
    img: "NIKE+AIR+MAX+NOVA+(GS).jpeg" 
    }
  ],
};

const homeProducts = [
  {
    name: "Cristian dior x Nike",
    price: 17500,
    img: "y61FeCCwftwWAFHhlC4x4OvqORjpnCIL8hGiYsJ6.webp"
  },
  {
    name: "Travis Scott Olive",
    price: 29990,
    img: "air-jordan-1-low-og-sp-travis-scott-olive-2.webp"
  },
  {
    name: "Nike x Louis vitton",
    price: 25000,
    img: "5sG0O7V2tDgDbOTzxoaSTYRHrDy9Kz7JHE0MFADA.webp"
  },
  {
    name: "Nike x Lego",
    price: 12000,
    img: "G.T.+CUT+3+x+LEGO+COL.+(PS).avif"
  }
];

// Cart state management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

// Update cart display
function updateCartDisplay() {
  const cartDisplay = document.getElementById("cart-count");
  if (cartDisplay) {
    cartDisplay.textContent = cartCount;
  }
}

// Add to cart functionality
function addToCart(product) {
  const existingItem = cart.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  alert(`${product.name} added to cart!`);
}

// Cart page functionality
function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<div class="empty-cart"><h2>Your cart is empty</h2><p>Go back to shopping to add items to your cart.</p></div>';
    if (cartTotal) cartTotal.textContent = '0';
    return;
  }

  let total = 0;
  cartContainer.innerHTML = cart.map(item => {
    total += item.price * (item.quantity || 1);
    return `
      <div class="cart-item" data-name="${item.name}">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='placeholder.jpg'">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
          <div class="cart-item-controls">
            <button class="quantity-btn minus" onclick="updateQuantity('${item.name}', -1)">-</button>
            <span class="quantity">${item.quantity || 1}</span>
            <button class="quantity-btn plus" onclick="updateQuantity('${item.name}', 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (cartTotal) cartTotal.textContent = total.toLocaleString();

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Thank you for your purchase! This is a demo, no actual purchase was made.');
      clearCart();
    });
  }
}

// Update quantity
function updateQuantity(productName, change) {
  const item = cart.find(item => item.name === productName);
  if (item) {
    item.quantity = (item.quantity || 1) + change;
    if (item.quantity <= 0) {
      removeFromCart(productName);
    } else {
      cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
      renderCart();
    }
  }
}

// Remove from cart
function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  cartCount = 0;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  renderCart();
}

function renderProducts(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  products[category].forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>₹${p.price.toLocaleString()}</p>
        <button class="add-btn">Add to Cart</button>
      </div>
    `;
    card.querySelector(".add-btn").addEventListener("click", () => addToCart(p));
    container.appendChild(card);
  });
}

function renderHomeProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  homeProducts.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>₹${p.price.toLocaleString()}</p>
        <button class="add-btn">Add to Cart</button>
      </div>
    `;
    card.querySelector(".add-btn").addEventListener("click", () => addToCart(p));
    grid.appendChild(card);
  });
}
// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
  
  // Render cart if we're on the cart page
  if (document.getElementById('cart-container')) {
    renderCart();
  }
  
  // Render products based on page
  if (document.getElementById("men-products")) renderProducts("men", "men-products");
  if (document.getElementById("women-products")) renderProducts("women", "women-products");
  if (document.getElementById("kids-products")) renderProducts("kids", "kids-products");
  if (document.getElementById("new-products")) renderProducts("new", "new-products");
  if (document.getElementById("product-grid")) renderHomeProducts();
});