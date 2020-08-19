//Variables globales
const DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
const hoy = new Date();
const mañana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);
const pasadoMañana = new Date(hoy.getTime() + 2*DIA_EN_MILISEGUNDOS);
let diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
let hora = ""
let lugar = ""
let dia = hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear();

//Funciones
$('.reservar').click(function () {
  if(this.innerHTML === "Reservar"){
    abrirModal()
  }  
  const horaReserva = this.parentElement.firstElementChild.id;
  let lugarReserva = this;
  let lugarReservaPosition = 0;

  while(lugarReserva.previousElementSibling.id !== horaReserva) {
    lugarReserva = lugarReserva.previousElementSibling;
    lugarReservaPosition++;
  }

  switch (lugarReservaPosition){
    case 0: 
      lugarReserva = "padel1";
      break;
    case 1: 
      lugarReserva = "padel2";
      break;
    case 2: 
      lugarReserva = "padel3";
      break;
    case 3: 
      lugarReserva = "tenis1";
      break;
    case 4: 
      lugarReserva = "tenis2";
      break;
    case 5: 
      lugarReserva = "trinquete";
      break;
    default: 
      lugarReserva = "trinquete";
      break;
  }
  //let idUsuario =  document.getElementsByName("id-usuario").value;
  console.log("La reserva es a las",horaReserva," y el lugar ",lugarReserva)
  hora = horaReserva
  lugar = lugarReserva
})

$('#boton-reserva').click(function () {
  if(document.getElementById("id-usuario").value === "") {
    document.getElementById("error-formulario").innerHTML = "Debe introducir un id de usuario"
  } else {
    var reserva = { dia: dia, hora: hora, lugar: lugar, idUsuario: document.getElementById("id-usuario").value , admitida: 'si' };
    let url = 'http://127.0.0.1:5000/formulario-reservas'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reserva),
      headers:{
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }).then(res => res.json())
    .catch(error => console.error('Error:',error))
    .then(response => console.log('Success:',response));
    location.reload()
  }
})

function abrirModal() {
  $('#modal').toggleClass("u-display-none")
}

function cambiaAHoy() {
  dia = hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear();
}

function cambiaAManana() {
  dia = mañana.getDate()+"/"+mañana.getMonth()+"/"+mañana.getFullYear();
}

function cambiaAPasado() {
  dia = pasadoMañana.getDate()+"/"+pasadoMañana.getMonth()+"/"+pasadoMañana.getFullYear();
}

$(window).on("load", function () {
  document.getElementById("primero").innerHTML = diasSemana[hoy.getDay()] + " " + hoy.getDate()
  document.getElementById("segundo").innerHTML = diasSemana[mañana.getDay()] + " " + (mañana.getDate())
  document.getElementById("tercero").innerHTML = diasSemana[pasadoMañana.getDay()] + " " + (pasadoMañana.getDate())
})

$(".bloque--reservas button").on("click", function () {
  let a = document.getElementsByClassName("ocupado").length
  for(let i = 0; i < a; i++) {
    document.getElementsByClassName("ocupado")[i].innerHTML = "Reservar"
  }

  fetch('http://127.0.0.1:5000/reservas')
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    reservas(myJson,dia);
  });
})

function reservas(products,diaActual) {
  let finalGroup;

  finalGroup = products;
  updateDisplay(diaActual);
  finalGroup = [];

  function updateDisplay() {
    for(let i = 0; i < finalGroup.length; i++) {
      if (finalGroup[i].admitida === "si" && diaActual === finalGroup[i].dia){ 
        console.log(finalGroup)
        showProduct(finalGroup[i]);
      }
    }
  }

  // Display a product inside the table
  function showProduct(product) {
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