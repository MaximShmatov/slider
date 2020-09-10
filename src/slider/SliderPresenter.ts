import {SliderModel} from './SliderModel';
import {SliderView} from './SliderView';


class SliderPresenter implements ISliderPresenter {
  readonly view: ISliderView;
  private readonly _model: ISliderModel;
  private readonly _methods: TMethodsUnion[] = ['onVertical', 'onRange', 'onTooltip', 'onScale', 'minValue', 'maxValue', 'valueFrom', 'valueTo', 'stepSize', 'serverURL'];

  constructor() {
    this.view = new SliderView(this);
    this._model = new SliderModel(this.observer.bind(this));
    this.view.addEventListener('slider-view', this.handleViewEvents.bind(this));
  }

  init(obj: HTMLElement | ISliderData): void {
    this._model.init(obj)
      .then(() => {
        for (let method of this._methods) {
          this.view.setModelData(method, this._model[method]);
        }
        return true;
      })
      .catch((e) => {
        console.log('Error model initialization', e);
        return false;
      });
  }

  setProps(method: TMethodsUnion, value: number | boolean | URL): void {
    this._model[method] = <never>value;
  }

  getProps(method: TMethodsUnion): number | boolean | URL {
    return this._model[method];
  }

  private handleViewEvents(evt: CustomEvent): void {
    evt.stopPropagation();
    switch (evt.detail.name) {
      case 'valueFrom':
      case 'valueTo':
        this.setProps(evt.detail.name, this.calcFromToValues(evt));
    }
  }

  private calcFromToValues(evt: CustomEvent): number {
    let value: number = (this._model.maxValue - this._model.minValue) / 100;
    let step = this._model.stepSize / value;
    step = Math.round(evt.detail.value / step) * step;
    value = value * step + this._model.minValue;
    return Math.round(value);
  }

  private observer(key: TMethodsUnion, value: number | boolean | URL) {
    this.view.setModelData(key, value);
    this.view.dispatchEvent(new CustomEvent('slider-data', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {name: key, value: value}
    }));
  }
}

export {SliderPresenter}

