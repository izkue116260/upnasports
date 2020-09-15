$(window).on("load",function () {
  if(window.location.href === "http://upnasports.surge.sh/proyecto-final/actualidad/") {
    fetch('http://18.222.58.181:8081/actualidad')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      actualidad(myJson);
    });
  }
})


// sets up the app logic, declares required variables, contains all the other functions
function actualidad(products) {
    // grab the UI elements that we need to manipulate
  
    var main = document.querySelector('actualidad');
  
  
    // these contain the results of filtering by category, and search term
    // finalGroup will contain the products that need to be displayed after
    // the searching has been done. Each will be an array containing objects.
    // Each object will represent a product
  
    var finalGroup;
  
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
        var para = document.createElement('p');
        para.textContent = 'No results to display!';
        main.appendChild(para);
      // for each product we want to display, pass its product object to fetchBlob()
      } else {
        for(var i = 0; i < finalGroup.length; i++) {
          fetchBlob(finalGroup[i]);
        }
      }
    }
  
    // fetchBlob uses fetch to retrieve the image for that product, and then sends the
    // resulting image display URL and product object on to showProduct() to finally
    // display it
    function fetchBlob(product) {
      // construct the URL path to the image file from the product.image property
      var url = '../../assets/images/actualidad/' + product.imagen;
      // Use fetch to fetch the image, and convert the resulting response to a blob
      // Again, if any errors occur we report them in the console.
      fetch(url).then(function(response) {
          return response.blob();
      }).then(function(blob) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        var objectURL = URL.createObjectURL(blob);
        // invoke showProduct
        showProductActualidad(objectURL, product);
      });
    }
  
    // Display a product inside the <main> element
    function showProductActualidad(objectURL, product) {
      // create <section>, <h2>, <p>, and <img> elements
      var section = document.createElement('section');
      var heading = document.createElement('h2');
      var noticia = document.createElement('p');
      var div = document.createElement('div');
      var image = document.createElement('img');
  
      // Give the <h2> textContent equal to the product "name" property, but with the first character
      // replaced with the uppercase version of the first character
      heading.textContent = product.titulo.replace(product.titulo.charAt(0), product.titulo.charAt(0).toUpperCase());
  
      noticia.textContent = product.noticia;
  
      // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
      image.src = objectURL;
      image.alt = product.titulo;

      //Estilos y clases
      section.classList = "u-display-flex u-margin-bottom-large "
      image.className = "u-margin-right-large"
      heading.classList = "titulo--secundario"

      image.style = "width: 350px;"
  
      // append the elements to the DOM as appropriate, to add the product to the UI
      
      main.appendChild(section);
      div.appendChild(heading);
      div.appendChild(noticia);
      section.appendChild(image);
      section.appendChild(div);
    }
}