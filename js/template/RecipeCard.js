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
    const ingredientsTable = document.createElement('div');
    ingredientsTable.className = "col-5";
    ingredientsTable.innerHTML = `
      <table class="table table-borderless">
        <tbody>
          <tr>
            <th scope="row">Lait de coco:</th>
            <td>400ml</td>
          </tr>
          <tr>
            <th scope="row">Lait de coco:</th>
            <td>400ml</td>
          </tr>
          <tr>
            <th scope="row">Lait de coco:</th>
            <td>400ml</td>
          </tr>
          <tr>
            <th scope="row">Lait de coco:</th>
            <td>400ml</td>
          </tr>
          <tr>
            <th scope="row">Lait de coco:</th>
            <td>400ml</td>
          </tr>
          <tr>
            <th scope="row">Lait de coco:</th>
            <td>400ml</td>
          </tr>
        </tbody>
      </table>
    `;
    
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
    cardBodyContainer.appendChild(ingredientsTable);
    cardBodyContainer.appendChild(recipeDescription);


    return recipeCard
  }
}