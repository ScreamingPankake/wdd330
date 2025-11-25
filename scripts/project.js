const container_area = document.querySelector('.recipes');

const modal = document.getElementById('recipeModal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalIngredients = document.getElementById('modal-ingredients');
const modalInstructions = document.getElementById('modal-instructions');
const modalClose = document.querySelector('.close');


fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`)
    .then(res => res.json())

    .then(data => {

      data.meals.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card'); 
        const title = document.createElement('h2');
        title.textContent = recipe.strMeal; 
        const image = document.createElement('img');
        image.src = recipe.strMealThumb;
        

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


modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});