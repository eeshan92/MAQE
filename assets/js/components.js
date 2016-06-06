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

  // function parseXml(xml) {
  //   console.log(xml)
  //   result.forEach(function(file) {
  //     console.log(file)
  //     var svg = document.createElement('svg');
  //     $canvas.append(svg);
  //   })
  // };

  // function generate_svg(paths) {
  //   var svg = '';
  //   svg += '<svg width="198px" height="55px" version="1.1" xmlns="http://www.w3.org/2000/svg">\n';

  //   for(var i in paths) {
  //     var path = '';
  //     path += 'M' + paths[i].mx + ' ' + paths[i].my;   // moveTo
  //     path += ' L ' + paths[i].lx + ' ' + paths[i].ly; // lineTo
  //     path += ' Z';                                    // closePath
  //     svg += '<path d="' + path + '"stroke="blue" stroke-width="2"/>\n';
  //   }

  //   svg += '</svg>\n';
  //   return svg;
  // }
});
