import './components/pokemon-list.js';
import './components/pokemon-card.js';

document.addEventListener('pokemon-selected', (e) => {
  const card = document.querySelector('pokemon-card');
  if (card) {
    card.setPokemon(e.detail);
  }
}); 