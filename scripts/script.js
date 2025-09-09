let allPlantsArray;

// Spinner helpers add and remove
const showSpinner = () => {
  const s = document.getElementById('loading-spinner');
  if (s) s.classList.remove('hidden');
};
const hideSpinner = () => {
  const s = document.getElementById('loading-spinner');
  if (s) s.classList.add('hidden');
};

// Fetching categories JSON
const loadCategories = async () => {
  try {
    showSpinner();
    const categoriesUrl = 'https://openapi.programming-hero.com/api/categories';
    const categoriesJSON = await fetch(categoriesUrl);
    const categoriesObject = await categoriesJSON.json();
    const categoriesArray = categoriesObject.categories;
    categoriesArray.forEach((element) => {
      showCategories(element);
    });
  } catch (err) {
    console.error(err);
  } finally {
    hideSpinner();
  }
};

// Showing the fetches categories
const showCategories = (catagoryElement) => {
  const categoriesList = document.getElementById('categories-list');
  categoriesList.innerHTML += `
    <a tabid=${catagoryElement.id} id="catagory-tab-${catagoryElement.id}"
              class="is-tab flex justify-center text-xs md:text-base border-1 md:justify-start md:w-full btn shadow-none md:border-0 bg-transparent font-normal text-center rounded-xl hover:bg-[#15803D25]"
              >${catagoryElement.category_name}</a
            >
    `;
};

// Fetching All Tree info
const loadPlants = async () => {
  try {
    showSpinner();
    const allPlantsURL = 'https://openapi.programming-hero.com/api/plants';
    const allPlantsJSON = await fetch(allPlantsURL);
    const allPlantsObject = await allPlantsJSON.json();
    allPlantsArray = allPlantsObject.plants;
    allPlantsArray.forEach((plant) => {
      // console.log('DEBUG: showAllPlants called');
      showAllPlants(plant);
    });
  } catch (err) {
    console.error(err);
  } finally {
    hideSpinner();
  }
};

// Showing all trees at first
// Also this method reused for any kinf of card display
const showAllPlants = (plantElement) => {
  const cardsList = document.getElementById('cards-list');
  // console.log('DEBUG: showAllPlants initiated');
  cardsList.innerHTML += `
  <div id="plant-card-${plantElement.id}" class="plant-card bg-base-100 p-4 space-y-3 rounded-2xl">
            <img class="w-full h-[300px] object-cover rounded-lg" src=${plantElement.image} alt=${plantElement.name} />
            <div class="text-left space-y-3">
              <h2 onClick="plantModalLoad(${plantElement.id}); plant_modal.showModal()" id="plant-name-${plantElement.id}" class="card-title hover:cursor-pointer">${plantElement.name}</h2>
              <p>
                ${plantElement.description}
              </p>
              
              <div class="flex justify-between">
                <span class="badge badge-soft text-[#15803D] bg-[#DCFCE7] border-0 rounded-2xl"
                  >${plantElement.category}</span
                >
                <p class="font-bold">৳<span>${plantElement.price}</span></p>
              </div>
              <button
              cartBtn=${plantElement.id}
              id="add-to-cart-button-${plantElement.id}"
                class="add-to-cart btn bg-[#15803D] w-full text-white text-base font-light rounded-3xl py-5"
              >
                Add to Cart
              </button>
            </div>
          </div>
    `;
};

// Show plants of category upon Clicking
const showCategoryPlants = async (id) => {
  const categoryURL = `https://openapi.programming-hero.com/api/category/${id}`;
  const plantCategoryJSON = await fetch(categoryURL);
  const plantCategoryObject = await plantCategoryJSON.json();
  const plantCategoryArray = plantCategoryObject.plants;
  // console.log(plantCategoryArray);

  const cardsList = document.getElementById('cards-list');
  cardsList.innerHTML = '';

  plantCategoryArray.forEach((plant) => {
    showAllPlants(plant);
  });
};

// Change CSS attributes of Active tab
const tabActive = (tabID) => {
  const allTabs = document.querySelectorAll('a.is-tab');
  allTabs.forEach((tab) => {
    tab.classList.remove('selected');
  });
  allTabs[tabID].classList.add('selected');
};

