import SliderModel from './SliderModel';
import SliderView from './SliderView';

class SliderPresenter implements ISliderPresenter {

  private readonly model: ISliderModel;

  private readonly view: ISliderView;

  constructor() {
    this.model = new SliderModel(this.observer.bind(this));
    this.view = new SliderView(this.observer.bind(this))
    this.setHandlesEvents();
  }

  init(obj: HTMLElement | ISliderData | FormData): void {
    this.model.init(obj)
      .then(() => true)
      .catch(() => false);
  }

  setProps(method: TMethodsUnion, value: number | boolean | string): void {
    this.model[method] = <never>value;
  }

  getProps(method: TMethodsUnion): number | boolean | string {
    return this.model[method];
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
    let value: number = (this.model.maxValue - this.model.minValue) / 100;
    let step = this.model.stepSize / value;
    step *= Math.round(evt.detail.value / step);
    value = value * step + this.model.minValue;
    return Math.round(value);
  }

  private setHandlesEvents() {
    this.view.addEventListener('slider-view', this.handleViewEvents.bind(this));
  }

  private modelCallback(key: TMethodsUnion, value: number | boolean | string): void {
    this.view.setModelData(key, value);
    this.view.dispatchEvent(new CustomEvent('slider-data', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { name: key, value },
    }));
  }

  private viewCallback() {

  }
}

export default SliderPresenter;
