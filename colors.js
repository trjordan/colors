function drawRgb(canvas, start, end) {
    var scale = pv.Scale.linear(0, 1).range(pv.color(start), pv.color(end));

    var vis = new pv.Panel()
        .canvas(canvas.get(0))
      .add(pv.Bar)
        .data(pv.range(0, 1, 1/canvas.width()))
        .left(function() { return this.index; })
        .fillStyle(scale);

    vis.render();
}

$(document).ready(function() {

    $('button').click(function() {
        var form = $(this).siblings('form');
        var start = form.children('.start').val();
        var end = form.children('.end').val();

        drawRgb($('#results div.canvas.rgb'), start, end);
        return false;
    });

});