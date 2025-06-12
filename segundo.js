const tierList = JSON.parse(localStorage.getItem('tierList')) || {
  S: [], A: [], B: [], C: [], D: []
};

['S', 'A', 'B', 'C', 'D'].forEach(tier => {
    const tierDiv = document.getElementById(tier);
    if (!tierDiv) return;
    const mostrarTier = tierDiv.querySelector('.juegos');
    if (!mostrarTier) return;
    mostrarTier.innerHTML = '';

    if (tier === 'S') {
        const fijo = document.createElement('div');
        fijo.textContent = 'Programacion Web';
        mostrarTier.appendChild(fijo);
    }
    if (tier === 'D') {
        const fijo = document.createElement('div');
        fijo.textContent = 'Informatica General';
        mostrarTier.appendChild(fijo);
    }

    tierList[tier].forEach(juego => {
        if ((tier === 'S' && juego === 'Programacion Web') || (tier === 'D' && juego === 'Informatica General')) {
            return;
        }
        const div = document.createElement('div');
        div.textContent = juego;
        mostrarTier.appendChild(div);
    });
});

const botonVolver = document.getElementById('volver')
botonVolver.addEventListener('click',()=>{
    window.location.href = 'index.html';
})