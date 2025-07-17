const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      margin-bottom: 16px;
      background: #f4f6fb;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 12px 10px;
      cursor: pointer;
      transition: background 0.2s;
    }
    :host(:hover) {
      background: #e3eaff;
    }
    .poke-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .poke-img {
      width: 48px;
      height: 48px;
      object-fit: contain;
      background: #fff;
      border-radius: 50%;
      border: 1px solid #ddd;
    }
    .poke-info {
      flex: 1;
    }
    .poke-name {
      font-weight: bold;
      font-size: 1.1em;
      color: #333;
      margin: 0;
    }
    .poke-type {
      font-size: 0.95em;
      color: #666;
      margin: 0;
    }
    .fav-btn {
      background: none;
      border: none;
      font-size: 1.5em;
      cursor: pointer;
      color: #ffd600;
      margin-left: 8px;
      transition: transform 0.1s;
      outline: none;
    }
    .fav-btn.inactive {
      color: #ccc;
    }
  </style>
  <div class="poke-row">
    <img class="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur">
    <div class="poke-info">
      <div class="poke-name">Bulbasaur</div>
      <div class="poke-type">Planta / Veneno</div>
    </div>
    <button class="fav-btn inactive" title="Favorito">★</button>
  </div>
`;

class PokemonListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.favBtn = this.shadowRoot.querySelector('.fav-btn');
    this.favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleFavorite();
    });
    this._isFavorite = false;
  }

  set isFavorite(val) {
    this._isFavorite = val;
    this.favBtn.classList.toggle('inactive', !val);
  }

  get isFavorite() {
    return this._isFavorite;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.dispatchEvent(new CustomEvent('toggle-favorite', {
      detail: { name: this.pokemonData?.name },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('pokemon-list-item', PokemonListItem); 