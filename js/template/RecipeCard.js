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
    <div class="card-header border-0">
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

    //Card CREATION
    recipeCard.innerHTML = `
    <div class="card bg-light">
      <div class="card-img-top"></div>
      <div class="card-body">
        <div class="row">
          <div class="col-5 p">
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
          </div>
          <div class="col-7">
            <p class="card-text">${this._data.description}</p>
          </div>
        </div>
      </div>
    </div>
    `;

    const cardContainer = recipeCard.childNodes[1];
    const cardImage = cardContainer.childNodes[1];
    
    cardImage.insertAdjacentElement('afterEnd', cardHeader);


    return recipeCard
  }
}