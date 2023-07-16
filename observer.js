/**
 * Function to observe the name and price of each product on the page
 */
function observeProducts() {
  // Selecting each product card
  const productInfos = document.getElementsByClassName("c-product__infos");
  // Declaration of a new array that will hold the objects with a name and price key.
  const productsList = [];

  /**
   * Configuration of intersection observer:
   * Root is set to null means that it defaults to the browser viewport
   * Threshold to 0.1 means that the targets will be detected when the visibility passes the 10% mark
   */
  const config = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  /**
   * Observer variable holding the intersection observer function.
   * The needed elements are selected by their classname (getElementsByClassName).
   * If the elements are not undefined, it creates a new object with a name and price key.
   * The elements are pushed to the array.
   * The array is printed to the console.
   */
  const observer = new IntersectionObserver(function (events, self) {
    events.forEach((event) => {
      if (event.isIntersecting) {
        const productName =
          event.target.getElementsByClassName("c-product__name")[0];
        const productPrice = event.target.getElementsByClassName(
          "c-price__value--current"
        )[0];

        if (productName && productPrice) {
          const product = {
            name: productName.innerText,
            price: productPrice.innerText,
          };

          productsList.push(product);

          observer.unobserve(event.target);

          console.log(productsList);
        }
      }
    });
  }, config);

  Array.prototype.forEach.call(productInfos, function (article) {
    observer.observe(article);
  });
}

// Call the function to start observing products
observeProducts();
