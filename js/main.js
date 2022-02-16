const mainSearchInput = document.querySelector('#mainSearch');
const cardsContainer = document.querySelector('main>div');

const errorMessage1 = 'Veuillez entrer 3 caratères minimum.';
const lengthValidation = '3 caractères OK';
const errorMessage2 = 'Aucune recette ne correspond à votre critère... vous pouvez chercher "tartes au pommes", "poisson", etc.';
mainSearchInput.addEventListener('input', cardsFilter);

function cardsFilter(e){
  cardsContainer.innerHTML = ``;
  const entry = e.target.value.toLowerCase();

  //LENGTH VALID
  if(entry.length < 3){
    console.log(errorMessage1);
  } else {
    console.log(lengthValidation);
  }
}