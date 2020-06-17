$(window).on("load", function () {
  console.log("dentro");
  $(".btn-tfn").on("click", function (e) {
    e.preventDefault();
    $(".form-group--telefono").toggleClass("u-display-none");
  });

  $(".btn-correo").on("click", function (e) {
    e.preventDefault();
    $(".form-group--correo").toggleClass("u-display-none");
  });

  $("#rango-edad").change(function () {
    if ($(this).val() === 1) {
      $(".bloque--tres-cinco").removeClass("u-display-none");
      $(".bloque--seis-ocho").addClass("u-display-none");
      //$(".bloque--nueve-trece").addClass("u-display-none");
    } /* if ($(this).val() === 2)*/ else {
      $(".bloque--tres-cinco").addClass("u-display-none");
      $(".bloque--seis-ocho").removeClass("u-display-none");
      //$(".bloque--nueve-trece").addClass("u-display-none");
    } /*else {
      $(".bloque--tres-cinco").addClass("u-display-none");
      $(".bloque--seis-ocho").addClass("u-display-none");
      $(".bloque--nueve-trece").removeClass("u-display-none");
    }*/
  });
});
