const fs = require("fs");
const chalk = require("./node_modules/chalk");

function leerJSON() {
  let tareas = JSON.parse(fs.readFileSync("./ArchivosJSON/tareas.JSON", "utf8"));
  return tareas;
}

function escribirJSON(tareas) {
  let tareasE = JSON.stringify(tareas, null, " ");
  fs.writeFileSync("./ArchivosJSON/tareas.JSON", tareasE);
}

function listar(estado) {
  const tareas = leerJSON();
  if (estado) {
    let tareasE = tareas.filter((el) => el.estado == estado);
    if (tareasE.length != 0) {
      colorear(tareasE);
    } else {
      console.log("No existe ese estado. Ingrese: [Terminado, Pendiente, En progreso] ");
    }
  } else {
    colorear(tareas);
  }
}

function colorear(tareas) {
  tareas.forEach((el) => {
    switch (el.estado) {
      case "Pendiente":
        console.log(`${el.titulo} ${chalk.yellowBright("-->")} ${chalk.red(el.estado)}`);
        break;
      case "En progreso":
        console.log(`${el.titulo} ${chalk.yellowBright("-->")} ${chalk.cyan(el.estado)}`);
        break;
      case "Terminado":
        console.log(`${el.titulo} ${chalk.yellowBright("-->")} ${chalk.green(el.estado)}`);
        break;
    }
  });
}

function borrar(tarea) {
  const tareas = leerJSON();
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
    const tareas = leerJSON();
    newNota = {
      titulo: titulo,
      descripcion: descripcion,
      estado: estado,
    };
    tareas.push(newNota);
    escribirJSON(tareas);
    console.log(chalk.green(`¡Has creado la tarea ${chalk.yellow(`[${titulo}]`)} con éxito!`));
    //console.log("tareas", tareas);
  } else {
    console.log(chalk.red("Debe ingresar un título para su nueva tarea"));
  }
}

function completar(titulo) {
  const tareas = leerJSON();
  let band = false;
  let mtareas = tareas.map((el) => {
    if (el.titulo == titulo) {
      let auxEl = {
        titulo: el.titulo,
        descripcion: el.descripcion,
        estado: "Terminado",
      };
      band = true;
      return auxEl;
    } else {
      return el;
    }
  });
  //console.log(mtareas);
  if (band) {
    escribirJSON(mtareas);
    console.log(`¡Tarea ${chalk.yellow(`[${titulo}]`)} completada!`);
  } else {
    console.log(chalk.red("No existe una tarea con ese título"));
  }
}

function detalles(titulo) {
  const tareas = leerJSON();
  tarea = tareas.find((el) => el.titulo == titulo);
  if (tarea) {
    console.log();
    console.log(chalk.yellow(tarea.titulo));
    console.log();
    console.log(chalk.green(tarea.descripcion));
    console.log();
    switch (tarea.estado) {
      case "Pendiente":
        console.log(`${chalk.red(tarea.estado)}`);
        break;
      case "En progreso":
        console.log(`${chalk.cyan(tarea.estado)}`);
        break;
      case "Terminado":
        console.log(`${chalk.green(tarea.estado)}`);
        break;
    }
  } else {
    console.log(chalk.red("No existe una tarea con ese título"));
  }
}

module.exports = {
  leerJSON,
  escribirJSON,
  listar,
  crear,
  borrar,
  completar,
  detalles,
};
