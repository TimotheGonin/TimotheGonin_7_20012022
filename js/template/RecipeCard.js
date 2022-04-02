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
    const recipeCard = document.createElement('article');
    recipeCard.className = 'card col-4 bg-light';

    //Card header CREATION
    const cardHeader = document.createElement('div');
    cardHeader.className = "card-header border-0";
    cardHeader.innerHTML = `
      <div class="row border-0 px-0">
        <div class="col-8 d-flex align-items-center">
          <h2>${this._data.name}</h2>
        </div>
        <div class="col-4 d-flex align-items-center justify-content-evenly">
          <span class="icon--clock"></span>
          <span class="fw-bold">${this._data.time} min</span>
        </div>
      </div>
    `;

    //Ingredients table CREATION
    const ingredientsTableContainer = document.createElement('div');
    ingredientsTableContainer.className = "col-5";
    const ingredientsTable = document.createElement('ul');
    ingredientsTable.classList.add('ingredients-table');
    ingredientsTableContainer.appendChild(ingredientsTable);


    // INGREDIENT LIST LOOP
    const ingredients = this._data.ingredients;
    ingredients.forEach(ingredient => {
      const ingredientsTableLine = document.createElement('li');

      // UNDEFINED VALUE GESTION
      if(ingredient.quantity === undefined && ingredient.unit === undefined){
        ingredientsTableLine.innerHTML = `
          <span>${ingredient.ingredient}</span>
        `;
        ingredientsTable.append(ingredientsTableLine);
      } else if(ingredient.unit === undefined){
        ingredientsTableLine.innerHTML = `
          <span>${ingredient.ingredient}:</span> ${ingredient.quantity}
        `;
        ingredientsTable.append(ingredientsTableLine);
      } else {
        ingredientsTableLine.innerHTML = `
          <span>${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit}
        `;
        ingredientsTable.append(ingredientsTableLine);
      }

      //REPLACE UNIT  
      switch (true) {
        case (ingredient.unit === 'grammes'):
          ingredientsTableLine.innerHTML = `
            <span>${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit.replace(ingredient.unit,'g')}
          `;
          break;
        case (ingredient.unit === 'cuillères à soupe'):
          ingredientsTableLine.innerHTML = `
            <span>${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit.replace(ingredient.unit,'càs')}
          `;
          break;
        case (ingredient.unit === 'cuillère à soupe'):
          ingredientsTableLine.innerHTML = `
            <span>${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit.replace(ingredient.unit,'càs')}
          `;
          break;
        case (ingredient.unit === 'cuillères à café'):
          ingredientsTableLine.innerHTML = `
            <span>${ingredient.ingredient}: </span> ${ingredient.quantity} ${ingredient.unit.replace(ingredient.unit,'càc')}
          `;
          break;
        default:
          break;
      }
      ingredientsTable.append(ingredientsTableLine);
    });
    
    
    //Recipe's description CREATION
    const recipeDescription = document.createElement('div');
    recipeDescription.className = ('col-7');
    recipeDescription.innerHTML = `
      <p class="card-text">${this._data.description}</p>
    `;


    //Card CREATION
    recipeCard.innerHTML = `
      <div class="card__img-top"></div>
      <div class="card-body">
        <div class="row"></div>
      </div>
    `;

    //Sibling destinations
    // console.log(recipeCard)
    // const cardContainer = recipeCard.childNodes[1];
    const cardImage = recipeCard.childNodes[1];
    const cardBody = recipeCard.childNodes[3];
    const cardBodyContainer = cardBody.childNodes[1];
    // console.log(cardImage);
    // console.log(cardBody);
    // console.log(cardBodyContainer);
    
    //Adding Childs
    cardImage.insertAdjacentElement('afterEnd', cardHeader);
    cardBodyContainer.appendChild(ingredientsTableContainer);
    cardBodyContainer.appendChild(recipeDescription);


    return recipeCard
  }
}