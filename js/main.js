import recipes from "../data/recipes.js";



function getIngredients(data){
  let ingredientsList = []

  for (let i = 0; i < data.length; i++) {
    for (let i2 = 0; i2 < data.length; i2++) {
      ingredientsList.push(data[i2].ingredients[1].ingredient);
    }
  }

  let ingredientListClean = [... new Set(ingredientsList)];
  return ingredientListClean;
}

console.log(getIngredients(recipes));