// Plant info fetch and Modal modification
const plantModalLoad = async (plantID) => {
  try {
    showSpinner();
    const plantURL = `https://openapi.programming-hero.com/api/plant/${plantID}`;
    const plantJSON = await fetch(plantURL);
    const plantObject = await plantJSON.json();
    const plantInfo = plantObject.plants;

    const plantModal = document.getElementById('plant_modal');
    plantModal.innerHTML = '';
    plantModal.innerHTML = `
  <div class="modal-box">
    <div class="bg-base-100 p-4 space-y-3 rounded-2xl">
      <img
        class="w-full h-[300px] object-cover rounded-lg"
        src="${plantInfo.image}"
        alt="${plantInfo.name}"
      />
      <div class="text-left space-y-3">
        <h2 class="card-title hover:cursor-pointer">${plantInfo.name}</h2>
        <p>${plantInfo.description}</p>

        <div class="flex justify-between">
          <span class="badge badge-soft text-[#15803D] bg-[#DCFCE7] border-0 rounded-2xl"
            >${plantInfo.category}</span
          >
          <p class="font-bold">৳<span>${plantInfo.price}</span></p>
        </div>
      </div>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
  `;
  } catch (err) {
    console.error(err);
  } finally {
    hideSpinner();
  }
};

// Checks if the plant was already added or not
const alreadyAdded = (plantID) => {
  if (document.getElementById(`plant-${plantID}-qntt`)) {
    return true;
  }
  return false;
};

//Update the Total Amount
const updateTotal = (plant, action) => {
  const totalElem = document.getElementById('total-amount');
  if (action === 'add') {
    totalElem.innerText = Number(totalElem.innerText) + plant.price;
  } else if (action === 'sub') {
    const plantQuantity = Number(document.getElementById(`plant-${plant.id}-qntt`).innerText);
    totalElem.innerText = Number(totalElem.innerText) - plant.price * plantQuantity;
  }
};

//Add to cart method
const addToCart = (plant) => {
  const plantName = plant.name;
  const plantPrice = plant.price;
  const cartContainerElem = document.getElementById('cart-container');
  if (alreadyAdded(plant.id)) {
    let plantQuantityElem = document.getElementById(`plant-${plant.id}-qntt`);
    plantQuantityElem.innerText = Number(plantQuantityElem.innerText) + 1;
  } else {
    cartContainerElem.innerHTML += `
  <div id="cart-item-plant-${plant.id}" class="flex justify-between items-center bg-[#f0fdf4] p-4 mb-4 rounded-lg">
              <div>
                <p class="text-sm font-bold">${plantName}</p>
                <p class="text-gray-400">৳<span>${plantPrice}</span> x <span id="plant-${plant.id}-qntt">1</span></p>
              </div>
              <div removeId=${plant.id}
               class="cart-remove flex justify-center items-center h-7 w-7 hover:cursor-pointer rounded-md">
                <i class="fa-solid fa-xmark fa-sm" style="color: #a8a8a8"></i>
              </div>
            </div>
  `;
  }
};

// method to remove from cart
const removeFromCart = (plantID) => {
  const removeVictim = document.getElementById(`cart-item-plant-${plantID}`);
  removeVictim.remove();
};

//==================================================================================//

loadCategories();
loadPlants();

// Event Listener for all childs of Category List
document.getElementById('categories-list').addEventListener('click', (e) => {
  const tabID = Number(e.target.getAttribute('tabid'));
  tabActive(tabID);
  showCategoryPlants(tabID);
});

//Event Listener for 'Add to Cart' buttons
document.getElementById('cards-list').addEventListener('click', (e) => {
  const btnElem = e.target;
  if (btnElem.closest('button.add-to-cart')) {
    const btnID = btnElem.getAttribute('cartBtn');
    const clickedPlant = allPlantsArray[btnID - 1];
    updateTotal(clickedPlant, 'add');
    addToCart(clickedPlant);
  }
});

//Event Listener for 'Remove from cart' button
document.getElementById('cart-container').addEventListener('click', (e) => {
  const btnElem = e.target.closest('div.cart-remove');
  if (btnElem) {
    const btnID = btnElem.getAttribute('removeid');
    const plantInCart = allPlantsArray[btnID - 1];
    updateTotal(plantInCart, 'sub');
    removeFromCart(plantInCart.id);
  }
});
