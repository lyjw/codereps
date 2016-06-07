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

  // User Panel Toggles
  $('#side-panel').click(function() {
    $('#main-panel').toggle();
    $('.toggle-panel').toggleClass('glyphicon-triangle-left');
    $('#rep-view').toggleClass("col-md-9 col-md-10");
    $('#user-panel').toggleClass("col-md-3 col-md-2");
  });

  $('.toggle-settings').click(function() {
    $('#user-settings').slideToggle(1000);
  })
});
