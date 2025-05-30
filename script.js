fetch('data-2003.json')
    .then(response => response.json())
    .then(data => {
        const results = document.getElementById('results');
        results.innerHTML = '';

        data.forEach((entry, index) => {
            const totale = (entry.voto * 10) * entry.voce * entry.coreografia;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}°</td>
                <td><span class="flag-icon">${getFlagEmoji(entry.code)}</span>${entry.paese}</td>
                <td>${entry.voto}</td>
                <td>${entry.voce.toFixed(2)}</td>
                <td>${entry.coreografia.toFixed(2)}</td>
                <td>${totale.toFixed(1)}</td>
            `;
            results.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Errore caricando dati:', error);
    });
