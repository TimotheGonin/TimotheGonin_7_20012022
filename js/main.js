import recipes from "../data/recipes.js";
import { notFoundedMessage } from "./template/Error-message.js";
import { restoreFilterList, updateFilterList} from "../js/template/FilterButton.js";
import { tagsCollection , tagButtonsContainer} from "../js/template/Tag.js";
import { catchRecipeInfo ,displayRecipeCard, ingredientsWithInput, searchByTagSwitcher, withoutDuplicates } from "./tools/getData.js";
import { lengthChecker } from "./tools/toolbox.js";



/**
 * This function is used to search through the recipes array and searchResultsByTag array. 
 * It does this by first searching through the recipes array with the input from the search bar. 
 * Then it searches through the searchResultsByTag array with the input from the search bar. 
 * After that, it searches through the searchResultsByTag array with the input from the search bar. 
 * Then it searches through the searchResultsByInput array with the input from the search bar. 
 * After that, it searches through the searchResultsByInput array with the input from the search bar. 
 * After that, it combines the searchResultsByTag and searchResultsByInput arrays and removes any
 * duplicates. 
 * Then it adds the combined array to the cardsContainer
 */
const globalSearch = () => {
	cardsContainer.innerHTML = ``;
	searchResultsByAllEntries.length = 0;
	
	//First Search
	searchWithInput(recipes);
	searchWithTag(recipes);
	//Second Search
	searchWithInput(searchResultsByTag);
	searchWithTag(searchResultsByInput);

	searchResultsByAllEntries = [...searchResultsByTag,...searchResultsByInput];
	searchResultsByAllEntries = withoutDuplicates(searchResultsByAllEntries);
}


/**
 * The function takes in a list of recipes and a search term, and returns a list of recipes that match
 * the search term
 * @param data - the data object that contains all the recipes
 */
// INPUT SEARCH
const searchWithInput = (data) => {

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
		cardsContainer.innerHTML = ``;
		searchResultsByInput = withoutDuplicates(ingredientsWithInput(data,entry));

		//Recipes Loop -- name/desciption MATCH
		data.forEach(recipe => {
			const nameMatch = recipe.name.toLowerCase().includes(entry);
			const descriptionMatch = recipe.description.toLowerCase().includes(entry);
			if(nameMatch||descriptionMatch){
				searchResultsByInput.push(recipe);
			}
		});

		searchResultsByInput = withoutDuplicates(searchResultsByInput);

		searchResultsByInput.forEach(recipe=>{
			//Store recipe infos
			catchRecipeInfo(
				recipe,
				recipesAppliances,
				recipesIngredients,
				recipesUtensils
			);
			//update filter list
			updateFilterList(
				recipesAppliances,
				recipesIngredients,
				recipesUtensils
			);
		});
	}
}


/**
 * The function searches for recipes that match the tag that the user has selected
 * @param data - the search results
 */
//TAG SEARCH
const searchWithTag = (data) => {
	//empty the cards Container
	cardsContainer.innerHTML = ``;
	
	switch (true) {
		// CASE_EMPTY
		case (tagButtonsContainer.childNodes.length === 0):
			searchResultsByTag.length = 0;
			restoreFilterList();
			break;

		//CASE_ONLY-ONE
		case (tagButtonsContainer.childNodes.length === 1):
			searchResultsByTag.length = 0;

			for (const tag of tagsCollection) {
				const tagName = tag.name;
				const tagType = tag.type;

				searchResultsByTag = (searchByTagSwitcher(data, tagName, tagType));
			}
			searchResultsByTag = withoutDuplicates(searchResultsByTag);
	
			//empty infos array
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
				recipesAppliances,
				recipesIngredients,
				recipesUtensils
			);
			break;
		
		// CASE_TWO-AND-MORE
		case (tagButtonsContainer.childNodes.length >= 2):

			const tagName = tagsCollection[tagsCollection.length - 1].name;
			const tagType = tagsCollection[tagsCollection.length - 1].type;

			searchResultsByTag = (searchByTagSwitcher(searchResultsByTag, tagName, tagType));

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
				recipesAppliances,
				recipesIngredients,
				recipesUtensils
			);
			break;
	
		default:
			break;
	}
}

/**
 *Switcher to serch type 
 * @param {event} e , used by input search
 */
export function entryTypeSwitch () {
	const input = mainSearchInput.value.length;
	const tags = tagsCollection.length;

	switch (true) {
		case (input === 0 && tags === 0):
			// USER INPUT_empty - TAGS_empty
			appInit();
			restoreFilterList();
			break;
		case (input > 0 && tags === 0):
			// USER INPUT_not empty - TAGS_empty
			searchWithInput(recipes);
			displayRecipeCard(cardsContainer,searchResultsByInput);
			errorMessageAdministrator();
			break;
		case (input === 0 && tags > 0):
			// USER INPUT_empty - TAGS_not empty
			searchWithTag(recipes);
			displayRecipeCard(cardsContainer,searchResultsByTag);
			errorMessageAdministrator();
			break;
		case (input > 0 && tags > 0):
			// USER INPUT_not empty - TAGS_not empty
			globalSearch();
			displayRecipeCard(cardsContainer,searchResultsByAllEntries);
			errorMessageAdministrator();
			break;
	
		default:
			break;
	}
}


/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ INSTRUCTIONS                                                            │
  └─────────────────────────────────────────────────────────────────────────┘
 */

//search results
let searchResultsByAllEntries = new Array;
let searchResultsByInput = new Array;
let searchResultsByTag = new Array;

//All recipes infos
let recipesIngredients = new Array;
let recipesAppliances = new Array;
let recipesUtensils = new Array;

//DOM ELEMENTS
const mainSearchInput = document.querySelector("#mainSearch");
const cardsContainer = document.querySelector("main>div");

/**
 * It creates a card for each recipe in the recipes array and adds it to the cardsContainer.
 */
const appInit = () => {
	cardsContainer.innerHTML = ``;
	displayRecipeCard(cardsContainer,recipes);
	notFoundedMessage.classList.add('hidden');
}
appInit();

/**
 * If the cards container has no child nodes, then display the not found message
 */
const errorMessageAdministrator = () =>{
	//ERROR MESSAGE
	if(cardsContainer.childNodes.length === 0){
		//DIPSLAY NOT FOUND MESSAGE
		notFoundedMessage.classList.remove('hidden');
	} else {
		notFoundedMessage.classList.add('hidden');
	}
};

// EVENTS
mainSearchInput.addEventListener("input", entryTypeSwitch);
//Disable ENTER button
mainSearchInput.addEventListener('keydown', (e) => {
	if(e.keyCode === 13){
		e.preventDefault();
	}
})
