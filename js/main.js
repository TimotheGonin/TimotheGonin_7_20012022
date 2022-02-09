import recipes from "../data/recipes.js";



export function getIngredients(data){
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

export function getAppliances(data){
  const allAppliances = new Array;

  data.forEach( recipe => {
    const applianceName = recipe.appliance;
    allAppliances.push(applianceName.toLowerCase());
  })

  const applicancesNoDuplicates = new Set(allAppliances);
  return applicancesNoDuplicates;
}

export function getUstensils(data){
  const allUstensils = new Array;

  data.forEach(recipe => {
    for(const ustensil of recipe.ustensils){
      allUstensils.push(ustensil.toLowerCase());
    }
  })

  const ustensilsNoDuplicates = new Set(allUstensils);
  return ustensilsNoDuplicates;
}

console.log(getIngredients(recipes));
console.log(getAppliances(recipes));
console.log(getUstensils(recipes));
