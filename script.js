const results = document.getElementById('results');

// Leggi l'anno dall'attributo data-anno del body
const anno = document.body.getAttribute('data-anno');

fetch(`data-${anno}.json`)
  .then(response => response.json())
  .then(data => {
    data.forEach((item, index) => {
      const tr = document.createElement('tr');

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
      spanText.textContent = item.paese;
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

      // Totale calcolato
      const totale = (item.voto * 10) * item.voce * item.coreografia;
      const tdTotale = document.createElement('td');
      tdTotale.textContent = totale.toFixed(2);
      tr.appendChild(tdTotale);

      results.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Errore caricamento dati:', error);
  });
