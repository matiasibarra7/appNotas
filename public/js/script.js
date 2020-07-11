document.addEventListener("DOMContentLoaded", function(event) {

})

function newNote() {
    let divNewNota = document.querySelector(".new-nota")
    divNewNota.style.display = "flex"
}

function closeModal() {
    let divNewNota = document.querySelector(".new-nota")
    divNewNota.style.display = "none"
}