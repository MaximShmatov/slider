import Model from './Model';
import View from './View';

class Presenter {

  readonly model: Model;

  readonly view: View;

  constructor() {
    this.model = new Model(this.modelCallback.bind(this));
    this.view = new View(this.viewCallback.bind(this));
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
    const minValue = Number(data.minValue);
    if (!isNaN(minValue)) this.model.minValue = minValue
    const maxValue = Number(data.maxValue);
    if (!isNaN(minValue)) this.model.maxValue = maxValue
    const valueTo = Number(data.valueTo);
    if (!isNaN(minValue)) this.model.valueTo = valueTo
    const valueFrom = Number(data.valueFrom);
    if (!isNaN(minValue)) this.model.valueFrom = valueFrom
    const stepSize = Number(data.stepSize);
    if (!isNaN(minValue)) this.model.stepSize = stepSize
    this.model.isRange = (data.isRange === 'true');
    const isVertical =  String(data.isVertical === 'true');
    this.view.setAttribute('data-is-vertical', isVertical);
    const isScale =  String(data.isScale === 'true');
    this.view.setAttribute('data-is-scale', isScale);
    const isTooltip =  String(data.isTooltip === 'true');
    this.view.setAttribute('data-is-tooltip', isTooltip);
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

  private modelCallback(name: TModelPropNames, value: number | boolean): void {
    switch(name) {
      case 'isRange':
        this.view.setAttribute('data-is-range', value.toString());
        break;
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

export default Presenter;
