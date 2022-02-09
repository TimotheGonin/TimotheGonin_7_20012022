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

    //Card header CREATION
    const cardHeader = document.createElement('div');
    cardHeader.className = "card-header border-0";
    cardHeader.innerHTML = `
    <div class="card-header border-0 px-0">
      <div class="row">
        <div class="col-8 d-flex align-items-center">
          <h2>${this._data.name}</h2>
        </div>
        <div class="col-4 d-flex align-items-center justify-content-evenly">
          <span class="icon--clock"></span>
          <span class="fw-bold">${this._data.time} min</span>
        </div>
      </div>
    </div>
    `;

    //Ingredients table CREATION
    const ingredientsTableContainer = document.createElement('div');
    ingredientsTableContainer.className = "col-5";
    const ingredientsTable = document.createElement('table');
    ingredientsTable.className = "table table-borderless";
    const ingredientsTableBody = document.createElement('tbody');

    ingredientsTableContainer.appendChild(ingredientsTable);
    ingredientsTable.appendChild(ingredientsTableBody);


    // INGREDIENT LIST LOOP
    const ingredients = this._data.ingredients;
    ingredients.forEach(ingredient => {
      const ingredientsTableRow = document.createElement('tr');

      // UNDEFINED VALUE GESTION
      if(ingredient.quantity === undefined && ingredient.unit === undefined){
        ingredientsTableRow.innerHTML = `
          <th scope="row">${ingredient.ingredient}</th>
        `;
        ingredientsTableBody.append(ingredientsTableRow);
      } else if(ingredient.unit === undefined){
        ingredientsTableRow.innerHTML = `
          <th scope="row">${ingredient.ingredient}</th>
          <td>${ingredient.quantity}</td>
        `;
        ingredientsTableBody.append(ingredientsTableRow);
      } else {
        ingredientsTableRow.innerHTML = `
          <th scope="row">${ingredient.ingredient}</th>
          <td>${ingredient.quantity} ${ingredient.unit}</td>
        `;
        ingredientsTableBody.append(ingredientsTableRow);
      }
    });
    
    
    //Recipe's description CREATION
    const recipeDescription = document.createElement('div');
    recipeDescription.className = ('col-7');
    recipeDescription.innerHTML = `
      <p class="card-text">${this._data.description}</p>
    `;


    //Card CREATION
    recipeCard.innerHTML = `
    <div class="card bg-light">
      <div class="card-img-top"></div>
      <div class="card-body">
        <div class="row">
        </div>
      </div>
    </div>
    `;

    //Sibling destinations
    const cardContainer = recipeCard.childNodes[1];
    const cardImage = cardContainer.childNodes[1];
    const cardBody = cardContainer.childNodes[3];
    const cardBodyContainer = cardBody.childNodes[1];
    
    //Adding Childs
    cardImage.insertAdjacentElement('afterEnd', cardHeader);
    cardBodyContainer.appendChild(ingredientsTableContainer);
    cardBodyContainer.appendChild(recipeDescription);


    return recipeCard
  }
}