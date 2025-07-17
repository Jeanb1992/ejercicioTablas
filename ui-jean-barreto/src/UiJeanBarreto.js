import { LitElement, html } from 'lit-element';
import styles from './ui-jean-barreto.css.js';

export class UiJeanBarreto extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      pokemons: { type: Array },
      loading: { type: Boolean },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
    this.loading = true;
    this.error = '';
  }

  firstUpdated() {
    this.fetchPokemons();
  }

  async fetchPokemons() {
    this.loading = true;
    this.error = '';
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      const data = await res.json();
      const promises = data.results.map(async (poke) => {
        const pokeRes = await fetch(poke.url);
        return await pokeRes.json();
      });
      this.pokemons = await Promise.all(promises);
    } catch (e) {
      this.error = 'Error al cargar los Pokémon.';
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="container">
        <div>
          <h1>Pokédex (Top 20)</h1>
          <p>Lista de Pokémon obtenida desde la PokéAPI</p>
          ${this.loading ? html`<p>Cargando...</p>` : ''}
          ${this.error ? html`<p style="color:red;">${this.error}</p>` : ''}
          <div class="pokemon-list">
            ${this.pokemons.map(poke => html`
              <div class="poke-card">
                <img class="poke-img" src="${poke.sprites.front_default}" alt="${poke.name}" />
                <div class="poke-name">${poke.name}</div>
                <div class="poke-types">
                  ${poke.types.map(t => html`<span class="poke-type-badge">${t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}</span>`)}
                </div>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-jean-barreto', UiJeanBarreto);
