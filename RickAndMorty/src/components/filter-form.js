import { LitElement, html, css } from 'lit';
import { nothing } from 'lit';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/select/filled-select.js';
import '@material/web/button/filled-button.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import { translate } from 'lit-translate';
import { createRef, ref } from 'lit/directives/ref.js';

export class FilterForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 24px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 16px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    form {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: end;
      justify-content: center;
    }
    md-filled-text-field, md-filled-select {
      flex: 1 1 180px;
    }
  `;

  static properties = {
    filters: { type: Object },
  };

  constructor() {
    super();
    this.menuOpen = false;
    this.buttonId = 'filterTypeButton';
  }

  handleInput(e) {
    const { name, value } = e.target;
    const newFilters = { ...this.filters, [name]: value };
    // No disparamos el evento aquí, solo notificamos al hacer submit
    this._pendingFilters = newFilters;
  }

  handleSubmit(e) {
    e.preventDefault();
    const filtersToSend = this._pendingFilters || this.filters;
    console.log('Filtro enviado:', filtersToSend);
    this.dispatchEvent(new CustomEvent('filter-change', {
      detail: filtersToSend,
      bubbles: true,
      composed: true,
    }));
    this._pendingFilters = undefined;
  }

  handleMenuAction(e) {
    const selected = e.detail.index;
    const options = [
      'name',
      'status',
      'species',
      'type',
      'gender',
      'origin',
    ];
    const newFilters = { filterType: options[selected], filterValue: '' };
    console.log('Opción seleccionada:', options[selected], 'Nuevo filtro:', newFilters);
    this.menuOpen = false;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('filter-change', {
      detail: newFilters,
      bubbles: true,
      composed: true,
    }));
    this._pendingFilters = undefined;
  }

  async openMenu() {
    await this.updateComplete;
    this.menuOpen = true;
    this.requestUpdate();
  }

  getInputLabel() {
    switch (this.filters.filterType) {
      case 'name': return translate('filterName');
      case 'status': return translate('filterStatus');
      case 'species': return translate('filterSpecies');
      case 'type': return translate('filterTypeOption');
      case 'gender': return translate('filterGender');
      case 'origin': return translate('filterOrigin');
      default: return translate('filterValue');
    }
  }

  render() {
    const filterLabels = [
      translate('filterName'),
      translate('filterStatus'),
      translate('filterSpecies'),
      translate('filterTypeOption'),
      translate('filterGender'),
      translate('filterOrigin'),
    ];
    const filterValues = [
      'name',
      'status',
      'species',
      'type',
      'gender',
      'origin',
    ];
    return html`
      <form @submit=${this.handleSubmit.bind(this)} autocomplete="off">
        <select
          name="filterType"
          .value=${this.filters.filterType || 'name'}
          @change=${e => {
            const newFilters = { ...this.filters, filterType: e.target.value, filterValue: '' };
            this.dispatchEvent(new CustomEvent('filter-change', {
              detail: newFilters,
              bubbles: true,
              composed: true,
            }));
          }}
          style="min-width: 180px; height: 40px; border-radius: 4px; border: 1px solid #ccc; padding: 0 8px;"
        >
          ${filterValues.map((val, i) => html`<option value="${val}">${filterLabels[i]}</option>`) }
        </select>
        <md-filled-text-field
          type="text"
          name="filterValue"
          .value=${this.filters.filterValue || ''}
          @input=${this.handleInput}
          label="${this.getInputLabel()}"
        ></md-filled-text-field>
        <md-filled-button type="submit">${translate('filter')}</md-filled-button>
      </form>
    `;
  }
}

customElements.define('filter-form', FilterForm); 