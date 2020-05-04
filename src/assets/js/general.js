$(window).on('load', function () {
    $(".btn-tfn").on("click", function (e) {
      e.preventDefault();
      $('.form-group--telefono').toggleClass("u-display-none");
    });
    $(".btn-correo").on("click", function (e) {
        e.preventDefault();
        $('.form-group--correo').toggleClass("u-display-none");
    });
});  