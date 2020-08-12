import {SliderModel} from './SliderModel';
import {SliderView} from './SliderView';


class SliderPresenter implements ISliderPresenter {
  private readonly modelMap: Map<number, SliderModel> = new Map();
  private readonly propsMap: Map<string, TPropsUnion> = new Map();

  constructor() {
    this.propsMap
      .set('getMinValue', 'minValue')   .set('setMinValue', 'minValue')
      .set('getMaxValue', 'maxValue')   .set('setMaxValue', 'maxValue')
      .set('getStepSize', 'stepSize')   .set('setStepSize', 'stepSize')
      .set('getValueFrom', 'valueFrom') .set('setValueFrom', 'valueFrom')
      .set('getValueTo', 'valueTo')     .set('setValueTo', 'valueTo')
      .set('isVertical', 'onVertical')  .set('onVertical', 'onVertical')
      .set('isRange', 'onRange')        .set('onRange', 'onRange')
      .set('isTooltip', 'onTooltip')    .set('onTooltip', 'onTooltip')
      .set('isScale', 'onScale')        .set('onScale', 'onScale');
    //this.view.addEventListener('slider-pos', this.handleViewEvents.bind(this));
    //this.view.addEventListener('scale-pos', this.handleScaleEvents.bind(this));
    //this.view.addEventListener('view-events', this.handleViewEvents.bind(this));
  }

  // private handleScaleEvents(evt: CustomEvent) {
  //   this.model.valueFrom = ((this.model.maxValue - this.model.minValue) / 100 * evt.detail.from) + this.model.minValue;
  //   this.view.rail.thumbFrom.moveToPosition(evt.detail.from);
  //
  // }
  // private handleViewEvents(evt: CustomEvent): void {
  //   this.calculateValue(evt.detail.pos);
  //   this.model.valueFrom = this.value;
  // }


  init(obj: JQuery): JQuery {
    let viewArr: SliderView[] = [];
    obj.each((index: number, element: HTMLElement) => {
      if (element instanceof SliderView) {
        viewArr.push(element);
      } else {
        let model = new SliderModel(element);
        let view = new SliderView(model.id);
        view.setModel(model);
        $(element).replaceWith(view);
        this.modelMap.set(model.id, model);
        viewArr.push(view);
      }
    });
    return $().pushStack(viewArr);
  }

  setProps(view: SliderView, method: setMethods, value: number | boolean): void {
    let model = this.modelMap.get(view.index);
    let prop = this.propsMap.get(method);
    if (model && prop && prop !== 'id') {
      model[prop] = <never>value;
      view.setModelData(prop, value);
    }
  }

  getProps(view: SliderView, method: getMethods): number | boolean {
    let model = this.modelMap.get(view.index);
    let prop = this.propsMap.get(method);
    let value: number | boolean = 0;
    if (model && prop) {
      value = <number | boolean>model[prop];
    }
    return value;
  }
}

export {SliderPresenter}

