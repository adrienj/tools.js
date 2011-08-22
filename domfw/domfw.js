// DomFW v0.2
var $ = function(selector, params, /* placeholders: */ elements, element, i, param, ident, name, j, Obj, undefined){
    // # or .
    ident = selector[0];
    // The rest
    name = selector.slice(1);

    // Tweet-sized selector https://gist.github.com/988627
    selector = document['getElement'+({
        '#':'ById',
        '.':'sByClassName'
    }[ident]||'sByTagName')]({
        '#': name,
        '.': name
    }[ident]||selector);
    
    if(selector.length === undefined) {
        selector=[selector];
    }
    
    var animate = (function(anim) {
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
    
    // Main object
    Obj = function(selector, mainList, k) {
        mainList = {};
        
        // Array-like
        k = 0;
        [].slice.call(selector).map(function(element) {
            mainList[k++] = element;
        });
        mainList.length = k;
        
        // Return desired element
        mainList.get = function(i) {
            return new Obj([mainList[i]]);
        };
        
        // Animate 'em all
        mainList.animate = function(prop, destination, duration) {
            for(k = mainList.length; k--;) {
                animate[prop](mainList[k], destination, duration);
            }
        };
        
        return mainList;
    };
    
    // For each seleted elements
    for(elements = selector.length; elements--;){
        element = selector[elements];
        for(i in params) {
            param = params[i];
            if(Array.isArray(param)) {
                element[i].apply(element, param);
            } else {
                // If the param is an object (as in {style: {background: 'red'}})
                if(param.constructor === Object) {
                    for(j in param) {
                        element[i][j] = param[j];
                    }
                } else {
                    element[i] = param;
                }
            }
        }
    }
    
    return new Obj(selector);
};
