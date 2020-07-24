import {SliderController} from './SliderController';

$.fn.sliderPlugin = function () {
  this.each((index: number, element: HTMLElement) => {
    new SliderController(element);
  })
  return this;
}