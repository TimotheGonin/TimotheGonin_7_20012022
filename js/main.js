import recipes from "../data/recipes.js";



function getIngredients(data){
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

function getAppliances(data){
  const allAppliances = new Array;

  data.forEach( recipe => {
    const applianceName = recipe.appliance;
    allAppliances.push(applianceName.toLowerCase());
  })

  const applicancesNoDuplicates = new Set(allAppliances);
  return applicancesNoDuplicates;
}

console.log(getIngredients(recipes));
console.log(getAppliances(recipes));
