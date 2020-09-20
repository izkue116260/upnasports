//Variables globales para fecha
var DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
var hoy = new Date();
var mañana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);
var pasadoMañana = new Date(hoy.getTime() + 2*DIA_EN_MILISEGUNDOS);
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

//Variables globales
var hora = ""
var lugar = ""
var dia = ""

//Funciones
$('.reservar').click(function () {
    if(this.innerHTML === "Reservar"){
      abrirModal()
    }  
    //Calcula hora
    var horaReserva = this.parentElement.firstElementChild.id;
    //Calcula lugar
    var lugarReserva = this;
    var lugarReservaPosition = 0;
    var lugares = ["padel1","padel2","padel3","tenis1","tenis2","trinquete"];

    while(lugarReserva.previousElementSibling.id !== horaReserva) {
      lugarReserva = lugarReserva.previousElementSibling;
      lugarReservaPosition++;
    }

    lugarReserva = lugares[lugarReservaPosition]
    //Asignamos a variables globales
    hora = horaReserva
    lugar = lugarReserva
})

$('#boton-reserva').click(function () {
  if(document.getElementById("id-usuario").value === "") {
    document.getElementById("error-formulario").innerHTML = "Debe introducir un id de usuario"
  } else {
    //Info para envio a la base de datos
    var reserva = { dia: dia, hora: hora, lugar: lugar, idUsuario: document.getElementById("id-usuario").value , admitida: 'si' };
    var url = 'http://18.222.58.181:8081/formulario-reservas'
    
    //Envío a la base de datos
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reserva),
      headers:{
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }).then(function(res){return res.json()})
    .catch(function(error){return console.error('Error:',error)})
    .then(function(response){
      abrirModal();
      pideAPI();
    });   
  }
})

function abrirModal() {
  $('#modal').toggleClass("u-display-none")
  document.getElementById("error-formulario").innerHTML = ""
  document.getElementById("id-usuario").value = ""
}

//Funciones para cambiar la fecha
function cambiaAHoy() {
  dia = hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear();
  document.getElementsByClassName('table-responsive')[0].classList = "table-responsive"
  document.getElementsByClassName('elija-fecha')[0].classList = "elija-fecha u-display-none"
}

function cambiaAManana() {
  dia = mañana.getDate()+"/"+(mañana.getMonth()+1)+"/"+mañana.getFullYear();
  document.getElementsByClassName('table-responsive')[0].classList = "table-responsive"
  document.getElementsByClassName('elija-fecha')[0].classList = "elija-fecha u-display-none"
}

function cambiaAPasado() {
  dia = pasadoMañana.getDate()+"/"+(pasadoMañana.getMonth()+1)+"/"+pasadoMañana.getFullYear();
  document.getElementsByClassName('table-responsive')[0].classList = "table-responsive"
  document.getElementsByClassName('elija-fecha')[0].classList = "elija-fecha u-display-none"
}

//Al cargar la página ponemos los días
$(window).on("load", function () {
  if(window.location.href === "http://upnasports.surge.sh/proyecto-final/reservas/") {   
    document.getElementsByClassName("primero")[0].innerHTML = diasSemana[hoy.getDay()] + " " + hoy.getDate()
    document.getElementsByClassName("segundo")[0].innerHTML = diasSemana[mañana.getDay()] + " " + (mañana.getDate())
    document.getElementsByClassName("tercero")[0].innerHTML = diasSemana[pasadoMañana.getDay()] + " " + (pasadoMañana.getDate())
 }
})

function pideAPI() {
  document.querySelectorAll(".ocupado").forEach(function(elem) {
    elem.innerHTML = "Reservar"
    elem.className = "reservar"
  })
  fetch('http://18.222.58.181:8081/reservas?dia='+dia)
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    reservas(myJson,dia);
  })
  .catch(function(error){return console.error('Error:',error)});
}

$(".bloque--reservas button").on("click", function () {
  pideAPI();    
});

function reservas(products,diaActual) {
  var finalGroup;

  finalGroup = products;
  updateDisplay(diaActual);
  finalGroup = [];

  function updateDisplay() {
    for(var i = 0; i < finalGroup.length; i++) {
      if (finalGroup[i].admitida === "si" && diaActual === finalGroup[i].dia){ 
        showProductReserva(finalGroup[i]);
      }
    }
  }

  // Display a product inside the table
  function showProductReserva(product) {
    var hora = document.getElementById(product.hora).nextElementSibling;
    var lugar = document.getElementById(product.lugar).innerHTML;
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
    var ocupado = hora;
    for(var i = 0; i < lugar; i++) {
      ocupado = ocupado.nextElementSibling;
    }
    ocupado.innerHTML = "Ocupado"
    ocupado.className = "ocupado"
  }
}