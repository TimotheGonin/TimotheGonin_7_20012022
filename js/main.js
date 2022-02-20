import recipes from "../data/recipes.js";

const mainSearchInput = document.querySelector('#mainSearch');
const cardsContainer = document.querySelector('main>div');

const errorMessage1 = 'Veuillez entrer 3 caratères minimum.';
const lengthValidation = '3 caractères OK';
const errorMessage2 = 'Aucune recette ne correspond à votre critère... vous pouvez chercher "tartes au pommes", "poisson", etc.';
mainSearchInput.addEventListener('input', cardsFilter);

function cardsFilter(e){
  cardsContainer.innerHTML = ``;
  const entry = e.target.value.toLowerCase();
  let entryValid = false;

  entryValid = (entry.length < 3) ? entryValid = false : entryValid = true;

  if(!entryValid){
    console.log(errorMessage1);
  } else {
    console.log(lengthValidation);

    recipes.forEach(recipe => {
      if(recipe.name.toLowerCase() === entry){
        console.log(`${recipe.name.toLocaleLowerCase()} est égale à ${entry}`);
      } else {
        console.log('aucune correspondance')
      }
      
    })
  }
}