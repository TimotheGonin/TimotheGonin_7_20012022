import { getAppliances,getIngredients,getUstensils } from "../tools/getData.js";
import recipes from "../../data/recipes.js";


// FILTER BUTTONS/INPUT CONTAINER
const filterButtonContainer = document.querySelector('#filterButtons');
const tagButtonsContainer = document.querySelector('#tagButtons');


function createfilterButton(type){
  switch (type) {

    case 'appliances':
      //BLOCK BUTTON
      const appliancesButton = document.createElement('div');
      appliancesButton.className = "col-2 p-0 me-3";
      appliancesButton.id = "buttonAppliances";
      appliancesButton.innerHTML = `
        <div class="button-filter btn btn-secondary p-4">
          <h2 class="fs-5 m-0 text-white">Appareil</h2>
          <span class="icon__chevron"></span>
        </div>
      `;  

      // BLOCK FORM/INPUT
      const appliancesInput = document.createElement('div');
      appliancesInput.className = "col p-0 me-3 rounded";
      appliancesInput.id = "inputAppliances";
      appliancesInput.innerHTML = `
        <form class="button-filter bg-secondary p-4 rounded-0 rounded-top">
          <input type="text" class="button-filter__input" placeholder="Rechercher un appareil" aria-label="Rechercher un appareil">
          <span class="icon__chevron icon__chevron--up"></span>
        </form> 
      `;  

      // DROPDOWN LIST
      const appliancesListContainer = document.createElement('div');
      appliancesListContainer.className = "dropDown__container container-fluid bg-secondary p-3 pt-0 rounded-bottom";
      const allAppliances = getAppliances(recipes);
      const appliancesList = document.createElement('ul');
      appliancesList.className = "dropDown__list list-unstyled list-group";

      allAppliances.forEach(appliance => {
        const applianceItem = document.createElement('li');
        applianceItem.className = "dropDown__item px-0 my-1";
        applianceItem.textContent = appliance;
        appliancesList.appendChild(applianceItem);
      })  

      //Append
      appliancesListContainer.appendChild(appliancesList);
      appliancesInput.appendChild(appliancesListContainer);
      filterButtonContainer.appendChild(appliancesButton);
      filterButtonContainer.appendChild(appliancesInput);
      break;


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
      const ingredientsListContainer = document.createElement('div');
      ingredientsListContainer.className = "dropDown__container container-fluid bg-primary p-3 pt-0 rounded-bottom";
      const allIngredients = getIngredients(recipes);
      const ingredientsList = document.createElement('ul');
      ingredientsList.className = "dropDown__list list-unstyled list-group";

      allIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.className = "dropDown__item px-0 my-1";
        ingredientItem.setAttribute('data-active','false');
        ingredientItem.setAttribute('data-name',ingredient);
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
      })  

      //Append
      ingredientsListContainer.appendChild(ingredientsList);
      ingredientsInput.appendChild(ingredientsListContainer);
      filterButtonContainer.appendChild(ingredientsButton);
      filterButtonContainer.appendChild(ingredientsInput);
      break;

    case 'ustensils':
      //BLOCK BUTTON
      const ustensilsButton = document.createElement('div');
      ustensilsButton.className = "col-2 p-0 me-3";
      ustensilsButton.id = "buttonUstensils";
      ustensilsButton.innerHTML = `
        <div class="button-filter btn btn-tertiary p-4">
          <h2 class="fs-5 m-0 text-white">Ustensiles</h2>
          <span class="icon__chevron"></span>
        </div>
      `;  

      // BLOCK FORM/INPUT
      const ustensilsInput = document.createElement('div');
      ustensilsInput.className = "col p-0 me-3 rounded";
      ustensilsInput.id = "inputUstensils";
      ustensilsInput.innerHTML = `
        <form class="button-filter bg-tertiary p-4 rounded-0 rounded-top">
          <input type="text" class="button-filter__input" placeholder="Rechercher un ustensile" aria-label="Rechercher un ustensile">
          <span class="icon__chevron icon__chevron--up"></span>
        </form>
      `;  

      // DROPDOWN LIST
      const ustensilsListContainer = document.createElement('div');
      ustensilsListContainer.className = "dropDown__container container-fluid bg-tertiary p-3 pt-0 rounded-bottom";
      const allUstensils = getUstensils(recipes);
      const ustensilsList = document.createElement('ul');
      ustensilsList.className = "dropDown__list list-unstyled list-group";

      allUstensils.forEach(ustensil => {
        const ustensilItem = document.createElement('li');
        ustensilItem.className = "dropDown__item px-0 my-1";
        ustensilItem.textContent = ustensil;
        ustensilsList.appendChild(ustensilItem);
      })  

      //Append
      ustensilsListContainer.appendChild(ustensilsList);
      ustensilsInput.appendChild(ustensilsListContainer);
      filterButtonContainer.appendChild(ustensilsButton);
      filterButtonContainer.appendChild(ustensilsInput);
      break;

    default:  
      break;
  }    
}  



// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ EVENT                                                                        │
// └──────────────────────────────────────────────────────────────────────────────┘

function filterButtonSwicth(){
  let element = this;
  switch (element) {

    //APPLIANCES BUTTON--start
    case (buttons[0]):
      element.style.display = 'none';
      element.nextElementSibling.style.display = 'block'
      break;
    case (chevrons[0]):
      element.parentElement.parentElement.style.display = 'none';
      element.parentElement.parentElement.previousSibling.style.display = 'block';
      break;
    //APPLIANCES BUTTON--end

    //INGREDIENTS BUTTON--start
    case (buttons[1]):
      element.style.display = 'none';
      element.nextElementSibling.style.display = 'block'
      break;
    case (chevrons[1]):
      element.parentElement.parentElement.style.display = 'none';
      element.parentElement.parentElement.previousSibling.style.display = 'block';
      break;
    //INGREDIENTS BUTTON--end

    //USTENSILS BUTTON--start
    case (buttons[2]):
      element.style.display = 'none';
      element.nextElementSibling.style.display = 'block'
      break;
    case (chevrons[2]):
      element.parentElement.parentElement.style.display = 'none';
      element.parentElement.parentElement.previousSibling.style.display = 'block';
      break;
    //USTENSILS BUTTON--end

    default:
      break;
  }
}

createfilterButton('ingredients');
createfilterButton('appliances');
createfilterButton('ustensils');

const buttons = document.querySelectorAll('#buttonAppliances, #buttonIngredients, #buttonUstensils');
const chevrons = document.querySelectorAll('#inputIngredients .icon__chevron--up, #inputAppliances .icon__chevron--up, #inputUstensils .icon__chevron--up')

Array.from(buttons).forEach(button=>{
  button.addEventListener('click', filterButtonSwicth);
});
Array.from(chevrons).forEach(chevron=>{
  chevron.addEventListener('click', filterButtonSwicth);
});


/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ TAGS                                                                    │
  └─────────────────────────────────────────────────────────────────────────┘
 */

  function tagSelection(){
    this.dataset.active = this.dataset.active === "true" ? "false" : "true";
    createTagButton(this.dataset.name)
  }

  function tagRemoving(){
    this.parentNode.remove();
  }

  function createTagButton(name){
    const tagButton = document.createElement('div');
    const tagButtonClose = document.createElement('span');
    tagButton.className = 'button-tag btn btn-primary p-2 me-2';
    tagButtonClose.className = 'icon__close';
    tagButton.setAttribute('role', 'button');
    tagButton.setAttribute('data-active', 'true');
    tagButton.innerHTML = `
      <span class="button-tag__title fs-6 m-0 text-white">${name}</span>
    `;
    tagButton.appendChild(tagButtonClose);
    tagButtonClose.addEventListener('click', tagRemoving);
    tagButtonsContainer.appendChild(tagButton);
  };

  const tags = document.querySelectorAll('li.dropDown__item');
  tags.forEach(tag=>{
    tag.addEventListener('click', tagSelection);
  })