const template = document.createElement('template');
template.innerHTML = `
  <style>
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin: 16px 0;
    }
    button {
      background: #1877f2;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 6px 16px;
      font-size: 1em;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:disabled {
      background: #b0c4e7;
      cursor: not-allowed;
    }
    .page-info {
      font-weight: bold;
      color: #1877f2;
    }
  </style>
  <div class="pagination">
    <button class="prev">Anterior</button>
    <span class="page-info">1 / 15</span>
    <button class="next">Siguiente</button>
  </div>
`;

class PaginationControls extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.prevBtn = this.shadowRoot.querySelector('.prev');
    this.nextBtn = this.shadowRoot.querySelector('.next');
    this.pageInfo = this.shadowRoot.querySelector('.page-info');
    this.page = 1;
    this.total = 15;
  }

  connectedCallback() {
    this.prevBtn.addEventListener('click', () => this.changePage(this.page - 1));
    this.nextBtn.addEventListener('click', () => this.changePage(this.page + 1));
    this.update();
  }

  setPages(page, total) {
    this.page = page;
    this.total = total;
    this.update();
  }

  changePage(newPage) {
    if (newPage < 1 || newPage > this.total) return;
    this.page = newPage;
    this.update();
    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: { page: this.page },
      bubbles: true,
      composed: true
    }));
  }

  update() {
    this.pageInfo.textContent = `${this.page} / ${this.total}`;
    this.prevBtn.disabled = this.page === 1;
    this.nextBtn.disabled = this.page === this.total;
  }
}

customElements.define('pagination-controls', PaginationControls); 