(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function($) {
  $( function() {
      // The DOM is ready!
      // The rest of the code goes here
      /*Do smth that doesn't require DOM to be ready*/
    });
  }(jQuery));
(function($) {
//MENU MOBILE
  $(document).ready(function () {
    $('.navbar-toggler.collapsed').click(function () {
      $('body').toggleClass('overflow-hidden');
    });
    $('.navbar-toggler-icon').click(function () {
      $('.navbar-toggler-icon').toggleClass('navbar-toggler-icon--cerrar');
    });
    $('.nav-link').click(function () {
      $('.navbar-toggler-icon').toggleClass('navbar-toggler-icon--cerrar');
    });

    $('.js-menu-collapse').click(function(){
      $('.navbar-collapse').collapse('hide');
      $('body').toggleClass('overflow-hidden');
    });
  });
}(jQuery));

// NAVBAR SCROLL
// $(window).scroll(function(e) {
//  var scroll = $(window).scrollTop();
//  if (scroll >= 150) {
//      $('.c-header').addClass("c-header--scroll");
//  } else {
//      $('.c-header').removeClass("c-header--scroll");
//  }
// });

},{}]},{},[1]);
