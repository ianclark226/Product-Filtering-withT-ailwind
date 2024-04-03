const products = [
  {
    name: "Above and Below",
    url: "img/abovebelow.webp",
    category: "custom",
    price: 39.99,
  },
  {
    name: "Apiary",
    url: "img/61SnGrmiNeL._AC_SL1144_.jpg",
    category: "custom",
    price: 44.99,
  },
  {
    name: "Ark Nova",
    url: "img/arknova.webp",
    category: "custom",
    price: 49.99,
  },
  {
    name: "Art Society",
    url: "img/artsociety.webp",
    category: "custom",
    price: 19.99,
  },
  {
    name: "Azul",
    url: "img/azul.webp",
    category: "traditional",
    price: 19.99,
  },
  {
    name: "Settlers of Catan",
    url: "img/catan.webp",
    category: "traditional",
    price: 35.99,
  },
  {
    name: "Concept",
    url: "img/concept.webp",
    category: "party",
    price: 19.99,
  },
  {
    name: "Furnace",
    url: "img/s-l1600.jpeg",
    category: "custom",
    price: 24.99,
  },
  {
    name: "Shadow Hunters",
    url: "img/shadowhunters.jpeg",
    category: "horror",
    price: 19.99,
  },
  {
    name: "Splendor",
    url: "img/splendor.jpeg",
    category: "traditional",
    price: 19.99,
  },
  {
    name: "Terrafomring Mars",
    url: "img/terraforming.jpg",
    category: "traditional",
    price: 29.99,
  },
  {
    name: "The Night Cage",
    url: "img/thenightcage.webp",
    category: "horror",
    price: 24.99,
  },
];

// Select DOM elements
const productsWrapper = document.getElementById("products-wrapper");
const checkboxes = document.querySelectorAll(".check");
const filtersContainer = document.getElementById("filters");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("card-count");

// Init Cart item count
let cartItemCount = 0;

// Init Product Element
const productElements = [];

// Event listeners for filtering
filtersContainer.addEventListener('change', filterProducts);
filtersContainer.addEventListener('input', filterProducts);


// Loop Over Products

products.forEach((product) => {
  const productElement = createProductElement(product);
  productElements.push(productElement)
    productsWrapper.appendChild(productElement)
});

  function createProductElement(product) {
    const productElement = document.createElement('div');

  productElement.className = "item space-y-2";

  productElement.innerHTML = `
    <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
                    <img src="${product.url}" alt="${product.name}" class="w-full h-full object-cover" />
                    <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
                        Add to Cart
                    </button>
                </div>
                <p class="text-xl">${product.name}</p>
                <strong>$${product.price.toLocaleString()}</strong>
    `;

    productElement.querySelector('.status').addEventListener('click', updateCart)

    return productElement
    }

    //Add or remove Item
    function updateCart(e) {
        const statusEl = e.target;

        if(statusEl.classList.contains('added')) {
            // Remove from cart
            statusEl.classList.remove('added');
            statusEl.innerText = 'Add to Cart';
            statusEl.classList.remove('bg-red-600');
            statusEl.classList.add('bg-gray-800');

            cartItemCount--;
        } else {
            // Add to cart
            statusEl.classList.add('added');
            statusEl.innerText = 'Remove from Cart';
            statusEl.classList.remove('bg-gray-800');
            statusEl.classList.add('bg-red-600');

            cartItemCount++;
        }

        // Update cart item count
        cartCount.innterText = cartItemCount.toString();
    }

    //Filter Products by checkboxs and search input
    function filterProducts() {
        // Get Search Term
        const searchTerm = searchInput.value.trim().toLowerCase();
        //Get checked categories
        const checkedCategories = Array.from(checkboxes)
        .filter((check) => check.checked)
        .map((check) => check.id)

        //Loop over products and check for matches

        productElements.forEach((productElement, index) => {
            const product = products[index];

            //Check to see if the product matches the search or the checked categories
            const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm)
            const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);

            // Show or hide product based on matches
            if(matchesSearchTerm && isInCheckedCategory) {
                productElement.classList.remove('hidden');
            } else {
                productElement.classList.add('hidden');
            }
        })

        
    }

    



