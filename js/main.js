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

	// ENTRY VALID test
	if (!lengthChecker(entry)) {
		console.log(entryLengthRequired);

	} else {

			//LOOP TO RECIPES
			for(const recipe of recipes){
				const nameMatch = recipe.name.toLowerCase().includes(entry);
				const descriptionMatch = recipe.description.toLowerCase().includes(entry);

				//NAME OR DESCRIPTION MATCH test
				if(nameMatch||descriptionMatch){
					//need to => STOCK INGREDIENTS / APPLIANCES / UTENSILS
					console.log('MATCH NAME/ DESCRIPTION')
					displayRecipeCard(cardsContainer,recipe);

				} else {
					
					// RECIPES INGREDIENTS LOOP
					for(const recipeIngredients of recipe.ingredients){
						
						//INGREDIENTS LIST LOOP
						for (const key in recipeIngredients) {
							//INGREDIENTS MATCH test
							if(key === 'ingredient' && recipeIngredients[key].toLowerCase().includes(entry)){
								displayRecipeCard(cardsContainer,recipe);
							}
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
		const tagName = tag.name;
		const tagType = tag.type;

		switch (tagType) {
			//INGREDIENTS SEARCH
			case 'ingredients':
				console.log(`${tagName} is type ${tagType}`);
				for (let i = 0; i < recipes.length; i++){
					const recipe = recipes[i];
			
						for(const recipeIngredients in recipe.ingredients){
							const thisIngredientsList = recipe.ingredients[recipeIngredients].ingredient.toLowerCase();
			
							//Ingredient MATCH
								if(thisIngredientsList === tagName){
									console.log(`MATCH - ingredient ${thisIngredientsList} - ${tagName}`);
									displayRecipeCard(cardsContainer,recipe);
								}
						}
					}
				break;

			// APPLIANCES SEARCH
			case 'appliances':
				console.log(`${tagName} is type ${tagType}`);
				for (const recipe of recipes) {

					if(recipe.appliance.toLocaleLowerCase() === tagName){
						console.log(`MATCH - appliance ${recipe.appliance.toLocaleLowerCase()} - ${tagName}`);
						displayRecipeCard(cardsContainer,recipe);
					}
				}
				break;

			// UTENSILS SEARCH
			case 'utensils':
				console.log(`${tagName} is type ${tagType}`);
				for (const recipe of recipes) {
					for(const ustensil of recipe.ustensils){
						if(ustensil.toLocaleLowerCase() === tagName){
							console.log(`MATCH - appliance ${ustensil.toLocaleLowerCase()} - ${tagName}`);
							displayRecipeCard(cardsContainer,recipe);
						}
					}
				}
				break;
			default:
				break;
		}


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
