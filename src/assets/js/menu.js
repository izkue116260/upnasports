function abreMenu() {
    var height = 64*5;
    var menuMovil = $(".menu-movil")
    menuMovil.height(height);
    cerrarHome()
}

function cerrarHome() {
    var menuMovil = $(".menu-movil")
    menuMovil.toggleClass("u-display-none")
}

$(window).on("load", function () {
    if(window.location.href === "http://localhost:3005/proyecto-final/home/") {
        $(".header-image").addClass("header-image__imagen");
    }
})