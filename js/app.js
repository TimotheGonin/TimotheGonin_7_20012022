/**
 * BUTTONS CHEVRON
 */

const buttonIngredients = document.querySelector('#buttonIngredients');
const inputIngredients = document.querySelector('#inputIngredients');
const ingredientsChevron = document.querySelector('#inputIngredients .icon__chevron--up');

// const buttonAppliances = document.querySelector('#buttonAppliances');
// const inputAppliances = document.querySelector('#inputAppliances');
// const appliancesChevron = document.querySelector('#inputAppliances .icon__chevron--up');

// const buttonUstensils = document.querySelector('#buttonUstensils');
// const inputUstensils = document.querySelector('#inputUstensils');
// const ustensilsChevron = document.querySelector('#inputUstensils .icon__chevron--up');

let ingredientsButtonStatus = true;
// let appliancesButtonStatus = true;
// let ustensilsButtonStatus = true;


function componentSwicth(){
  if(ingredientsButtonStatus){
    inputIngredients.style.display = 'block';
    buttonIngredients.style.display = 'none';
    ingredientsButtonStatus = false;
  } else if(!ingredientsButtonStatus) {
    inputIngredients.style.display = 'none';
    buttonIngredients.style.display = 'block';
    ingredientsButtonStatus = true;
  }
}

buttonIngredients.addEventListener('click', componentSwicth)
ingredientsChevron.addEventListener('click', componentSwicth)