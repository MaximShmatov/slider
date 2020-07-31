import './SliderController';

$.fn.slider = function () {
   this.each((index: number, element: HTMLElement) => {
     let slider = document.createElement('input-slider-plugin');
     Object.assign(slider.dataset, element.dataset);
     $(element).before(slider);
     $(element).remove();
   })
   return this;
 }
