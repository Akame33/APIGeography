
const cardContainer = document.getElementById('container');

async function fetchData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    createCards(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

function createCards(data) {
  data.forEach(country => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${country.flag.png}" alt="Flag of ${country.name.common}">
        <p><strong>Country :</strong> ${country.name.common}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region :</strong> ${country.region}</p>
        <p><strong>Population :</strong> ${country.population.toLocaleString()} inhabitant</p>
    `;
    cardContainer.appendChild(card);
  });
}

fetchData();
console.log(data);

