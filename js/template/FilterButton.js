import { dataSwitcher } from "../tools/getData.js";
import { capitalize, singular } from "../tools/toolbox.js";
import { searchWithTag } from "../main.js";
import recipes from "../../data/recipes.js";


/**
 * 
 * @param {string} label 
 * @returns color palet option
 */
function colorPallet(label){
  let colorPallet;

  switch (label) {
    case 'appareils':
      colorPallet = 'secondary';
      break;
    case 'ingrédients':
      colorPallet = 'primary';
      break;
    case 'ustensiles':
      colorPallet = 'tertiary';
      break;
  
    default:
      break;
  }

  return colorPallet;
}

/**
 * 
 * @param {string} label 
 * @returns sting anglifyed
 */
function anglifyLabel(label){
  let anglifyedLabel;

  switch (label) {
    case 'appareils':
      anglifyedLabel = 'appliances';
      break;
    case 'ingrédients':
      anglifyedLabel = 'ingredients';
      break;
    case 'ustensiles':
      anglifyedLabel = 'utensils';
      break;
  
    default:
      break;
  }

  return capitalize(anglifyedLabel);
}

/**
 * 
 * @param {sting} array of label names 
 */
function filterButtonFactory(array){
  for (const elementName of array) {

    //BLOCK BUTTON
    const filterButton = document.createElement('div');
    filterButton.className = "col-2 p-0 me-3";
    filterButton.id = `button${anglifyLabel(elementName)}`;
    filterButton.innerHTML = `
      <div class="button-filter btn btn-${colorPallet(elementName)} p-4">
        <h2 class="fs-5 m-0 text-white">${capitalize(elementName)}</h2>
        <span class="icon__chevron"></span>
      </div>
    `;  

    // BLOCK FORM/INPUT
    const filterInput = document.createElement('div');
    filterInput.className = "col p-0 me-3 rounded";
    filterInput.id = `input${anglifyLabel(elementName)}`;
    filterInput.innerHTML = `
      <form class="button-filter bg-${colorPallet(elementName)} p-4 rounded-0 rounded-top">
        <input type="text" class="button-filter__input" placeholder="Rechercher un ${singular(elementName)}" aria-label="Rechercher un ${singular(elementName)}">
        <span class="icon__chevron icon__chevron--up"></span>
      </form> 
    `;  

    // DROPDOWN LIST
    const filterListContainer = document.createElement('div');
    filterListContainer.className = `dropDown__container container-fluid bg-${colorPallet(elementName)} p-3 pt-0 rounded-bottom`;
    const filterListContent = initTagsList(elementName);

    //Append
    filterListContainer.appendChild(filterListContent);
    filterInput.appendChild(filterListContainer);
    filterButtonContainer.appendChild(filterButton);
    filterButtonContainer.appendChild(filterInput);
  }
}

const initTagsList = (elementName) => {
  const dataParameter = anglifyLabel(elementName).toLowerCase();
  const allItems = dataSwitcher(dataParameter,recipes);

  const itemsList = document.createElement('ul');
  itemsList.className = "dropDown__list list-unstyled list-group";

  allItems.forEach(item => {
    const filterItem = document.createElement('li');
    filterItem.className = "dropDown__item px-0 my-1";
    filterItem.setAttribute('data-name',item);
    filterItem.setAttribute('data-type',dataParameter);
    filterItem.textContent = item;
    itemsList.appendChild(filterItem);
  }) 

  return itemsList;
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
      element.style.display = 'none';
      element.nextElementSibling.style.display = 'block';
    }
  }

  for(const chevron of chevrons){
    if(element === chevron){
      element.parentElement.parentElement.style.display = 'none';
      element.parentElement.parentElement.previousSibling.style.display = 'block';
    }
  }
}


