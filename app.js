// CLASE 11-06 APLICACION DE NOTAS

const task = require("./tareas.js");
const chalk = require("./node_modules/chalk");

let parametros = process.argv.slice(2);
console.log();

switch (parametros[0]) {
  case undefined:
    console.log(`${chalk.green("Sin parametros")}. Escriba ${chalk.yellow("Comandos")} para ver los comandos posibles`);
    break;
  case "Listar":
    task.listar(parametros[1]);
    break;
  case "Comandos":
    console.log(`${chalk.green("[Listar]")} ${chalk.yellow("[Crear]")} ${chalk.green("[Completar]")} ${chalk.yellow("[Borrar]")} ${chalk.green("[Detalles]")}`);
    break;
  case "Crear":
    task.crear(parametros[1], parametros[2]);
    break;
  case "Completar":
    task.completar(parametros[1]);
    break;
  case "Borrar":
    task.borrar(parametros[1]);
    break;
  case "Detalles":
    task.detalles(parametros[1]);
    break;
  default:
    console.log(`${chalk.green("Tarea no valida")}. Escriba ${chalk.yellow("Comandos")} para ver los comandos posibles`);
    break;
}

console.log();

//MICRO DESAFIO 1
// 1. Atajar el caso de 'crear'
// 2. Console.log del titulo y de la descripción
// 3. Crear un objeto literal a partil de los datos de entrada
//
// MICRO DESAFIO 2
// 1. Crear funcion escribir json
// Recibe un array
// convierte el array a json
// usando fs.writeFileSync escribimos el json
//
// MICRO DESAFIO 3
// 1. Atajar el caso de 'Completar'
// 2. Recorrer el array de tareas
// 3. Modificar la tarea que corresponda
// 4. Guardar los cambios
//
// MICRO DESAFIO 4
// 1. Atajar el caso de 'Completar'
// 2. Recorrer el array de tareas
// 3. Modificar la tarea que corresponda
// 4. Guardar los cambios

//Listar todas con parametro opcional el estado
