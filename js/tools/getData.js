// import recipes from "../../data/recipes.js";
import { notFoundedMessage } from "../template/Error-message.js";
/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ TO INIT                                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */

/**
 * 
 * @param {*} data form recipes.js
 * @returns items list
 */

//INGREDIENTS
export function initIngredientsList(data){
  const allIngredients = new Array;

  for(let i = 0; i < data.length; i++){
    const ingredientsList = data[i].ingredients;
    ingredientsList.forEach(ingredient => {
      const ingredientName = ingredient.ingredient;
      allIngredients.push(ingredientName.toLowerCase());
    });
  }

  const allIngredientsNoDuplicates = new Set(allIngredients);
  return allIngredientsNoDuplicates;
}

//APPLIANCES
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
export function initUtensilsList(data){
  const allUstensils = new Array;

  data.forEach(recipe => {
    for(const ustensil of recipe.ustensils){
      allUstensils.push(ustensil.toLowerCase());
    }
  })

  const ustensilsNoDuplicates = new Set(allUstensils);
  return ustensilsNoDuplicates;
}

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
 * @param {DOM element} container 
 * @param {*} data form recipes.js
 */
// export function displayRecipeCard(container,data){
//   const Template = new RecipeCard(data);
// 	container.appendChild(Template.createRecipeCard());
// }
export function displayRecipeCard(container,data){
  for(const recipe of data){
    const Template = new RecipeCard(recipe);
    container.appendChild(Template.createRecipeCard());
  }
}


// INGREDIENTS--INPUT
export const ingredientsWithInput = (recipes, entry) => {
  let results = new Array;
  for (const recipe of recipes) {
    for(const ingredients of recipe.ingredients){
      for (const key in ingredients) {
        if(key === 'ingredient' && ingredients[key].toLowerCase().includes(entry)){
          notFoundedMessage.classList.add('hidden');
          results.push(recipe);
        }
      }
    }
  }
  return results;
}

/**
 * This function searches through the recipes array and returns an array of recipes that contain the
 * tag name
 * @param recipes - the array of recipes to search through
 * @param tagName - the name of the tag to search for
 * @param tagType - the type of tag you're searching for.
 * @param arrayDestination - the array that will be returned by the function
 * @returns An array of recipes that have the tag.
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
 * Given an array of recipes and a tag name, return an array of recipes that have the given tag
 * @param recipes - the array of recipes that we're going to search through
 * @param tagName - the tag name that we're looking for
 * @param tempArray - array that will be filled with the recipes that match the tag
 */
export const appliancesWithTag = (recipes, tagName) => {
  let results = new Array;
  for (const recipe of recipes) {
    if(recipe.appliance.toLocaleLowerCase() === tagName){
      console.log(`MATCH - appliance ${recipe.appliance.toLocaleLowerCase()} - ${tagName}`);
      results.push(recipe);
    }
  }
  return results;
}

// INGREDIENTS--TAG
/**
 * Given an array of recipes and a tag name, return an array of recipes that have that tag
 * @param recipes - the array of recipes that we're going to search through
 * @param tagName - the name of the tag to search for
 * @param tempArray - array that will be filled with recipes that contain the ingredient.
 */
export const ingredientsWithTag = (recipes, tagName) => {
  let results = new Array;
  for (const recipe of recipes) {
    for(const ingredients of recipe.ingredients){
      for (const key in ingredients) {
        if(key === 'ingredient' && ingredients[key].toLowerCase() === tagName){
          results.push(recipe);
        }
      }
    }
  }
  return results;
}

//UTENSILS--TAG
/**
 * Given a list of recipes, a tag name, and an empty array, 
 * this function will add any recipe that has a matching ustensil to the array
 * @param recipes - the array of recipes that we're going to search through
 * @param tagName - the name of the tag to search for
 * @param tempArray - array that will be filled with the recipes that have the tag
 */
export const utensilsWithTag = (recipes, tagName) => {
  let results = new Array;
  for (const recipe of recipes) {
    for(const ustensil of recipe.ustensils){
      if(ustensil.toLocaleLowerCase() === tagName){
        console.log(`MATCH - appliance ${ustensil.toLocaleLowerCase()} - ${tagName}`);
        results.push(recipe);
      }
    }
  }
  return results;
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CATCH RECIPE INFO                                                       │
  └─────────────────────────────────────────────────────────────────────────┘
 */

/**
 * 
 * @param {data} recipe 
 * @param {data's property} appliances 
 * @param {data's property} ingredients 
 * @param {data's property} utensils 
 */
export const catchRecipeInfo = (recipe, appliances, ingredients, utensils) => {
  //ingredients
  for(const ingredient of recipe.ingredients){
    ingredients.push(ingredient.ingredient.toLocaleLowerCase());
  }

  //appliances
  appliances.push(recipe.appliance.toLocaleLowerCase());

  //utensils
  for(const utensil of recipe.ustensils){
    utensils.push(utensil.toLocaleLowerCase());
  }
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