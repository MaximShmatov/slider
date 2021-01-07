import SliderModel from './SliderModel';
import SliderView from './SliderView';

class SliderPresenter {

  readonly model: SliderModel;

  readonly view: SliderView;

  constructor() {
    this.model = new SliderModel(this.modelCallback.bind(this));
    this.view = new SliderView(this.viewCallback.bind(this))
  }

  setProp(prop: TRangeSliderKeys, value: string): void {
    switch(prop) {
      case 'minValue':
        this.model.minValue = Number(value);
        break;
      case 'maxValue':
        this.model.maxValue = Number(value);
        break;
      case 'valueFrom':
        this.model.valueFrom = Number(value);
        break;
      case 'valueTo':
        this.model.valueTo = Number(value);
        break;
      case 'stepSize':
        this.model.stepSize = Number(value);
        break;
      case 'isRange':
        this.view.setAttribute('data-is-range', value);
        break;
      case 'isTooltip':
        this.view.setAttribute('data-is-tooltip', value);
        break;
      case 'isScale':
        this.view.setAttribute('data-is-scale', value);
        break;
      case 'isVertical':
        this.view.setAttribute('data-is-vertical', value);
        break;
      default:
    }
  }

  getProp(prop: TRangeSliderKeys): number | boolean {
    switch(prop) {
      case 'minValue':
        return this.model.minValue
      case 'maxValue':
        return this.model.maxValue
      case 'valueFrom':
        return this.model.valueFrom
      case 'valueTo':
        return this.model.valueTo
      case 'stepSize':
        return this.model.stepSize
      case 'isRange':
        return (this.view.dataset.isRange === 'true');
      case 'isTooltip':
        return (this.view.dataset.isTooltip === 'true');
      case 'isScale':
        return (this.view.dataset.isScale === 'true');
      case 'isVertical':
        return (this.view.dataset.isVertical === 'true');
      default:
        return false;
    }
  }

  init(obj: object) {
    const data = (obj instanceof HTMLElement) ? {...obj.dataset} : {...obj};
    for (const key in data) {
      this.setProp(key as TRangeSliderKeys, String(data[key]));
    }
  }

  private modelCallback(prop: TSliderModelKeys, val: number): void {
    const value = String(val);
    switch(prop) {
      case 'minValue':
        this.view.setAttribute('data-min-value', value);
        break;
      case 'maxValue':
        this.view.setAttribute('data-max-value', value);
        break;
      case 'valueFrom':
        this.view.setAttribute('data-value-from', value);
        break;
      case 'valueTo':
        this.view.setAttribute('data-value-to', value);
        break;
      case 'stepSize':
        this.view.setAttribute('data-step-size', value);
        break;
      default:
    }
  }

  private viewCallback(prop: TSliderModelKeys, val: number): void {
      const range = this.model.maxValue - this.model.minValue;
      const value = val * (range / 100);
      this.setProp(prop, String(value));
  }
}

export default SliderPresenter;
