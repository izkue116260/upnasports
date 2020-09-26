function cambiaFuente() {
  if(document.getElementsByClassName("page")[0].className === "page") {
    document.getElementsByTagName("body")[0].className = "dislexico"
    console.log(document.getElementsByTagName("body")[0])
  } else {
    document.getElementsByTagName("body")[0].className = ""
  }
}
