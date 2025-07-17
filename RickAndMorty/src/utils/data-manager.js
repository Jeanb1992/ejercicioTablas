import { translate } from 'lit-translate';

class DataManager {
  apiUrl = 'https://rickandmortyapi.com/api/character';

  async getCharacters() {
    let url = this.apiUrl;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error ');
    const data = await res.json();
   
    let enriched = await Promise.all(
      data.results.map(async (char) => {
        const originDim = await this.getDimension(char.origin.url);
        const locationDim = await this.getDimension(char.location.url);
        return {
          ...char,
          originDimension: originDim,
          locationDimension: locationDim,
        };
      })
    );
    return enriched;
  }

  async getDimension(url) {
    if (!url) return '';
    try {
      const res = await fetch(url);
      if (!res.ok) return '';
      const data = await res.json();
      return data.dimension || '';
    } catch {
      return '';
    }
  }
}

window.dataManager = new DataManager();
export default window.dataManager; 