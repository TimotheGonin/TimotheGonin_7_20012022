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