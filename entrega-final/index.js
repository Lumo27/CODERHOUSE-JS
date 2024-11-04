// Arrays para almacenar las tareas en cada columna y el historial
let tasks = [];
let history = [];

// Función para renderizar tareas en las columnas correspondientes
function renderTasks() {
    const columns = {
        "To Do": document.getElementById("toDoColumn"),
        "In Progress": document.getElementById("inProgressColumn"),
        "Done": document.getElementById("doneColumn")
    };

    // Limpiamos las columnas antes de renderizar
    Object.values(columns).forEach(column => column.innerHTML = "<h2>" + column.querySelector("h2").innerText + "</h2>");

    // Renderizamos cada tarea en su columna
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        columns[task.status].appendChild(taskElement);
    });
}

// Función para crear un elemento de tarea
function createTaskElement(task) {
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

    return taskElement;
}

// Función para mover una tarea a la siguiente columna
function moveTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    let newStatus;

    if (task.status === "To Do") newStatus = "In Progress";
    else if (task.status === "In Progress") newStatus = "Done";

    if (newStatus) {
        // Mostrar confirmación de movimiento con SweetAlert
        Swal.fire({
            title: '¿Mover tarea?',
            text: `¿Quieres mover la tarea "${task.title}" a la siguiente etapa?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, mover',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Cambiar el estado de la tarea
                task.status = newStatus;

                // Actualizar el almacenamiento local
                localStorage.setItem("tasks", JSON.stringify(tasks));

                // Volver a renderizar las tareas
                renderTasks();

                // Mostrar notificación de éxito
                Swal.fire('¡Avanzaste en la tarea!', `La tarea "${task.title}" ha sido movida exitosamente.`, 'success');
            }
        });
    }
}

// Función para eliminar una tarea
function deleteTask(taskId) {
    const task = tasks.find(t => t.id === taskId);

    // Confirmación de eliminación con SweetAlert
    Swal.fire({
        title: '¿Eliminar tarea?',
        text: `¿Estás seguro de que quieres eliminar la tarea "${task.title}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Agregar tarea al historial
            history.push(task);
            // Filtrar las tareas para eliminar la seleccionada
            tasks = tasks.filter(t => t.id !== taskId);

            // Actualizar el almacenamiento local
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("history", JSON.stringify(history));

            // Volver a renderizar las tareas
            renderTasks();
            renderHistory();

            // Notificación de tarea eliminada
            Swal.fire('¡Tarea eliminada!', `La tarea "${task.title}" ha sido eliminada.`, 'success');
        }
    });
}

// Función para renderizar el historial de tareas
function renderHistory() {
    const historyContainer = document.getElementById("historyTasks");
    historyContainer.innerHTML = ""; // Limpiar el historial

    history.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerText = task.title;
        historyContainer.appendChild(taskElement);
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
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes escribir un título para la tarea!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const newTask = {
                id: Date.now(),
                title: result.value,
                status: "To Do"
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

// Cargar tareas y historial desde localStorage al iniciar
window.onload = function() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    history = JSON.parse(localStorage.getItem("history")) || [];
    renderTasks();
    renderHistory();
};

// Agregar evento al botón de agregar tarea
document.getElementById("addTaskButton").addEventListener("click", addTask);
