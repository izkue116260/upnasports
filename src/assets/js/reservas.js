
 $('.reservar').click(function () {
  $(this).toggleClass('ocupado');
  if(this.innerHTML === "Reservar") {
    this.innerHTML = "Ocupado"
  } else {
    this.innerHTML = "Reservar"
  }
})


$(window).on("load", function () {
  fetch('http://127.0.0.1:5000/reservas')
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    reservas(myJson);
  });
})


// sets up the app logic, declares required variables, contains all the other functions
function reservas(products) {
  // grab the UI elements that we need to manipulate

  const main = document.querySelector('actualidad');


  // these contain the results of filtering by category, and search term
  // finalGroup will contain the products that need to be displayed after
  // the searching has been done. Each will be an array containing objects.
  // Each object will represent a product

  let finalGroup;

  // To start with, set finalGroup to equal the entire products database
  // then run updateDisplay(), so ALL products are displayed initially.
  finalGroup = products;
  updateDisplay();

  // Set both to equal an empty array, in time for searches to be run
  finalGroup = [];
  
  // selectProducts() Takes the group of products selected by selectCategory(), and further
  // filters them by the tiered search term (if one has been entered)

  // start the process of updating the display with the new set of products
  function updateDisplay() {

    // if no products match the search term, display a "No results to display" message
    if(finalGroup.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
    // for each product we want to display, pass its product object to fetchBlob()
    } else {
      for(let i = 0; i < finalGroup.length; i++) {
        showProduct(finalGroup[i]);
      }
    }
  }

  // Display a product inside the <main> element
  function showProduct(product) {
    const hora = document.getElementById(product.hora).nextElementSibling;
    let lugar = document.getElementById(product.lugar);
    switch (lugar){
      case "padel1": 
        lugar = 0;
        break;
      case "padel2": 
        lugar = 1;
        break;
      case "padel3": 
        lugar = 2;
        break;
      case "tenis1": 
        lugar = 3;
        break;
      case "tenis2": 
        lugar = 4;
        break;
      case "trinquete": 
        lugar = 5;
        break;
      default: 
        lugar = 6;
        break;
    }
    let ocupado = hora;
    for(let i = 0; i < lugar-1; i++) {
      ocupado = ocupado.nextElementSibling;
    }
    ocupado.innerHTML = "Ocupado"
    ocupado.className = "ocupado"
    console.log(hora)
    // create <section>, <h2>, <p>, and <img> elements
    console.log(product.hora)

  }
}