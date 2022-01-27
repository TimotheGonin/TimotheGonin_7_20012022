/**
 * SWTICH TO BUTTON OR INPUT
 */

// START - Elements list
const buttonIngredients = document.querySelector('#buttonIngredients');
const inputIngredients = document.querySelector('#inputIngredients');
const ingredientsChevron = document.querySelector('#inputIngredients .icon__chevron--up');

const buttonAppliances = document.querySelector('#buttonAppliances');
const inputAppliances = document.querySelector('#inputAppliances');
const appliancesChevron = document.querySelector('#inputAppliances .icon__chevron--up');

const buttonUstensils = document.querySelector('#buttonUstensils');
const inputUstensils = document.querySelector('#inputUstensils');
const ustensilsChevron = document.querySelector('#inputUstensils .icon__chevron--up');

let ingredientsButtonStatus = true;
let appliancesButtonStatus = true;
let ustensilsButtonStatus = true;
// END - Element list


// START - "Switcher"
function ingedientComponentSwicth(){
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
function appliancesComponentSwicth(){
  if(appliancesButtonStatus){
    inputAppliances.style.display = 'block';
    buttonAppliances.style.display = 'none';
    appliancesButtonStatus = false;
  } else if(!appliancesButtonStatus) {
    inputAppliances.style.display = 'none';
    buttonAppliances.style.display = 'block';
    appliancesButtonStatus = true;
  }
}
function ustensilsomponentSwicth(){
  if(ustensilsButtonStatus){
    inputUstensils.style.display = 'block';
    buttonUstensils.style.display = 'none';
    ustensilsButtonStatus = false;
  } else if(!ustensilsButtonStatus) {
    inputUstensils.style.display = 'none';
    buttonUstensils.style.display = 'block';
    ustensilsButtonStatus = true;
  }
}
// END - "Switcher"


// START - EVENTS
buttonIngredients.addEventListener('click', ingedientComponentSwicth);
ingredientsChevron.addEventListener('click', ingedientComponentSwicth);

buttonAppliances.addEventListener('click', appliancesComponentSwicth);
appliancesChevron.addEventListener('click', appliancesComponentSwicth);

buttonUstensils.addEventListener('click', ustensilsomponentSwicth);
ustensilsChevron.addEventListener('click', ustensilsomponentSwicth);
// END - EVENTS