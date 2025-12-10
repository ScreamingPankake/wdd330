const typeBox = document.querySelector('#type-box');
const categoryBox = document.querySelector('#category-box');

// Fetch Areas
fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then(res => res.json())
    .then(data => {
        typeBox.innerHTML = "<h2>Meal Types (Areas)</h2>";

        data.meals.forEach(area => {
            const btn = document.createElement("button");
            btn.textContent = area.strArea;
            btn.classList.add("filter-btn");
            btn.dataset.area = area.strArea;

            // Make it clickable
            btn.addEventListener("click", () => {
                fetchMealsByArea(area.strArea);
            });

            typeBox.appendChild(btn);
        });
    });

// Fetch Categories
fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then(res => res.json())
    .then(data => {
        categoryBox.innerHTML = "<h2>Categories</h2>";

        data.meals.forEach(cat => {
            const btn = document.createElement("button");
            btn.textContent = cat.strCategory;
            btn.classList.add("filter-btn");
            btn.dataset.category = cat.strCategory;

            btn.addEventListener("click", () => {
                fetchMealsByCategory(cat.strCategory);
            });

            categoryBox.appendChild(btn);
        });
    });


// Fetch meals by selected AREA
function fetchMealsByArea(area) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then(res => res.json())
        .then(data => showRecipeList(data.meals));
}

// Fetch meals by selected CATEGORY
function fetchMealsByCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => showRecipeList(data.meals));
}


// Send recipes to the SAME modal + card system recipe-list page uses
function showRecipeList(meals) {
    const recipeBox = document.querySelector('.recipes') 
        || createRecipeContainer();

    recipeBox.innerHTML = "";

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
        `;

        // Click event loads full recipe + opens modal
        card.addEventListener("click", () => openFullRecipe(meal.idMeal));

        recipeBox.appendChild(card);
    });
}


// Create .recipes container
function createRecipeContainer() {
    const main = document.querySelector("main");
    const box = document.createElement("div");
    box.classList.add("recipes");
    main.appendChild(box);
    return box;
}