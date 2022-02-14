import { getAppliances } from "../main.js";
import recipes from "../../data/recipes.js";

// FILTER BUTTONS/INPUT CONTAINER
const filterButtonContainer = document.querySelector("header + nav>div");


//BLOCK BUTTON
const filterButton = document.createElement('div');
filterButton.className = "col-2 p-0 me-3";
filterButton.id = "buttonAppliances";

filterButton.innerHTML = `
  <div class="button-filter btn btn-secondary p-4">
    <h2 class="fs-5 m-0 text-white">Appareil</h2>
    <span class="icon__chevron"></span>
  </div>
`;  

// BLOCK FORM/INPUT
const filterInput = document.createElement('div');
filterInput.className = "col p-0 me-3 rounded";
filterInput.id = "inputAppliances";

filterInput.innerHTML = `
  <form class="button-filter bg-secondary p-4 rounded-0 rounded-top">
    <input type="text" class="button-filter__input" placeholder="Rechercher un appareil" aria-label="Rechercher un appareil">
    <span class="icon__chevron icon__chevron--up"></span>
  </form>
`;  


// BLOCK INGREDIENTS LIST (DROPDOWN)
const ingredientsListContainer = document.createElement('div');
ingredientsListContainer.className = "dropDown__container container-fluid bg-secondary p-3 pt-0 rounded-bottom";
const allIngredients = getAppliances(recipes);
const ingredientsList = document.createElement('ul');
ingredientsList.className = "dropDown__list list-unstyled list-group";

allIngredients.forEach(ingredient => {
  const ingredientItem = document.createElement('li');
  ingredientItem.className = "dropDown__item px-0 my-1";
  ingredientItem.textContent = ingredient;
  ingredientsList.appendChild(ingredientItem);
})  



// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ FAMILY                                                                       │
// └──────────────────────────────────────────────────────────────────────────────┘

ingredientsListContainer.appendChild(ingredientsList);
filterInput.appendChild(ingredientsListContainer);
filterButtonContainer.appendChild(filterButton);
filterButtonContainer.appendChild(filterInput);


// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ EVENT                                                                        │
// └──────────────────────────────────────────────────────────────────────────────┘
const ingredientsChevron = document.querySelector('#inputIngredients .icon__chevron--up');


let ingredientsButtonStatus = true;

function ingedientComponentSwicth(){
  if(ingredientsButtonStatus){
    filterInput.style.display = 'block';
    filterButton.style.display = 'none';
    ingredientsButtonStatus = false;
  } else if(!ingredientsButtonStatus) {
    filterInput.style.display = 'none';
    filterButton.style.display = 'block';
    ingredientsButtonStatus = true;
  }
}


const form = filterInput.childNodes[1];
const chevron = form.childNodes[3];

filterButton.addEventListener('click', ingedientComponentSwicth);
chevron.addEventListener('click', ingedientComponentSwicth);