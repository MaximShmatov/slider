import {SliderModel} from './SliderModel';
import {SliderView} from './SliderView';


class SliderPresenter implements ISliderPresenter {
  private readonly model: SliderModel[] = [];
  private readonly view: SliderView[] = [];
  private value: number = 0;

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

  initFromElement(element: HTMLElement): void {
    let index: number | undefined = Number(element.dataset.index);
    if (index === undefined) {

    }
    //this.model.initModelFromElement();
    //Object.assign(this.view.dataset, this.model);
    //console.log(this);
  }

  init(obj: JQuery): JQuery {
    let model: SliderModel;
    let view: SliderView;
    obj.each((index: number, element: HTMLElement) => {
      if (!$(element).attr('data-_id')) {
        model = new SliderModel(element);
        view = new SliderView();
        Object.assign(view.dataset, model);
        this.model.push(model);
        this.view.push(view);
        $(element).replaceWith(view);
      }
    });
    return $().pushStack(this.view);
  }

  setMinValue(obj: JQuery, value: number): JQuery {
    obj = this.init(obj);
    obj.each(function () {
      $(this).attr('data-_min-value', value);
    })
    return obj;
  }

  setMaxValue(obj: JQuery, value: number): JQuery {
    obj = this.init(obj);
    obj.each(function () {
      $(this).attr('data-_max-value', value);
    })
    return obj;
  }

  // private init(element: HTMLElement): void {
  //
  // }
  // private calculateValue(pos: number) {
  //   this.value = ((this.model.maxValue - this.model.minValue) / 100 * pos) + this.model.minValue;
  //   this.value = Math.round(this.value / this.model.stepSize) * this.model.stepSize;
  //
  // }
  // private handleViewEvents(evt: CustomEvent) {
  //   switch (evt.detail.name) {
  //     case 'data-value-from':
  //       this.view.dataset.valueFrom = this.model.valueFrom.toString();
  //       break;
  //     case 'data-value-to':
  //       this.view.dataset.valueTo = this.model.valueTo.toString();
  //       break;
  //     case 'data-min-value':
  //       this.view.dataset.minValue = this.model.minValue.toString();
  //       break;
  //     case 'data-max-value':
  //       this.view.dataset.maxValue = this.model.maxValue.toString();
  //       break;
  //     case 'data-on-vertical':
  //       this.view.dataset.onVertical = this.model.onVertical.toString();
  //       break;
  //     case 'data-on-range':
  //       this.view.dataset.onRange = this.model.onRange.toString();
  //       break;
  //     case 'data-on-tooltip':
  //       this.view.dataset.onTooltip = this.model.onTooltip.toString();
  //   }
  // }
}

export {SliderPresenter}

