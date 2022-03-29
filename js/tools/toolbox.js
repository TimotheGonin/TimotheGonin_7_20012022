/**
 * Converts a label to its anglified version
 * @param label - The label of the category to be anglified.
 * @returns the anglified label.
 */
export function anglifyLabel(label){
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
 * Given a string, capitalize the first letter of the string
 * @param string - The string to capitalize.
 * @returns Nothing.
 */
export function capitalize(string){
  const newString = string.charAt(0).toUpperCase() +
  string.slice(1);
  return newString;
}

/**
 * Given a label, return the color pallet that should be used for that label
 * @param label - The label of the entity.
 * @returns The colorPallet function returns a string.
 */
export function colorPallet(label){
  let colorPallet;

  switch (anglifyLabel(label).toLowerCase()) {
    case 'appliances':
      colorPallet = 'secondary';
      break;
    case 'ingredients':
      colorPallet = 'primary';
      break;
    case 'utensils':
      colorPallet = 'tertiary';
      break;
  
    default:
      break;
  }

  return colorPallet;
}

/**
 * 
 * @param {string} userInput 
 * @returns true / false
 */
export const lengthChecker = (string) =>{
  string = string.length < 3 ? false :  true;
  return string;
}


/**
 * Given a string, return a new string with the last character removed
 * @param string - The string to be modified.
 * @returns The original string without the last character.
 */
export function singular(string){
  const newString = string.slice(0,string.length - 1);
  return newString;
}


