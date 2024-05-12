(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('evolution');
  
    document.title += ` ${pokemonName.toUpperCase()}`;
  
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    ).then(response => response.json());
  
    const sprites = Object.values(response.sprites).filter(
      el => typeof el == 'string'
    );
  
    let x = 0;
  
    document.getElementById('pokemon-img').addEventListener('click', () => {
      x < sprites.length - 1 ? x++ : (x = 0);
      document.querySelector('#pokemon-img').src = sprites[x];
    });
  
    document.querySelector(
      '#informacoes'
    ).textContent = `Informacoes sobre o ${pokemonName}`;
  
    document.querySelector('#pokemon-img').src = sprites[x];
  })();