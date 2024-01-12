//Seleccionar el body
const BODY_ELEMENT = document.body


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
let bottonValue = ' '

//Seleccionar Botones
const BTN_FIRST = document.querySelector('#btn-first')
const BTN_SECOND = document.querySelector('#btn-second')


// ------ Segundo Step ----- //
const BOTTONS_SELECTED = document.querySelectorAll('.option')


// ------ Tercer Step ----- //
const THREE_CONTAINER = document.querySelector('.third-register-container')

//Crear elementos
const NAME_ELEMENT = document.createElement('p')
const EMAIL_ELEMENT = document.createElement('p')
const LIST_ELEMENT = document.createElement('ul')

//Crear elemento para el step
const NUM_ELEMENT = document.createElement('p')


//Tomar valor dates container
const DATE_CONTAINER = document.querySelector('.dates')

//Para el apartado del step
let numValue = 1;
NUM_ELEMENT.innerHTML = `Step ${numValue} of 3`
BODY_ELEMENT.appendChild(NUM_ELEMENT)

//funciones para cambiar primer boton 
BTN_FIRST.addEventListener('click', (e)=>{
    
    // Evito los cambios bruscos del formulario
    e.preventDefault()

    // Validar el primer paso del formulario
    if (BOX_ONE.checkValidity()) {

        // Obtener los valores de los campos
        nameValue = NAME_LABEL.value;
        emailValue = EMAIL_LABEL.value;

        BOX_ONE.classList.toggle('delete-form')
        BOX_TWO.classList.toggle('add-form')

        console.log('Nombre:', nameValue);
        console.log('Email:', emailValue);

        NUM_ELEMENT.innerHTML = `Step ${numValue + 1} of 3`

    } else {
        alert("Algunos campos no son válidos. Por favor, revisa el formulario.");
    }

    
});


// Funcion tomar los valores del boton
BOTTONS_SELECTED.forEach(botton=>{
    botton.addEventListener('click', ()=>{
        bottonValue = botton.textContent
        
        console.log(`Valor: `, bottonValue)
    })

})


// Funcion para cambiar segundo boton
BTN_SECOND.addEventListener('click', (e)=>{

    e.preventDefault()

    NAME_ELEMENT.innerHTML = `Nombre:  <span class="white-text">${nameValue}</span>`
    EMAIL_ELEMENT.innerHTML = `Email: <span class="white-text">${emailValue}</span>`
    LIST_ELEMENT.innerHTML = `Topics: <li class="white-text">${bottonValue}</li>`
    
    DATE_CONTAINER.appendChild(NAME_ELEMENT)
    DATE_CONTAINER.appendChild(EMAIL_ELEMENT)  
    DATE_CONTAINER.appendChild(LIST_ELEMENT)

    BOX_TWO.classList.toggle('add-form')
    BOX_THREE.classList.toggle('add-form')

    NUM_ELEMENT.innerHTML = `Step ${numValue + 2} of 3`
   
})








