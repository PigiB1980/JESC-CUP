fetch('data-2003.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('results');
    data.forEach(entry => {
        const total = ((entry.voto * 10) * entry.voce * entry.coreografia).toFixed(2);
        const row = `<tr>
            <td>${entry.paese}</td>
            <td>${entry.voto}</td>
            <td>${entry.voce}</td>
            <td>${entry.coreografia}</td>
            <td>${total}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
  });
