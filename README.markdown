I've made and modified some JS libraries. Everything under 1KB

# DomFW.js (0.3KB)
Simple selector and Element editing.

### Usage
    var myDiv = $('div')[3]; // return the forth DIV
    
    // Applies to all Divs
    $('div', {
        onclick: function(event) {
            this.style.background = 'red';
            console.log('Clicked!');
        },
        style: {
            cursor: 'pointer',
            borderRadius: 10
        },
        innerHTML: 'Text replaced.'
    }); 

It will always return the DOM Element(s).


# anim.js (0.3KB)
Simple animating library (works well with DomFW)

### Usage
    var myDiv = document.getElementById('myDiv'); // get an element
    
    // Animate it
    animate.width(myDiv, 0, 1000, function() {
        console.log('This DIV disappeared in 1s');
    });
    
    // Or with combinations

    // Changes width and height to 500px in 2 seconds
    animate.height(myDiv, 500, 2000)
           .width (myDiv, 500, 2000);


Default is 1s animation.
