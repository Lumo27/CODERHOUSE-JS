// Arrays para almacenar las tareas en cada columna
let tasks = [
    { id: 1, title: "Tarea 1", status: "To Do" },
    { id: 2, title: "Tarea 2", status: "In Progress" },
    { id: 3, title: "Tarea 3", status: "Done" }
];

// Función para renderizar tareas en la columna correspondiente
function renderTasks() {
    const columns = {
        "To Do": document.getElementById("toDoColumn"),
        "In Progress": document.getElementById("inProgressColumn"),
        "Done": document.getElementById("doneColumn")
    };

    // Limpiamos las columnas antes de renderizar
    Object.values(columns).forEach(column => column.innerHTML = "");

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
}

// Función para mover una tarea a la siguiente columna
function moveTask(taskId) {
    const task = tasks.find(t => t.id === taskId);

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
            if (task.status === "To Do") task.status = "In Progress";
            else if (task.status === "In Progress") task.status = "Done";

            // Actualizar el almacenamiento local
            localStorage.setItem("tasks", JSON.stringify(tasks));

            // Volver a renderizar las tareas
            renderTasks();

            // Mostrar notificación de éxito
            Swal.fire('¡Movida!', `La tarea "${task.title}" ha sido movida exitosamente.`, 'success');
        }
    });
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
            // Filtrar las tareas para eliminar la seleccionada
            tasks = tasks.filter(t => t.id !== taskId);

            // Actualizar el almacenamiento local
            localStorage.setItem("tasks", JSON.stringify(tasks));

            // Volver a renderizar las tareas
            renderTasks();

            // Notificación de tarea eliminada
            Swal.fire('¡Eliminada!', `La tarea "${task.title}" ha sido eliminada.`, 'success');
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

// Cargar tareas desde localStorage al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) tasks = storedTasks;
    renderTasks();
});

// Botón para agregar tarea
document.getElementById("addTaskButton").addEventListener("click", addTask);
