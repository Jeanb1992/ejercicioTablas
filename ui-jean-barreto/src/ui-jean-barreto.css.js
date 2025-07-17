import { css } from 'lit-element';

export default css`
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
:host {
  display: block;
  box-sizing: border-box;
  font-family: "Montserrat", Arial, sans-serif;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}

.card {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  min-width: 320px;
}

h1 {
  margin-bottom: 1rem;
  color: #2d3436;
  font-family: "Montserrat", Arial, sans-serif;
  font-weight: 700;
}

p {
  color: #636e72;
  font-family: "Montserrat", Arial, sans-serif;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-top: 2rem;
}

.poke-card {
  background: #fffbe6;
  border: 2px solid #ffe066;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 18px 14px 14px 14px;
  min-width: 180px;
  max-width: 200px;
  text-align: center;
  transition: box-shadow 0.2s;
  font-family: "Montserrat", Arial, sans-serif;
}

.poke-card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
}

.poke-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.poke-name {
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
  margin-bottom: 4px;
  text-transform: capitalize;
  font-family: "Montserrat", Arial, sans-serif;
}

.poke-types {
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
}

.poke-type-badge {
  background: #ffd600;
  color: #333;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 0.95em;
  font-weight: 500;
  margin-bottom: 2px;
  border: none;
  font-family: "Montserrat", Arial, sans-serif;
}
`;
