import * as noUiSlider from 'nouislider/distribute/nouislider.js';
const slider = document.getElementById('range-slider');

if (slider) {
    noUiSlider.create(slider, {
        start: [5000, 10000],
        connect: true,
        step: 1,
        range: {
            'min': 0,
            'max': 20000
        }
    });

    const input_0 = document.getElementById('inputSlider-0');
    const input_1 = document.getElementById('inputSlider-1');
    const inputs = [input_0, input_1];

    slider.noUiSlider.on('update', function(values, handle){
        inputs[handle].value = Math.round(values[handle]);
    });
};