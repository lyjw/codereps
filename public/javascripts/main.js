$(function() {

  // Selecting a Difficulty level
  $('input[type="radio"]').click(function () {
      $('input[type="radio"]:not(:checked)').parent().children('span').removeClass("selected-difficulty");
      $('input[type="radio"]:checked').parent().children('span').addClass("selected-difficulty");
  });

  // Selecting languages
  $('input[type="checkbox"]').click(function () {
      $('input[type="checkbox"]:not(:checked)').parent().children('label[for=' + $(this).attr('id') + ']').removeClass("selected-language");
      $('input[type="checkbox"]:checked').parent().children('label[for=' + $(this).attr('id') + ']').addClass("selected-language");
  });

});
