fetch('data-2003.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById('results');

    data.forEach(item => {
      const tr = document.createElement('tr');

      // Cell con bandiera + nome paese
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

      // Altre celle con dati
      const tdVoto = document.createElement('td');
      tdVoto.textContent = item.voto.toFixed(1);
      tr.appendChild(tdVoto);

      const tdVoce = document.createElement('td');
      tdVoce.textContent = item.voce.toFixed(1);
      tr.appendChild(tdVoce);

      const tdCoreo = document.createElement('td');
      tdCoreo.textContent = item.coreografia.toFixed(1);
      tr.appendChild(tdCoreo);

      // Calcolo punteggio totale
      const punteggioTotale = (item.voto * 10) * item.voce * item.coreografia;
      const tdTotale = document.createElement('td');
      tdTotale.textContent = punteggioTotale.toFixed(2);
      tr.appendChild(tdTotale);

      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Errore caricamento dati:', error);
  });
