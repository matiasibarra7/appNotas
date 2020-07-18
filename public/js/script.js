document.addEventListener("DOMContentLoaded", function(event) {
    console.log("que se le va hacer");
    readNotes()
})

function newNote() {
    let divNewNota = document.querySelector(".new-nota")
    divNewNota.style.display = "flex"
}

function closeModal() {
    let divNewNota = document.querySelector(".new-nota")
    divNewNota.style.display = "none"
}

function readNotes() {
    /* Aca estoy tirando verdura fuerte */
    // EMPIEZO

    const requestURL = '/archivoJSONtareas';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    let tareas

    request.onload = function() {
        tareas = request.response;
        
        tareas.forEach(tarea => {
            let art = document.createElement('article');
            let tittle = document.createElement('p');
            let desc = document.createElement('p');
            let stateHTML = document.createElement('p');
    
            tittle.textContent = tarea.titulo;
            desc.textContent = tarea.descripcion;
            stateHTML.textContent = tarea.estado;
    
            art.appendChild(tittle)
            art.appendChild(desc)
            art.appendChild(stateHTML)



            let selector = ".table-container "
            switch (tarea.estado) {
                case "Pendiente":
                    selector+= ".to-do"
                    break;
                case "En progreso":
                    selector+= ".progress"
                    break;
                case "Terminado":
                    selector+= ".done"
                    break;
                
                default:
                    selector+= ".to-do"
                    break;
            }
            let notesContainer = document.querySelector(selector)

            
            notesContainer.appendChild(art);
        });
    }

    //  TERMINO

}


