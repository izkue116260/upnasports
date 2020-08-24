function abreMenu() {
    var height = 64*5;
    var menuMovil = $(".menu-movil")
    menuMovil.height(height);
    cerrarHome()
}

function cerrarHome() {
    var menuMovil = $(".menu-movil")
    menuMovil.toggleClass("u-display-block")
}