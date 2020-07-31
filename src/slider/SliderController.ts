import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import {SliderModel} from './SliderModel';
import {ScaleView, RailView} from './SliderView';


class SliderController implements ISliderController {
  private readonly model: SliderModel;
  private readonly railView: RailView;
  private readonly scaleView: ScaleView;

  constructor(element: HTMLElement) {
    this.model = new SliderModel(null);
    this.railView = new RailView();
    this.scaleView = new ScaleView();
    this.model.className = element.className;
    this.model.attachShadow({mode: 'open'});
    if(this.model.shadowRoot) {
      this.model.shadowRoot.innerHTML = `<style>${require('./SliderPlugin.css')}</style>`;
      this.model.shadowRoot.appendChild(this.railView);
      this.model.shadowRoot.appendChild(this.scaleView);
    }
    this.scaleView.addEventListener('slider-pos', this.calculateValue.bind(this));
    Object.assign(this.model.dataset, element.dataset);
    $(element).before(this.model);
    $(element).remove();
  }

  initView(): void {
    //this.view.setScaleValues(this.model.minValue, this.model.maxValue);
  }

  setThumbPosition(minValue: number, maxValue: number, currentValue: number): void {
    //this.rail.thumb.moveToPosition(currentValue / ((maxValue - minValue) / 100));
  }
  setScaleValues(minValue:number, maxValue: number) {
    //this.scale.render(minValue, maxValue);
  }

  private calculateValue(evt: CustomEvent): void {
    //console.log(evt.detail.valueFrom);
    let val = ((this.model.maxValue - this.model.minValue) / 100 * evt.detail.valueFrom) + this.model.minValue;
    val = Math.round(val / this.model.stepSize) * this.model.stepSize;
    //this.model.dataset.valueFrom = val.toString();
    //console.log(val);
  }
}

export {SliderController};