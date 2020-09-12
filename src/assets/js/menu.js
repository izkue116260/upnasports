function abreMenu() {
    var height = 64*5;
    var menuMovil = $(".menu-movil")
    menuMovil.height(height);
    menuMovil.toggleClass("clickado");
}


$(window).on("load", function () {
    if(window.location.href === "upnasports.surge.sh/proyecto-final/home/") {
        $(".header-image").addClass("header-image__imagen");
    }
})