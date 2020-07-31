import {SliderController} from "./SliderController";

$.fn.slider = function () {
   this.each((index: number, element: HTMLElement) => {
     new SliderController(element);
   })
   return this;
 }
