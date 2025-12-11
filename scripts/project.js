const container_area = document.querySelector('.recipes');

const modal = document.getElementById('recipeModal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalIngredients = document.getElementById('modal-ingredients');
const modalInstructions = document.getElementById('modal-instructions');
const modalClose = document.querySelector('.close');


fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(res => res.json())

    .then(data => {

      data.meals.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card'); 
        const title = document.createElement('h2');
        title.textContent = recipe.strMeal; 
        const image = document.createElement('img');
        image.src = recipe.strMealThumb;
        
        console.log(data);

        card.appendChild(title);
        card.appendChild(image);

        container_area.appendChild(card);

        card.addEventListener('click', () => {
            modalTitle.textContent = recipe.strMeal;
            modalImg.src = recipe.strMealThumb;
            modalInstructions.textContent = recipe.strInstructions;   

            modalIngredients.innerHTML = '';  
            for (let i = 1; i <= 20; i++) {
                    const ingredient = recipe[`strIngredient${i}`];
                    const measure = recipe[`strMeasure${i}`];
                if (ingredient) {
                    const li = document.createElement('li');
                    li.textContent = `${ingredient} - ${measure}`;
                    modalIngredients.appendChild(li);
                }
            } 

            modal.style.display = 'flex';
        });
      });
    })
    .catch(err => console.error(err));

function fillModal(recipe) {
    const modal = document.querySelector("#recipeModal");
    document.querySelector("#modal-title").textContent = recipe.strMeal;
    document.querySelector("#modal-img").src = recipe.strMealThumb;

    // Ingredients
    const ingredientsList = document.querySelector("#modal-ingredients");
    ingredientsList.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = `${ingredient} - ${measure}`;
            ingredientsList.appendChild(li);
        }
    }

    document.querySelector("#modal-instructions").textContent =
        recipe.strInstructions;

    modal.style.display = "block";
}

if (modal && modalClose) {
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function openFullRecipe(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            fillModal(meal);
        });
}

const jokeContainer = document.getElementById('joke');

// Function to fetch a joke only if #joke exists
function getJoke() {
    if (!jokeContainer) return; // prevent crash on pages without it

    fetch('https://geek-jokes.sameerkumar.website/api?format=json')
        .then(response => response.json())
        .then(data => {
            jokeContainer.textContent = data.joke; // <-- actually display it
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            jokeContainer.textContent = 'Failed to load a joke.';
        });
}

getJoke();
