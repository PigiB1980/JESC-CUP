document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('results');
  tbody.innerHTML = '';

  // Funzione per convertire codice paese in emoji bandiera
  function codeToEmoji(countryCode) {
  const OFFSET = 0x1F1E6 - 'A'.charCodeAt(0);
  const chars = countryCode.toUpperCase().split('');
  return String.fromCodePoint(
    chars[0].charCodeAt(0) + OFFSET,
    chars[1].charCodeAt(0) + OFFSET
  );
}
    code = code.toUpperCase();
    return (mapping[code[0]] || '') + (mapping[code[1]] || '');
  }

  // Dati di prova, un solo paese per vedere la bandiera
  const testData = [
    { paese: 'Belgio', code: 'be', voto: 7.5, voce: 1.6, coreografia: 2.0 }
  ];

  testData.forEach(item => {
    const tr = document.createElement('tr');

    const tdPaese = document.createElement('td');
    tdPaese.textContent = codeToEmoji(item.code) + ' ' + item.paese;
    tr.appendChild(tdPaese);

    const tdVoto = document.createElement('td');
    tdVoto.textContent = item.voto;
    tr.appendChild(tdVoto);

    const tdVoce = document.createElement('td');
    tdVoce.textContent = item.voce;
    tr.appendChild(tdVoce);

    const tdCoreo = document.createElement('td');
    tdCoreo.textContent = item.coreografia;
    tr.appendChild(tdCoreo);

    const tdTotale = document.createElement('td');
    const totale = item.voto * 10 * item.voce * item.coreografia;
    tdTotale.textContent = totale.toFixed(2);
    tr.appendChild(tdTotale);

    tbody.appendChild(tr);
  });
});
