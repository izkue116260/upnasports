$(window).on("load", function () {
  if(window.location.href === "http://localhost:3005/proyecto-final/actividades/") {    
    fetch('http://127.0.0.1:5000/actividades')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        actividades(myJson);
    });
  }
})


// sets up the app logic, declares required variables, contains all the other functions
function actividades(products) {
    // grab the UI elements that we need to manipulate
  
    const main = document.querySelector('actividades');
  
    // these contain the results of filtering by category, and search term
    // finalGroup will contain the products that need to be displayed after
    // the searching has been done. Each will be an array containing objects.
    // Each object will represent a product
  
    let finalGroup;
  
    // To start with, set finalGroup to equal the entire products database
    // then run updateDisplay(), so ALL products are displayed initially.
    finalGroup = products;
    updateDisplayActividades();
  
    // Set both to equal an empty array, in time for searches to be run
    finalGroup = [];
    
    // selectProducts() Takes the group of products selected by selectCategory(), and further
    // filters them by the tiered search term (if one has been entered)
  
    // start the process of updating the display with the new set of products
    function updateDisplayActividades() {

      // if no products match the search term, display a "No results to display" message
      if(finalGroup.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results to display!';
        main.appendChild(para);
      // for each product we want to display, pass its product object to fetchBlob()
      } else {
        for(let i = 0; i < finalGroup.length; i++) {
          fetchBlobActividades(finalGroup[i]);
        }
      }
    }
  
    // fetchBlob uses fetch to retrieve the image for that product, and then sends the
    // resulting image display URL and product object on to showProduct() to finally
    // display it
    function fetchBlobActividades(product) {
      // construct the URL path to the image file from the product.image property
      let url = '../../assets/images/actividades/' + product.imagen;
      // Use fetch to fetch the image, and convert the resulting response to a blob
      // Again, if any errors occur we report them in the console.
      fetch(url).then(function(response) {
          return response.blob();
      }).then(function(blob) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        let objectURL = URL.createObjectURL(blob);
        // invoke showProduct
        showProductActividades(objectURL, product);
      });
    }
  
    // Display a product inside the <main> element
    function showProductActividades(objectURL, product) {
      // create <section>, <h2>, <p>, and <img> elements
      const section = document.createElement('section');
      const heading = document.createElement('h2');
      const image = document.createElement('img');
    heading.textContent = product.nombre.replace(product.nombre.charAt(0), product.nombre.charAt(0).toUpperCase());
    
      // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
      image.src = objectURL;
      image.alt = product.nombre;

      //Estilos y clases
      main.classList = "row"
      section.classList = "col-sm-4"
      heading.classList = "title--actividades"

      image.style = "height: 200px;"

      main.appendChild(section);
      // if(product.tipo === 'actividad') {
      //   actividad.appendChild()
      // }
  
      // append the elements to the DOM as appropriate, to add the product to the UI
     
      section.appendChild(image);
      section.appendChild(heading);
    }
}
