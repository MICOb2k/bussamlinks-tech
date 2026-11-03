
// ==========================================
// BUSSAMLINKSLINKS TECH - CORE ENGINE
// Developed by M I C O
// ==========================================

// Global Business Configuration
const BUSSAMLINKS_WHATSAPP = "2348077572174";

// Sample Initial Tech Products
const mockProducts = [
  {
    id: 1,
    name: "20,000mAh 22.5W Fast Charge Power Bank",
    category: "Power Solutions",
    price: 18500,
    oldPrice: 22000,
    image: "https://images.unsplash.com/photo-1609592424074-124976451676?w=600",
    inStock: true,
    specs: "22.5W Fast Charge • Dual USB Ports"
  },
  {
    id: 2,
    name: "Dual-Fan RGB Semiconductor Phone Cooler",
    category: "Gaming & Cooling",
    price: 12500,
    oldPrice: 16000,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600",
    inStock: true,
    specs: "Rapid Ice Cooling • Silent Turbofan"
  },
  {
    id: 3,
    name: "Wireless ANC Bluetooth Earbuds",
    category: "Mobile Audio",
    price: 15000,
    oldPrice: 19500,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
    inStock: false,
    specs: "Active Noise Cancelling • LED Case"
  },
  {
    id: 4,
    name: "Adjustable Desktop & Floor Tripod Stand",
    category: "Tripods & Mounts",
    price: 8500,
    oldPrice: 11000,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    inStock: true,
    specs: "360° Rotation • Bluetooth Remote"
  }
];

let cartCount = 0;
let currentCategory = "All";

// Function to render product cards
function renderProducts(productsToDisplay) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (productsToDisplay.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-10 text-gray-500">
        <i class="fa-solid fa-box-open text-3xl mb-2"></i>
        <p class="font-medium">No tech items found in this category.</p>
      </div>
    `;
    return;
  }

  productsToDisplay.forEach(product => {
    const stockBadge = product.inStock 
      ? `<span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">In Stock</span>`
      : `<span class="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">Out of Stock</span>`;

    const whatsappMsg = encodeURIComponent(
      `Hello Sir Busayo! I want to order the "${product.name}" for ₦${product.price.toLocaleString()} from the Bussamlinks Technology platform. Is it available?`
    );

    grid.innerHTML += `
      <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col justify-between">
        <div>
          <img src="${product.image}" alt="${product.name}" class="w-full h-36 object-cover rounded-lg mb-2">
          <div class="flex justify-between items-center mb-1">
            <span class="text-[11px] font-semibold text-gray-500">${product.category}</span>
            ${stockBadge}
          </div>
          <h3 class="font-bold text-sm text-gray-800 line-clamp-2">${product.name}</h3>
          <p class="text-xs text-blue-600 font-medium mt-1">${product.specs}</p>
        </div>

        <div class="mt-3">
          <div class="flex items-baseline space-x-2">
            <span class="text-base font-extrabold text-slate-900">₦${product.price.toLocaleString()}</span>
            <span class="text-xs text-gray-400 line-through">₦${product.oldPrice.toLocaleString()}</span>
          </div>

          <div class="mt-2 space-y-1.5">
            <button onclick="addToCart()" ${!product.inStock ? 'disabled' : ''} 
              class="w-full ${product.inStock ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white py-1.5 rounded-lg text-xs font-bold transition">
              ${product.inStock ? 'Add to Cart' : 'Unavailable'}
            </button>
            <a href="https://wa.me/${BUSSAMLINKS_WHATSAPP}?text=${whatsappMsg}" target="_blank" 
               class="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-lg text-xs font-bold flex items-center justify-center space-x-1 transition">
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

// Filter by category
function filterCategory(categoryName, event) {
  currentCategory = categoryName;

  // Highlight active button
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.classList.remove('bg-blue-600', 'text-white');
    btn.classList.add('bg-white', 'text-gray-700');
  });
  if (event && event.target) {
    event.target.classList.remove('bg-white', 'text-gray-700');
    event.target.classList.add('bg-blue-600', 'text-white');
  }

  if (categoryName === "All") {
    renderProducts(mockProducts);
  } else {
    const filtered = mockProducts.filter(p => p.category === categoryName);
    renderProducts(filtered);
  }
}

// Add to Cart Logic
function addToCart() {
  cartCount++;
  const badge = document.getElementById("cart-count");
  if (badge) badge.innerText = cartCount;
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(mockProducts);
});

