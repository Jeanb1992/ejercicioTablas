import { LitElement, html, css } from 'lit';
import { translate } from 'lit-translate';

export class CharacterCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      width: 320px;
      overflow: hidden;
      font-family: 'Roboto', Arial, sans-serif;
    }
    .header {
      display: flex;
      align-items: center;
      padding: 16px;
      gap: 16px;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #eee;
    }
    .info {
      flex: 1;
    }
    .label {
      font-weight: bold;
      color: #666;
      font-size: 0.9em;
    }
    .value {
      margin-bottom: 4px;
    }
    .section {
      padding: 0 16px 16px 16px;
    }
  `;

  static properties = {
    character: { type: Object },
  };

  render() {
    const c = this.character || {};
    return html`
      <div class="header">
        <img src="${c.image}" alt="${c.name}" />
        <div class="info">
          <div class="label">${translate('name')}</div>
          <div class="value">${c.name}</div>
          <div class="label">${translate('status')}</div>
          <div class="value">${c.status}</div>
        </div>
      </div>
      <div class="section">
        <div class="label">${translate('species')}</div>
        <div class="value">${c.species}</div>
        <div class="label">${translate('gender')}</div>
        <div class="value">${c.gender}</div>
        <div class="label">${translate('origin')}</div>
        <div class="value">${c.origin?.name}</div>
        <div class="label">${translate('originDimension')}</div>
        <div class="value">${c.originDimension}</div>
        <div class="label">${translate('location')}</div>
        <div class="value">${c.location?.name}</div>
        <div class="label">${translate('locationDimension')}</div>
        <div class="value">${c.locationDimension}</div>
      </div>
    `;
  }
}

customElements.define('character-card', CharacterCard); 