// Selecciona el elemento del DOM con un ID de "pokemon-container"
const pokemonContainer = document.getElementById('pokemon-container');

// Envía una solicitud GET al endpoint de PokeAPI para los primeros 151 Pokemon
axios.get('https://pokeapi.co/api/v2/pokemon?limit=1006')
	.then(response => {
		// Extrae la matriz de objetos Pokemon de la respuesta
		const pokemons = response.data.results;

		// Recorre cada objeto Pokemon
		pokemons.forEach(pokemon => {
			// Crea un nuevo elemento <div> para el Pokemon
			const pokemonDiv = document.createElement('div');

			// Agrega la clase "pokemon" al elemento <div>
			pokemonDiv.classList.add('pokemon');

			// Establece el HTML interno del elemento <div> para mostrar el nombre, la imagen del Pokemon y un <div> vacío para los detalles
			pokemonDiv.innerHTML = `
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png">
				<p>${pokemon.name}</p>
				<div class="details"></div>
			`;

			// Agrega un event listener al elemento <div> que escucha los clics
			pokemonDiv.addEventListener('click', () => {
				// Encuentra el elemento <div> con la clase "details" dentro del elemento <div> clickeado
				const detailsDiv = pokemonDiv.querySelector('.details');

				// Si el elemento <div> de detalles está vacío, envía una solicitud GET al endpoint de PokeAPI para obtener más detalles del Pokemon
				if (detailsDiv.innerHTML === '') {
					axios.get(pokemon.url)
						.then(response => {
							// Extrae los detalles del Pokemon de la respuesta
							const details = response.data;

							// Establece el HTML interno del elemento <div> de detalles para mostrar los detalles del Pokemon
							detailsDiv.innerHTML = `
								<p>Altura: ${details.height}</p>
								<p>Peso: ${details.weight}</p>
								<p>Habilidades:</p>
								<ul>
									${details.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
								</ul>
							`;

							// Muestra el elemento <div> de detall
							detailsDiv.style.width = '2000px'
							detailsDiv.style.height= '1000px'
							detailsDiv.style.display = 'block';
						})
						.catch(error => console.log(error));
				} else {
					// Si el elemento <div> de detalles ya está mostrándose, lo oculta; y viceversa
					detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
				}
			});

			// Agrega el elemento <div> de Pokemon al elemento del DOM seleccionado anteriormente
			pokemonContainer.appendChild(pokemonDiv);
		});
	})
	.catch(error => console.log(error));