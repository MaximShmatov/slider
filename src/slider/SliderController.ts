import {SliderModel} from './SliderModel';
import {SliderView} from './SliderView';


class SliderController implements ISliderController {
  private readonly model: ISliderModel;
  private readonly view: ISliderView;

  constructor(element: HTMLElement) {
    this.model = new SliderModel(null);
    this.view = new SliderView();
    this.view.className = element.className;
    this.initModel(element);
    this.initView();
    $(element).before(this.view);
    $(element).remove();
    this.view.addEventListener('slider-pos', this.calculateValue.bind(this));
    //this.view.addEventListener('slider-pos', (evt) => {console.log(evt);});
  }

  initModel(element: HTMLElement): void {
    this.model.setDataModelFromElement(element);
    //console.log(this.model);
  }

  initView(): void {
    Object.assign(this.view.dataset, this.model);
    //console.log(this.view.dataset);
  }

  private calculateValue(evt: CustomEvent): void {
    //console.log(evt.detail.valueFrom);
    let val = ((this.model.getMaxValue() - this.model.getMinValue()) / 100 * evt.detail.valueFrom) + this.model.getMinValue();
    val = Math.round(val / this.model.getStepSize()) * this.model.getStepSize();
    this.view.dataset.valueFrom = val.toString();
    //console.log(val);
  }
}

export {SliderController};