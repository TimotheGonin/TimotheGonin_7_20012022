import { getIngredients } from "../main.js";
import recipes from "../../data/recipes.js";

console.log(getIngredients(recipes));

const navBar = document.querySelector("header + nav");
const filterButtonDeck = document.createElement('div');
filterButtonDeck.className = "row mx-4";
navBar.appendChild(filterButtonDeck);
console.log(navBar);

function filterButtonCREATOR(type){
  switch (type) {
    case 'blue':
      
      break;
  
    case 'red':
      
      break;
  
    case 'green':
      
      break;
  
    default:
      break;
  }
}

const filterButton = document.createElement('div');
filterButton.className = "col-2 p-0 me-3";
filterButton.id = "buttonIngredients";

filterButton.innerHTML = `
  <div class="button-filter btn btn-primary p-4" role="button">
    <h2 class="fs-5 m-0 text-white">Ingédients</h2>
    <span class="icon__chevron"></span>
  </div>
`;


const filterInput = document.createElement('div');
filterInput.className = "col p-0 me-3 rounded";
filterInput.id = "inputIngredients";

filterInput.innerHTML = `
  <form class="button-filter bg-primary p-4 rounded-0 rounded-top">
    <input type="text" class="button-filter__input" placeholder="Rechercher un ingédient" aria-label="Rechercher un ingédient">
    <span class="icon__chevron icon__chevron--up"></span>
  </form>
`;

console.log(filterButton);
console.log(filterInput);