
// Generalized interpolation
function getDrawFunction(prop1, prop2, prop3) {
    var props = Array.prototype.slice.call(arguments);
    var drawFunc = function(canvas, start, end) {
        var s = Color(start);
        var e = Color(end);

        var scales = props.map(function(prop) {
            return pv.Scale.linear(0, 1).range(s[prop](), e[prop]());
        });

        var vis = new pv.Panel()
            .canvas(canvas.get(0))
            .add(pv.Bar)
            .data(pv.range(0, 1, 1/canvas.width()))
            .left(function() { return this.index; })
            .fillStyle(function(d) {
                var c = Color();
                _.zip(props, scales).map(function(ps) {
                    c = c[ps[0]](ps[1](d));
                });
                return pv.color(c.rgbString());
            });

        vis.render();
    };

    return drawFunc;
}

// RGB
function drawRgb(canvas, start, end) {
    var f = getDrawFunction('red', 'green', 'blue');
    f.apply(this, arguments);
}

// HSL
function drawHsl(canvas, start, end) {
    var f = getDrawFunction('hue', 'saturation', 'lightness');
    f.apply(this, arguments);
}

// HSV
function drawHsv(canvas, start, end) {
    var f = getDrawFunction('hue', 'saturationv', 'value');
    f.apply(this, arguments);
}

// CMYK
function drawCmyk(canvas, start, end) {
    var f = getDrawFunction('cyan', 'magenta', 'yellow', 'black');
    f.apply(this, arguments);
}

// Main doc handler

$(document).ready(function() {

    $('button').click(function() {
        var form = $(this).siblings('form');
        var start = form.children('.start').val();
        var end = form.children('.end').val();

        drawRgb($('#results div.canvas.rgb'), start, end);
        drawHsl($('#results div.canvas.hsl'), start, end);
        drawHsv($('#results div.canvas.hsv'), start, end);
        drawCmyk($('#results div.canvas.cmyk'), start, end);
        return false;
    });

});