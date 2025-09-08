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
    <a id="catagory-tab-${catagoryElement.id}"
              class="flex justify-center text-xs md:text-base border-1 md:justify-start md:w-full btn shadow-none md:border-0 bg-transparent font-normal text-center rounded-xl hover:bg-[#15803D25]"
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
  allPlantsArray.forEach((element) => {
    console.log('DEBUG: showAllPlants called');
    showAllPlants(element);
  });
};

const showAllPlants = (plantElement) => {
  const cardsList = document.getElementById('cards-list');
  console.log('DEBUG: showAllPlants initiated');
  cardsList.innerHTML += `
  <div id="plant-card-${plantElement.id}" class="bg-base-100 p-4 space-y-3 rounded-2xl">
            <img class="w-full h-[350px] object-cover rounded-lg" src=${plantElement.image} alt=${plantElement.name} />
            <div class="text-left space-y-3">
              <h2 class="card-title">${plantElement.name}</h2>
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

loadCategories();
loadPlants();
