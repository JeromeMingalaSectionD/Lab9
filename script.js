$(document).ready(function() {
    const gallery = $('#gallery');

    async function fetchRandomPokemon() {
        const randomId = Math.floor(Math.random() * 898) + 1; 
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return {
                imgUrl: data.sprites.front_default,
                name: data.name,
                height: data.height,
                weight: data.weight,
                types: data.types.map(typeInfo => typeInfo.type.name).join(', ')
            };
        } catch (error) {
            console.error('Failed to fetch Pokémon:', error);
            alert('Could not load Pokémon. Please try again.');
        }
    }

    async function loadPokemon() {
        const { imgUrl, name, height, weight, types } = await fetchRandomPokemon();
        const galleryItem = $(`
            <div class="gallery-item">
                <img src="${imgUrl}" alt="${name}" class="pokemon-thumbnail">
                <p>${name.charAt(0).toUpperCase() + name.slice(1)}</p>
            </div>
        `);
        gallery.append(galleryItem);

        galleryItem.find('.pokemon-thumbnail').click(function() {
            showLightbox(imgUrl, name, height, weight, types);
        });
    }

    function showLightbox(imgUrl, name, height, weight, types) {
        $('#lightbox-image').attr('src', imgUrl);
        $('#lightbox-name').text(name.charAt(0).toUpperCase() + name.slice(1));
        $('#lightbox-info').text(`Height: ${height / 10} m, Weight: ${weight / 10} kg, Types: ${types}`);
        $('#lightbox').show();
    }

    $('.close').click(function() {
        $('#lightbox').hide();
    });

    $('#load-btn').click(loadPokemon);
    $('#clear-btn').click(function() {
        gallery.empty();
    });
});
