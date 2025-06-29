document.addEventListener('DOMContentLoaded', () => {
  const anni = [];
  for(let y = 2003; y <= 2024; y++) anni.push(y);

  const medagliereContainer = document.getElementById('medagliere-container');
  medagliereContainer.innerHTML = '';

  // Mappa per convertire nome paese -> codice bandiera (in minuscolo)
  function getCodiceBandiera(paese) {
    const mapping = {
      "malta": "mt",
      "belgio": "be",
      "russia": "ru",
      "bulgaria": "bg",
      "bielorussia": "by",
      "svezia": "se",
      "armenia": "am",
      "ucraina": "ua",
      "lettonia": "lv",
      "georgia": "ge",
      "romania": "ro",
      "italia": "it",
      "spagna": "es",
      "azerbaijan": "az",
      "cipro": "cy",
      "norvegia": "no",
      "paesi bassi": "nl",
      "danimarca": "dk",
      "croazia": "hr",
      "serbia": "rs",
      "malta": "mt",
      "ucraina": "ua",
      // Aggiungi altri se servono
    };
    return mapping[paese.toLowerCase()] || "xx";
  }

  // Conta medaglie
  const medagliePerPaese = {};

  function calcolaPunteggio(entry) {
    return (entry.voto * 10) * entry.voce * entry.coreografia;
  }

  function creaTabellaPodio(anno, dati) {
    dati.sort((a,b) => calcolaPunteggio(b) - calcolaPunteggio(a));
    const top3 = dati.slice(0,3);

    top3.forEach((entry,i) => {
      if(!medagliePerPaese[entry.paese]) medagliePerPaese[entry.paese] = {oro:0,argento:0,bronzo:0};
      if(i===0) medagliePerPaese[entry.paese].oro++;
      else if(i===1) medagliePerPaese[entry.paese].argento++;
      else medagliePerPaese[entry.paese].bronzo++;
    });

    const div = document.createElement('section');
    div.className = 'year-section';

    div.innerHTML = `
      <h2>${anno}</h2>
      <table>
        <thead>
          <tr><th>Pos.</th><th>Paese</th><th>Punteggio</th></tr>
        </thead>
        <tbody>
          ${top3.map((entry,i) => {
            const posEmoji = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
            const score = calcolaPunteggio(entry).toFixed(1);
            const flagCode = getCodiceBandiera(entry.paese);
            return `<tr>
              <td>${posEmoji}</td>
              <td><img class="flag-icon" src="flags/${flagCode}.png" alt="${entry.paese}"> ${entry.paese}</td>
              <td>${score}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    `;
    return div;
  }

  function creaClassificaMedaglie() {
    const classificaArray = Object.entries(medagliePerPaese).map(([paese, medaglie]) => ({
      paese,
      oro: medaglie.oro,
      argento: medaglie.argento,
      bronzo: medaglie.bronzo
    }));

    classificaArray.sort((a,b) => {
      if(b.oro !== a.oro) return b.oro - a.oro;
      if(b.argento !== a.argento) return b.argento - a.argento;
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
          ${classificaArray.map(c => {
            const flagCode = getCodiceBandiera(c.paese);
            return `<tr>
              <td><img class="flag-icon" src="flags/${flagCode}.png" alt="${c.paese}"> ${c.paese}</td>
              <td>${c.oro}</td>
              <td>${c.argento}</td>
              <td>${c.bronzo}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    `;
    medagliereContainer.insertBefore(div, medagliereContainer.firstChild);
  }

  async function caricaDatiAnno(anno) {
    try {
      const response = await fetch(`data-${anno}.json`);
      if(!response.ok) throw new Error(`File data-${anno}.json non trovato`);
      const dati = await response.json();

      if(!dati.some(e => e.voto > 0 || e.voce > 0 || e.coreografia > 0)) return null;

      return creaTabellaPodio(anno, dati);
    } catch(e) {
      console.warn(`Errore caricamento dati per ${anno}:`, e);
      return null;
    }
  }

  async function caricaTutti() {
    for(const anno of anni) {
      const podio = await caricaDatiAnno(anno);
      if(podio) medagliereContainer.appendChild(podio);
    }
    if(medagliereContainer.children.length === 0) {
      medagliereContainer.innerHTML = '<p class="loading">Nessun dato disponibile per il medagliere.</p>';
    } else {
      creaClassificaMedaglie();
    }
  }

  caricaTutti();
});
