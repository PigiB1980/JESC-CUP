document.addEventListener('DOMContentLoaded', () => {
  const anno = document.body.getAttribute('data-anno');
  if (!anno) {
    console.error('Nessun anno trovato nell\'attributo data-anno del body');
    return;
  }
const currentYear = parseInt(anno, 10);
  const minYear = 2003;
  const maxYear = 2011;

  // Gestione pulsanti navigazione anno
  const prevBtn = document.getElementById('prev-year');
  const nextBtn = document.getElementById('next-year');

  if (currentYear > minYear) {
    prevBtn.addEventListener('click', () => {
      window.location.href = `${currentYear - 1}.html`;
    });
  } else {
    prevBtn.disabled = true;
    prevBtn.style.opacity = 0.5;
  }

  if (currentYear < maxYear) {
    nextBtn.addEventListener('click', () => {
      window.location.href = `${currentYear + 1}.html`;
    });
  } else {
    nextBtn.disabled = true;
    nextBtn.style.opacity = 0.5;
  }
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

        // Coeff. voce (2 decimali)
        const tdVoce = document.createElement('td');
        tdVoce.textContent = item.voce.toFixed(2);
        tr.appendChild(tdVoce);

        // Coeff. coreografia (2 decimali)
        const tdCoreo = document.createElement('td');
        tdCoreo.textContent = item.coreografia.toFixed(2);
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
