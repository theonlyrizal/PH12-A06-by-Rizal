// Fetching categories JSON
const loadCategories = async () => {
  const categoriesUrl = 'https://openapi.programming-hero.com/api/categories';
  const categoriesJSON = await fetch(categoriesUrl);
  const categoriesObject = await categoriesJSON.json();
  const categoriesArray = categoriesObject.categories;
  console.log(categoriesArray);
  categoriesArray.forEach((element) => {
    showCategories(element);
  });
};

// Showing the fetches categories
const showCategories = (catagoryElement) => {
  const categoriesList = document.getElementById('categories-list');
  categoriesList.innerHTML += `
    <a id="catagory-tab-${catagoryElement.id}"
              class="flex justify-center text-xs md:text-base border-1 md:justify-start w-full btn shadow-none md:border-0 bg-transparent font-normal text-center rounded-xl hover:bg-[#15803D25]"
              >${catagoryElement.category_name}</a
            >
    `;
};




// Fetching All Tree info
const loadCards = async () =>{
  
}

loadCategories();
