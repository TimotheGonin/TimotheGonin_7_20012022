import recipes from "../data/recipes.js";
import { notFoundedMessage } from "./template/Error-message.js";
import { restoreFilterList, updateFilterList} from "../js/template/FilterButton.js";
import { tagsCollection , tagButtonsContainer} from "../js/template/Tag.js";
import { catchRecipeInfo ,displayRecipeCard, ingredientsWithInput, searchByTagSwitcher, withoutDuplicates } from "./tools/getData.js";

/**
 *Switcher to serch type 
 * @param {event} e , used by input search
 */
export function entryTypeSwitch () {
	const input = mainSearchInput.value.length;
	const tags = tagsCollection.length;

	switch (true) {
		case (input === 0 && tags === 0):
			console.log('USER INPUT_empty - TAGS_empty');
			cardsContainer.innerHTML = ``;

			break;
		case (input > 0 && tags === 0):
			console.log('USER INPUT_not empty - TAGS_empty');
			searchWithInput();
			displayRecipeCard(cardsContainer,withoutDuplicates(searchResultsByInput));
			break;
		case (input === 0 && tags > 0):
			console.log('USER INPUT_empty - TAGS_not empty');
			searchWithTag();
			displayRecipeCard(cardsContainer,withoutDuplicates(searchResultsByTag));
			break;
		case (input > 0 && tags > 0):
			console.log('USER INPUT_not empty - TAGS_not empty');
			console.log('GLOBAL SEARCH');
			globalSearch();
			displayRecipeCard(cardsContainer,withoutDuplicates(searchResultsByAllEntries));
			break;
	
		default:
			break;
	}
}
const globalSearch = () => {
	cardsContainer.innerHTML = ``;
	searchResultsByAllEntries.length = 0;
	const input = mainSearchInput.value.toLowerCase();
	const enablesTags = [...tagsCollection];
	let tempArray = new Array;
	searchWithInput();
	searchWithTag();
	// INPUT CHECK
	for(const result of searchResultsByTag){
		const nameMatch = result.name.toLowerCase().includes(input.toLowerCase());
		const descriptionMatch = result.description.toLowerCase().includes(input.toLowerCase());
		if(nameMatch||descriptionMatch){
			console.log(result.name);
			console.log(result.description);
			tempArray.push(result);
		}
	}
	tempArray.push(...searchResultsByInput);
	tempArray = withoutDuplicates(tempArray);
	//TAG CHECK
	for (const tag of enablesTags) {
		const tagName = tag.name;
		const tagType = tag.type;
		searchByTagSwitcher(tempArray, tagName, tagType, searchResultsByAllEntries);
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
function searchWithInput() {
	// empty the cards Container
	cardsContainer.innerHTML = ``;
	// empty results array
	searchResultsByInput.length = 0;
	//empty infos array
	recipesAppliances.length = 0;
	recipesIngredients.length = 0;
	recipesUtensils.length = 0;

	const entry = mainSearchInput.value.toLowerCase();

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
					
						searchResultsByInput.push(recipe);

					//update filter list
					updateFilterList(
						withoutDuplicates(recipesAppliances),
						withoutDuplicates(recipesIngredients),
						withoutDuplicates(recipesUtensils)
						);
				}
				console.log('ingredient')
				//INGREDIENTs MATCH test
				ingredientsWithInput(recipe,entry,searchResultsByInput);
			}

			//display cards
			// displayRecipeCard(cardsContainer,withoutDuplicates(searchResultsByInput));

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
function searchWithTag(){
	//empty the cards Container
	cardsContainer.innerHTML = ``;
	

	switch (true) {
		// CASE_EMPTY
		case (tagButtonsContainer.childNodes.length === 0):
			console.log('CASE_EMPTY');
			searchResultsByTag.length = 0;
			restoreFilterList();
			break;

		//CASE_ONLY-ONE
		case (tagButtonsContainer.childNodes.length === 1):
			console.log('CASE_ONLY-ONE');
			searchResultsByTag.length = 0;
			for (const tag of tagsCollection) {
				const tagName = tag.name;
				const tagType = tag.type;
				searchByTagSwitcher(recipes, tagName, tagType, searchResultsByTag);
			}
			// console.log(withoutDuplicates(searchResultsByTag));
	
			//empty infos array
			recipesAppliances.length = 0;
			recipesIngredients.length = 0;
			recipesUtensils.length = 0;
		
			for(const recipe of withoutDuplicates(searchResultsByTag)){
				
				catchRecipeInfo(
					recipe,
					recipesAppliances,
					recipesIngredients,
					recipesUtensils
					);
			}
			//update filter list
			updateFilterList(
				withoutDuplicates(recipesAppliances),
				withoutDuplicates(recipesIngredients),
				withoutDuplicates(recipesUtensils)
				);
			//display cards
			// displayRecipeCard(cardsContainer,withoutDuplicates(searchResultsByTag));

			break;
		
		// CASE_TWO-AND-MORE
		case (tagButtonsContainer.childNodes.length >= 2):
			console.log('CASE_TWO-AND-MORE');

			const tagName = tagsCollection[tagsCollection.length - 1].name;
			const tagType = tagsCollection[tagsCollection.length - 1].type;
			let tempRecipes = new Array;
			searchByTagSwitcher(searchResultsByTag, tagName, tagType, tempRecipes);

			searchResultsByTag = [...tempRecipes];

			recipesAppliances.length = 0;
			recipesIngredients.length = 0;
			recipesUtensils.length = 0;

			for(const recipe of searchResultsByTag){
				
				catchRecipeInfo(
					recipe,
					recipesAppliances,
					recipesIngredients,
					recipesUtensils
					);
			}
		
			//update filter list
			updateFilterList(
				withoutDuplicates(recipesAppliances),
				withoutDuplicates(recipesIngredients),
				withoutDuplicates(recipesUtensils)
				);

			//display cards
			/* The above code is displaying the search results in the cardsContainer. */
			// displayRecipeCard(cardsContainer,withoutDuplicates(searchResultsByTag));
			
			// console.log(withoutDuplicates(searchResultsByTag));
			break;
	
		default:
			break;
	}
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

//search results
let searchResultsByAllEntries = new Array;
let searchResultsByInput = new Array;
let searchResultsByTag = new Array;

//All recipes infos
let recipesIngredients = new Array;
let recipesAppliances = new Array;
let recipesUtensils = new Array;



// EVENTS
mainSearchInput.addEventListener("input", entryTypeSwitch);