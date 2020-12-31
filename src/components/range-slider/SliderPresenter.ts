import SliderModel from './SliderModel';
import './SliderView';

class SliderPresenter implements ISliderPresenter {
  readonly view: ISliderView;

  private readonly _model: ISliderModel;

  constructor() {
    this._model = new SliderModel(this.observer.bind(this));
    this.view = <ISliderView> document.createElement('input-slider');
    this.view.presenter = this;
    this.setHandlesEvents();
  }

  init(obj: HTMLElement | ISliderData | FormData): void {
    this._model.init(obj)
      .then(() => true)
      .catch(() => false);
  }

  setProps(method: TMethodsUnion, value: number | boolean | string): void {
    this._model[method] = <never>value;
  }

  getProps(method: TMethodsUnion): number | boolean | string {
    return this._model[method];
  }

  private handleViewEvents(evt: CustomEvent): void {
    evt.stopPropagation();
    switch (evt.detail.name) {
      case 'valueFrom':
      case 'valueTo':
        this.setProps(evt.detail.name, this.calcFromToValues(evt));
        break;
      default:
    }
  }

  private calcFromToValues(evt: CustomEvent): number {
    let value: number = (this._model.maxValue - this._model.minValue) / 100;
    let step = this._model.stepSize / value;
    step *= Math.round(evt.detail.value / step);
    value = value * step + this._model.minValue;
    return Math.round(value);
  }

  private setHandlesEvents() {
    this.view.addEventListener('slider-view', this.handleViewEvents.bind(this));
  }

  private observer(key: TMethodsUnion, value: number | boolean | string): void {
    this.view.setModelData(key, value);
    this.view.dispatchEvent(new CustomEvent('slider-data', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { name: key, value },
    }));
  }
}

export default SliderPresenter;