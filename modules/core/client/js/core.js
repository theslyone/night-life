'use strict';

$(document).ready(function(){
  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();
  $('.ui.radio.checkbox').checkbox();
  
  $(window).on("scroll touchmove", function () {
    $('header').toggleClass('smaller', $(document).scrollTop() > 0);
  });
});
