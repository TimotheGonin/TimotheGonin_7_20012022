import { getIngredients } from "../main.js";
import recipes from "../../data/recipes.js";


// FILTER BUTTONS/INPUT CONTAINER
const filterButtonContainer = document.querySelector("header + nav>div");


function createfilterButton(type){
  switch (type) {

    case 'ingredients':
      //BLOCK BUTTON
      const ingredientsButton = document.createElement('div');
      ingredientsButton.className = "col-2 p-0 me-3";
      ingredientsButton.id = "buttonIngredients";
      ingredientsButton.innerHTML = `
        <div class="button-filter btn btn-primary p-4" role="button">
          <h2 class="fs-5 m-0 text-white">Ingédients</h2>
          <span class="icon__chevron"></span>
        </div>  
      `;  

      // BLOCK FORM/INPUT
      const ingredientsInput = document.createElement('div');
      ingredientsInput.className = "col p-0 me-3 rounded";
      ingredientsInput.id = "inputIngredients";
      ingredientsInput.innerHTML = `
        <form class="button-filter bg-primary p-4 rounded-0 rounded-top">
          <input type="text" class="button-filter__input" placeholder="Rechercher un ingédient" aria-label="Rechercher un ingédient">
          <span class="icon__chevron icon__chevron--up"></span>
        </form>  
      `;  

      // DROPDOWN LIST
      const ingredientListContainer = document.createElement('div');
      ingredientListContainer.className = "dropDown__container container-fluid bg-primary p-3 pt-0 rounded-bottom";
      const allIngredients = getIngredients(recipes);
      const ingredientsList = document.createElement('ul');
      ingredientsList.className = "dropDown__list list-unstyled list-group";

      allIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.className = "dropDown__item px-0 my-1";
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
      })  

      //Append
      ingredientListContainer.appendChild(ingredientsList);
      ingredientsInput.appendChild(ingredientListContainer);
      filterButtonContainer.appendChild(ingredientsButton);
      filterButtonContainer.appendChild(ingredientsInput);
      break;
  
    case 'applicances':  
      
      break;
  
    case 'ustensils':  
      
      break;
  
    default:  
      break;
  }    
}  



// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ EVENT                                                                        │
// └──────────────────────────────────────────────────────────────────────────────┘

let buttonStatus = true;

function filterSwicth(){
  if(buttonStatus){
    filterInput.style.display = 'block';
    filterButton.style.display = 'none';
    buttonStatus = false;
  } else if(!buttonStatus) {
    filterInput.style.display = 'none';
    filterButton.style.display = 'block';
    buttonStatus = true;
  }
}

createfilterButton('ingredients')
const filterButton = document.querySelector('#buttonIngredients');
const filterInput = document.querySelector('#inputIngredients');
const chevron = document.querySelector('.icon__chevron--up');

filterButton.addEventListener('click', filterSwicth);
chevron.addEventListener('click', filterSwicth);