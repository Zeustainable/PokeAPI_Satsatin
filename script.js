// Initialization
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const btnRefresh = document.getElementById('refreshPage');
const txtSearchBar = document.getElementById('txtSearchBar');
const outputResult = document.getElementById('outputResult');
const outputName = document.getElementById('outputName');

// Button to search for pokemon
btnSearch.addEventListener("click", async () => {
  const pokemonName = txtSearchBar.value.toLowerCase();

  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName);

    if (!response.ok) {
      throw new Error('Error fetching Pokémon data: ' + response.status);
    }

    // Initialization
    const pokemonData = await response.json();
    const imageUrl = pokemonData.sprites.front_default;
    const stats = pokemonData.stats;
    const image = document.createElement('img');

    image.src = imageUrl;
    image.alt = 'Image of ' + pokemonName;

    const statsList = document.createElement('ul');

    stats.forEach(stat => {
      const statItem = document.createElement('li');
      statItem.textContent = stat.stat.name.toUpperCase() + ': ' + stat.base_stat;
      statsList.appendChild(statItem);
    });

    const title = document.createElement('h2');
    title.textContent = pokemonData.name.toUpperCase();

    // Clear previous results
    outputResult.innerHTML = "";
    outputName.innerHTML = "";

    outputResult.appendChild(image);
    outputResult.appendChild(statsList);
    outputName.appendChild(title);

  } catch (error) {
    console.error("Error:", error);
    outputResult.innerHTML = 'Error: ' + error.message;
    outputName.innerHTML = "";
  }

  // Clear search textfield
  txtSearchBar.value = "";
});

// Button to clear the user input
btnClear.addEventListener("click", async () => {
  outputResult.innerHTML = "";
  outputName.innerHTML = "";

  txtSearchBar.value = "";
});

// Button to refresh the page
btnRefresh.addEventListener("click", async () => {
  outputResult.innerHTML = "";
  outputName.innerHTML = "";

  txtSearchBar.value = "";
});