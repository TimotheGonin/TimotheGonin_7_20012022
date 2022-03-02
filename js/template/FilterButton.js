import { dataSwitcher } from "../tools/getData.js";
import { capitalize, singular } from "../tools/toolbox.js";
import recipes from "../../data/recipes.js";


// FILTER BUTTONS/INPUT CONTAINER
const filterButtonContainer = document.querySelector('#filterButtons');
const tagButtonsContainer = document.querySelector('#tagButtons');


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

function filterButtonFactory(array){
  for (const element of array) {

    //BLOCK BUTTON
    const filterButton = document.createElement('div');
    filterButton.className = "col-2 p-0 me-3";
    filterButton.id = `button${anglifyLabel(element)}`;
    filterButton.innerHTML = `
      <div class="button-filter btn btn-${colorPallet(element)} p-4">
        <h2 class="fs-5 m-0 text-white">${capitalize(element)}</h2>
        <span class="icon__chevron"></span>
      </div>
    `;  

    // BLOCK FORM/INPUT
    const filterInput = document.createElement('div');
    filterInput.className = "col p-0 me-3 rounded";
    filterInput.id = `input${anglifyLabel(element)}`;
    filterInput.innerHTML = `
      <form class="button-filter bg-${colorPallet(element)} p-4 rounded-0 rounded-top">
        <input type="text" class="button-filter__input" placeholder="Rechercher un ${singular(element)}" aria-label="Rechercher un ${singular(element)}">
        <span class="icon__chevron icon__chevron--up"></span>
      </form> 
    `;  

    // DROPDOWN LIST
    const filterListContainer = document.createElement('div');
    filterListContainer.className = `dropDown__container container-fluid bg-${colorPallet(element)} p-3 pt-0 rounded-bottom`;
    
    //data type
    const dataParameter = anglifyLabel(element).toLowerCase();
    const allItems = dataSwitcher(dataParameter,recipes);

    const itemsList = document.createElement('ul');
    itemsList.className = "dropDown__list list-unstyled list-group";

    allItems.forEach(item => {
      const filterItem = document.createElement('li');
      filterItem.className = "dropDown__item px-0 my-1";
      filterItem.setAttribute('data-active','false');
      filterItem.setAttribute('data-name',item);
      filterItem.textContent = item;
      itemsList.appendChild(filterItem);
    }) 

    //Append
    filterListContainer.appendChild(itemsList);
    filterInput.appendChild(filterListContainer);
    filterButtonContainer.appendChild(filterButton);
    filterButtonContainer.appendChild(filterInput);
  }
}



// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ EVENT                                                                        │
// └──────────────────────────────────────────────────────────────────────────────┘

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


const filtersButtonLabels = new Array('ingrédients', 'appareils', 'ustensiles');
filterButtonFactory(filtersButtonLabels);


const buttons = Array.from(document.querySelectorAll('#buttonAppliances, #buttonIngredients, #buttonUtensils'));
const chevrons = Array.from(document.querySelectorAll('#inputIngredients .icon__chevron--up, #inputAppliances .icon__chevron--up, #inputUtensils .icon__chevron--up'))


buttons.forEach(button=>{
  button.addEventListener('click', filterButtonSwicth);
});
chevrons.forEach(chevron=>{
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