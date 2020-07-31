import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import {SliderModel} from './SliderModel';
import {SliderView} from './SliderView';


class SliderController extends HTMLElement implements ISliderController {
  private readonly model: SliderModel;
  private readonly view: SliderView;

  constructor() {
    super();
    this.model = new SliderModel(null);
    this.view = new SliderView();
    this.view.addEventListener('slider-pos', this.calculateValue.bind(this));
    this.attachShadow({mode: 'open'});
    if(this.shadowRoot) {
      this.shadowRoot.appendChild(this.view);
    }
  }

  initView(): void {
    this.view.setScaleValues(this.model.getMinValue(), this.model.getMaxValue());
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