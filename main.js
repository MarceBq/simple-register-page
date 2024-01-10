//Seleccionar Formularios
const BOX_ONE = document.querySelector(".box-one")
const BOX_TWO = document.querySelector(".box-two")
const BOX_THREE = document.querySelector(".box-three")


//Seleccionar Botones
const BTN_FIRST = document.querySelector("#btn-first")
const BTN_SECOND = document.querySelector("#btn-second")



//funciones para cambiar
BTN_FIRST.addEventListener('click', ()=>{
    BOX_ONE.classList.toggle('delete-form')
    BOX_TWO.classList.toggle('add-form')
})