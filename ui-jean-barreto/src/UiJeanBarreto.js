import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ui-jean-barreto.css.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <ui-jean-barreto></ui-jean-barreto>
 * ```
 */
export class UiJeanBarreto extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      username: { type: String },
      password: { type: String },
      loggedIn: { type: Boolean },
      posts: { type: Array }
    };
  }

  constructor() {
    super();
    this.name = 'Red Social Demo';
    this.username = '';
    this.password = '';
    this.loggedIn = false;
    this.posts = [
      { user: 'Ana', content: '¡Hola a todos!' },
      { user: 'Luis', content: '¡Qué buen día!' }
    ];
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('ui-jean-barreto-shared-styles'),
    ];
  }

  handleInput(e) {
    this[e.target.name] = e.target.value;
  }

  login(e) {
    e.preventDefault();
    if (this.username && this.password) {
      this.loggedIn = true;
    }
  }

  render() {
    return html`
      <div class="container">
        <header>
          <h1>${this.name}</h1>
        </header>
        ${this.loggedIn ? html`
          <section class="feed">
            <h2>Publicaciones</h2>
            <ul>
              ${this.posts.map(post => html`<li><b>${post.user}:</b> ${post.content}</li>`)}
            </ul>
          </section>
        ` : html`
          <form @submit="${this.login}">
            <h2>Iniciar sesión</h2>
            <input type="text" name="username" placeholder="Usuario" .value="${this.username}" @input="${this.handleInput}">
            <input type="password" name="password" placeholder="Contraseña" .value="${this.password}" @input="${this.handleInput}">
            <button type="submit">Entrar</button>
          </form>
        `}
        <slot></slot>
      </div>
    `;
  }
}
