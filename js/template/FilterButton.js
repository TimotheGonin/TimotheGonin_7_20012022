import { tagsCollection, tagSelection } from "./Tag.js";
import { dataSwitcher, withoutDuplicates } from "../tools/getData.js";
import { anglifyLabel, capitalize, colorPallet, singular } from "../tools/toolbox.js";
import { entryTypeSwitch } from "../main.js";
import recipes from "../../data/recipes.js";


/**
 * Create a filter button and a filter input, and append them to the DOM
 * @param array - the array of labels to be filtered
 */
const filterButtonFactory = (array) => {

  array.forEach(label=>{
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
      <form class="button-filter bg-${elementColor} pt-4 pb-3 px-3 rounded-0 rounded-top">
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
  })
}


/**
 * Create a list of items from the data parameter and add them to the DOM
 * @param elementName - the name of the element that will be used to filter the list.
 * @returns the list of items that will be used to populate the filter dropdown.
 */
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


/**
 * The function restores the default filters for the appliances, ingredients, and utensils
 */
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
 * The function takes in an event object and loops through the buttons and chevrons. 
 * If the event object is a button, the button is hidden and the next button is shown. 
 * If the event object is a chevron, the chevron's parent is hidden and the previous parent is shown
 * @param e - The event object.
 */
const filterButtonSwicth = (e) => {
  let element = e.currentTarget;

  buttons.forEach(button=>{
    if(element === button){
      element.classList.add('hidden');
      element.nextElementSibling.classList.remove('hidden');
    }
  })

  chevrons.forEach(chevron=>{
    if(element === chevron){
      element.parentElement.parentElement.classList.add('hidden');
      element.parentElement.parentElement.previousSibling.classList.remove('hidden');
    }
  })
}


/**
 * It removes filter names present in the list of active tags.
 * @param appliances - the array of appliances present in the recipes match
 * @param ingredients - the array of ingredients present in the recipes match
 * @param utensils - the array of utensils present in the recipes match
 */
const tagsAndFiltersManager = (appliances, ingredients, utensils) => {
  const infosArray = [appliances, ingredients, utensils];
  
  infosArray.forEach(currentInfos=>{
    tagsCollection.forEach(tag=>{
      currentInfos.forEach(value=>{
        if(tag.name === value){
          currentInfos.splice(currentInfos.indexOf(value),1);
        }
      })
    })
  })
}


/**
 * Updates the filter list
 * Uses the duplicate management function between tags and filters
 * @param appliancesList - a list of appliances
 * @param ingredientsList - an array of ingredients
 * @param utensilsList - 
 */
export const updateFilterList = (appliancesList, ingredientsList, utensilsList) => {
  appliancesList = withoutDuplicates(appliancesList);
  ingredientsList = withoutDuplicates(ingredientsList);
  utensilsList = withoutDuplicates(utensilsList)
  tagsAndFiltersManager(appliancesList,ingredientsList,utensilsList);

  //empty filter container
  appliancesFilters.innerHTML = '';
  ingredientsFilters.innerHTML = '';
  utensilsFilters.innerHTML = '';

  //INPUT SEARCH TEST
  appliancesList.forEach(item => {
    const filterItem = document.createElement('li');
    filterItem.className = "dropDown__item px-0 my-1";
    filterItem.setAttribute('data-name',item);
    filterItem.setAttribute('data-type','appliances');
    filterItem.textContent = item;
    filterItem.addEventListener('click', tagSelection);
    filterItem.addEventListener('click', entryTypeSwitch);
    appliancesFilters.appendChild(filterItem);
  }) 
  ingredientsList.forEach(item => {
    const filterItem = document.createElement('li');
    filterItem.className = "dropDown__item px-0 my-1";
    filterItem.setAttribute('data-name',item);
    filterItem.setAttribute('data-type','ingredients');
    filterItem.textContent = item;
    filterItem.addEventListener('click', tagSelection);
    filterItem.addEventListener('click', entryTypeSwitch);
    ingredientsFilters.appendChild(filterItem);
  }) 
  utensilsList.forEach(item => {
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

const filtersButtonLabels = new Array('ingrédients', 'appareils', 'ustensiles');
filterButtonFactory(filtersButtonLabels);
const appliancesFilters = document.querySelector('#inputAppliances ul');
const ingredientsFilters = document.querySelector('#inputIngredients ul');
const utensilsFilters = document.querySelector('#inputUtensils ul');

const buttons = Array.from(document.querySelectorAll('#buttonAppliances, #buttonIngredients, #buttonUtensils'));
const chevrons = Array.from(document.querySelectorAll('#inputIngredients .icon__chevron--up, #inputAppliances .icon__chevron--up, #inputUtensils .icon__chevron--up'))

const filterInputs = Array.from(document.querySelectorAll('#inputAppliances input, #inputIngredients input, #inputUtensils input'));

//EVENTS
buttons.forEach(button=>{
  button.addEventListener('click', filterButtonSwicth);
});
chevrons.forEach(chevron=>{
  chevron.addEventListener('click', filterButtonSwicth);
});

filterInputs.forEach(input=>{
  input.addEventListener('input', (e) => {
    const inputValue = e.currentTarget.value;
    const filters = e.currentTarget.parentElement.nextElementSibling.childNodes[0].childNodes;
    for( const filter of filters){
      const filterValue = filter.innerText
      if(!filterValue.includes(inputValue)){
        filter.classList.add('hidden');
      } else {
        filter.classList.remove('hidden');
      }
    }
  })
})

//Disable ENTER button
filterInputs.forEach(input=>{
  input.addEventListener('keydown', (e)=>{
    if(e.keyCode === 13){
      e.preventDefault();
    }
  })
})