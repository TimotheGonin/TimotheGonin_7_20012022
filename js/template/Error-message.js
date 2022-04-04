//NOT FOUNDED MESSAGE
export const notFoundedMessage = document.createElement('div');
notFoundedMessage.classList.add('my-5')
notFoundedMessage.classList.add('hidden');
notFoundedMessage.innerHTML = `
	<p class="error-message">
		Aucune recette ne correspond à votre critère… vous pouvez
		chercher " tarte aux pommes ", " poisson ", etc.	
	</p>
`;
document.body.appendChild(notFoundedMessage);