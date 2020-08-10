import {SliderModel} from './SliderModel';
import {SliderView} from './SliderView';


class SliderPresenter implements ISliderPresenter {
  private readonly modelMap: Map<number, SliderModel> = new Map();
  private model: SliderModel | undefined;

  constructor() {
    //this.model = new SliderModel(null);
    //this.view = new SliderView();
    //$(element).replaceWith(this.view);
    //element.before(this.view);
    //element.remove();
    //if($obj) $obj.each(this.init.bind(this));
    //console.log($obj);
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

  // initFromElement(element: HTMLElement): void {
  //   let index: number | undefined = Number(element.dataset.index);
  //   if (index === undefined) {
  //
  //   }
  //   this.model.initModelFromElement();
  //   Object.assign(this.view.dataset, this.model);
  //   console.log(this);
  // }

  init(obj: JQuery): JQuery {
    let viewArr: SliderView[] = [];
    obj.each((index: number, element: HTMLElement) => {
      if (element instanceof SliderView) {
        viewArr.push(element);
      } else {
        let model = new SliderModel(element);
        let view = new SliderView(model.id);
        view.setModelData(model);
        $(element).replaceWith(view);
        this.modelMap.set(model.id, model);
        viewArr.push(view);
      }
    });
    return $().pushStack(viewArr);
  }

  setMinValue(view: SliderView, value: string): void {
    this.model = this.modelMap.get(view.index);
    if (this.model) {
      this.model.minValue = Number(value);
      view.setModelData(this.model);
    }
  }

  setMaxValue(view: SliderView, value: string): void {
    this.model = this.modelMap.get(view.index);
    if (this.model) {
      this.model.maxValue = Number(value);
      view.setModelData(this.model);
    }
  }

  onScale(view: SliderView, value: string): void {
    this.model = this.modelMap.get(view.index);
    if (this.model) {
      this.model.onScale = (value === 'true');
      view.setModelData(this.model);
    }
  }

  getProps(view: SliderView): ISliderModel | undefined {
    return this.modelMap.get(view.index);
  }
}

export {SliderPresenter}

