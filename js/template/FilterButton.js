import { tagsCollection, tagSelection } from "./Tag.js";
import { dataSwitcher } from "../tools/getData.js";
import { anglifyLabel, capitalize, colorPallet, singular } from "../tools/toolbox.js";
import { entryTypeSwitch } from "../main.js";
import recipes from "../../data/recipes.js";


/**
 * 
 * @param {sting} array of label names 
 */
function filterButtonFactory(array){
  for (const label of array) {
    //PARAMETERS
    const elementColor = colorPallet(label);
    const elementLabel = capitalize(label);
    const elementAttribute = anglifyLabel(label);

    //BLOCK BUTTON
    const filterButton = document.createElement('div');
    filterButton.className = "col-2 p-0 me-3";
    filterButton.id = `button${elementAttribute}`;
    filterButton.innerHTML = `
      <div class="button-filter btn btn-${elementColor} p-4">
        <h2 class="fs-5 m-0 text-white">${elementLabel}</h2>
        <span class="icon__chevron"></span>
      </div>
    `;  

    // BLOCK FORM/INPUT
    const filterInput = document.createElement('div');
    filterInput.className = "col p-0 me-3 rounded";
    filterInput.classList.add('hidden');
    filterInput.id = `input${elementAttribute}`;
    filterInput.innerHTML = `
      <form class="button-filter bg-${elementColor} p-4 rounded-0 rounded-top">
        <input type="text" class="button-filter__input" placeholder="Rechercher un ${singular(label)}" aria-label="Rechercher un ${singular(label)}">
        <span class="icon__chevron icon__chevron--up"></span>
      </form> 
    `;  

    // DROPDOWN LIST
    const filterListContainer = document.createElement('div');
    filterListContainer.className = `dropDown__container container-fluid bg-${elementColor} p-3 pt-0 rounded-bottom`;
    const filterListContent = initFilterList(elementAttribute.toLowerCase());

    //Append
    filterListContainer.appendChild(filterListContent);
    filterInput.appendChild(filterListContainer);
    filterButtonContainer.appendChild(filterButton);
    filterButtonContainer.appendChild(filterInput);
  }
}

export const initFilterList = (elementName) => {
  const dataParameter = elementName;
  const allItems = dataSwitcher(dataParameter,recipes);

  const itemsList = document.createElement('ul');
  itemsList.className = "dropDown__list list-unstyled list-group";

  allItems.forEach(item => {
    const filterItem = document.createElement('li');
    filterItem.className = "dropDown__item px-0 my-1";
    filterItem.setAttribute('data-name',item);
    filterItem.setAttribute('data-type',dataParameter);
    filterItem.textContent = item;
    filterItem.addEventListener('click', tagSelection);
    filterItem.addEventListener('click', entryTypeSwitch);
    itemsList.appendChild(filterItem);
  }) 

  return itemsList;
}

export const restoreFilterList = () =>{
  const defaultAppliancesFilters = initFilterList('appliances');
  const defaultIngredientsFilters = initFilterList('ingredients');
  const defaultUtensilsFilters = initFilterList('utensils');
  
  appliancesFilters.innerHTML = ``;
  ingredientsFilters.innerHTML = ``;
  utensilsFilters.innerHTML = ``;

  appliancesFilters.append(defaultAppliancesFilters);
  ingredientsFilters.append(defaultIngredientsFilters);
  utensilsFilters.append(defaultUtensilsFilters);
} 


/**
 * 
 * @param {event} e 
 * management of the display of buttons/inputs filter
 */
function filterButtonSwicth(e){
  let element = e.currentTarget;

  for (const button of buttons) {
    if(element === button){
      element.classList.add('hidden');
      element.nextElementSibling.classList.remove('hidden');
    }
  }

  for(const chevron of chevrons){
    if(element === chevron){
      element.parentElement.parentElement.classList.add('hidden');
      element.parentElement.parentElement.previousSibling.classList.remove('hidden');
    }
  }
}

  

  // UPDATING ITEMS IN DROPDOWN
  export const updateFilterList = (appliances, ingredients, utensils) => {

    // test Start
    //Appliances
    for(const value of appliances){
      for(const tag of tagsCollection){
        if(tag.name === value){
          appliances.splice(appliances.indexOf(value),1);
        }
      }
    }

    //Ingredients
    for(const value of ingredients){
      for(const tag of tagsCollection){
        if(tag.name === value){
          ingredients.splice(ingredients.indexOf(value),1);
        }
      }
    }

    // Utensils
    for(const value of utensils){
      for(const tag of tagsCollection){
        if(tag.name === value){
          utensils.splice(utensils.indexOf(value),1);
        }
      }
    }
    //test End

    //empty filter container
    appliancesFilters.innerHTML = '';
    ingredientsFilters.innerHTML = '';
    utensilsFilters.innerHTML = '';

    //INPUT SEARCH TEST
    appliances.forEach(item => {
      const filterItem = document.createElement('li');
      filterItem.className = "dropDown__item px-0 my-1";
      filterItem.setAttribute('data-name',item);
      filterItem.setAttribute('data-type','appliances');
      filterItem.textContent = item;
      filterItem.addEventListener('click', tagSelection);
      filterItem.addEventListener('click', entryTypeSwitch);
      appliancesFilters.appendChild(filterItem);
    }) 
    ingredients.forEach(item => {
      const filterItem = document.createElement('li');
      filterItem.className = "dropDown__item px-0 my-1";
      filterItem.setAttribute('data-name',item);
      filterItem.setAttribute('data-type','ingredients');
      filterItem.textContent = item;
      filterItem.addEventListener('click', tagSelection);
      filterItem.addEventListener('click', entryTypeSwitch);
      ingredientsFilters.appendChild(filterItem);
    }) 
    utensils.forEach(item => {
      const filterItem = document.createElement('li');
      filterItem.className = "dropDown__item px-0 my-1";
      filterItem.setAttribute('data-name',item);
      filterItem.setAttribute('data-type','utensils');
      filterItem.textContent = item;
      filterItem.addEventListener('click', tagSelection);
      filterItem.addEventListener('click', entryTypeSwitch);
      utensilsFilters.appendChild(filterItem);
    }) 
  }

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ INSTRUCTION                                                             │
  └─────────────────────────────────────────────────────────────────────────┘
 */
export const filterButtonContainer = document.querySelector('#filterButtons');
let updatedFilterList = new Array;


const filtersButtonLabels = new Array('ingrédients', 'appareils', 'ustensiles');
filterButtonFactory(filtersButtonLabels);
const appliancesFilters = document.querySelector('#inputAppliances ul');
const ingredientsFilters = document.querySelector('#inputIngredients ul');
const utensilsFilters = document.querySelector('#inputUtensils ul');

const buttons = Array.from(document.querySelectorAll('#buttonAppliances, #buttonIngredients, #buttonUtensils'));
const chevrons = Array.from(document.querySelectorAll('#inputIngredients .icon__chevron--up, #inputAppliances .icon__chevron--up, #inputUtensils .icon__chevron--up'))


//EVENTS
buttons.forEach(button=>{
  button.addEventListener('click', filterButtonSwicth);
});
chevrons.forEach(chevron=>{
  chevron.addEventListener('click', filterButtonSwicth);
});