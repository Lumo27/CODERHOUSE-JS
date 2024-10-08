/* Definimos el valor fijo de la matriz para el parkingGrid */
const gridSize= 5; 
/* Funcion para crear la matriz de parkingGrid */
const createParkingGrid = () => {
    /* Seleccionamos del dom la grilla para el estacionamiento */
    const grid = document.getElementById('parkingGrid');

    /* Genereacion de matriz */
    for( let fila = 0; fila < gridSize; fila++){
        for (let column = 0; column < gridSize; column++){
            /* 
            Dos for para crear la matriz, mientras que el largo sea menor al preestablecido en gridsize
            y luego creamos cada spot(plaza de estacionamiento).
            */
            const spot = document.createElement('div'); //Se crea el elemento individual
            const spotId= `F${fila + 1 } C${column + 1}`; //Se asigna el id para cada elemento

            spot.id= spotId; //Asignacion del id al div
            spot.classList.add('parking-spot');
            spot.innerText = spotId;
            spot.classList.add('parking-spot');
            spot.innerText = spotId;
            grid.appendChild(spot)

            // Agregar el evento de clic a la plaza
            spot.addEventListener('click', handleSpotClick);

        }
    }
};

/* Funcion para crear el boton de compra y la funcion onClick */
const createBuyButton = () => {
    const button = document.createElement('button'); // Crear el botón
    button.innerText = 'Buy place'; // Texto del botón
    button.id = 'buyButton'; // Asignar un id al botón

    // Establecer un evento al botón (puedes personalizarlo más tarde)
    button.addEventListener('click', () => {
        alert('Buy place button clicked!'); // Solo un ejemplo de acción
    });

    // Agregar el botón al DOM (por ejemplo, justo después de la grilla)
    const gridContainer = document.getElementById('parkingGrid'); // Asegúrate de tener un contenedor para la grilla y el botón
    gridContainer.appendChild(button);
};
//Declaracion de un arreglo para ir metiendo los spots seleccionados
let selectedSpots = [] ;
//Funcion para manejar el clickeo de spots
const handleSpotClick = (e) => {
    //Capturamos el elemento, y guardamos su id
    let spot = e.target;
    let spotId= spot.id;

    if(selectedSpots.includes(spotId)){
        spot.classList.remove('selected');
        selectedSpots = selectedSpots.filter(id => id !== spotId);
        // Si esta seleccionado, se agarra el spot, y se le quita la clase selected, para que vuelva a ser del color inicial
    }else{
        spot.classList.add('selected');
        selectedSpots.push(spotId);
    }
}

//Crea la matriz
createParkingGrid();
//Crea el boton para terminar la seleccion
createBuyButton();

