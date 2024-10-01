// Consigna: Utilizar un condicional + ciclo / bucle y definir una funcion para luego llamarla. Idealmente que sea interactiva e ingresar datos por prompt. Mostrar el resultado por alert o consol

//Funcion donde corre el bucle, mientras el numero sea positivo.
function bucle(a,b,c){
    while (a >= 0 && b >=0){
        alert("El total actual es : " + c);
        c = sumarNumeros(a,b,c);
        alert("Total actualizado : " + c);
    
        a = parseFloat(prompt("Ingrese un numero positivo"));
        b = parseFloat(prompt("Ingrese un segundo numero positivo"));
    }
    return c;
}
//Funcion para sumar los numeros ingresados, si pasaron el control del bucle.
function sumarNumeros(a,b,c){
    let suma = a+b+c;
    return suma;
}

alert("Bienvenido !");
alert("En esta aplicacion vas a poder sumar de a dos numeros, mas el anterior, para salir, ingresar un numero negativo");
//Inicializacion de variables.
let a = 0;
let b = 0;
let c = 0;
//Lectura de numeros necesarios.
a = parseFloat(prompt("Ingrese un numero positivo"));
b = parseFloat(prompt("Ingrese un segundo numero positivo"));
//Verificacion de su valor.
if(a > 0 && b > 0){
    c = bucle(a,b,c);
}else{
    alert("La calculadora no se abrio, ingreso un numero negativo")
}
//Fin del programa.
alert("Suma finalizada, el maximo total alcanzado fue: " + c);




