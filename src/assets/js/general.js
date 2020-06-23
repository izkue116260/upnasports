$(window).on("load", function () {
  $(".btn-tfn").on("click", function (e) {
    e.preventDefault();
    $(".form-group--telefono").toggleClass("u-display-none");
  });

  $(".btn-correo").on("click", function (e) {
    e.preventDefault();
    $(".form-group--correo").toggleClass("u-display-none");
  });

  $("#rango-edad").change(function () {
    if ($(this).val() == 1) {
      $(".bloque--tres-cinco").removeClass("u-display-none");
      $(".bloque--seis-ocho").addClass("u-display-none");
      $(".bloque--nueve-trece").addClass("u-display-none");
    } else if ($(this).val() == 2) {
      $(".bloque--tres-cinco").addClass("u-display-none");
      $(".bloque--seis-ocho").removeClass("u-display-none");
      $(".bloque--nueve-trece").addClass("u-display-none");
    } else {
      $(".bloque--tres-cinco").addClass("u-display-none");
      $(".bloque--seis-ocho").addClass("u-display-none");
      $(".bloque--nueve-trece").removeClass("u-display-none");
    }
  });

  $(".bloque--reservas .primero").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("activated");
    $(".bloque--reservas .segundo").removeClass("activated");
    $(".bloque--reservas .tercero").removeClass("activated");
  });

  $(".bloque--reservas .segundo").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("activated");
    $(".bloque--reservas .primero").removeClass("activated");
    $(".bloque--reservas .tercero").removeClass("activated");
  });

  $(".bloque--reservas .tercero").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("activated");
    $(".bloque--reservas .segundo").removeClass("activated");
    $(".bloque--reservas .primero").removeClass("activated");
  });
});
