var fillSurface;

(function () {
    'use strict';
    var surface, surfaceArea, width, height, pixelSize, xPixels, yPixels, baseGap, pixels, opacity, maxDepth;
    function initialize() {
        surface = document.querySelectorAll('.surface')[0];
        surfaceArea = surface.getBoundingClientRect();
        width = surfaceArea.width;
        height = surfaceArea.height;
        pixelSize = nextFactor(35, width);
        xPixels = Math.floor(width / pixelSize);
        yPixels = Math.floor(height / pixelSize);
        baseGap = height % pixelSize;
        pixels = [];
        opacity = 1;
        maxDepth = 30;
        console.log(width + ', ' + height + ', ' + pixelSize + ', ' + xPixels + ', ' + yPixels + ', ' + baseGap);
        return fill;
    }

    function fill() {
        var y = 0;
        while (y < height - baseGap) {
            var x = 0;
            while (x < width) {
                var props = {
                    backgroundColor: randomColor({
                        luminosity: 'light',
                        format: 'hsl', // e.g. 'hsla(27, 88.99%, 81.83%, 0.6450211517512798)',
                        hue: 'blue'
                    }),
                    width: pixelSize + 'px',
                    height: pixelSize + 'px',
                    top: y + 'px',
                    left: x + 'px',
                    position: 'absolute',
                    opacity: opacity,
                    zIndex: 10,
                    borderRadius: '50%'
                }
                var elem = document.createElement('div');
                elem.classList.add('pixel');
                Object.assign(elem.style, props, createDepth());
                surface.appendChild(elem);
                pixels.push(elem);
                x = x + pixelSize;
            }
            y = y + pixelSize;
        }
        surface.style.borderBottom = baseGap + 'px solid ' + randomColor({
                luminosity: 'bright',
                format: 'hsl', // e.g. 'hsla(27, 88.99%, 81.83%, 0.6450211517512798)',
                hue: 'blue'
            });
        surface.style.height = 'calc(100% - ' + baseGap + 'px)';
    }

    function update() {
        setTimeout(update, getRandomInt(333, 999));
        var elem = pixels[Math.floor(Math.random() * pixels.length)];
        updatePixel(elem);
    }

    function createDepth() {
        var depth = getRandomInt(0, maxDepth);
        var offset = depth / 100;
        var width = pixelSize + (pixelSize * offset);
        var height = width;
        var o = (opacity + offset) - (maxDepth / 100);
        return {
            width: width + 'px',
            height: height + 'px',
            boxShadow: '0 0 ' + depth + 'px #333',
            opacity: o,
            zIndex: 10 + depth
        }
    }

    function updatePixel(pixel) {
        var props = createDepth();
        props.backgroundColor = randomColor({
                luminosity: 'bright',
                format: 'hsl', // e.g. 'hsla(27, 88.99%, 81.83%, 0.6450211517512798)',
                hue: 'blue'
            });
        Object.assign(pixel.style, props);
    }

    function nextFactor(start, target) {
        return target % start == 0 ? start : nextFactor(++start, target);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        fillSurface = initialize();
        fillSurface();
        setTimeout(update, 100);
    });

}());
