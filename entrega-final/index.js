// Arrays para almacenar las tareas y el historial de movimientos
let tasks = [];
let moveHistory = [];

// Función para renderizar las tareas en las columnas correspondientes
function renderTasks() {
    const columns = {
        "To Do": document.getElementById("toDoColumn"),
        "In Progress": document.getElementById("inProgressColumn"),
        "Done": document.getElementById("doneColumn"),
    };

    // Limpiamos las columnas antes de renderizar
    Object.values(columns).forEach(column => (column.innerHTML = ""));

    // Renderizamos cada tarea en su columna
    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerText = task.title;

        // Botón para mover la tarea
        const moveButton = document.createElement("button");
        moveButton.innerText = "Mover";
        moveButton.onclick = () => moveTask(task.id);
        taskElement.appendChild(moveButton);

        // Botón para eliminar la tarea
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.onclick = () => deleteTask(task.id);
        taskElement.appendChild(deleteButton);

        columns[task.status].appendChild(taskElement);
    });

    // Renderizar el historial
    renderHistory();
}

// Función para renderizar el historial de tareas
function renderHistory() {
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = ""; // Limpiamos el historial antes de renderizar

    moveHistory.forEach(entry => {
        const historyElement = document.createElement("div");
        historyElement.innerText = `Tarea ID: ${entry.taskId}, Estado anterior: ${entry.oldStatus}, Estado nuevo: ${entry.newStatus}, Fecha: ${entry.date}`;
        historyContainer.appendChild(historyElement);
    });
}

// Función para mover una tarea a la siguiente columna
function moveTask(taskId) {
    const task = tasks.find(t => t.id === taskId);

    // Confirmar el movimiento de la tarea
    Swal.fire({
        title: '¿Mover tarea?',
        text: `¿Quieres mover la tarea "${task.title}" a la siguiente etapa?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, mover',
        cancelButtonText: 'Cancelar',
    }).then(result => {
        if (result.isConfirmed) {
            // Guardar el estado anterior
            const oldStatus = task.status;

            // Cambiar el estado de la tarea
            if (task.status === "To Do") task.status = "In Progress";
            else if (task.status === "In Progress") task.status = "Done";

            // Agregar al historial de movimiento
            moveHistory.push({
                taskId: task.id,
                oldStatus: oldStatus,
                newStatus: task.status,
                date: new Date().toLocaleString(),
            });

            // Actualizar el almacenamiento local
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("moveHistory", JSON.stringify(moveHistory));

            // Volver a renderizar las tareas
            renderTasks();

            // Notificación de éxito
            Swal.fire('¡Avanzaste en la tarea!', `La tarea "${task.title}" ha sido movida exitosamente.`, 'success');
        }
    });
}

// Función para eliminar una tarea
function deleteTask(taskId) {
    const task = tasks.find(t => t.id === taskId);

    // Confirmar la eliminación de la tarea
    Swal.fire({
        title: '¿Eliminar tarea?',
        text: `¿Estás seguro de que quieres eliminar la tarea "${task.title}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then(result => {
        if (result.isConfirmed) {
            // Agregar al historial de eliminación
            moveHistory.push({
                taskId: task.id,
                oldStatus: task.status,
                newStatus: "Eliminada",
                date: new Date().toLocaleString(),
            });

            // Filtrar las tareas para eliminar la seleccionada
            tasks = tasks.filter(t => t.id !== taskId);

            // Actualizar el almacenamiento local
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("moveHistory", JSON.stringify(moveHistory)); // Guardar historial en localStorage

            // Volver a renderizar las tareas
            renderTasks();

            // Notificación de tarea eliminada
            Swal.fire('¡Tarea eliminada!', `La tarea "${task.title}" ha sido eliminada.`, 'success');
        }
    });
}

// Función para agregar una nueva tarea
function addTask() {
    Swal.fire({
        title: 'Agregar nueva tarea',
        input: 'text',
        inputLabel: 'Título de la tarea',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        inputValidator: value => {
            if (!value) {
                return '¡Debes escribir un título para la tarea!';
            }
        },
    }).then(result => {
        if (result.isConfirmed) {
            const newTask = {
                id: Date.now(),
                title: result.value,
                status: "To Do",
            };
            tasks.push(newTask);

            // Guardar en localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            // Renderizar tareas nuevamente
            renderTasks();

            // Notificación de éxito
            Swal.fire('¡Tarea agregada!', `La tarea "${result.value}" ha sido agregada.`, 'success');
        }
    });
}

// Cargar tareas desde localStorage al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) tasks = storedTasks; // Cargar tareas

    const storedMoveHistory = JSON.parse(localStorage.getItem("moveHistory"));
    if (storedMoveHistory) moveHistory = storedMoveHistory; // Cargar historial

    renderTasks(); // Renderizar tareas al cargar
});

// Botón para agregar tarea
document.getElementById("addTaskButton").addEventListener("click", addTask);
