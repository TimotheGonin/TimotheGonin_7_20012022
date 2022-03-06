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