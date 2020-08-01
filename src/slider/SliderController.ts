import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import {SliderModel} from './SliderModel';
import {ScaleView, RailView} from './SliderView';


class SliderController implements ISliderController {
  private readonly model: SliderModel;
  private readonly railView: RailView;
  private readonly scaleView: ScaleView;
  private currentValue: number;

  constructor(element: HTMLElement) {
    this.model = new SliderModel(element);
    this.railView = new RailView();
    this.scaleView = new ScaleView();
    if(this.model.onRange) {
      this.currentValue = this.model.minValue - this.model.maxValue;
    } else {
      this.currentValue = this.model.minValue;
    }
    this.model.attachShadow({mode: 'open'});
    if(this.model.shadowRoot) {
      this.model.shadowRoot.innerHTML = `<style>${require('./SliderPlugin.css')}</style>`;
      this.model.shadowRoot.appendChild(this.railView);
      this.model.shadowRoot.appendChild(this.scaleView);
    }
    this.model.addEventListener('slider-data', this.handleModelEvents.bind(this));
    this.railView.addEventListener('slider-pos', this.handleRailEvents.bind(this));
    this.scaleView.addEventListener('scale-pos', this.handleScaleEvents.bind(this));
    $(element).before(this.model);
    $(element).remove();
    this.initView();
  }

  initView(): void {
    this.scaleView.setValues(this.model.minValue, this.model.maxValue);
    this.railView.thumb.onTooltip(this.model.onTooltip);
  }

  setThumbPosition(minValue: number, maxValue: number, currentValue: number): void {
    //this.rail.thumb.moveToPosition(currentValue / ((maxValue - minValue) / 100));
  }
  setScaleValues(minValue:number, maxValue: number) {
    //this.scale.render(minValue, maxValue);
  }
  private handleScaleEvents(evt: CustomEvent) {
    console.log('handle scale events');
    this.model.valueFrom = ((this.model.maxValue - this.model.minValue) / 100 * evt.detail.from) + this.model.minValue;
    this.railView.thumb.moveToPosition(evt.detail.from);

  }
  private handleRailEvents(evt: CustomEvent): void {
    this.calculateValue(evt.detail.pos);
    this.model.valueFrom = this.currentValue;
    this.railView.thumb.setTooltipValue(this.currentValue);
  }

  private calculateValue(pos: number) {
    this.currentValue = ((this.model.maxValue - this.model.minValue) / 100 * pos) + this.model.minValue;
    this.currentValue = Math.round(this.currentValue / this.model.stepSize) * this.model.stepSize;

  }
  private handleModelEvents(evt: CustomEvent) {
    switch (evt.detail.data) {
      case 'data-value-from':
        break;
      case 'data-value-to':
        break;
      case 'data-min-value':
        this.scaleView.setValues(this.model.minValue, this.model.maxValue);
        break;
      case 'data-max-value':
        this.scaleView.setValues(this.model.minValue, this.model.maxValue);
        break;
      case 'data-on-vertical':
        break;
      case 'data-on-range':
        break;
      case 'data-on-tooltip':
        this.railView.thumb.onTooltip(this.model.onTooltip);
    }
  }
}

export {SliderController};