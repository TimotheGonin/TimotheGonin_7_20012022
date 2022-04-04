//SELECT TAG
import { entryTypeSwitch } from "../main.js";


/**
 * Create a button for each tag
 * @param e - the event object
 */
export const tagSelection = (e) =>{
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

/**
 * Create a tag button and append it to the tagButtonsContainer
 * @param name - The name of the tag.
 * @param type - type of the tag 
 * @param color - The color of the tag button.
 */
const createTagButton = (name,type,color) => {

  //checking tag name already exist
  tagsCollection.forEach(tag=>{
    if (name === tag.name) {
      return;
    }
  })

  const tagInfo = {
    name,
    type
  };

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

  tagsCollection.push(tagInfo);
};

/**
 * It removes the tag from the tags collection.
 * @param e - The event object.
 */
const tagRemoving = (e) => {
  const elementContainer = e.target.parentNode;

  //loop to check tag name MATCH
  tagsCollection.forEach(tag=>{
    if(elementContainer.dataset.name===tag.name){
      tagsCollection.splice(tagsCollection.indexOf(tag),1);
      elementContainer.remove();
    }
  })

  // update recipe cards deck
  entryTypeSwitch();
}

export const tagsCollection = new Array;
export const tagButtonsContainer = document.querySelector('#tagButtons');
