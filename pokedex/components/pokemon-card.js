const TYPE_COLORS = {
  normal:    { bg: '#A8A77A', text: '#fff' },
  fire:      { bg: '#EE8130', text: '#fff' },
  water:     { bg: '#6390F0', text: '#fff' },
  electric:  { bg: '#F7D02C', text: '#333' },
  grass:     { bg: '#7AC74C', text: '#fff' },
  ice:       { bg: '#96D9D6', text: '#333' },
  fighting:  { bg: '#C22E28', text: '#fff' },
  poison:    { bg: '#A33EA1', text: '#fff' },
  ground:    { bg: '#E2BF65', text: '#333' },
  flying:    { bg: '#A98FF3', text: '#fff' },
  psychic:   { bg: '#F95587', text: '#fff' },
  bug:       { bg: '#A6B91A', text: '#fff' },
  rock:      { bg: '#B6A136', text: '#fff' },
  ghost:     { bg: '#735797', text: '#fff' },
  dragon:    { bg: '#6F35FC', text: '#fff' },
  dark:      { bg: '#705746', text: '#fff' },
  steel:     { bg: '#B7B7CE', text: '#333' },
  fairy:     { bg: '#D685AD', text: '#fff' }
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .card-container {
      display: block;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      background: linear-gradient(135deg, #fffbe6 0%, #ffe066 100%);
      border: 4px solid #e6b800;
      border-radius: 22px;
      padding: 24px 18px 18px 18px;
      min-height: 420px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      position: relative;
      font-family: 'Segoe UI', Arial, sans-serif;
      transition: background 0.3s, border-color 0.3s;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    .poke-name {
      font-size: 2em;
      font-weight: bold;
      color: #fff;
      letter-spacing: 1px;
      text-shadow: 2px 2px 6px #000, 0 1px 0 #fffbe6;
    }
    .poke-type-ps {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }
    .poke-ps {
      font-size: 1.1em;
      font-weight: bold;
      background: #fffbe6;
      border-radius: 8px;
      padding: 2px 10px;
      margin-bottom: 2px;
      transition: color 0.3s;
    }
    .poke-types {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 2px;
    }
    .poke-type-badge {
      background: #fff !important;
      border-radius: 8px;
      padding: 2px 10px;
      font-size: 0.95em;
      font-weight: 500;
      border-width: 2px;
      border-style: solid;
      margin-bottom: 2px;
      transition: background 0.3s, color 0.3s;
      color: #333;
    }
    .poke-images {
      display: flex;
      gap: 18px;
      justify-content: center;
      margin: 18px 0 10px 0;
    }
    .poke-img-type {
      border-width: 2px;
      border-style: solid;
      border-radius: 12px;
      width: 90px;
      height: 90px;
      background: #fff;
      object-fit: contain;
      transition: border-color 0.3s;
    }
    .stats-section {
      background: #fffde4;
      border-radius: 14px;
      border: 2px solid #ffe066;
      padding: 12px 10px 8px 10px;
      margin-top: 8px;
      font-size: 1em;
    }
    .poke-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 4px;
      background: transparent;
    }
    .poke-table th, .poke-table td {
      padding: 6px 8px;
      text-align: left;
      border: none;
    }
    .poke-table th {
      font-weight: 600;
      background: none;
      transition: color 0.3s;
    }
    .poke-table tr:nth-child(even) {
      background: #fffbe6;
    }
    .poke-table tr:nth-child(odd) {
      background: #fffde4;
    }
    .poke-abilities {
      margin-top: 8px;
      font-size: 1em;
      color: #555;
    }
    /* Colores de tipo para el texto de badges */
    .type-normal    { color: #A8A77A !important; }
    .type-fire      { color: #EE8130 !important; }
    .type-water     { color: #6390F0 !important; }
    .type-electric  { color: #F7D02C !important; }
    .type-grass     { color: #7AC74C !important; }
    .type-ice       { color: #96D9D6 !important; }
    .type-fighting  { color: #C22E28 !important; }
    .type-poison    { color: #A33EA1 !important; }
    .type-ground    { color: #E2BF65 !important; }
    .type-flying    { color: #A98FF3 !important; }
    .type-psychic   { color: #F95587 !important; }
    .type-bug       { color: #A6B91A !important; }
    .type-rock      { color: #B6A136 !important; }
    .type-ghost     { color: #735797 !important; }
    .type-dragon    { color: #6F35FC !important; }
    .type-dark      { color: #705746 !important; }
    .type-steel     { color: #B7B7CE !important; }
    .type-fairy     { color: #D685AD !important; }
    .card-container.type-normal    { background: #A8A77A !important; border-color: #A8A77A !important; }
    .card-container.type-fire      { background: #EE8130 !important; border-color: #EE8130 !important; }
    .card-container.type-water     { background: #6390F0 !important; border-color: #6390F0 !important; }
    .card-container.type-electric  { background: #F7D02C !important; border-color: #F7D02C !important; }
    .card-container.type-grass     { background: #7AC74C !important; border-color: #7AC74C !important; }
    .card-container.type-ice       { background: #96D9D6 !important; border-color: #96D9D6 !important; }
    .card-container.type-fighting  { background: #C22E28 !important; border-color: #C22E28 !important; }
    .card-container.type-poison    { background: #A33EA1 !important; border-color: #A33EA1 !important; }
    .card-container.type-ground    { background: #E2BF65 !important; border-color: #E2BF65 !important; }
    .card-container.type-flying    { background: #A98FF3 !important; border-color: #A98FF3 !important; }
    .card-container.type-psychic   { background: #F95587 !important; border-color: #F95587 !important; }
    .card-container.type-bug       { background: #A6B91A !important; border-color: #A6B91A !important; }
    .card-container.type-rock      { background: #B6A136 !important; border-color: #B6A136 !important; }
    .card-container.type-ghost     { background: #735797 !important; border-color: #735797 !important; }
    .card-container.type-dragon    { background: #6F35FC !important; border-color: #6F35FC !important; }
    .card-container.type-dark      { background: #705746 !important; border-color: #705746 !important; }
    .card-container.type-steel     { background: #B7B7CE !important; border-color: #B7B7CE !important; }
    .card-container.type-fairy     { background: #D685AD !important; border-color: #D685AD !important; }
    @media (max-width: 600px) {
      .card-container {
        padding: 10px 2px;
        min-height: 320px;
      }
      .poke-images img, .poke-img-type {
        width: 60px;
        height: 60px;
      }
      .poke-name {
              padding-left: 1em;       
         font-size: 2.0em;
      }
    }
  </style>
  <div class="card-container">
    <div class="placeholder">Selecciona un Pokémon del listado para ver su información</div>
    <div class="pokemon-card-content"></div>
  </div>
`;

const TYPE_CLASSES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying',
  'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

class PokemonCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.content = this.shadowRoot.querySelector('.pokemon-card-content');
    this.placeholder = this.shadowRoot.querySelector('.placeholder');
    this.cardContainer = this.shadowRoot.querySelector('.card-container');
  }

  setPokemon(pokemon) {
    this.placeholder.style.display = 'none';
    // Limpiar clases de tipo previas
    TYPE_CLASSES.forEach(type => this.cardContainer.classList.remove('type-' + type));
    const mainType = pokemon.types[0].type.name;
    this.cardContainer.classList.add('type-' + mainType);
    const types = pokemon.types.map(t =>
      `<span class="poke-type-badge type-${t.type.name}">${t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}</span>`
    ).join(' ');
    const abilities = pokemon.abilities.map(a => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)).join(', ');
    const stats = {};
    pokemon.stats.forEach(s => { stats[s.stat.name] = s.base_stat; });
    this.content.innerHTML = `
      <div class="header">
        <div class="poke-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
        <div class="poke-type-ps">
          <div class="poke-ps type-${mainType}">PS ${stats.hp || '-'}</div>
          <div class="poke-types">${types}</div>
        </div>
      </div>
      <div class="poke-images">
        <img class="poke-img-type" src="${pokemon.sprites.front_default}" alt="Frente">
        <img class="poke-img-type" src="${pokemon.sprites.back_default}" alt="Espalda">
        <img class="poke-img-type" src="${pokemon.sprites.front_shiny}" alt="Frente Shiny">
      </div>
      <div class="stats-section">
        <table class="poke-table">
          <tr><th class="type-${mainType}">Experiencia Base</th><td>${pokemon.base_experience}</td></tr>
          <tr><th class="type-${mainType}">Altura</th><td>${pokemon.height / 10} m</td></tr>
          <tr><th class="type-${mainType}">Ataque</th><td>${stats.attack || '-'}</td></tr>
          <tr><th class="type-${mainType}">Defensa</th><td>${stats.defense || '-'}</td></tr>
          <tr><th class="type-${mainType}">Velocidad</th><td>${stats.speed || '-'}</td></tr>
        </table>
        <div class="poke-abilities"><b>Habilidades:</b> ${abilities}</div>
      </div>
    `;
  }
}

customElements.define('pokemon-card', PokemonCard); 