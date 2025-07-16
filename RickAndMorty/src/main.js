import './components/rick-and-morty-app.js';
import { registerTranslateConfig, use } from 'lit-translate';

registerTranslateConfig({
  loader: async (lang) => {
    const response = await fetch(`./locales/${lang}.json`);
    return response.json();
  }
});

use('es'); 