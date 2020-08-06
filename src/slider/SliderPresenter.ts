import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import {SliderModel} from './SliderModel';
import {SliderView} from "./SliderView";


class SliderPresenter implements ISliderPresenter {
  private model: SliderModel[] = [];
  private view: SliderView[] = [];
  private value: number = 0;

  constructor($obj: JQuery) {
    $obj.each(this.init.bind(this));
    console.log($obj);
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

  initFromDataset(): void {
    //this.model.initModelFromElement();
    //Object.assign(this.view.dataset, this.model);
    console.log(this);
  }
  private init(index: number, element: HTMLElement): void {
    this.model[index] = new SliderModel(new SliderModel(element));
    this.view[index] = new SliderView(this.model[index]);
  }
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

$.fn.slider = function () {
  return new SliderPresenter(this);
}