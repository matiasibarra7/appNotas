const fs = require("fs");
const chalk = require("chalk");
const tareas = leerJSON();

function leerJSON() {
  let tareas = JSON.parse(fs.readFileSync("./ArchivosJSON/tareas.JSON", "utf8"));
  return tareas;
}

function escribirJSON(tareas) {
  let tareasE = JSON.stringify(tareas, null, " ");
  fs.writeFileSync("./ArchivosJSON/tareas.JSON", tareasE);
}

function listar(estado) {
  if (estado) {
    let tareasE = tareas.filter((el) => el.estado == estado);
    if (tareasE.length != 0) {
      colorear(tareasE);
    } else {
      console.log("No existe ese estado. Ingrese: [Terminado], [Pendiente] o [En progreso]");
    }
  } else {
    colorear(tareas);
  }
}

function colorear(tareas) {
  tareas.forEach((el) => {
    switch (el.estado) {
      case "Pendiente":
        console.log(`► ${el.titulo} ${chalk.yellowBright("-->")} ${chalk.red(`[${el.estado}]`)}`);
        break;
      case "En progreso":
        console.log(`► ${el.titulo} ${chalk.yellowBright("-->")} ${chalk.cyan(`[${el.estado}]`)}`);
        break;
      case "Terminado":
        console.log(`► ${el.titulo} ${chalk.yellowBright("-->")} ${chalk.green(`[${el.estado}]`)}`);
        break;
    }
  });
}

function borrar(tarea) {
  let ntareas = tareas.filter((el) => el.titulo != tarea);
  //console.log(ntareas);
  if (ntareas.length != tareas.length) {
    escribirJSON(ntareas);
    console.log(chalk.green("¡Tarea borrada con exito!"));
  } else {
    console.log(chalk.red("No existe una tarea con ese título"));
  }
}

function crear(titulo, descripcion = "Sin decripción", estado = "Pendiente") {
  if (titulo) {
    newNota = {
      titulo: titulo,
      descripcion: descripcion,
      estado: estado,
    };
    tareas.push(newNota);
    escribirJSON(tareas);
    console.log(chalk.green(`¡Has creado la tarea ${chalk.yellowBright(`[${titulo}]`)} con éxito!`));
    //console.log("tareas", tareas);
  } else {
    console.log(chalk.red("Debe ingresar un título para su nueva tarea"));
  }
}

function completar(titulo) {
  let fueModificado = false;
  let mtareas = tareas.map((tarea) => {
    if (tarea.titulo == titulo) {
      tarea.estado ="Terminado"
      fueModificado = true;
    } 
    return tarea;
  });
  //console.log(mtareas);
  if (fueModificado) {
    escribirJSON(mtareas);
    console.log(`¡Tarea ${chalk.yellowBright(`[${titulo}]`)} completada!`);
  } else {
    console.log(chalk.red("No existe una tarea con ese título"));
  }
}

function detalles(titulo) {
  tarea = tareas.find((el) => el.titulo == titulo);
  if (tarea) {
    console.log();
    console.log("-".repeat(tarea.titulo.length));
    console.log(`${chalk.yellowBright(tarea.titulo)}`);
    console.log("-".repeat(tarea.titulo.length));
    console.log();
    console.log(`DESCRIPCIÓN: ${chalk.green(tarea.descripcion)}`);
    switch (tarea.estado) {
      case "Pendiente":
        console.log(`ESTADO: ${chalk.red(`[${tarea.estado}]`)}`);
        break;
      case "En progreso":
        console.log(`ESTADO: ${chalk.cyan(`[${tarea.estado}]`)}`);
        break;
      case "Terminado":
        console.log(`ESTADO: ${chalk.green(`[${tarea.estado}]`)}`);
        break;
    }
  } else {
    console.log(chalk.red("Es necesario que ingrese un título"));
  }
}

module.exports = {
  listar,
  crear,
  borrar,
  completar,
  detalles,
};
