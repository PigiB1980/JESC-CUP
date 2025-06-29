document.addEventListener('DOMContentLoaded', () => {
  const anno = document.body.getAttribute('data-anno');
  const jsonFile = `data-${anno}.json`;  // <-- backtick per template string

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
      // Calcola il totale per ogni entry
      data.forEach(item => {
        item.totale = (item.voto * 10) * item.voce * item.coreografia;
      });

      // Ordina decrescente per totale
      data.sort((a, b) => b.totale - a.totale);

      tbody.innerHTML = '';

      data.forEach((item, index) => {
        const tr = document.createElement('tr');

        // Evidenzia le prime 3 posizioni
        if (index < 3) tr.classList.add('top-three');

        // Posizione
        const tdPos = document.createElement('td');
        tdPos.textContent = `${index + 1}°`;
        tr.appendChild(tdPos);

        // Paese con bandiera
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

        // Voto canzone
        const tdVoto = document.createElement('td');
        tdVoto.textContent = item.voto.toFixed(1);
        tr.appendChild(tdVoto);

        // Coeff. voce
        const tdVoce = document.createElement('td');
        tdVoce.textContent = item.voce.toFixed(1);
        tr.appendChild(tdVoce);

        // Coeff. coreografia
        const tdCoreo = document.createElement('td');
        tdCoreo.textContent = item.coreografia.toFixed(1);
        tr.appendChild(tdCoreo);

        // Totale
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
