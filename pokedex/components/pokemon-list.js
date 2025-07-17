
import './pokemon-list-item.js';
import './pagination.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      height: 100%;
    }
    .list-container {
      padding: 16px;
    }
    .loading {
      text-align: center;
      color: #888;
      margin-top: 40px;
    }
    .fav-filter {
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .filter-btn {
      background: #ffd600;
      color: #333;
      border: none;
      border-radius: 6px;
      padding: 4px 12px;
      font-size: 1em;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s;
    }
    .filter-btn.active {
      background: #1877f2;
      color: #fff;
    }
  </style>
  <div class="list-container">
    <div class="fav-filter">
      <button class="filter-btn all-btn active" title="Ver todos">Todos</button>
      <button class="filter-btn fav-filter-btn" title="Ver solo favoritos">★ Favoritos</button>
    </div>
    <div class="loading">Cargando pokemones...</div>
    <div class="pokemon-list"></div>
    <pagination-controls></pagination-controls>
  </div>
`;

const POKEMONS_PER_PAGE = 10;
const TOTAL_POKEMONS = 150;
const TOTAL_PAGES = Math.ceil(TOTAL_POKEMONS / POKEMONS_PER_PAGE);

function getFavorites() {
  return JSON.parse(localStorage.getItem('poke_favs') || '[]');
}
function setFavorites(favs) {
  localStorage.setItem('poke_favs', JSON.stringify(favs));
}

class PokemonList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.listContainer = this.shadowRoot.querySelector('.pokemon-list');
    this.loading = this.shadowRoot.querySelector('.loading');
    this.pagination = this.shadowRoot.querySelector('pagination-controls');
    this.favFilterBtn = this.shadowRoot.querySelector('.fav-filter-btn');
    this.allBtn = this.shadowRoot.querySelector('.all-btn');
    this.currentPage = 1;
    this.onlyFavs = false;
    this.favorites = getFavorites();
  }

  connectedCallback() {
    this.pagination.setPages(this.currentPage, TOTAL_PAGES);
    this.pagination.addEventListener('page-changed', (e) => {
      this.currentPage = e.detail.page;
      this.loadPokemons();
    });
    this.favFilterBtn.addEventListener('click', () => {
      this.onlyFavs = true;
      this.favFilterBtn.classList.add('active');
      this.allBtn.classList.remove('active');
      this.currentPage = 1;
      this.loadPokemons();
    });
    this.allBtn.addEventListener('click', () => {
      this.onlyFavs = false;
      this.allBtn.classList.add('active');
      this.favFilterBtn.classList.remove('active');
      this.currentPage = 1;
      this.loadPokemons();
    });
    this.loadPokemons();
  }

  async loadPokemons() {
    this.loading.style.display = '';
    this.listContainer.innerHTML = '';
    let offset = (this.currentPage - 1) * POKEMONS_PER_PAGE;
    let limit = POKEMONS_PER_PAGE;
    let pokemons = [];
    try {
      if (this.onlyFavs) {
        // Mostrar solo favoritos
        const allFavs = this.favorites.slice();
        const start = (this.currentPage - 1) * POKEMONS_PER_PAGE;
        const pageFavs = allFavs.slice(start, start + limit);
        for (const name of pageFavs) {
          const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const pokeData = await pokeRes.json();
          pokemons.push(pokeData);
        }
        this.pagination.setPages(this.currentPage, Math.max(1, Math.ceil(allFavs.length / POKEMONS_PER_PAGE)));
      } else {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();
        for (const poke of data.results) {
          const pokeRes = await fetch(poke.url);
          const pokeData = await pokeRes.json();
          pokemons.push(pokeData);
        }
        this.pagination.setPages(this.currentPage, TOTAL_PAGES);
      }
      for (const pokeData of pokemons) {
        const item = document.createElement('pokemon-list-item');
        item.shadowRoot.querySelector('.poke-img').src = pokeData.sprites.front_default;
        item.shadowRoot.querySelector('.poke-img').alt = pokeData.name;
        item.shadowRoot.querySelector('.poke-name').textContent = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
        item.shadowRoot.querySelector('.poke-type').textContent = pokeData.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(' / ');
        item.pokemonData = pokeData;
        item.isFavorite = this.favorites.includes(pokeData.name);
        item.addEventListener('click', () => {
          this.dispatchEvent(new CustomEvent('pokemon-selected', {
            detail: pokeData,
            bubbles: true,
            composed: true
          }));
        });
        item.addEventListener('toggle-favorite', (e) => {
          this.toggleFavorite(e.detail.name);
        });
        this.listContainer.appendChild(item);
      }
      this.loading.style.display = 'none';
    } catch (e) {
      this.loading.textContent = 'Error al cargar pokemones';
    }
  }

  toggleFavorite(name) {
    if (!name) return;
    const idx = this.favorites.indexOf(name);
    if (idx === -1) {
      this.favorites.push(name);
    } else {
      this.favorites.splice(idx, 1);
    }
    setFavorites(this.favorites);
    this.loadPokemons();
  }
}

customElements.define('pokemon-list', PokemonList); 