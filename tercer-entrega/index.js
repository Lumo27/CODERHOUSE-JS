/* Definimos el valor fijo de la matriz para el parkingGrid */
const gridSize = 5;

/* Declaracion de un arreglo para ir metiendo los spots seleccionados */
let selectedSpots = [];

/* Funcion para crear la matriz de parkingGrid */
const createParkingGrid = () => {
    const grid = document.getElementById('parkingGrid');

    /* Generacion de matriz */
    for (let fila = 0; fila < gridSize; fila++) {
        for (let column = 0; column < gridSize; column++) {
            const spot = document.createElement('div');
            const spotId = `F${fila + 1}C${column + 1}`;
            
            spot.id = spotId;
            spot.classList.add('parking-spot');
            spot.innerText = spotId;
            grid.appendChild(spot);

            // Agregar el evento de clic a la plaza
            spot.addEventListener('click', handleSpotClick);
        }
    }
};

/* Funcion para crear el boton de compra */
const createBuyButton = () => {
    const button = document.createElement('button');
    button.innerText = 'Buy place';
    button.id = 'buyButton';

    button.addEventListener('click', handleOnClick);

    const gridContainer = document.getElementById('parkingGrid');
    gridContainer.appendChild(button);
};

/* Funcion para manejar el clickeo de spots */
const handleSpotClick = (e) => {
    let spot = e.target;
    let spotId = spot.id;

    // Si el spot está en el estado 'bought', lo "descompramos"
    if (spot.classList.contains('bought')) {
        spot.classList.remove('bought');
        // Eliminar del arreglo seleccionado (si corresponde)
        selectedSpots = selectedSpots.filter(id => id !== spotId);
    } 
    // Si el spot ya está seleccionado, lo deseleccionamos
    else if (selectedSpots.includes(spotId)) {
        spot.classList.remove('selected');
        // Eliminar del arreglo seleccionado
        selectedSpots = selectedSpots.filter(id => id !== spotId);
    } 
    // Si el spot no está seleccionado ni comprado, lo seleccionamos
    else {
        spot.classList.add('selected');
        selectedSpots.push(spotId); // Agregar al arreglo
    }
};

/* Funcion para manejar la compra */
const handleOnClick = () => {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '';  // Limpiamos el div antes de mostrar el nuevo mensaje

    if (selectedSpots.length > 0) {
        const messageBTN = document.createElement('p');
        messageBTN.innerText = `You have bought these spots: ${selectedSpots.join(', ')}`;
        messageDiv.appendChild(messageBTN);
        //Cambiamos la clase selected a bougth una vez presionado el boton.
        selectedSpots.forEach(spotId => {
            const spot= document.getElementById(spotId);
            spot.classList.remove('selected');
            spot.classList.add('bought');
        });

        // Guardamos la seleccion en localStorage
        localStorage.setItem('selectedSpots', JSON.stringify(selectedSpots));

    } else {
        const messageBTN = document.createElement('p');
        messageBTN.innerText = `You may select at least one place to buy it`;
        messageDiv.appendChild(messageBTN);
    }
};

// Crear la matriz y el botón
createParkingGrid();
createBuyButton();

