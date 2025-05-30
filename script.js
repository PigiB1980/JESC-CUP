fetch('data-2003.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById('results');
    tbody.innerHTML = '';

    function codeToEmoji(code) {
      if (!code) return '';
      return [...code.toUpperCase()]
        .map(c => String.fromCodePoint(c.charCodeAt(0) + 127397))
        .join('');
    }

    data.forEach(item => {
      const tr = document.createElement('tr');

      const tdPaese = document.createElement('td');
      const flagEmoji = codeToEmoji(item.code);
      tdPaese.textContent = flagEmoji + ' ' + item.paese;
      tr.appendChild(tdPaese);

      const tdVoto = document.createElement('td');
      tdVoto.textContent = item.voto.toFixed(1);
      tr.appendChild(tdVoto);

      const tdVoce = document.createElement('td');
      tdVoce.textContent = item.voce.toFixed(1);
      tr.appendChild(tdVoce);

      const tdCoreo = document.createElement('td');
      tdCoreo.textContent = item.coreografia.toFixed(1);
      tr.appendChild(tdCoreo);

      const tdPunteggio = document.createElement('td');
      const punteggio = item.voto * 10 * item.voce * item.coreografia;
      tdPunteggio.textContent = punteggio.toFixed(1);
      tr.appendChild(tdPunteggio);

      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error('Errore caricamento dati:', err));
