$(function () {
  $canvas = $("#canvas-out");
  $('.deco').click(function() {
    type = $(this).attr('value');
    $.ajax({
      url: "/get_components?type=" + type,
      dataType: 'json',
      success: function(result) {
        result.forEach(function(svg) {
          var img = $(document.createElement('img'));
          img.attr('class', 'draggable');
          img.attr('src', 'images/svg/' + type + '/' + svg);
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
