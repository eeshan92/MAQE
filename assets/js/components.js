$(function () {
  $canvas = $("#canvas-out");

  $('.deco').click(function() {
    type = $(this).attr('value');
    $.ajax({
      url: "/get_components?type=" + type,
      dataType: 'json',
      success: function(result) {
        removeExcess();
        result.forEach(function(svg) {
          var img = $(document.createElement('img')),
              index = result.indexOf(svg);
          img.attr('class', 'draggable');
          img.attr('id', svg.slice(0,-4));
          img.attr('style', 'position:absolute; left:' + (216 + (index*75)).toString() + 'px;');
          img.attr('src', 'images/svg/' + type + '/' + svg);
          $canvas.append(img);
        });
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr);
        console.log(thrownError);
      }
    });
  });

  $('.sweep').click(function() {
    removeExcess();
  });

  function removeExcess() {
    $cardbox = $("#cardbox-body");
    $('.draggable').each(function(element) {
      $this = $(this);
      if ($this.offset().left + $this.width <= $cardbox.offset().left
            || $this.offset().left >= $cardbox.width() + $cardbox.offset().left
            || $this.offset().top + $this.height <= $cardbox.offset().top
            || $this.offset().top >= $cardbox.height() + $cardbox.offset().top
        ) {
        $(this).remove();
      }
    })
  }
});
