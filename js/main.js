import recipes from "../data/recipes.js";
import { notFoundedMessage } from "./template/Error-message.js";
import { restoreFilterList, updateFilterList} from "../js/template/FilterButton.js";
import { tagsCollection } from "../js/template/Tag.js";
import { catchRecipeInfo ,displayRecipeCard, ingredientsWithInput, appliancesWithTag, ingredientsWithTag, utensilsWithTag, withoutDuplicates } from "./tools/getData.js";

/**
 *Switcher to serch type 
 * @param {event} e , used by input search
 */
export function entryTypeSwitch(e){
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

// INPUT SEARCH
function searchWithInput(e) {
	//empty the cards Container
	cardsContainer.innerHTML = ``;	
	const entry = e.target.value.toLowerCase();
	const unsortedRecipesList = new Array;

	//empty infos array
	recipesAppliances.length = 0;
	recipesIngredients.length = 0;
	recipesUtensils.length = 0;

	// ENTRY VALID test
	if (!lengthChecker(entry)) {
		restoreFilterList();
	} else {

			//LOOP TO RECIPES
			for(const recipe of recipes){
				const nameMatch = recipe.name.toLowerCase().includes(entry);
				const descriptionMatch = recipe.description.toLowerCase().includes(entry);
				
				//NAME OR DESCRIPTION MATCH test
				if(nameMatch||descriptionMatch){
					//Store recipe infos
					catchRecipeInfo(
						recipe,
						recipesAppliances,
						recipesIngredients,
						recipesUtensils
						);
					
					unsortedRecipesList.push(recipe);

					//update filter list
					updateFilterList(
						withoutDuplicates(recipesAppliances),
						withoutDuplicates(recipesIngredients),
						withoutDuplicates(recipesUtensils)
						);
				}
				console.log('ingredient')
				//INGREDIENTs MATCH test
				ingredientsWithInput(recipe,entry,unsortedRecipesList);
			}

			//display card
			displayRecipeCard(cardsContainer,withoutDuplicates(unsortedRecipesList));

			//ERROR MESSAGE
			if(cardsContainer.childNodes.length === 0){
				//DIPSLAY NOT FOUND MESSAGE
				notFoundedMessage.classList.remove('hidden');
			} else {
				notFoundedMessage.classList.add('hidden');
			}
	}
}

//TAG SEARCH
export function searchWithTag(){
	//empty the cards Container
	cardsContainer.innerHTML = ``;
	const unsortedRecipesList = new Array;

	for (const tag of tagsCollection) {
		const tagName = tag.name;
		const tagType = tag.type;

		switch (tagType) {
			//INGREDIENTS SEARCH
			case 'ingredients':
				console.log(`${tagName} is type ${tagType}`);
				ingredientsWithTag(recipes,tagName,unsortedRecipesList);
				break;

			// APPLIANCES SEARCH
			case 'appliances':
				console.log(`${tagName} is type ${tagType}`);
				appliancesWithTag(recipes,tagName,cardsContainer);
				break;

			// UTENSILS SEARCH
			case 'utensils':
				console.log(`${tagName} is type ${tagType}`);
				utensilsWithTag(recipes,tagName,cardsContainer);
				break;

			default:
				break;
		}
	}
	console.log(withoutDuplicates(unsortedRecipesList))
	// checkingTagCollection();
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ INSTRUCTION                                                             │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const mainSearchInput = document.querySelector("#mainSearch");
const cardsContainer = document.querySelector("main>div");

//temp
const lengthValidation = "3 caractères OK";
const entryLengthRequired = "Veuillez entrer 3 caratères minimum.";


//All recipes infos
export let recipesIngredients = new Array;
let recipesAppliances = new Array;
let recipesUtensils = new Array;



// EVENTS
mainSearchInput.addEventListener("input", entryTypeSwitch);