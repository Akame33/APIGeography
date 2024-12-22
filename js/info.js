
// Fonctions créeant des cartes d'infos
const cardContainer = document.getElementById('container');

async function fetchData(triFunction) {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    let data = await response.json();
    if (triFunction){
        data = triFunction(data);
    }
    createCards(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

function createCards(data) {
    const cardContainer = document.getElementById('container');
    cardContainer.innerHTML = '';
    data.forEach(country => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <p><strong>Country :</strong> ${country.name.common}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region :</strong> ${country.region}</p>
            <p><strong>Population :</strong> ${country.population.toLocaleString()} inhabitant</p>
        `;
        cardContainer.appendChild(card);
    });
}

function Alphaorder(data){
    return data.sort((a, b) => {
    return a.name.common.localeCompare(b.name.common);
})}

fetchData(Alphaorder);


// Fonctions gérant les différents tris

function Contorder(data){
    data.sort((a, b) => {
    return a.name.common.localeCompare(b.name.common);
});
    return data.sort((a, b) => {
    return a.region.localeCompare(b.region);
})}

function Popdescorder(data){
    return data.sort((a, b) => b.population - a.population);
}

function Popascorder(data){
    return data.sort((a, b) => a.population - b.population);
}

document.querySelector('.alpha').addEventListener('click', () => {
    fetchData(Alphaorder);
});
document.querySelector('.cont').addEventListener('click', () => {
    fetchData(Contorder);
});
document.querySelector('.popdesc').addEventListener('click', () => {
    fetchData(Popdescorder);
});
document.querySelector('.popasc').addEventListener('click', () => {
    fetchData(Popascorder);
});