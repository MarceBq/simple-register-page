//Seleccionar Formularios
const BOX_ONE = document.querySelector('.box-one')
const BOX_TWO = document.querySelector('.box-two')
const BOX_THREE = document.querySelector('.box-three')


// ------ Primer Step ------ //

//Seleccionar los labels
const NAME_LABEL = document.querySelector('#name')
const EMAIL_LABEL = document.querySelector('#email')


//Almacenar Valores
let nameValue = ' '
let emailValue = ' '

//Seleccionar Botones
const BTN_FIRST = document.querySelector('#btn-first')
const BTN_SECOND = document.querySelector('#btn-second')

//funciones para cambiar primer boton 
BTN_FIRST.addEventListener('click', (e)=>{
    
    // Evito los cambios bruscos del formulario
    e.preventDefault();

    // Validar el primer paso del formulario
    if (BOX_ONE.checkValidity()) {

        // Obtener los valores de los campos
        nameValue = NAME_LABEL.value;
        emailValue = EMAIL_LABEL.value;

        BOX_ONE.classList.toggle('delete-form')
        BOX_TWO.classList.toggle('add-form')

        console.log('Nombre:', nameValue);
        console.log('Email:', emailValue);
    } else {
        alert("Algunos campos no son válidos. Por favor, revisa el formulario.");
    }

});


//funcion para cambiar segundo boton
BTN_SECOND.addEventListener('click', ()=>{
    BOX_TWO.classList.toggle('add-form')
    BOX_THREE.classList.toggle('add-form')
})
