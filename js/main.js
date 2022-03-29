import recipes from "../data/recipes.js";
import { notFoundedMessage } from "./template/Error-message.js";
import { restoreFilterList, updateFilterList} from "../js/template/FilterButton.js";
import { tagsCollection , tagButtonsContainer} from "../js/template/Tag.js";
import { catchRecipeInfo ,displayRecipeCard, ingredientsWithInput, searchByTagSwitcher, withoutDuplicates } from "./tools/getData.js";
import { lengthChecker } from "./tools/toolbox.js";



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


// INPUT SEARCH
const searchWithInput = (data) => {
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
			searchResultsByInput = withoutDuplicates(ingredientsWithInput(data,entry));

			//Recipes Loop -- name/desciption MATCH
			for(const recipe of data){
				const nameMatch = recipe.name.toLowerCase().includes(entry);
				const descriptionMatch = recipe.description.toLowerCase().includes(entry);
				if(nameMatch||descriptionMatch){
					searchResultsByInput.push(recipe);
				}
			}
			searchResultsByInput = withoutDuplicates(searchResultsByInput);

			for(const recipe of searchResultsByInput){
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
			}
	}
}


//TAG SEARCH
const searchWithTag = (data) => {
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
			console.log('CASE_TWO-AND-MORE');

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
			console.log('USER INPUT_empty - TAGS_empty');
			cardsContainer.innerHTML = ``;
			restoreFilterList();
			errorMessageAdministrator();
			break;
		case (input > 0 && tags === 0):
			console.log('USER INPUT_not empty - TAGS_empty');
			searchWithInput(recipes);
			displayRecipeCard(cardsContainer,searchResultsByInput);
			errorMessageAdministrator();
			break;
		case (input === 0 && tags > 0):
			console.log('USER INPUT_empty - TAGS_not empty');
			searchWithTag(recipes);
			displayRecipeCard(cardsContainer,searchResultsByTag);
			errorMessageAdministrator();
			break;
		case (input > 0 && tags > 0):
			console.log('USER INPUT_not empty - TAGS_not empty');
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