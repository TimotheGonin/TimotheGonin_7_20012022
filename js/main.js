import recipes from "../data/recipes.js";

const mainSearchInput = document.querySelector('#mainSearch');
const cardsContainer = document.querySelector('main>div');

const entryLengthRequired = 'Veuillez entrer 3 caratères minimum.';
const lengthValidation = '3 caractères OK';
const notFoundedMessage = 'Aucune recette ne correspond à votre critère... vous pouvez chercher "tartes au pommes", "poisson", etc.';
mainSearchInput.addEventListener('input', cardsFilter);

function cardsFilter(e){
  //empty the cards Container
  cardsContainer.innerHTML = ``;

  const entry = e.target.value.toLowerCase();

  //STATUS
  let entryValid = false;
  entryValid = (entry.length < 3) ? entryValid = false : entryValid = true;

  //ENTRY VALID
  if(!entryValid){
    console.log(entryLengthRequired);
  } else {
    console.log(lengthValidation);

    //LOOP TO RECIPES
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      
      //CREAT CARD
      if(recipe.name.toLowerCase().includes(entry)){
        console.log('MATCH');
        const Template = new RecipeCard(recipe)
        cardsContainer.appendChild(
            Template.createRecipeCard()
        );
      } else {
        console.log(notFoundedMessage);
      }
    }
  }
}