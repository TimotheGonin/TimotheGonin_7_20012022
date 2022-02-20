import recipes from "../data/recipes.js";

const mainSearchInput = document.querySelector('#mainSearch');
const cardsContainer = document.querySelector('main>div');

const entryLengthRequired = 'Veuillez entrer 3 caratères minimum.';
const lengthValidation = '3 caractères OK';
const notFoundedMessage = 'Aucune recette ne correspond à votre critère... vous pouvez chercher "tartes au pommes", "poisson", etc.';
mainSearchInput.addEventListener('input', cardsFilter);

function cardsFilter(e){
  const entry = e.target.value.toLowerCase();
  let entryValid = false;

  entryValid = (entry.length < 3) ? entryValid = false : entryValid = true;

  if(!entryValid){
    console.log(entryLengthRequired);
  } else {
    console.log(lengthValidation);

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      
      if(recipe.name.toLowerCase().includes(entry)){
        console.log(`${recipe.name.toLocaleLowerCase()} est égale à ${entry}`);
      } else {
        console.log(notFoundedMessage);
      }
    }
  }
}