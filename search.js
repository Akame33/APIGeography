// Fonction pour rechercher les informations du pays
const searchCountry = async () => {
    const countryName = document.getElementById("countryInput").value.trim(); // trim pour retirer les espaces
    const resultats = document.getElementById("results");

    // Vérification si l'utilisateur a saisi un nom
    if (!countryName) {
      resultats.innerHTML = "<p>Please enter a country name</p>";
      return;
    }

    try {
      // On appelle l'API RestCountries
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

      if (!response.ok) {
        throw new Error("No country found. Check spelling.");
      }

      const data = await response.json();

      // Vérification de si l'API renvoie des résultats ou pas
      if (data.length === 0) {
        throw new Error("No result found");
      }

      const country = data[0];

      // Extraire les informations nécessaires
      const countryFlag = country.flags.png;
      const countryNameCommon = country.name.common;
      const capital = country.capital[0];
      const region = country.region;
      const subregion = country.subregion;
      const population = country.population.toLocaleString();
      const area = country.area.toLocaleString();
      const currencies = country.currencies ? Object.values(country.currencies)
            .map(currency => `${currency.name} (${currency.symbol})`)
            .join(", ") : "";
      const languages = country.languages ? Object.values(country.languages).join(", ") : "";
      const borders = country.borders ? country.borders.join(", ") : "No bordering countries";
      const demonym = country.demonyms?.eng?.m || "";
      const callingCodes = country.idd
          ? `${country.idd.root}${country.idd.suffixes.join(", ")}`
          : "";
      const independent = country.independent ? "Yes" : "No";
      const latlng = country.latlng ? `Lat: ${country.latlng[0]}, Lng: ${country.latlng[1]}` : "";






      // Afficher les résultats sur la page
      resultats.innerHTML = `
        <img src="${countryFlag}" alt="Flag of ${countryNameCommon}">
        <p><strong>Country :</strong> ${countryNameCommon}</p>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Region :</strong> ${region}</p>
        <p><strong>Subregion :</strong> ${subregion}</p>
        <p><strong>Population :</strong> ${population}</p>
        <p><strong>Area :</strong> ${area}</p>
        <p><strong>Currency :</strong> ${currencies}</p>
        <p><strong>Languages :</strong> ${languages}</p>
        <p><strong>Borders :</strong> ${borders}</p>
        <p><strong>Demonym :</strong> ${demonym}</p>
        <p><strong>Calling Codes :</strong> ${callingCodes}</p>
        <p><strong>Independent :</strong> ${independent}</p>
        <p><strong>Coordinates :</strong> ${latlng}</p>


      `;
    } catch (error) {
      // Afficher si il y a des erreurs
      resultats.innerHTML = `<p style='color: red;'>Error : ${error.message}</p>`;
    }
  };

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('buttonresearch').click();
  }
});
  