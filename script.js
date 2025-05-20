const menuItems = [
  {
    id: 1, name: 'Tomato Soup', category: 'starters', price: 6.50,
    desc: 'Rich and creamy tomato soup with basil.',
    img: 'https://images.unsplash.com/photo-1572441710194-194fd11f42f3?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2, name: 'Bruschetta', category: 'starters', price: 7.20,
    desc: 'Grilled bread rubbed with garlic and topped with tomato, olive oil and basil.',
    img: 'https://images.unsplash.com/photo-1571247132148-4becb2fba3f4?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3, name: 'Grilled Chicken', category: 'mains', price: 15.75,
    desc: 'Juicy grilled chicken breast with herbs and lemon.',
    img: 'https://images.unsplash.com/photo-1562967916-eb82221dfb44?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4, name: 'Veggie Pasta', category: 'mains', price: 14.00,
    desc: 'Pasta mixed with fresh vegetables and tomato sauce.',
    img: 'https://images.unsplash.com/photo-1512058564366-c9ec6112601d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5, name: 'Chocolate Cake', category: 'desserts', price: 6.00,
    desc: 'Decadent chocolate cake topped with chocolate ganache.',
    img: 'https://images.unsplash.com/photo-1590080877777-8f62bdfecb06?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6, name: 'Fruit Tart', category: 'desserts', price: 6.80,
    desc: 'Fresh seasonal fruits on light cream and crisp pastry.',
    img: 'https://images.unsplash.com/photo-1547516508-8feda44cc2e9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7, name: 'Lemonade', category: 'beverages', price: 3.50,
    desc: 'Freshly squeezed lemonade with a hint of mint.',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8, name: 'Iced Coffee', category: 'beverages', price: 4.00,
    desc: 'Cold brew coffee served on ice.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9, name: 'Caesar Salad', category: 'salads', price: 9.25,
    desc: 'Romaine lettuce with Caesar dressing, croutons and parmesan.',
    img: 'https://images.unsplash.com/photo-1571151884418-48deb3ef19a3?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 10, name: 'Greek Salad', category: 'salads', price: 8.90,
    desc: 'Tomatoes, cucumbers, olives, feta and olive oil dressing.',
    img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 11, name: 'French Fries', category: 'sides', price: 4.50,
    desc: 'Crispy golden fries served with ketchup.',
    img: 'https://images.unsplash.com/photo-1559789199-88c564b7414a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 12, name: 'Garlic Bread', category: 'sides', price: 5.20,
    desc: 'Toasted bread with garlic and butter.',
    img: 'https://images.unsplash.com/photo-1604908177524-690522b56661?auto=format&fit=crop&w=400&q=80'
  }
];

// Cart data structure
let cart = {};
let discountPercent = 0;
let freeDrinkApplied = false;

// Elements
const menuSection = document.getElementById('menu');
const categoriesBtns = document.querySelectorAll('.category-btn, #categories .category');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const discountMessageEl = document.getElementById('discount-message');
const voucherInput = document.getElementById('voucher-code');
const applyVoucherBtn = document.getElementById('apply-voucher-btn');
const claimOfferBtn = document.getElementById('claim-offer-btn');

// Booking elements
const bookingForm = document.getElementById('booking-form');
const bookingConfirmation = document.getElementById('booking-confirmation');

