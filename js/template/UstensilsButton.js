import { getIngredients } from "../main.js";
import recipes from "../../data/recipes.js";

// NAVBAR SIBLING
const navBar = document.querySelector("header + nav");

// FILTER BUTTONS/INPUT CONTAINER
const filterButtonDeck = document.createElement('div');
filterButtonDeck.className = "row mx-4";


//BLOCK BUTTON
const filterButton = document.createElement('div');
filterButton.className = "col-2 p-0 me-3";
filterButton.id = "buttonUstensils";

filterButton.innerHTML = `
  <div class="button-filter btn btn-tertiary p-4">
    <h2 class="fs-5 m-0 text-white">Ustensiles</h2>
    <span class="icon__chevron"></span>
  </div>
`;  

// BLOCK FORM/INPUT
const filterInput = document.createElement('div');
filterInput.className = "col p-0 me-3 rounded";
filterInput.id = "inputUstensils";

filterInput.innerHTML = `
  <form class="button-filter bg-tertiary p-4 rounded-0 rounded-top">
    <input type="text" class="button-filter__input" placeholder="Rechercher un ustensile" aria-label="Rechercher un ustensile">
    <span class="icon__chevron icon__chevron--up"></span>
  </form>
`;  


// BLOCK INGREDIENTS LIST (DROPDOWN)
const ingredientsListContainer = document.createElement('div');
ingredientsListContainer.className = "dropDown__container container-fluid bg-tertiary p-3 pt-0 rounded-bottom";
const allIngredients = getIngredients(recipes);
const ingredientsList = document.createElement('ul');
ingredientsList.className = "dropDown__list list-unstyled list-group";

allIngredients.forEach(ingredient => {
  const ingredientItem = document.createElement('li');
  ingredientItem.textContent = ingredient;
  ingredientsList.appendChild(ingredientItem);
})  



// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ FAMILY                                                                       │
// └──────────────────────────────────────────────────────────────────────────────┘

ingredientsListContainer.appendChild(ingredientsList);
filterInput.appendChild(ingredientsListContainer);

filterButtonDeck.appendChild(filterButton);
filterButtonDeck.appendChild(filterInput);


navBar.appendChild(filterButtonDeck);

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