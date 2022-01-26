/**
 * BUTTONS CHEVRON
 */
// const button = document.querySelector("nav [role='button']");
// const icon = document.querySelector(".icon__chevron");

// button.addEventListener('click', chevronTurn)

// function chevronTurn(){
//   if(icon.className === 'icon__chevron'){
//     icon.classList.add('icon__chevron--up');
//   }
//   else {
//     icon.classList.remove('icon__chevron--up');
//   }
// }
const buttonContainer = document.querySelector('#buttonIngredients');
const inputContainer = document.querySelector('#inputIngredients');
const inputButton = document.querySelector('#inputIngredients .icon__chevron--up');

let buttonStatus = true;

function componentSwicth(){
  if(buttonStatus){
    inputContainer.style.display = 'block';
    buttonContainer.style.display = 'none';
    buttonStatus = false;
  } else if(!buttonStatus) {
    inputContainer.style.display = 'none';
    buttonContainer.style.display = 'block';
    buttonStatus = true;
  }
}

buttonContainer.addEventListener('click', componentSwicth)
inputButton.addEventListener('click', componentSwicth)