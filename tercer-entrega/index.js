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
            const spotId= `R${fila + 1 }C${column + 1}`; //Se asigna el id para cada elemento

            spot.id= spotId; //Asignacion del id al div
            spot.classList.add('parking-spot');
            spot.innerText = spotId;
            grid.appendChild(spot)
        }
    }
};


//Crea la matriz
createParkingGrid();
