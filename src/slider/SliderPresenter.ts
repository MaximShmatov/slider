import {SliderModel} from './SliderModel';


class SliderPresenter implements ISliderPresenter {
  private readonly model: ISliderModel;
  private readonly view: ISliderView;
  private readonly methods: TMethodsUnion[] = ['onVertical', 'onRange', 'onTooltip', 'onScale', 'minValue', 'maxValue', 'valueFrom', 'valueTo', 'stepSize'];

  constructor(view: ISliderView) {
    this.view = view;
    this.model = new SliderModel(this.observer.bind(this));
    this.view.addEventListener('slider-view', this.handleViewEvents.bind(this));
  }

  init(obj: HTMLElement | ISliderModel): void {
    this.model.init(obj);
    for (let method of this.methods) {
      this.view.setModelData(method, this.model[method]);
    }
  }

  setProps(method: TMethodsUnion, value: number | boolean): void {
    this.model[method] = <never>value;
  }

  getProps(method: TMethodsUnion): number | boolean {
    return this.model[method];
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
    let value: number = (this.model.maxValue - this.model.minValue) / 100;
    let step = this.model.stepSize / value;
    step = Math.round(evt.detail.value / step) * step;
    value = value * step + this.model.minValue;
    return value;
  }

  private observer(key: TMethodsUnion, value: number | boolean) {
    //console.log(key, value);
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

