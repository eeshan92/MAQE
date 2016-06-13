$(function () {
  $canvas = $("#canvas-out");
  $('#style').click(function() {
    $.ajax({
      url: "/get_components",
      dataType: 'json',
      success: function(result) {
        result.forEach(function(svg) {
          var img = $(document.createElement('img'));
          img.attr('class', 'draggable');
          img.attr('src', 'images/svg/christmas/' + svg);
          $canvas.append(img);
        });
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr);
        console.log(thrownError);
      }
    });
  })
});
