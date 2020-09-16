$(window).on("load", function () {
  $(".btn-tfn").on("click", function (e) {
    e.preventDefault();
    $(".form-group--telefono").toggleClass("u-display-none");
  });

  $(".btn-correo").on("click", function (e) {
    e.preventDefault();
    $(".form-group--correo").toggleClass("u-display-none");
  });

  $("#rango-edad").on("change",function () {
    if ($(this).val() == 0) {
      $(".bloque--vacio").removeClass("u-display-none");
      $(".bloque--tres-cinco").addClass("u-display-none");
      $(".bloque--seis-ocho").addClass("u-display-none");
      $(".bloque--nueve-trece").addClass("u-display-none");
    }
    else if ($(this).val() == 1) {
      $(".bloque--vacio").addClass("u-display-none");
      $(".bloque--tres-cinco").removeClass("u-display-none");
      $(".bloque--seis-ocho").addClass("u-display-none");
      $(".bloque--nueve-trece").addClass("u-display-none");
    } else if ($(this).val() == 2) {
      $(".bloque--vacio").addClass("u-display-none");
      $(".bloque--tres-cinco").addClass("u-display-none");
      $(".bloque--seis-ocho").removeClass("u-display-none");
      $(".bloque--nueve-trece").addClass("u-display-none");
    } else {
      $(".bloque--vacio").addClass("u-display-none");
      $(".bloque--tres-cinco").addClass("u-display-none");
      $(".bloque--seis-ocho").addClass("u-display-none");
      $(".bloque--nueve-trece").removeClass("u-display-none");
    }
  });

  $(".primero").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("activated");
    $(".segundo").removeClass("activated");
    $(".tercero").removeClass("activated");
  });

  $(".segundo").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("activated");
    $(".primero").removeClass("activated");
    $(".tercero").removeClass("activated");
  });

  $(".tercero").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("activated");
    $(".segundo").removeClass("activated");
    $(".primero").removeClass("activated");
  });
});