// Render menu items filtered by category
function renderMenu(category = 'all') {
  let filteredItems =
    category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

  menuSection.innerHTML = '';
  if (filteredItems.length === 0) {
    menuSection.innerHTML = '<p style="text-align:center; color:#aa5f5f; font-weight:700;">No items in this category.</p>';
    return;
  }
  filteredItems.forEach(item => {
    const itemEl = document.createElement('article');
    itemEl.className = 'menu-item';
    itemEl.setAttribute('tabindex', '0');
    itemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="item-details">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-desc">${item.desc}</p>
        <div class="item-bottom">
          <span class="item-price">$${item.price.toFixed(2)}</span>
          <button class="add-btn" aria-label="Add ${item.name} to cart" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    `;
    menuSection.appendChild(itemEl);
  });
}

// Render cart contents
function renderCart() {
  const cartItems = Object.values(cart);

  if (cartItems.length === 0) {
    cartItemsEl.innerHTML = `<p style="color:#8a3a3a; font-weight:700;">Your cart is empty</p>`;
    cartTotalEl.textContent = `Total: $0.00`;
    discountMessageEl.textContent = '';
    freeDrinkApplied = false; // Reset free drink if cart empty
    return;
  }

  cartItemsEl.innerHTML = '';
  let total = 0;
  cartItems.forEach(({ id, name, price, qty }) => {
    total += price * qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span class="cart-item-name">${name}</span>
      <button class="cart-dec" aria-label="Decrease quantity of ${name}" data-id="${id}">-</button>
      <span class="cart-item-qty" aria-live="polite">${qty}</span>
      <button class="cart-inc" aria-label="Increase quantity of ${name}" data-id="${id}">+</button>
      <span class="cart-item-price">$${(price * qty).toFixed(2)}</span>
      <button class="cart-remove" aria-label="Remove ${name} from cart" data-id="${id}">×</button>
    `;
    cartItemsEl.appendChild(div);
  });

  // Apply discount if any
  let discountText = '';
  if (discountPercent > 0) {
    const discountAmount = total * (discountPercent / 100);
    total -= discountAmount;
    discountText = `Discount (${discountPercent}%) applied: -$${discountAmount.toFixed(2)}`;
  }
  if (freeDrinkApplied) {
    discountText = `Free Iced Coffee added to your cart!`;
  }

  cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
  discountMessageEl.textContent = discountText;
  

  // Add event listeners for cart buttons
  cartItemsEl.querySelectorAll('.cart-inc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      cart[id].qty++;
      renderCart();
    });
  });
  cartItemsEl.querySelectorAll('.cart-dec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if (cart[id].qty > 1) {
        cart[id].qty--;
      } else {
        delete cart[id];
      }
      renderCart();
    });
  });
  cartItemsEl.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      delete cart[id];
      renderCart();
    });
  });
}

// Add item to cart
function addToCart(id) {
  const item = menuItems.find(i => i.id === Number(id));
  if (!item) return;
  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = {
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1
    };
  }
  renderCart();
}

// Handle category button clicks
function setActiveCategory(category) {
  categoriesBtns.forEach(btn => {
    const cat = btn.dataset.category;
    if (cat === category) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      if (btn.setAttribute) btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
      if (btn.setAttribute) btn.setAttribute('aria-selected', 'false');
    }
  });
}

categoriesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    setActiveCategory(category);
    renderMenu(category);
  });
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});

// Event delegation for add to cart buttons in menu
menuSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    const id = e.target.dataset.id;
    addToCart(id);
  }
});

// Voucher codes and their effects
const voucherCodes = {
  'SAVE10': () => {
    discountPercent = 10;
    freeDrinkApplied = false;
    return '10% discount applied to your order!';
  },
  'FREEDRINK': () => {
    discountPercent = 0;
    // Add free iced coffee if not already in cart
    let itemId = 8; // Iced Coffee id
    if (!cart[itemId]) {
      cart[itemId] = { id: 8, name: 'Iced Coffee', price: 0, qty: 1 };
    } else if (cart[itemId].price !== 0) {
      // If iced coffee is in cart but not free, set price to 0 for one item
      cart[itemId].qty++;
      cart[itemId].price = 0; // Set price to 0 for all iced coffee in cart to simplify
    }
    freeDrinkApplied = true;
    return 'Free Iced Coffee added to your cart!';
  }
};

// Apply voucher code input
applyVoucherBtn.addEventListener('click', () => {
  const code = voucherInput.value.trim().toUpperCase();
  if (!code) {
    discountMessageEl.textContent = 'Please enter a voucher code.';
    return;
  }
  if (voucherCodes[code]) {
    const message = voucherCodes[code]();
    discountMessageEl.textContent = message;
    voucherInput.value = '';
    renderCart();
  } else {
    discountMessageEl.textContent = 'Invalid voucher code.';
  }
});

// Claim offer button (adds SAVE10 voucher)
claimOfferBtn.addEventListener('click', () => {
  discountPercent = 10;
  freeDrinkApplied = false;
  discountMessageEl.textContent = 'Special offer claimed: 10% discount applied!';
  voucherInput.value = '';
  renderCart();
});


// Initial render
renderMenu('all');
renderCart();