
 $('.reservar').click(function () {
  abrirModal()
  const horaReserva = this.parentElement.firstElementChild.id;
  let lugarReserva = this;
  let lugarReservaPosition = 0;

  while(lugarReserva.previousElementSibling.id !== horaReserva) {
    lugarReserva = lugarReserva.previousElementSibling;
    lugarReservaPosition++;
  }

  switch (lugarReservaPosition){
    case 0: 
      lugarReserva = "Padel 1";
      break;
    case 1: 
      lugarReserva = "Padel 2";
      break;
    case 2: 
      lugarReserva = "Padel 3";
      break;
    case 3: 
      lugarReserva = "Tenis 1";
      break;
    case 4: 
      lugarReserva = "Tenis 2";
      break;
    case 5: 
      lugarReserva = "Trinquete";
      break;
    default: 
      lugarReserva = "Trinquete";
      break;
  }
  //let idUsuario =  document.getElementsByName("id-usuario").value;
  console.log("La reserva es a las",horaReserva," y el lugar ",lugarReserva)
  this.innerHTML = "Ocupado"
  $(this).addClass('ocupado');
  
})

function abrirModal() {
  $('#modal').toggleClass("u-display-none")
}

$(window).on("load", function () {
  fetch('http://127.0.0.1:5000/reservas')
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    reservas(myJson);
  });
})


// sets up the app logic, declares required variables, contains all the other functions
function reservas(products) {
  let finalGroup;

  finalGroup = products;

  updateDisplay();

  finalGroup = [];

  function updateDisplay() {
      for(let i = 0; i < finalGroup.length; i++) {
        if (finalGroup[i].admitida === "si"){ 
          showProduct(finalGroup[i]);
        }
      }
    }

  // Display a product inside the <main> element
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