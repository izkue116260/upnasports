// use fetch to retrieve the products and pass them to init
// report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
$(window).on("load", function () {
  fetch('products.json').then(function(response) {
    console.log("hola3");
    return response.json();
  }).then(function(json) {
    let products = json;
    initialize(products);
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  });

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
    updateDisplay();
    
    // selectProducts() Takes the group of products selected by selectCategory(), and further
    // filters them by the tiered search term (if one has been entered)

    // start the process of updating the display with the new set of products
    function updateDisplay() {
      // remove the previous contents of the <main> element
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
    }

    // fetchBlob uses fetch to retrieve the image for that product, and then sends the
    // resulting image display URL and product object on to showProduct() to finally
    // display it
    function fetchBlob(product) {
      // construct the URL path to the image file from the product.image property
      let url = 'images/' + product.image;
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
      const image = document.createElement('img');

      // Give the <h2> textContent equal to the product "name" property, but with the first character
      // replaced with the uppercase version of the first character
      heading.textContent = product.title.replace(product.title.charAt(0), product.title.charAt(0).toUpperCase());

      noticia.textContent = product.noticia;

      // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
      image.src = objectURL;
      image.alt = product.title;

      // append the elements to the DOM as appropriate, to add the product to the UI
      main.appendChild(section);
      section.appendChild(heading);
      section.appendChild(noticia);
      section.appendChild(image);
    }
  }
});
