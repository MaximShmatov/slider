import {SliderModel} from './SliderModel';
import './SliderView';

class SliderController implements ISliderController {
  private model: ISliderModel;
  private readonly view: HTMLElement;

  constructor(element: HTMLElement) {
    this.model = new SliderModel(null);
    this.view = document.createElement('slider-view');
    this.model.setDataModelFromElement(element);
    this.initView(element);
  }

  initView(element: HTMLElement) {
    Object.assign(this.view.dataset, element.dataset);
    element.before(this.view);
    element.remove();
  }
}

export {SliderController};