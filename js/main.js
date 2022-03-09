import recipes from "../data/recipes.js";
import {checkingTagCollection, filterButtonContainer, tags, tagsCollection} from "../js/template/FilterButton.js";


/**
 *Switcher to serch type 
 * @param {event} e , used by input search
 */
function entryTypeSwitch(e){
	const inputLength = mainSearchInput.value;
	const tagsLength = tagsCollection.length;

	if(inputLength === '' && tagsLength === 0){
		console.log('USER INPUT_empty - TAGS_empty');

	} else if(inputLength !== '' && tagsLength === 0){
		console.log('USER INPUT_not empty - TAGS_empty');
		searchWithInput(e);

	} else if(inputLength === '' && tagsLength > 0){
		console.log('USER INPUT_empty - TAGS_not empty');
		searchWithTag();
	}
}

/**
 * 
 * @param {string} userInput 
 * @returns true / false
 */
function lengthChecker(string){
  string = string.length < 3 ? false :  true;
  return string;
}

/**
 * 
 * @param {DOM element} container 
 * @param {*} data form recipes.js
 */
function displayRecipeCard(container,data){
  const Template = new RecipeCard(data);
	container.appendChild(Template.createRecipeCard());
}

// INPUT SEARCH
function searchWithInput(e) {
	//empty the cards Container
	cardsContainer.innerHTML = ``;
	
	const entry = e.target.value.toLowerCase();

	// ENTRY VALID
	if (!lengthChecker(entry)) {
		console.log(entryLengthRequired);

	} else {
		console.log(lengthValidation);

			//LOOP TO RECIPES
			for (let i = 0; i < recipes.length; i++) {
				const recipe = recipes[i];
				const nameMatch = recipe.name.toLowerCase().includes(entry);
				const descriptionMatch = recipe.description.toLowerCase().includes(entry);

				//Name OR Description MATCH
				if (nameMatch || descriptionMatch) {
          displayRecipeCard(cardsContainer,recipe);

				} else {
					for(const recipeIngredients in recipe.ingredients){

						const thisIngredientsList = recipe.ingredients[recipeIngredients];

						for(const ingredient in thisIngredientsList){
							let result = thisIngredientsList[ingredient].toString().toLowerCase();

							//Ingredient MATCH
							if(result.includes(entry)){
								console.log('MATCH - ingredient');
                displayRecipeCard(cardsContainer,recipe);
                
							} else {console.log(notFoundedMessage);}
						}
					}
				}
			}
	}
}

//TAG SEARCH
export function searchWithTag(){
	//empty the cards Container
	cardsContainer.innerHTML = ``;

	for (const tag of tagsCollection) {

		for (let i = 0; i < recipes.length; i++){
		const recipe = recipes[i];

			for(const recipeIngredients in recipe.ingredients){
				const thisIngredientsList = recipe.ingredients[recipeIngredients].ingredient.toLowerCase();

				//Ingredient MATCH
					if(thisIngredientsList === tag){
						console.log(`MATCH - ingredient ${thisIngredientsList} - ${tag}`);
						displayRecipeCard(cardsContainer,recipe);
					}
			}
		}
	}
	// checkingTagCollection();
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ INSTRUCTION                                                             │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const mainSearchInput = document.querySelector("#mainSearch");
const cardsContainer = document.querySelector("main>div");

const entryLengthRequired = "Veuillez entrer 3 caratères minimum.";
const lengthValidation = "3 caractères OK";
const notFoundedMessage =
	'Aucune recette ne correspond à votre critère... vous pouvez chercher "tartes au pommes", "poisson", etc.';


// EVENTS
mainSearchInput.addEventListener("input", entryTypeSwitch);
tags.forEach(tag => {
	tag.addEventListener('click', entryTypeSwitch);
});
