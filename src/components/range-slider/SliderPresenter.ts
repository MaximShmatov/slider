import SliderModel from './SliderModel';
import SliderView from './SliderView';

class SliderPresenter {

  readonly model: SliderModel;

  readonly view: SliderView;

  constructor() {
    this.model = new SliderModel(this.modelCallback.bind(this));
    this.view = new SliderView(this.viewCallback.bind(this));
  }

  setProp(name: TSliderPropNames, value: string): void {
    switch(name) {
      case 'minValue':
      case 'maxValue':
      case 'valueFrom':
      case 'valueTo':
        this.model[name] = Number(value);
        this.initView();
        break;
      case 'stepSize':
        this.model[name] = Number(value);
        break;
      case 'isRange':
        if (value === 'false') this.model.valueTo = this.model.maxValue;
        this.view.setAttribute('data-move-to', '100');
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
    }
  }

  getProp(name: TSliderPropNames): number | boolean {
    switch(name) {
      case 'minValue':
      case 'maxValue':
      case 'valueFrom':
      case 'valueTo':
      case 'stepSize':
        return this.model[name]
      case 'isRange':
      case 'isTooltip':
      case 'isScale':
      case 'isVertical':
        return (this.view.dataset[name] === 'true');
      default:
        return NaN;
    }
  }

  init(obj: object) {
    const data = (obj instanceof HTMLElement) ? {...obj.dataset} : {...obj};
    this.model.minValue = Number(data.minValue);
    this.model.maxValue = Number(data.maxValue);
    this.model.valueFrom = Number(data.valueFrom);
    this.model.valueTo = Number(data.valueTo);
    this.model.stepSize = Number(data.stepSize);
    this.view.setAttribute('data-is-vertical', String(data.isVertical));
    this.view.setAttribute('data-is-scale', String(data.isScale));
    this.view.setAttribute('data-is-tooltip', String(data.isTooltip));
    this.view.setAttribute('data-is-range', String(data.isRange));
    this.initView();
  }

  private initView() {
    const min = this.model.minValue;
    const max = this.model.maxValue;
    const percentFrom = (min - this.model.valueFrom) / ((max - min) / 100);
    const percentTo = (min - this.model.valueTo) / ((max - min) / 100);
    this.view.setAttribute('data-move-from', Math.abs(percentFrom).toString());
    this.view.setAttribute('data-move-to', Math.abs(percentTo).toString());
  }

  private modelCallback(name: TModelPropNames, value: number): void {
    switch(name) {
      case 'minValue':
        this.view.setAttribute('data-min-value', value.toString());
        break;
      case 'maxValue':
        this.view.setAttribute('data-max-value', value.toString());
        break;
      case 'valueFrom':
        this.view.setAttribute('data-value-from', value.toString());
        break;
      case 'valueTo':
        this.view.setAttribute('data-value-to', value.toString());
    }
    this.view.dispatchEvent(new CustomEvent('range-slider', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {name, value},
    }));
  }

  private viewCallback(name: 'valueFrom' | 'valueTo', value: number): void {
    const range = this.model.maxValue - this.model.minValue;
    this.model[name] = value * (range / 100) + this.model.minValue;

    const attr = (name === 'valueFrom') ? 'data-move-from' : 'data-move-to';
    this.view.setAttribute(attr, value.toString());
  }
}

export default SliderPresenter;
