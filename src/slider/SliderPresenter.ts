import {SliderModel} from './SliderModel';
import {SliderView} from './SliderView';


class SliderPresenter implements ISliderPresenter {
  private readonly modelMap: Map<number, SliderModel> = new Map();
  private readonly propsMap: Map<string, TPropsUnion> = new Map();

  constructor() {
    this.propsMap
      .set('setMinValue', 'minValue')
      .set('setMaxValue', 'maxValue')
      .set('setStepSize', 'stepSize')
      .set('setValueFrom', 'valueFrom')
      .set('setValueTo', 'valueTo')
      .set('onVertical', 'onVertical')
      .set('onRange', 'onRange')
      .set('onTooltip', 'onTooltip')
      .set('onScale', 'onScale');
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
    if (model && prop && prop !== 'id' ) {
      model[prop] = <never>value;
      view.setModelData(prop, value);
    }
  }

  getProps(view: SliderView, method: getMethods): number | boolean {
    let model = this.modelMap.get(view.index);
    let value: number | boolean = 0;
    if (model) {
      value = this[method](model);
    }
    return value;
  }

  private setMinValue(model: SliderModel, value: number | boolean): void {
    model.minValue = <number>value;
  }

  private getMinValue(model: ISliderModel): number {
    return model.minValue;
  }

  private setMaxValue(model: SliderModel, value: number | boolean): void {
    model.maxValue = <number>value;
  }

  private getMaxValue(model: ISliderModel): number {
    return model.maxValue;
  }

  private setStepSize(model: SliderModel, value: number | boolean): void {
    model.stepSize = <number>value;
  }

  private getStepSize(model: ISliderModel): number {
    return model.stepSize;
  }

  private setValueFrom(model: SliderModel, value: number | boolean): void {
    model.valueFrom = <number>value;
  }

  private getValueFrom(model: ISliderModel): number {
    return model.valueFrom;
  }

  private setValueTo(model: SliderModel, value: number | boolean): void {
    model.valueTo = <number>value;
  }

  private getValueTo(model: ISliderModel): number {
    return model.valueTo;
  }

  private onScale(model: SliderModel, value: number | boolean): void {
    model.onScale = <boolean>value;
  }

  private isScale(model: ISliderModel): boolean {
    return model.onScale;
  }

  private onTooltip(model: SliderModel, value: number | boolean): void {
    model.onTooltip = <boolean>value;
  }

  private isTooltip(model: ISliderModel): boolean {
    return model.onTooltip;
  }

  private onRange(model: SliderModel, value: number | boolean): void {
    model.onRange = <boolean>value;
  }

  private isRange(model: ISliderModel): boolean {
    return model.onRange;
  }

  private onVertical(model: SliderModel, value: number | boolean): void {
    //console.log(model.onRange)
    model.onVertical = <boolean>value;
  }

  private isVertical(model: ISliderModel): boolean {
    //console.log(model.onRange)
    return model.onVertical;
  }
}

export {SliderPresenter}

