// Creamos un nuevo elemento <div> para el objeto
const itemDiv = document.createElement('div');

// Agregamos la clase "item" al elemento div
itemDiv.classList.add('item');

// Establecemos el HTML interno del elemento div para mostrar el nombre, la imagen y los detalles del objeto
itemDiv.innerHTML = `
    <img src="${itemDetails.sprites.default}">
    <p>${itemDetails.name}</p>
    <div class="details">
        <p>Categoría: ${itemDetails.category.name}</p>
        <p>Precio: ${itemDetails.cost} ${itemDetails.currency.name}</p>
        <p>Descripción: ${itemDetails.effect_entries[0].short_effect}</p>
    </div>`;

// Agregamos un event listener al elemento div que actua cuando hacemos clic en el propio contenedor
itemDiv.addEventListener('click', () => {
    // Encuentra el elemento div con la clase "details" dentro del elemento div clickeado
    const detailsDiv = itemDiv.querySelector('.details');

    // Si el elemento div de detalles está vacío, lo mostramos
    if (detailsDiv.innerHTML === '') {
        // Enviamos una solicitud GET al endpoint de PokeAPI para obtener más detalles del objeto
        axios.get(itemDetails.category.url)
            .then(response => {
                // Extraemos los detalles de la categoría del objeto de respuesta
                const categoryDetails = response.data;

                // Agregamos los detalles de la categoría al elemento div de detalles
                detailsDiv.innerHTML = `
                    <p>Descripción de la categoría: ${categoryDetails.descriptions[0].description}</p>
                    <p>Objetos relacionados:</p>
                    <ul>
                        ${categoryDetails.items.map(item => `<li>${item.name}</li>`).join('')}
                    </ul>
                `;

                // Mostramos el elemento div de detalles
                detailsDiv.style.display = 'block';
            })
            .catch(error => console.log(error));
    } else {
        // Si el elemento div de detalles ya está mostrándose, lo ocultamos
        detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
    }
});

// Agregamos el elemento div del objeto al elemento del DOM seleccionado anteriormente
itemContainer.appendChild(itemDiv);
})
.catch(error => console.log(error));