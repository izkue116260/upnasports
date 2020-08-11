
 $('.reservar').click(function () {
  $(this).toggleClass('ocupado');
  if(this.innerHTML === "Reservar") {
    this.innerHTML = "Ocupado"
  } else {
    this.innerHTML = "Reservar"
  }
})