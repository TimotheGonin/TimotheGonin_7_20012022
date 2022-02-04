import recipes from "../data/recipes.js";
class RecipeCards {
  constructor(){
      this.mainContent = document.querySelector('main');
      this.data = recipes;
  }

  launchRecipeCards(){

    this.data.map(recipe => new Recipe(recipe))
    .forEach(recipe => {
        const Template = new RecipeCard(recipe)
        this.mainContent.appendChild(
            Template.createRecipeCard()
        )
    });
    
  }
}

const recipeCardsDeck = new RecipeCards()
recipeCardsDeck.launchRecipeCards()