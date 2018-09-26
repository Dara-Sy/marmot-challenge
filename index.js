/*

DOM - Document Object Model

In an HTML file, DOM is created, html turns into a bunch of JS objects

Load HTML in browser, browser displays the HTML, behind the scenes, it makes models of every element which turns into JS object

Entire webpage is called the document

You can manipulate JS objects

Everything is stored inside of the document object, which is the root Node

Write JS code to select elements and change them


Notes:

add a function that extracts cart total, quantity, and images
add a function that appends the info into new divs
add a function that styles the new divs
add a function that creates cart and exit buttons
add a function that shows components and triggers functions to run




*/


 //// this function will extract cart info using DOM methods and store in JS object
    function extractCartInfo(){
      const products = []
      $('.mini-cart-product').map((index, product) => {
        var productInfo = {
          href: '',
          img: '',
          name: '',
          price: '',
          quantity: '',
        };
          productInfo.href = $(product).find('a').attr('href')
          productInfo.img = $(product).find('img').attr('src')
          productInfo.name = $(product).find('.mini-cart-name').text()
          productInfo.price = $(product).find('.mini-cart-price').html()
          productInfo.quantity = $(product).find('.mini-cart-pricing .value').html()
          products.push(productInfo);
      }).get();
      const allCartInfo = {
        allProducts: products,
        numItemsInCart: parseInt($('.minicart-quantity').first().text()),
        cartTotal: $('.order-value').text(),
      }
      return allCartInfo
    };

      // style info and box elements
      // this creates the dark overlay

      function styleInfo(){
        var overlay = $(document.createElement('div')).attr('class', 'overlay');
        $(overlay).css({
          'background-color': 'rgba(0,0,0,0.7)',
          'width': '100%',
          'height': '100%',
          'top': 0,
          'left': 0,
          'position': 'fixed',
          'z-index': 1,
        });
        return overlay;
      }

      function styleBox(){
        var dialogBox = $(document.createElement('div')).attr('class', 'dialog-box');
        $(dialogBox).css({
          'background-color': '#FFFFFF',
          'width': '700px',
          'max-width': '100%',
          'height': '400px',
          'max-height': '100%',
          'left': '50%',
          'top': '50%',
          'transform': 'translate(-50%, -50%)',
          'position': 'relative',
          'z-index': 1,
          'text-align': 'center',
        });
        return dialogBox;
      }

      // create elements to display requested info in box

      // show quantity of items in cart
      function createQuantity(info){
        var header = $(document.createElement('div')).attr('class', 'header');
        $(header).css({
          'font-family': 'ars_maquette_proregular, sans-serif',
          'font-size': 25,
          'padding-top': '20px',
          'color': 'black',
        });
        $(header).html(
          $(`<h2>There are ${info.numItemsInCart} items in your cart.</h2>`)
        );
          return header;
      }

      // show product info in cart
      function styleBoxInfo(info){
        var content = $(document.createElement('div')).attr('class', 'contents-container');
        $(content).css({
          'width': '700px',
          'max-width': '100%',
          'height': '200px',
          'max-height': '100%',
          'position': 'fixed',
          'top': '50%',
          'transform': 'translateY(-50%)',
          'overflow-x': 'auto',
        });
        products = info.allProducts
        for(i=0; i<products.length; i++){
          var newdiv = $(document.createElement('div')).attr('class', 'content-div')
          newdiv.append(`<a href="${products[i].href}"><img src="${products[i].img}">`)
          newdiv.append(`<p>${products[i].name}</p>`)
          newdiv.append(`<p>${products[i].price}</p>`)
          newdiv.append(`<p>Quantiy: ${products[i].quantity}</p>`)
          $(newdiv).css({
            'max-width': '170px',
            'display': 'inline-block',
            'vertical-align': 'top',
            'margin-right': '20px',
          })
          $(content).append(newdiv)
        }
        return content;
      }

      // show cart total price
      function createCartTotal(info){
        var total = $(document.createElement('div')).attr('class', 'total');
        $(total).css({
          'font-family': 'ars_maquette_proregular, sans-serif',
          'font-size': 25,
          'padding': '2px 16px',
          'color': 'black',
          'position': 'absolute',
          'left': '20px',
          'bottom': '20px',
        });
        $(total).html(
          $(`<h2>Your total is: ${info.cartTotal}.</h2>`)
        );
          return total;
      }

      // create the cart and exit buttons

      function createCartButton(){
        var cartButton = $(document.createElement('button')).attr('class', 'cart-button');
        $(cartButton).css({
          'border-radius': '0',
          'font-family': 'ars_maquette_proregular, sans-serif',
          'color': 'black',
          'font-size': '12px',
          'font-weight': 'bold',
          'border': '1px solid black',
          'background-color': 'transparent',
          'font-weight': 'bold',
          'padding': '10px 20px 10px 20px',
          'text-decoration': 'none',
          'position': 'absolute',
          'bottom': '20px',
        })
        $(cartButton).html(
          "Go to Cart"
        );
        return cartButton;
      }

      function createExitButton(){
        var exitButton = $(document.createElement('button')).attr('class', 'close-button');
        $(exitButton).css({
          'border-radius': '0',
          'font-family': 'ars_maquette_proregular, sans-serif',
          'color': 'black',
          'font-size': '12px',
          'font-weight': 'bold',
          'border': '1px solid black',
          'background-color': 'transparent',
          'padding': '10px 20px 10px 20px',
          'text-decoration': 'none',
          'position': 'absolute',
          'right': '20px',
          'bottom': '20px',
        })
        $(exitButton).html(
          "Exit"
        );
        return exitButton;
      }

      // functionality of buttons

      function theButtons(){
          $('.close-button').hover(
           function(){
             $(this).css({
               'background-color':'rgb(204, 0, 1)',
               'color': 'white',
            });
         });
         $('.close-button').click(function(){
           $('.overlay').hide()
         });
         $('.cart-button').hover(
           function(){
             $(this).css({
             'background-color': '#3498db',
             'color': 'white',
             });
           });
         $('.cart-button').click(function(){
           window.location = 'https://marmot.com/cart'
         });
      }

      // show appended components onto the page
      function showAppendedComponents(info){
        $('body').append(styleInfo());
        $('.overlay').append(styleBox());
        $('.dialog-box').append(createQuantity(info));
        $('.dialog-box').append(createCartTotal(info));
        $('.dialog-box').append(styleBoxInfo(info));
        $('.dialog-box').append(createExitButton());
        $('.dialog-box').append(createCartButton());
        theButtons();
      }

        // run the function to get info from the cart
        // set trigger for info and box
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.4/jquery.xdomainrequest.min.js',
          function(){
            var $overlayTrigger = $('#q-2');
            $overlayTrigger.waypoint(function(direction){
              if(direction === 'down'){
                cartInfo = extractCartInfo();
                showAppendedComponents(cartInfo);
              }
            }, {offset: '50%'})
          });
