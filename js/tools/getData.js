// import recipes from "../../data/recipes.js";
import { notFoundedMessage } from "../template/Error-message.js";
/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ TO INIT                                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */

//INGREDIENTS
/**
 * Create an array of all the ingredients in the recipes.
 * @param data - the data that we want to use to create the ingredients list
 * @returns An array of all the ingredients in the dataset.
 */
export function initIngredientsList(data){
  const allIngredients = new Array;

  data.forEach(recipe => {
    const ingredientsList = recipe.ingredients;
    ingredientsList.forEach(ingredient => {
      const ingredientName = ingredient.ingredient;
      allIngredients.push(ingredientName.toLowerCase());
    });
  })

  const allIngredientsNoDuplicates = new Set(allIngredients);
  return allIngredientsNoDuplicates;
}

//APPLIANCES
/**
 * Create an array of all the appliance names in the data. 
 * 
 * Create a Set of the appliance names. 
 * 
 * Return the Set.
 * @param data - The data that we want to use to create the list of appliances.
 * @returns An array of unique appliance names.
 */
export function initAppliancesList(data){
  const allAppliances = new Array;

  data.forEach( recipe => {
    const applianceName = recipe.appliance;
    allAppliances.push(applianceName.toLowerCase());
  })

  const applicancesNoDuplicates = new Set(allAppliances);
  return applicancesNoDuplicates;
}

//USTENSILS
/**
 * The function takes in the data from the recipes.json file and loops through each recipe. 
 * For each recipe, it loops through each ustensil in the recipe and adds it to the allUstensils array.
 * @param data - The data that we want to use to create the list.
 */
export function initUtensilsList(data){
  const allUstensils = new Array;

  data.forEach(recipe => {
    const currentRecipeUtensils = recipe.ustensils;
    currentRecipeUtensils.forEach(utensil=>{
      allUstensils.push(utensil.toLowerCase());
    })
  })

  const ustensilsNoDuplicates = new Set(allUstensils);
  return ustensilsNoDuplicates;
}

/**
 * The function takes in a parameter and a data object. It then uses the parameter to determine what
 * type of data to return
 * @param param - the type of data you want to switch between
 * @param data - the data to be converted to a list
 * @returns The data type is being returned.
 */
export function dataSwitcher(param,data){
  let dataType;
  switch (param) {
    case 'appliances':
      dataType = initAppliancesList(data);
      break;
    case 'ingredients':
      dataType = initIngredientsList(data);
      break;
    case 'utensils':
    dataType = initUtensilsList(data);
      break;
  
    default:
      break;
  }
  return dataType;
}


/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ TO MATCH                                                                │
  └─────────────────────────────────────────────────────────────────────────┘
 */

//DIPSLAY CARD

/**
 * This function takes in a container and a list of recipes and creates a recipe card for each recipe
 * in the list
 * @param container - The element that will contain the recipe cards.
 * @param data - The data that will be used to create the recipe cards.
 */
export function displayRecipeCard(container,data){
  data.forEach(recipe=>{
    const Template = new RecipeCard(recipe);
    container.appendChild(Template.createRecipeCard());
  })
}


// INGREDIENTS--INPUT
/**
 * Given a list of recipes and an entry, return a list of recipes that contain the entry
 * @param recipes - an array of recipes
 * @param entry - The user's input.
 * @returns An array of recipes that contain the input.
 */
export const ingredientsWithInput = (recipes, entry) => {
  let results = new Array;
  recipes.forEach(recipe=>{
    const ingredients = recipe.ingredients;
    ingredients.forEach(key=>{
      if(key === 'ingredient' && ingredients[key].toLowerCase().includes(entry)){
        notFoundedMessage.classList.add('hidden');
        results.push(recipe);
      }
    })
  })
  return results;
}


/**
 * Given a list of recipes, a tag name, and a tag type, return a list of recipes that have the tag
 * @param recipes - the array of recipes to search through
 * @param tagName - the name of the tag to search for
 * @param tagType - the type of tag we're searching for.
 * @returns The search type is being returned.
 */
export const searchByTagSwitcher = (recipes, tagName, tagType) => {
	let searchType;
	switch (tagType) {
		//INGREDIENTS SEARCH
		case 'ingredients':
			searchType = ingredientsWithTag(recipes,tagName);
			break;

		// APPLIANCES SEARCH
		case 'appliances':
			searchType = appliancesWithTag(recipes,tagName);
			break;

		// UTENSILS SEARCH
		case 'utensils':
			searchType = utensilsWithTag(recipes,tagName);
			break;

		default:
			break;
	}
	return searchType;
}

// APPLIANCES--TAG
/**
 * Given a list of recipes and a tag name, return a list of recipes that have the given tag
 * @param recipes - the array of recipes to search through
 * @param tagName - The name of the tag to search for.
 * @returns An array of recipes that have the tag "appliance"
 */
export const appliancesWithTag = (recipes, tagName) => {
  let results = new Array;
  recipes.forEach(recipe=>{
    if(recipe.appliance.toLocaleLowerCase() === tagName){
      results.push(recipe);
    }
  })
  return results;
}

// INGREDIENTS--TAG
/**
 * Given a list of recipes and a tag name, return a list of recipes that have that tag
 * @param recipes - an array of recipes
 * @param tagName - the name of the tag to search for
 * @returns An array of recipes that contain the ingredient tag.
 */
export const ingredientsWithTag = (recipes, tagName) => {
  let results = new Array;
  recipes.forEach(recipe=>{
    const ingredientsList = recipe.ingredients;
    ingredientsList.forEach(ingredient=>{
      if(ingredient.ingredient.toLowerCase() === tagName){
        results.push(recipe);
      }
    })
  })
  return results;
}

//UTENSILS--TAG
/**
 * Given a list of recipes and a tag name, return a list of recipes that have the tag
 * @param recipes - an array of recipes
 * @param tagName - the name of the tag to search for
 * @returns An array of recipes that contain the tag name.
 */
export const utensilsWithTag = (recipes, tagName) => {
  let results = new Array;
  recipes.forEach(recipe=>{
    const currentRecipeUtensils = recipe.ustensils;
    currentRecipeUtensils.forEach(utensil=>{
      if(utensil.toLocaleLowerCase() === tagName){
        results.push(recipe);
      }
    })
  })
  return results;
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CATCH RECIPE INFO                                                       │
  └─────────────────────────────────────────────────────────────────────────┘
 */


/**
 * This function takes in a recipe object and returns an array of ingredients, appliances, and utensils
 * @param recipe - the recipe object
 * @param appliances - an array of strings of appliances
 * @param ingredients - an array of ingredients
 * @param utensils - an array of utensils
 */
export const catchRecipeInfo = (recipe, appliances, ingredients, utensils) => {
  //ingredients
  const currentRecipeIngredients = recipe.ingredients;
  currentRecipeIngredients.forEach(ingredient=>{
    ingredients.push(ingredient.ingredient.toLocaleLowerCase());
  })

  //appliances
  appliances.push(recipe.appliance.toLocaleLowerCase());

  //utensils
  const currentRecipeUtensils = recipe.ustensils;
  currentRecipeUtensils.forEach(utensil=>{
    utensils.push(utensil.toLocaleLowerCase());
  })
}

/**
 * 
 * @param {*} array 
 * @returns Array without element duplicates
 */
export const withoutDuplicates = (array) => {
  let tempArray = new Array;
  tempArray = [...array];
  return [...new Set(tempArray)];
}