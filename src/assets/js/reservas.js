//Variables globales para fecha
const DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
const hoy = new Date();
const mañana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);
const pasadoMañana = new Date(hoy.getTime() + 2*DIA_EN_MILISEGUNDOS);
let diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

//Variables globales
let hora = ""
let lugar = ""
let dia = ""

//Funciones
$('.reservar').click(function () {
  if(dia !== ""){
    if(this.innerHTML === "Reservar"){
      abrirModal()
    }  
    //Calcula hora
    const horaReserva = this.parentElement.firstElementChild.id;
    //Calcula lugar
    let lugarReserva = this;
    let lugarReservaPosition = 0;
    let lugares = ["padel1","padel2","padel3","tenis1","tenis2","trinquete"];

    while(lugarReserva.previousElementSibling.id !== horaReserva) {
      lugarReserva = lugarReserva.previousElementSibling;
      lugarReservaPosition++;
    }

    lugarReserva = lugares[lugarReservaPosition]
    //Asignamos a variables globales
    hora = horaReserva
    lugar = lugarReserva
  } else {
    document.getElementById("elija-fecha").innerHTML = "Elija una fecha"
  }
})

$('#boton-reserva').click(function () {
  if(document.getElementById("id-usuario").value === "") {
    document.getElementById("error-formulario").innerHTML = "Debe introducir un id de usuario"
  } else {
    //Info para envio a la base de datos
    var reserva = { dia: dia, hora: hora, lugar: lugar, idUsuario: document.getElementById("id-usuario").value , admitida: 'si' };
    let url = 'http://127.0.0.1:5000/formulario-reservas'
    
    //Envío a la base de datos
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reserva),
      headers:{
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }).then(res => res.json())
    .catch(error => console.error('Error:',error))
    .then(response => {console.log('Success:',response);abrirModal();pideAPI();});
    
  }
})

function abrirModal() {
  $('#modal').toggleClass("u-display-none")
  document.getElementById("error-formulario").innerHTML = ""
}

//Funciones para cambiar la fecha
function cambiaAHoy() {
  dia = hoy.getDate()+"/"+(hoy.getMonth())+"/"+hoy.getFullYear();
}

function cambiaAManana() {
  dia = mañana.getDate()+"/"+(mañana.getMonth())+"/"+mañana.getFullYear();
}

function cambiaAPasado() {
  dia = pasadoMañana.getDate()+"/"+(pasadoMañana.getMonth())+"/"+pasadoMañana.getFullYear();
}

//Al cargar la página ponemos los días
$(window).on("load", function () {
  document.getElementById("primero").innerHTML = diasSemana[hoy.getDay()] + " " + hoy.getDate()
  document.getElementById("segundo").innerHTML = diasSemana[mañana.getDay()] + " " + (mañana.getDate())
  document.getElementById("tercero").innerHTML = diasSemana[pasadoMañana.getDay()] + " " + (pasadoMañana.getDate())
})

function pideAPI() {
  document.querySelectorAll(".ocupado").forEach(elem => {
    elem.innerHTML = "Reservar"
    elem.className = "reservar"
  })

  fetch('http://127.0.0.1:5000/reservas')
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    reservas(myJson,dia);
  })
  .catch(error => console.error('Error:',error));
}

$(".bloque--reservas button").on("click",pideAPI);

function reservas(products,diaActual) {
  let finalGroup;

  finalGroup = products;
  updateDisplay(diaActual);
  finalGroup = [];

  function updateDisplay() {
    for(let i = 0; i < finalGroup.length; i++) {
      if (finalGroup[i].admitida === "si" && diaActual === finalGroup[i].dia){ 
        showProductReserva(finalGroup[i]);
      }
    }
  }

  // Display a product inside the table
  function showProductReserva(product) {
    const hora = document.getElementById(product.hora).nextElementSibling;
    let lugar = document.getElementById(product.lugar).innerHTML;
    switch (lugar){
      case "Padel 1": 
        lugar = 0;
        break;
      case "Padel 2": 
        lugar = 1;
        break;
      case "Padel 3": 
        lugar = 2;
        break;
      case "Tenis 1": 
        lugar = 3;
        break;
      case "Tenis 2": 
        lugar = 4;
        break;
      case "Trinquete": 
        lugar = 5;
        break;
      default: 
        lugar = 6;
        break;
    }
    let ocupado = hora;
    for(let i = 0; i < lugar; i++) {
      ocupado = ocupado.nextElementSibling;
    }
    ocupado.innerHTML = "Ocupado"
    ocupado.className = "ocupado"
  }
}