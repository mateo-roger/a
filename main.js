const tierList = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: []};

const inputNombre = document.getElementById('nombreJuego');
const categTier = document.getElementById('tierList');
const botonAgregar = document.getElementById('botonAgregar');
const inputEditar = document.getElementById('editarJuego');
const botonEditar = document.getElementById('botonEditar');
const botonEliminar = document.getElementById('botonEliminar');
const botonFinal = document.getElementById('botonFinal');

const mensaje = document.getElementById('mensaje');

botonFinal.addEventListener('click', () => {
    localStorage.setItem('tierList', JSON.stringify(tierList));
    window.location.href = 'tier.html';
});

function mostrarJuegos(){
    ['S', 'A', 'B', 'C', 'D'].forEach(tier => {
        const mostrarTier = document.querySelector(`#tier${tier} .juegos`);
        mostrarTier.innerHTML = '';
        tierList[tier].forEach(juego => {
            const div = document.createElement('div');
            div.textContent = juego;
            mostrarTier.appendChild(div);
        })})}

function buscarJuego(name){
    let resultado = null;
    ['S','A','B','C','D'].forEach(tier => {
        const juegos = tierList[tier]
        const juego = juegos.indexOf(name)
        if (juego !== -1 ){
            resultado = {tier, juego};
        }
    })
    return resultado;
}

function eliminarJuego(nombre){
    if (!nombre){
        return mensaje.textContent = 'Ingresa un juego'
    };
    const existe = buscarJuego(nombre);
    if (!existe){
        return mensaje.textContent = `${nombre} no existe.`
    }
    tierList[existe.tier].splice(existe.juego,1);
    inputNombre.value = '';
    inputEditar.value = '';
    categTier.value = 'N';
    mostrarJuegos();
    mensaje.textContent = `Se elimino ${nombre}`

}

function agregarJuego(nombre,tier){
    if (!nombre) {
        return mensaje.textContent = 'Ingresa un juego.'
    }
    if (buscarJuego(nombre)){
        return mensaje.textContent = `${nombre} ya existe`
    }
    if (tier == 'N'){
        return mensaje.textContent = `Elegir categoria.`        
    }

    tierList[tier].push(nombre);
    inputNombre.value = '';
    inputEditar.value = '';
    categTier.value = 'N';
    mensaje.textContent = `Se agrego ${nombre} a la categoria ${tier}`;
    mostrarJuegos();
}

botonAgregar.addEventListener('click',()=>{
    const nombre = inputNombre.value.trim()
    const tier = categTier.value
    agregarJuego(nombre,tier)
    inputNombre.value = '';
    inputEditar.value = '';
    categTier.value = 'N';
})

botonEditar.addEventListener('click',()=>{
    const nombreUno = inputNombre.value.trim();
    const nombreDos = inputEditar.value.trim();
    const existe =  buscarJuego(nombreUno);
    const tierNuevo = categTier.value;
    
    if (!existe){
        return mensaje.textContent = `${nombreUno} no existe.`
    }
    if (!nombreUno){
        return mensaje.textContent = `Para editar pone la materia que queres modiicar y como modificarla (palabra o clasificacion).`
    }

    if (!nombreDos){
        eliminarJuego(nombreUno)
        agregarJuego(nombreUno,tierNuevo)
            inputNombre.value = '';
            inputEditar.value = '';
            categTier.value = 'N';

    }
    else{
        eliminarJuego(nombreUno)
        agregarJuego(nombreDos,tierNuevo)
            inputNombre.value = '';
            inputEditar.value = '';
            categTier.value = 'N';
    }

})

botonEliminar.addEventListener('click',()=>{
    const nombre = inputNombre.value.trim();
    if (!nombre){
        return mensaje.textContent = 'Ingresa un juego'
    }
    eliminarJuego(nombre)
    inputNombre.value = '';
    inputEditar.value = '';
    categTier.value = 'N';
})
