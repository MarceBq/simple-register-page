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
let name
let email
let topic
let step = 1

//Seleccionar Botones
const BTN_FIRST = document.querySelector('#btn-first')
const BTN_SECOND = document.querySelector('#btn-second')
const submitButton = document.querySelector('.btn-submit')

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
NUM_ELEMENT.innerHTML = `Step ${step} of 3`
BODY_ELEMENT.appendChild(NUM_ELEMENT)

//funciones para cambiar primer boton
BTN_FIRST.addEventListener('click', e => {
	// Evito los cambios bruscos del formulario
	e.preventDefault()

	// Validar el primer paso del formulario
	if (!BOX_ONE.checkValidity()) {
		alert('Algunos campos no son validos. Por favor, revisa el formulario')
		return
	}

	step++

	// Obtener los valores de los campos
	name = NAME_LABEL.value
	email = EMAIL_LABEL.value

	BOX_ONE.classList.toggle('delete-form')
	BOX_TWO.classList.toggle('add-form')

	console.log(`Nombre: ${name}`)
	console.log(`Email: ${email}`)

	NUM_ELEMENT.innerHTML = `Step ${step} of 3`
})

// Funcion tomar los valores del boton
BOTTONS_SELECTED.forEach(botton => {
	botton.addEventListener('click', () => {
		topic = botton.textContent

		console.log(`Topic: ${topic}`)
	})
})

// Funcion para cambiar segundo boton
BTN_SECOND.addEventListener('click', e => {
	e.preventDefault()
	step++

	NAME_ELEMENT.innerHTML = `Nombre:  <span class="white-text">${name}</span>`
	EMAIL_ELEMENT.innerHTML = `Email: <span class="white-text">${email}</span>`
	LIST_ELEMENT.innerHTML = `Topics: <li class="white-text">${topic}</li>`

	DATE_CONTAINER.appendChild(NAME_ELEMENT)
	DATE_CONTAINER.appendChild(EMAIL_ELEMENT)
	DATE_CONTAINER.appendChild(LIST_ELEMENT)

	BOX_TWO.classList.toggle('add-form')
	BOX_THREE.classList.toggle('add-form')

	NUM_ELEMENT.innerHTML = `Step ${step} of 3`
})

submitButton.addEventListener('click', async e => {
	e.preventDefault()
	step = 1

	await fetch('/send-email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			to: email,
			subject: 'Notification from tech topics',
			html: `<p>Hi ${name}, thanks for your participation in our survey</p>`,
		}),
	})

	alert("Thanks you!!. You'll be receiving an email soon")
})
