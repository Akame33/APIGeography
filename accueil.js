// Fonction pour rechercher les informations du pays
const searchCountry = async () => {
    const countryName = document.getElementById("countryInput").value.trim(); // trim pour retirer les espaces
    const resultsDiv = document.getElementById("results");

    // Vérification si l'utilisateur a saisi un nom
    if (!countryName) {
      resultsDiv.innerHTML = "<p>Please enter a country name</p>";
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
      const population = country.population.toLocaleString();

      // Afficher les résultats sur la page
      resultsDiv.innerHTML = `
        <img src="${countryFlag}" alt="Flag of ${countryNameCommon}">
        <p><strong>Country :</strong> ${countryNameCommon}</p>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Region :</strong> ${region}</p>
        <p><strong>Population :</strong> ${population}</p>
      `;
    } catch (error) {
      // Afficher si il y a des erreurs
      resultsDiv.innerHTML = `<p style='color: red;'>Error : ${error.message}</p>`;
    }
  };
