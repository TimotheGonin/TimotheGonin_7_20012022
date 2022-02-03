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

// function getAppliances(data){
//   let applicancesList = []

//   for (let i = 0; i < data.length; i++) {
//     for (let i2 = 0; i2 < data.length; i2++) {
//       applicancesList.push(data[i2].appliance);
//     }
//   }

//   let applicancesListClean = [... new Set(applicancesList)];
//   return applicancesListClean;
// }

console.log(getIngredients(recipes));
// console.log(getAppliances(recipes));
