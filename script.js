const menuItems = [
  {
    id: 1, name: 'Tomato Soup', category: 'starters', price: 6.50,
    desc: 'Rich and creamy tomato soup with basil.',
    img:' https://th.bing.com/th/id/OIP.rl1fzgr5eoW63RSFpPKIYAHaJ4?cb=iwp2&rs=1&pid=ImgDetMain'
  },
  {
    id: 2, name: 'Bruschetta', category: 'starters', price: 7.20,
    desc: 'Grilled bread rubbed with garlic and topped with tomato, olive oil and basil.',
    img: 'https://th.bing.com/th/id/OIP.vWZ1-bZXIivGH_Xzw2kD-wHaHa?cb=iwp2&rs=1&pid=ImgDetMain'
  },
  {
    id: 3, name: 'Grilled Chicken', category: 'mains', price: 15.75,
    desc: 'Juicy grilled chicken breast with herbs and lemon.',
    img: 'https://www.simplyrecipes.com/thmb/ByLQsxRDUb4lMtx81-bl-i-cgtI=/5156x3437/filters:fill(auto,1)/Simply-Recipes-Grilled-Chicken-LEAD-SEO-Horizontal-1b86ef1e115444ba8b6fb216f2810c7c.jpg'
  },
  {
    id: 4, name: 'Veggie Pasta', category: 'mains', price: 14.00,
    desc: 'Pasta mixed with fresh vegetables and tomato sauce.',
    img: 'https://thishealthytable.com/wp-content/uploads/2020/12/veggie-pasta-recipe-3-of-4-720x720.jpg'
  },
  {
    id: 5, name: 'Chocolate Cake', category: 'desserts', price: 6.00,
    desc: 'Decadent chocolate cake topped with chocolate ganache.',
    img: 'https://www.cookingclassy.com/wp-content/uploads/2022/04/easy-chocolate-cake-2.jpg'
  },
  {
    id: 6, name: 'Fruit Tart', category: 'desserts', price: 6.80,
    desc: 'Fresh seasonal fruits on light cream and crisp pastry.',
    img: 'https://www.thespruceeats.com/thmb/I-HaDqLtKvwHjyaYnolXmfKdR_E=/2500x1664/filters:fill(auto,1)/fruit-tart-2500-58a474945f9b58819c899b6e.jpg'
  },
  {
    id: 7, name: 'Lemonade', category: 'beverages', price: 3.50,
    desc: 'Freshly squeezed lemonade with a hint of mint.',
    img: 'https://th.bing.com/th/id/OIP.8cXXRnZen-TLoIlNMaq2QQHaHa?cb=iwp2&rs=1&pid=ImgDetMain'
  },
  {
    id: 8, name: 'Iced Coffee', category: 'beverages', price: 4.00,
    desc: 'Cold brew coffee served on ice.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9, name: 'Caesar Salad', category: 'salads', price: 9.25,
    desc: 'Romaine lettuce with Caesar dressing, croutons and parmesan.',
    img: 'https://th.bing.com/th/id/OIP.xz7Bz2Id8fjjfF3TErhT3AHaJQ?cb=iwp2&w=1200&h=1500&rs=1&pid=ImgDetMain'
  },
  {
    id: 10, name: 'Greek Salad', category: 'salads', price: 8.90,
    desc: 'Tomatoes, cucumbers, olives, feta and olive oil dressing.',
    img: 'https://www.savingdessert.com/wp-content/uploads/2019/04/Greek-Salad-Recipe-2-800x1200.jpg'
  },
  {
    id: 11, name: 'French Fries', category: 'sides', price: 4.50,
    desc: 'Crispy golden fries served with ketchup.',
    img: 'https://img.apmcdn.org/4b2716626c9ff3f6e5dfebe520eb592c33cf1e7b/uncropped/941f50-splendid-table-french-fries.jpg'
  },
  {
    id: 12, name: 'Garlic Bread', category: 'sides', price: 5.20,
    desc: 'Toasted bread with garlic and butter.',
    img: 'https://th.bing.com/th/id/OIP.YEW2baM3AMesuHe5yLID0gHaLG?cb=iwp2&rs=1&pid=ImgDetMain'}
  ];
 // JavaScript to toggle the navigation menu
 document.getElementById('hamburger').addEventListener('click', function() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active'); // Toggle the 'active' class
});
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