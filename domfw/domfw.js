var $ = function(selector, params, /* placeholders: */ elements, element, i, param, ident, name, j, undefined){
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
    return selector;
};
