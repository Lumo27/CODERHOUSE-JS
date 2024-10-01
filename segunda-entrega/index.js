// Arreglo para almacenar alumnos.
let students = [] ;

// Creacion de una funcion para crear un alumno
const addStudent = () => {
    const name = prompt("Insert the first name");
    const surname = prompt("Insert the last name");
    const course = prompt("Insert the name of the course, for example: 1A");
    let finalGrade; // Declaro la variable de promedio final, para luego meterla en un bucle, y corroborar que se carguen las tres notas, para poder calcular sin margen de error, y que si o si, se carguen los 3 alumnos.

    // Bucle para validar la nota, este bucle seria "infinito", mientras que se carguen mal las notas, la unica manera de terminarlo, es ingresando bien las 3 notas, que se indica la manera en el prompt.
    while (true) {
        finalGrade = parseFloat(prompt("Enter the final grade of the student (0-10):\nIt may be a number in the range of 0 to 10."));
        
        // Verificamos si la nota es válida
        if (!isNaN(finalGrade) && finalGrade >= 0 && finalGrade <= 10) {
            break; // Si es válida, salimos del bucle
        } else {
            alert("The grade must be a number between 0 and 10. Please try again.");
        }
    }
    // Agrego el alumno al array
    students.push({ name, surname, course, finalGrade });
};
// Funcion para buscar al "mejor alumno", alumno con el promedio mas alto de los 3.
const getBestStudent = () => {
    if (students.length > 0) {
        let bestStudent = students.reduce((prev, curr) => (curr.finalGrade > prev.finalGrade ? curr : prev));
        alert(`El alumno con la mejor nota es:\nNombre: ${bestStudent.name}\nApellido: ${bestStudent.surname}\nCurso: ${bestStudent.course}\nPromedio: ${bestStudent.finalGrade}`);
        // Vaciamos el arreglo de estudiantes después de mostrar el mejor alumno
        students = [];
    } else {
        alert("No hay alumnos registrados.");
    }
};
// MAIN
// Bucle para cargar los 3 alumnos, se ejecuta 3 veces, y la funcion construye el objeto agregandolos al arreglo.
const startAddingStudents = () => {
for (let i = 0 ; i < 3 ; i++){
    addStudent();
}

//Funcion para buscar el mejor alumno
getBestStudent();

}
document.getElementById("addStudentsButton").addEventListener("click", startAddingStudents);