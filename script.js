fetch('data-2003.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById('results');
    tbody.innerHTML = '';

    // Funzione per trasformare codice ISO in emoji bandiera
    function codeToEmoji(code) {
  if (!code) return '';
  // Assicura che il codice sia maiuscolo
  const upperCode = code.toUpperCase();
  // Trasforma ogni lettera in Regional Indicator Symbol Letter
  return [...upperCode]
    .map(c => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join('');
}

    data.forEach(item => {
      const tr = document.createElement('tr');

      // Colonna Paese con emoji bandiera
      const tdPaese = document.createElement('td');
      const flagEmoji = codeToEmoji(item.code || '');
tdPaese.textContent = flagEmoji + ' ' + item.paese;
      tr.appendChild(tdPaese);

      // Voto canzone
      const tdVoto = document.createElement('td');
      tdVoto.textContent = item.voto.toFixed(1);
      tr.appendChild(tdVoto);

      // Voce
      const tdVoce = document.createElement('td');
      tdVoce.textContent = item.voce.toFixed(1);
      tr.appendChild(tdVoce);

      // Coreografia
      const tdCoreo = document.createElement('td');
      tdCoreo.textContent = item.coreografia.toFixed(1);
      tr.appendChild(tdCoreo);

      // Punteggio totale calcolato
      const tdPunteggio = document.createElement('td');
      const punteggio = item.voto * 10 * item.voce * item.coreografia;
      tdPunteggio.textContent = punteggio.toFixed(1);
      tr.appendChild(tdPunteggio);

      tbody.appendChild(tr);
    });
  })
  .catch(error => console.error('Errore nel caricamento dati:', error));
