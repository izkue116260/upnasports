$(window).on("load", function () {
  if(window.location.href === "https://upnasports.netlify.app/proyecto-final/actividades/") {    
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
  
    var main = document.querySelector('actividades');
  
    // these contain the results of filtering by category, and search term
    // finalGroup will contain the products that need to be displayed after
    // the searching has been done. Each will be an array containing objects.
    // Each object will represent a product
  
    var finalGroup;
  
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
        var para = document.createElement('p');
        para.textContent = 'No results to display!';
        main.appendChild(para);
      // for each product we want to display, pass its product object to fetchBlob()
      } else {
        for(var i = 0; i < finalGroup.length; i++) {
          fetchBlobActividades(finalGroup[i]);
        }
      }
    }
  
    // fetchBlob uses fetch to retrieve the image for that product, and then sends the
    // resulting image display URL and product object on to showProduct() to finally
    // display it
    function fetchBlobActividades(product) {
      // construct the URL path to the image file from the product.image property
      var url = '../../assets/images/actividades/' + product.imagen;
      // Use fetch to fetch the image, and convert the resulting response to a blob
      // Again, if any errors occur we report them in the console.
      fetch(url).then(function(response) {
          return response.blob();
      }).then(function(blob) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        var objectURL = URL.createObjectURL(blob);
        // invoke showProduct
        showProductActividades(objectURL, product);
      });
    }
  
    // Display a product inside the <main> element
    function showProductActividades(objectURL, product) {
      // create <section>, <h2>, <p>, and <img> elements
      var section = document.createElement('section');
      var heading = document.createElement('h2');
      var image = document.createElement('img');
    heading.textContent = product.nombre.replace(product.nombre.charAt(0), product.nombre.charAt(0).toUpperCase());
    
      // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
      image.src = objectURL;
      image.alt = product.nombre;

      //Estilos y clases
      main.classList = "row"
      section.classList = "col-sm-4 actividad"
      heading.classList = "title--actividades"

      image.style = "height: 200px;"

      section.onclick = function () {
        document.getElementById("modal-actividades").className = ""
        var tituloModal = document.createElement('h2');
        var lugar = document.createElement('p');
        var horario = document.createElement('p');
        var descripcion = document.createElement('p');
        tituloModal.textContent = heading.textContent;
        tituloModal.id = "titulo--modal";
        lugar.textContent = "Lugar: " + product.lugar;
        lugar.id = "lugar";
        horario.textContent = "Horario: " + product.horario;
        horario.id = "horario";
        descripcion.textContent = product.descripcion;
        descripcion.id = "descripcion";

        tituloModal.classList = "title--actividades u-text-center"
        document.getElementById("modal-actividades").firstElementChild.appendChild(tituloModal);
        document.getElementById("modal-actividades").firstElementChild.appendChild(descripcion);
        document.getElementById("modal-actividades").firstElementChild.appendChild(lugar);
        document.getElementById("modal-actividades").firstElementChild.appendChild(horario);
      };

     

      main.appendChild(section);
     
      section.appendChild(image);
      section.appendChild(heading);
    }
}

function cerrarModalActividades() {
  document.getElementById("modal-actividades").className = "u-display-none"
  var titulo = document.getElementById("titulo--modal");
  var lugar = document.getElementById("lugar");
  var horario = document.getElementById("horario");
  var descripcion = document.getElementById("descripcion");
  document.getElementById("modal-actividades").firstElementChild.removeChild(titulo)
  document.getElementById("modal-actividades").firstElementChild.removeChild(lugar)
  document.getElementById("modal-actividades").firstElementChild.removeChild(horario)
  document.getElementById("modal-actividades").firstElementChild.removeChild(descripcion)
}