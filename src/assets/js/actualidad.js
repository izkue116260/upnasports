$(window).on("load", function () {
    fetch('http://127.0.0.1:5000/actualidad')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        initialize(myJson);
    });
})


// sets up the app logic, declares required variables, contains all the other functions
function initialize(products) {
    // grab the UI elements that we need to manipulate
  
    const main = document.querySelector('main');
  
  
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
      // remove the previous contents of the <main> element
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
  
      // if no products match the search term, display a "No results to display" message
      if(finalGroup.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results to display!';
        main.appendChild(para);
      // for each product we want to display, pass its product object to fetchBlob()
      } else {
        for(let i = 0; i < finalGroup.length; i++) {
          fetchBlob(finalGroup[i]);
        }
      }
    }
  
    // fetchBlob uses fetch to retrieve the image for that product, and then sends the
    // resulting image display URL and product object on to showProduct() to finally
    // display it
    function fetchBlob(product) {
      // construct the URL path to the image file from the product.image property
      let url = '../../assets/images/actualidad/' + product.imagen;
      // Use fetch to fetch the image, and convert the resulting response to a blob
      // Again, if any errors occur we report them in the console.
      fetch(url).then(function(response) {
          return response.blob();
      }).then(function(blob) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        let objectURL = URL.createObjectURL(blob);
        // invoke showProduct
        showProduct(objectURL, product);
      });
    }
  
    // Display a product inside the <main> element
    function showProduct(objectURL, product) {
      // create <section>, <h2>, <p>, and <img> elements
      const section = document.createElement('section');
      const heading = document.createElement('h2');
      const noticia = document.createElement('p');
      const div = document.createElement('div');
      const image = document.createElement('img');
  
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

      image.style = "width: 400px;"
  
      // append the elements to the DOM as appropriate, to add the product to the UI
      main.appendChild(section);
      div.appendChild(heading);
      div.appendChild(noticia);
      section.appendChild(image);
      section.appendChild(div);
    }
}