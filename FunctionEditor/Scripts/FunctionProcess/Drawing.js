var drawing = (function () {
    var canvas = $("canvas");
    var ctx = canvas[0].getContext("2d");

    var defaults = {
        colors: ["#7AC0DA", "green", "orange"],
        lineWidth: 1,
        size: { width: canvas.width(), height: canvas.height() },
        scaleX: 45,
        scaleY: 45
    };

    var origo = {
        x: defaults.size.width / 2,
        y: defaults.size.height / 2
    }

    var initCanvas = function () {
        ctx.lineWidth = defaults.lineWidth;

        //
        //Horizontal gridlines
        for (var i = 0; i < defaults.size.width / defaults.scaleX; i++) {
            ctx.beginPath();
            ctx.strokeStyle = '#bababa';
            ctx.moveTo((i + 1) * defaults.scaleX, 0);
            ctx.lineTo((i + 1) * defaults.scaleX, defaults.size.height);
            ctx.stroke();
        }

        //
        //Vertical gridlines
        for (var i = 0; i < defaults.size.height / defaults.scaleY; i++) {
            ctx.beginPath();
            ctx.strokeStyle = '#bababa';
            ctx.moveTo(0, (i + 1) * defaults.scaleY);
            ctx.lineTo(defaults.size.width, (i + 1) * defaults.scaleY);
            ctx.stroke();
        }

        //
        //Draw axies
        //
        //Y
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(defaults.size.width / 2, 0);
        ctx.lineTo(defaults.size.width / 2, defaults.size.height);
        ctx.stroke();
        //
        //X
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, defaults.size.height / 2);
        ctx.lineTo(defaults.size.width, defaults.size.width / 2);
        ctx.stroke();
    };

    var drawPoint = function (point) {

        ctx.lineTo(point.x + 0.1, point.y + 0.1);
    }

    //
    //datasource is an array of points
    var drawFunction = function (datasource, color) {
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        datasource.foreach(function (point) {
            drawPoint(point);
        });
        //ctx.lineJoin = 'round';
        ctx.stroke();
    }

    initCanvas();
    var testData = [];
    for (var x = 0 - defaults.size.width / 2; x <= defaults.size.width / 2; x++) {
        var x0 = x / defaults.scaleX;
        var y = Math.tan((Math.PI / 180) * x);
        testData.push({
            x: origo.x + x,
            y: origo.y - (y * defaults.scaleX)
        });
    }
    drawFunction(testData, defaults.colors[0])

    return {

    }
})();