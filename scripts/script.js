// Fetching categories JSON
const loadCategories = async () => {
  const categoriesUrl = 'https://openapi.programming-hero.com/api/categories';
  const categoriesJSON = await fetch(categoriesUrl);
  const categoriesObject = await categoriesJSON.json();
  const categoriesArray = categoriesObject.categories;

  categoriesArray.forEach((element) => {
    showCategories(element);
  });
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
  const allPlantsURL = 'https://openapi.programming-hero.com/api/plants';
  const allPlantsJSON = await fetch(allPlantsURL);
  const allPlantsObject = await allPlantsJSON.json();
  const allPlantsArray = allPlantsObject.plants;
  allPlantsArray.forEach((plant) => {
    // console.log('DEBUG: showAllPlants called');
    showAllPlants(plant);
  });
};

// Showing all trees at first
const showAllPlants = (plantElement) => {
  const cardsList = document.getElementById('cards-list');
  // console.log('DEBUG: showAllPlants initiated');
  cardsList.innerHTML += `
  <div id="plant-card-${plantElement.id}" class="bg-base-100 p-4 space-y-3 rounded-2xl">
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
                class="btn bg-[#15803D] w-full text-white text-base font-light rounded-3xl py-5"
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

const tabActive = (tabID) => {
  const allTabs = document.querySelectorAll('a.is-tab');
  allTabs.forEach((tab) => {
    tab.classList.remove('selected');
  });
  allTabs[tabID].classList.add('selected');
};

// Plant info fetch and Modal modification
const plantModalLoad = async (plantID) => {
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
};

loadCategories();
loadPlants();

// Event Listener for all childs of Category List
document.getElementById('categories-list').addEventListener('click', (e) => {
  const tabID = Number(e.target.getAttribute('tabid'));
  tabActive(tabID);
  showCategoryPlants(tabID);
});
