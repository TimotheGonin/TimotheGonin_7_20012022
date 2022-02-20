// import recipes from "../data/recipes.js";
export class RecipeCards {
  constructor(recipe){
      this.mainContent = document.querySelector('main>div');
      this.data = recipe;
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

// const recipeCardsDeck = new RecipeCards()
// recipeCardsDeck.launchRecipeCards()