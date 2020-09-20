if ($('.bloque-slide').length){
  var slideIndex = 1;
  showDivs(slideIndex);
  var myIndex = 0;
  carousel();

  function plusDivs(n) {
    showDivs(slideIndex += n);
  }

  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("image-slide");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
      $(".bloque-slide a")[i].setAttribute("aria-hidden","true") 
    }
    // x[slideIndex-1].attr("aria-hidden","true");
    x[slideIndex-1].style.display = "block"; 
    $(".bloque-slide a")[slideIndex-1].setAttribute("aria-hidden","false")
  }

  function carousel() {
    var i;
    var x = document.getElementsByClassName("image-slide");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
      $(".bloque-slide a")[i].setAttribute("aria-hidden","true")
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    $(".bloque-slide a")[myIndex-1].setAttribute("aria-hidden","false")
    //setTimeout(carousel, 10000); // Change image every 5 seconds
  }
}
