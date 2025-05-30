fetch('data/data.2003.json')
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById('results');
    tbody.innerHTML = ''; // pulisco il contenuto precedente
    
    data.forEach(item => {
      const tr = document.createElement('tr');
      
      // Colonna Paese con bandiera
      const tdPaese = document.createElement('td');
      const img = document.createElement('img');
      img.src = `flags/${item.code}.png`; // cartella flags con immagini bandiere
      img.alt = `${item.paese} bandiera`;
      img.style.width = '24px';
      img.style.marginRight = '8px';
      img.style.verticalAlign = 'middle';
      tdPaese.appendChild(img);
      tdPaese.appendChild(document.createTextNode(item.paese));
      tr.appendChild(tdPaese);
      
      // Voto Canzone
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
      
      // Punteggio Totale = (voto*10)*voce*coreografia
      const tdTotale = document.createElement('td');
      const totale = (item.voto * 10) * item.voce * item.coreografia;
      tdTotale.textContent = totale.toFixed(1);
      tr.appendChild(tdTotale);
      
      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Errore nel caricamento dei dati:', error);
  });
