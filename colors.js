// RGB

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

// HSL
function drawHsl(canvas, start, end) {
    var start = Color(start);
    var end = Color(end);

    var hueScale = pv.Scale.linear(0, 1).range(start.hue(), end.hue());
    var saturationScale = pv.Scale.linear(0, 1).range(start.saturation(), end.saturation());
    var lightnessScale = pv.Scale.linear(0, 1).range(start.lightness(), end.lightness());

    var vis = new pv.Panel()
        .canvas(canvas.get(0))
      .add(pv.Bar)
        .data(pv.range(0, 1, 1/canvas.width()))
        .left(function() { return this.index; })
        .fillStyle(function(d) {
            var c = Color()
                .hue(hueScale(d))
                .saturation(saturationScale(d))
                .lightness(lightnessScale(d));
            return pv.color(c.rgbString());
        });

    vis.render();
}

// Main doc handler

$(document).ready(function() {

    $('button').click(function() {
        var form = $(this).siblings('form');
        var start = form.children('.start').val();
        var end = form.children('.end').val();

        drawRgb($('#results div.canvas.rgb'), start, end);
        drawHsl($('#results div.canvas.hsl'), start, end);
        return false;
    });

});