const baseUrl = 'https://pokeapi.co/api/v2';

const nombre = document.getElementById('nombre');
const especie = document.getElementById('especie');
const habilidad = document.getElementById('habilidad');
const banner = document.getElementById('banner');

async function pokemonAleatorio() {
    try {
        const id = Math.floor(Math.random() * 897 + 1)
        const response = await fetch(`${baseUrl}/pokemon/${id}`);
        const data = await response.json();
        imagen.innerHTML = `<img src="${data.sprites.other.home.front_default}">`;
        imagenBanner.innerHTML = `<img src="${data.sprites.other.home.front_shiny}">`;
        let habilities =data.abilities.map(value=>value.ability.name).join();
        habilidad.innerHTML =habilities;
       
        nombre.innerHTML = data.name;
        especie.innerHTML = data.species.name;
        return data;

    } catch (error) {
        console.log(error);
    }
}



const pokebola = document.getElementById('pokebola');
const obj_top = document.getElementById('top');
const obj_bottom = document.getElementById('bottom');
const imagen = document.getElementById('imagen');
const imagenBanner = document.getElementById('imagenBanner');

const btn_izquierda = document.getElementById('izquierda');
const btn_abrir = document.getElementById('abrir');
const btn_cerrar = document.getElementById('cerrar');




let intervalInicio = null;
let intervalFin = null;
let intervalSalir = null;
const resetPokebola = () => {
    window.clearTimeout(intervalInicio);
    window.clearTimeout(intervalFin);

}


btn_izquierda.addEventListener('click', () => {
    banner.classList.remove('mostrarBanner');

    btn_izquierda.disabled = true;
    cerrarPokebola();
    setTimeout(() => {
        resetPokebola();
        terminarEntrada();
        salir();

        intervalInicio = setTimeout(() => {
            terminarsalir();
            entrar();
            intervalFin = setTimeout(() => {
                pokemonAleatorio().then(data => {
                    banner.classList.add('mostrarBanner');
                    terminarEntrada();
                    //console.log(data);
                    abrirPokebola();
                    btn_izquierda.disabled = false;
                })
            }, 1000);

        }, 1000);
    }, 400);


})


const abrirPokebola = () => {
    obj_top.classList.add('abrirArriba');
    obj_bottom.classList.add('abrirAbajo');
}

const cerrarPokebola = () => {
    obj_top.classList.remove('abrirArriba');
    obj_bottom.classList.remove('abrirAbajo');
}

const entrar = () => {
    pokebola.classList.add('moverDerecha');
}
const terminarEntrada = () => {
    pokebola.classList.remove('moverDerecha')
}
const salir = () => {
    pokebola.classList.add('moverIzquierda')
}
const terminarsalir = () => {
    pokebola.classList.remove('moverIzquierda')
}