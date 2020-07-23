import {SliderController} from './SliderController';
import {SliderModel} from './SliderModel';
import './SliderView';

$.fn.sliderPlugin = function (data: ISliderModelData | null) {
  this.each((index: number, element: HTMLElement) => {
    if (data) {
      new SliderController(new SliderModel(data), document.createElement('slider-view'));
    } else {
      let sliderModel = new SliderModel(null);
      for(let prop in element.dataset) {
        console.log()
        switch (prop) {
          case 'min':
            sliderModel.minValue = Number(element.dataset[prop]);
            break;
          case 'max':
            sliderModel.maxValue = Number(element.dataset[prop]);
            break;
          case 'value-from':
            sliderModel.valueFrom = Number(element.dataset[prop]);
            break;
          case 'value-to':
            sliderModel.valueTo = Number(element.dataset[prop]);
            break;
          case 'step-value':
            sliderModel.stepSizeValue = Number(element.dataset[prop]);
            break;
          case 'vertical':
            sliderModel.onVertical = Boolean(element.dataset[prop]);
            break;
          case 'range':
            sliderModel.onRange = Boolean(element.dataset[prop]);
            break;
          case 'tooltip':
            sliderModel.onTooltip = Boolean(element.dataset[prop]);
            break;
        }
      }
      new SliderController(new SliderModel(data), document.createElement('slider-view'));
    }
    element.remove();
  })
  return this;
}