window.animate = (function(anim) {
    [['width','offsetWidth'],
    ['height','offsetHeight']].map(function(wh){
        // anim.[width,height] = function()...
        anim[wh[0]] = function(element, destination, duration, c, p, offsetWH, distance, style) {
            // Initial values
            if(duration || duration === 0) {
                duration = Math.floor(duration/100) * 100;
            } else {
                duration = 1000;
            }
            distance = destination - (offsetWH = element[wh[1]]);
            style = element.style;
            style[wh[0]] = offsetWH + "px";
            // Animation loop
            (function animation() {
                offsetWH += 20 * distance/duration;
                // style.[width,height]
                style[wh[0]] = offsetWH + "px";
                if(parseInt(style[wh[0]]) != destination) {
                    setTimeout(animation, 20);
                } else {
                    if(c) {
                        c.call(element);
                    }
                }
            })();
            // Chaining
            return anim;
        };
   });
   return anim;
})({});
