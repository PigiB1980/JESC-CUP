document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('results');
  tbody.innerHTML = '';

  // Funzione per convertire codice paese in emoji bandiera
  function codeToEmoji(code) {
    if (!code) return '';
    const mapping = {
      'A': '\u{1F1E6}', 'B': '\u{1F1E7}', 'C': '\u{1F1E8}', 'D': '\u{1F1E9}',
      'E': '\u{1F1EA}', 'F': '\u{1F1EB}', 'G': '\u{1F1EC}', 'H': '\u{1F1ED}',
      'I': '\u{1F1EE}', 'J': '\u{1F1EF}', 'K': '\u{1F1F0}', 'L': '\u{1F1F1}',
      'M': '\u{1F1F2}', 'N': '\u{1F1F3}', 'O': '\u{1F1F4}', 'P': '\u{1F1F5}',
      'Q': '\u{1F1F6}', 'R': '\u{1F1F7}', 'S': '\u{1F1F8}', 'T': '\u{1F1F9}',
      'U': '\u{1F1FA}', 'V': '\u{1F1FB}', 'W': '\u{1F1FC}', 'X': '\u{1F1FD}',
      'Y': '\u{1F1FE}', 'Z': '\u{1F1FF}',
    };
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
