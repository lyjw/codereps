$(function() {

  // Selecting a Difficulty level
  $('input').click(function () {
      $('input:not(:checked)').parent().removeClass("selected-difficulty");
      $('input:checked').parent().addClass("selected-difficulty");
  });


});
