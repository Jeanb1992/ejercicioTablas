import { LitElement, html, css } from 'lit';
import './filter-form.js';
import './character-card.js';
import '../utils/data-manager.js';
import { translate } from 'lit-translate';

export class RickAndMortyApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: 'Roboto', Arial, sans-serif;
      background: #f5f5f5;
      min-height: 100vh;
    }
    .characters {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
    }
  `;

  static properties = {
    characters: { type: Array },
    allCharacters: { type: Array },
    filters: { type: Object },
    loading: { type: Boolean },
    error: { type: String },
  };

  constructor() {
    super();
    this.characters = [];
    this.allCharacters = [];
    this.filters = { filterType: 'name', filterValue: '' };
    this.loading = false;
    this.error = '';
  }

  firstUpdated() {
    this.fetchCharacters();
  }

  async fetchCharacters() {
    this.loading = true;
    this.error = '';
    try {
      const data = await window.dataManager.getCharacters();
      this.allCharacters = data;
      this.characters = data;
    } catch (e) {
      this.error = translate('errorLoading');
    }
    this.loading = false;
  }

  onFilterChange(e) {
    this.filters = { ...e.detail };
    this.applyLocalFilter();
  }

  applyLocalFilter() {
    const { filterType, filterValue } = this.filters;
    if (!filterValue) {
      this.characters = this.allCharacters;
      return;
    }
    this.characters = this.allCharacters.filter(char => {
      let value = '';
      if (filterType === 'name') value = char.name;
      else if (filterType === 'status') value = char.status;
      else if (filterType === 'species') value = char.species;
      else if (filterType === 'type') value = char.type;
      else if (filterType === 'gender') value = char.gender;
      else if (filterType === 'origin') value = char.origin?.name;
      return value && value.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  render() {
    return html`
      <filter-form
        .filters=${this.filters}
        @filter-change=${this.onFilterChange}
      ></filter-form>
      ${this.loading
        ? html`<p>${translate('loading')}</p>`
        : this.error
        ? html`<p>${this.error}</p>`
        : html`
            <div class="characters">
              ${this.characters.map(
                (char) => html`<character-card .character=${char}></character-card>`
              )}
            </div>
          `}
    `;
  }
}

customElements.define('rick-and-morty-app', RickAndMortyApp); 