$(document).ready(function(){
  $(".bloque-header").hover(function(){
    console.log("HOVER");
    $(this).css("padding-top", "20px");
    $(this).css("padding-bottom", "20px");
    $(this).css("font-size", "24px");
    }, function(){
    $(this).css("padding-top", "10px");
    $(this).css("padding-bottom", "10px");
    $(this).css("font-size", "16px");
  });
});
