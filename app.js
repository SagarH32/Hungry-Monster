const searchBtn = document.getElementById('search-btn');
const meal = document.getElementById('meal');
const mealDetails = document.getElementById('meal__details');

const getMeals = () => {
  const searchInput = document.getElementById('search-input').value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.meals === null) {
        meal.innerHTML = `<h1>Meals not found</h1>`;
      } else {
        meal.innerHTML = data.meals
          .map(
            (meal) =>
              `<div class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <div class="card meal-item" meal-id="${meal.idMeal}">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
              ${meal.strMeal}</h3>
              </div>
            </div>
            </div>`
          )
          .join('');
      }
    });
};

const getMealDetails = (mealId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}
    `)
    .then((res) => res.json())
    .then((data) => {
      let mealDetails = document.getElementById('meal__details');
      console.log(data);
      data.meals.filter((item) => {
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
          ingredients.push(`${item[`strIngredient${i}`]}`);
        }

        mealDetails.innerHTML = `
        <div class="card" id="meal-details" style="width: 20rem; margin: 0 auto;">
          <img class="card-img-top img-fluid" src=${
            item.strMealThumb
          } alt="Card image cap">
          <div class="card-body">
          <h2>${item.strMeal}</h2>
          
          <br/>
          <h3 class="text-left">Ingredients</h3>
         <ol>
         ${ingredients.map((list) => `<li>${list}</li>`).join('')}
         </ol>
         
      </div>
      </div>
        `;
      });
    });
};

searchBtn.addEventListener('click', getMeals);
meal.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-item');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealId = mealInfo.getAttribute('meal-id');
    getMealDetails(mealId);
  }
});

//to show all items by default just need to run commented code bellow.

// meal.addEventListener('load', getMeals());
// mealDetails.addEventListener('load', getMealDetails(52977));
