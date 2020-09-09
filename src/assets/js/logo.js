$(window).on("load", function () {
  fetch('http://127.0.0.1:5000/logo')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    logo(myJson);
  });
})


// sets up the app logic, declares required variables, contains all the other functions
function logo(products) {
    // grab the UI elements that we need to manipulate
  
    var main = document.getElementsByClassName("home")[0];
  
    // these contain the results of filtering by category, and search term
    // finalGroup will contain the products that need to be displayed after
    // the searching has been done. Each will be an array containing objects.
    // Each object will represent a product
  
    var finalGroup;
  
    // To start with, set finalGroup to equal the entire products database
    // then run updateDisplay(), so ALL products are displayed initially.
    finalGroup = products;
    updateDisplayLogo();
  
    // Set both to equal an empty array, in time for searches to be run
    finalGroup = [];
    
    // selectProducts() Takes the group of products selected by selectCategory(), and further
    // filters them by the tiered search term (if one has been entered)
  
    // start the process of updating the display with the new set of products
    function updateDisplayLogo() {

      // if no products match the search term, display a "No results to display" message
      if(finalGroup.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'No results to display!';
        main.appendChild(para);
      // for each product we want to display, pass its product object to fetchBlob()
      } else {
        for(var i = 0; i < finalGroup.length; i++) {
          fetchBlobLogo(finalGroup[i]);
        }
      }
    }
  
    // fetchBlob uses fetch to retrieve the image for that product, and then sends the
    // resulting image display URL and product object on to showProduct() to finally
    // display it
    function fetchBlobLogo(product) {
      // construct the URL path to the image file from the product.image property
      var url = '../../assets/images/' + product.url;
      // Use fetch to fetch the image, and convert the resulting response to a blob
      // Again, if any errors occur we report them in the console.
      fetch(url).then(function(response) {
          return response.blob();
      }).then(function(blob) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        var objectURL = URL.createObjectURL(blob);
        // invoke showProduct
        showProductLogo(objectURL, product);
      });
    }
  
    // Display a product inside the <main> element
    function showProductLogo(objectURL, product) {
      // create <section>, <h2>, <p>, and <img> elements
      var image = document.createElement('img');
      
      // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
      image.src = objectURL;
      image.alt = product.nombre;
      main.appendChild(image)
      
    }
}