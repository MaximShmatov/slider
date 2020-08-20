import {SliderModel} from './SliderModel';


class SliderPresenter implements ISliderPresenter {
  private readonly model: ISliderModel;
  private readonly view: ISliderView;
  private readonly methods: TMethodsUnion[] = ['minValue', 'maxValue', 'stepSize', 'valueFrom', 'valueTo', 'onScale', 'onTooltip', 'onRange', 'onVertical'];

  constructor(view: ISliderView) {
    this.view = view;
    this.model = new SliderModel(this.observer.bind(this));
    this.view.addEventListener('slider', this.handleViewEvents.bind(this));
  }

  init(obj: HTMLElement | ISliderModel): void {
    this.model.init(obj);
    for (let method of this.methods) {
      this.view.setModelData(method, this.model[method]);
    }
  }

  setProps(method: TMethodsUnion, value: number | boolean): void {
    this.model[method] = <never>value;
    this.view.setModelData(method, this.model[method]);
  }

  getProps(method: TMethodsUnion): number | boolean {
    return this.model[method];
  }

  private handleViewEvents(evt: CustomEvent): void {
    evt.stopPropagation();
    switch (evt.detail.name) {
      case 'valueFrom':
        this.setValueFrom(evt);
        break;
      case 'valueTo':
        this.setValueTo(evt);
    }
  }

  private setValueFrom(evt: CustomEvent) {
    let value = ((this.model.maxValue - this.model.minValue) / 100 * evt.detail.value); //+ model.minValue
    this.setProps(evt.detail.name, value);
  }

  private setValueTo(evt: CustomEvent) {
    let value = (this.model.maxValue - this.model.minValue) / 100 * evt.detail.value;
    this.setProps(evt.detail.name, value);
  }

  private observer(key: TMethodsUnion, value: number | boolean) {
    this.view.dispatchEvent(new CustomEvent('slider-data', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        name: key,
        value: value
      }
    }));
  }
}

export {SliderPresenter}

