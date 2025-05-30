const results = document.getElementById('results');

fetch('data-2003.json')
  .then(response => response.json())
  .then(dati => {
    dati.forEach((entry, index) => {
      const totale = (entry.voto * 10) * entry.voce * entry.coreografia;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}°</td>
        <td><img src="flags/${entry.code}.png" alt="${entry.paese} flag" class="flag-icon">${entry.paese}</td>
        <td>${entry.voto}</td>
        <td>${entry.voce.toFixed(2)}</td>
        <td>${entry.coreografia.toFixed(2)}</td>
        <td>${totale.toFixed(1)}</td>
      `;
      results.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Errore nel caricamento dei dati:', error);
  });
