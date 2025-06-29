document.addEventListener('DOMContentLoaded', () => {
  const anno = document.body.getAttribute('data-anno');
  const jsonFile = `data-${anno}.json`;
  const tbody = document.getElementById('results');
  if (!tbody) {
    console.error('Elemento tbody con id "results" non trovato');
    return;
  }

  fetch(jsonFile)
    .then(response => {
      if (!response.ok) throw new Error(`Impossibile caricare il file ${jsonFile}`);
      return response.json();
    })
    .then(data => {
      // Calcola il totale e aggiungi come proprietà
      data.forEach(item => {
        item.totale = (item.voto * 10) * item.voce * item.coreografia;
      });

      // Ordina decrescente per totale
      data.sort((a, b) => b.totale - a.totale);

      tbody.innerHTML = ''; // Pulisci la tabella

      data.forEach((item, index) => {
        const tr = document.createElement('tr');

        // Aggiungi la classe top-three alle prime 3 posizioni
        if (index < 3) {
          tr.classList.add('top-three');
        }

        // Colonna posizione
        const tdPos = document.createElement('td');
        tdPos.textContent = `${index + 1}°`;
        tr.appendChild(tdPos);

        // Colonna paese con bandierina
        const tdPaese = document.createElement('td');
        const imgFlag = document.createElement('img');
        imgFlag.src = `flags/${item.code}.png`;
        imgFlag.alt = `${item.paese} flag`;
        imgFlag.classList.add('flag-icon');
        tdPaese.appendChild(imgFlag);

        const spanText = document.createElement('span');
        spanText.textContent = ` ${item.paese}`;
        tdPaese.appendChild(spanText);
        tr.appendChild(tdPaese);

        // Voto canzone (1 decimale)
        const tdVoto = document.createElement('td');
        tdVoto.textContent = item.voto.toFixed(1);
        tr.appendChild(tdVoto);

        // Coeff. voce (1 decimale)
        const tdVoce = document.createElement('td');
        tdVoce.textContent = item.voce.toFixed(1);
        tr.appendChild(tdVoce);

        // Coeff. coreografia (1 decimale)
        const tdCoreo = document.createElement('td');
        tdCoreo.textContent = item.coreografia.toFixed(1);
        tr.appendChild(tdCoreo);

        // Totale (2 decimali)
        const tdTotale = document.createElement('td');
        tdTotale.textContent = item.totale.toFixed(2);
        tr.appendChild(tdTotale);

        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Errore nel caricamento o elaborazione dati:', error);
    });
});

// 🏳 Funzione per mappare i nomi dei paesi ai codici delle bandiere
function getCodiceBandiera(paese) {
  const mapping = {
    "Malta": "mt",
    "Belgio": "be",
    "Russia": "ru",
    "Bulgaria": "bg",
    "Bielorussia": "by",
    "Svezia": "se",
    "Armenia": "am",
    "Ucraina": "ua",
    "Lettonia": "lv",
    "Georgia": "ge",
    "Romania": "ro",
    "Italia": "it",
    "Spagna": "es",
    "Azerbaijan": "az",
    "Cipro": "cy",
    "Norvegia": "no",
    "Paesi Bassi": "nl",
    "Danimarca": "dk",
    "Croazia": "hr"
    // Aggiungi altri se servono
  };
  return mapping[paese] || "xx"; // fallback generico
}

// 🥇 Funzione per creare la classifica totale delle medaglie
function creaClassificaMedaglie() {
  const classificaArray = Object.entries(medagliePerPaese).map(([paese, medaglie]) => ({
    paese,
    oro: medaglie.oro,
    argento: medaglie.argento,
    bronzo: medaglie.bronzo
  }));

  classificaArray.sort((a, b) => {
    if (b.oro !== a.oro) return b.oro - a.oro;
    if (b.argento !== a.argento) return b.argento - a.argento;
    return b.bronzo - a.bronzo;
  });

  const div = document.createElement('section');
  div.className = 'year-section';

  div.innerHTML = `
    <h2>Classifica Medaglie Totale</h2>
    <table>
      <thead>
        <tr><th>Paese</th><th>🥇 Oro</th><th>🥈 Argento</th><th>🥉 Bronzo</th></tr>
      </thead>
      <tbody>
        ${classificaArray.map(c => `
          <tr>
            <td><img class="flag-icon" src="flags/${getCodiceBandiera(c.paese)}.png" alt="${c.paese}"> ${c.paese}</td>
            <td>${c.oro}</td>
            <td>${c.argento}</td>
            <td>${c.bronzo}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  medagliereContainer.insertBefore(div, medagliereContainer.firstChild);
}
