import {SliderModel} from './SliderModel';
import {SliderView} from './SliderView';


class SliderPresenter implements ISliderPresenter {
  private readonly mapModels: Map<number, SliderModel> = new Map();
  private readonly methods: TMethodsUnion[] = ['minValue', 'maxValue', 'stepSize', 'valueFrom', 'valueTo', 'onScale', 'onTooltip', 'onRange', 'onVertical'];

  constructor() {
  }

  init(obj: JQuery): JQuery {
    let viewArr: SliderView[] = [];
    obj.each((index: number, element: HTMLElement) => {
      if (element instanceof SliderView) {
        viewArr.push(element);
      } else {
        let model = new SliderModel(element);
        let view = new SliderView(model.id);
        for (let method of this.methods) view.setModelData(method, model[method]);
        view.addEventListener('slider', this.handleViewEvents.bind(this));
        $(element).replaceWith(view);
        this.mapModels.set(model.id, model);
        viewArr.push(view);
        console.log(model);
      }
    });
    return $().pushStack(viewArr);
  }

  setProps(view: SliderView, method: TMethodsUnion, value: number | boolean): void {
    let model = this.getModel(view);
    if (model) {
      model[method] = <never>value;
      view.setModelData(method, value);
    }
  }

  getProps(view: SliderView, method: TMethodsUnion): number | boolean {
    let model = this.getModel(view);
    let value: number | boolean = 0;
    if (model) {
      value = <number | boolean>model[method];
    }
    return value;
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
    let model = this.getModel(evt);
    let value: number = 0;
    if (model) {
      value = ((model.maxValue - model.minValue) / 100 * evt.detail.from); //+ model.minValue
    }
    this.setProps(<SliderView>evt.target, evt.detail.name, value);
  }

  private setValueTo(evt: CustomEvent) {
    let model = this.getModel(evt);
    let value: number = 0;
    if (model) {
      value = (model.maxValue - model.minValue) / 100 * evt.detail.value;
    }
    this.setProps(<SliderView>evt.target, evt.detail.name, value);
  }

  private getModel(source: SliderView | CustomEvent): SliderModel | undefined {
    if (source instanceof SliderView) {
      return this.mapModels.get(source.index);
    }
    if (source instanceof CustomEvent) {
      let view = <SliderView>source.target
      return this.mapModels.get(view.index);
    }
  }
}

export {SliderPresenter}

