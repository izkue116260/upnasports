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
    }
    x[slideIndex-1].style.display = "block";  
  }

  function carousel() {
    var i;
    var x = document.getElementsByClassName("image-slide");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    //setTimeout(carousel, 10000); // Change image every 5 seconds
  }
}