/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ TAGS                                                                    │
  └─────────────────────────────────────────────────────────────────────────┘
 */

  //SELECT TAG
  const tagSelection = (e) =>{
    //to attribute color palette 
    let color;

    const elementName = e.target.dataset.name;
    const elementType = e.target.dataset.type;

    switch (elementType) {
      case 'appliances':
        color = 'secondary';
        break;
      case 'ingredients':
        color = 'primary'
        break;
      case 'utensils':
        color = 'tertiary';
        break;
    
      default:
        break;
    }

    createTagButton(elementName,elementType,color);
  }

  function createTagButton(name,type,color){

    //checking tag name already exist
    for (const tag of tagsCollection) {
      if (name === tag) {
        return;
      }
    }

    const tagButtonColor = color;
    const tagButton = document.createElement('div');
    const tagButtonClose = document.createElement('span');

    tagButton.className = `button-tag btn btn-${tagButtonColor} p-2 me-2`;
    tagButtonClose.className = 'icon__close';

    tagButton.setAttribute('role', 'button');
    tagButton.setAttribute('data-name', name);
    tagButton.setAttribute('data-type', type);

    tagButton.innerHTML = `
      <span class="button-tag__title fs-6 m-0 text-white">${name}</span>
    `;

    tagButton.appendChild(tagButtonClose);
    tagButtonClose.addEventListener('click', tagRemoving);
    tagButtonsContainer.appendChild(tagButton);

    tagsCollection.push(name);
  };

  function tagRemoving(e){
    const elementContainer = e.target.parentNode;
    
    //loop to check tag name MATCH
    for (const tag of tagsCollection) {
      if(elementContainer.dataset.name===tag){
        tagsCollection.splice(tagsCollection.indexOf(tag),1);
        elementContainer.remove();
      }
    }

    // update recipe cards deck
      searchWithTag();
  }

  export const checkingTagCollection = () => {
    const recipeCardsTags = Array.from(document.querySelectorAll('th'));
    let tempArray = new Array;

    if(tagsCollection.length === 0){
      console.log('init')

    } else if(tagsCollection.length > 0){
      console.log('update');

      for(const tag of recipeCardsTags){
        for (const item of tagsCollection) {
          if(tag.textContent !== item )
          tempArray.push(tag.textContent.toLowerCase());
        }
      }

      updatedTagsList = [...new Set(tempArray)];
      updateTagsList();
    }
  }

  // UPDATING ITEMS IN DROPDOWN
  const updateTagsList = () => {
    ingredientFilters.innerHTML = '';

    updatedTagsList.forEach(item => {
      const filterItem = document.createElement('li');
      filterItem.className = "dropDown__item px-0 my-1";
      filterItem.setAttribute('data-active','false');
      filterItem.setAttribute('data-name',item);
      filterItem.textContent = item;
      filterItem.addEventListener('click', tagSelection);
      ingredientFilters.appendChild(filterItem);
    }) 
  }

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ INSTRUCTION                                                             │
  └─────────────────────────────────────────────────────────────────────────┘
 */
export const filterButtonContainer = document.querySelector('#filterButtons');
export const tagButtonsContainer = document.querySelector('#tagButtons');
export const tagsCollection = new Array;
let updatedTagsList = new Array;


const filtersButtonLabels = new Array('ingrédients', 'appareils', 'ustensiles');
filterButtonFactory(filtersButtonLabels);
const ingredientFilters = document.querySelector('#inputIngredients ul');

const buttons = Array.from(document.querySelectorAll('#buttonAppliances, #buttonIngredients, #buttonUtensils'));
const chevrons = Array.from(document.querySelectorAll('#inputIngredients .icon__chevron--up, #inputAppliances .icon__chevron--up, #inputUtensils .icon__chevron--up'))


//EVENTS
buttons.forEach(button=>{
  button.addEventListener('click', filterButtonSwicth);
});
chevrons.forEach(chevron=>{
  chevron.addEventListener('click', filterButtonSwicth);
});


export const tags = document.querySelectorAll('li.dropDown__item');
tags.forEach(tag=>{
  tag.addEventListener('click', tagSelection);
})