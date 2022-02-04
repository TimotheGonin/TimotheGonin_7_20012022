/**
 * @param{string} recipe data
 */
class RecipeCard{
  constructor(data){
    this._data = data;
  }

  /**
  *@return{HTMLElement}  
  */

  createRecipeCard(){
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('col-4');

    recipeCard.innerHTML = `
      <p>${this._data.name}</p>
      <p>${this._data.time}</p>
      <p>${this._data.description}</p>
    `;

    return recipeCard
  }
}