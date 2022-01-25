/**
 * BUTTONS CHEVRON
 */
const button = document.querySelector("nav [role='button']");
const icon = document.querySelector(".icon__chevron");

button.addEventListener('click', chevronTurn)

function chevronTurn(){
  if(icon.className === 'icon__chevron'){
    icon.classList.add('icon__chevron--up');
  }
  else {
    icon.classList.remove('icon__chevron--up');
  }
}