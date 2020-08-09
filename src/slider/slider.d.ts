interface ISliderModel {
  id: number;
  minValue: number;
  maxValue: number;
  valueFrom: number;
  valueTo: number;
  stepSize: number;
  onVertical: boolean;
  onRange: boolean;
  onTooltip: boolean;
  onScale: boolean;
  serverURL: URL;

  init(data: HTMLElement | ISliderModel | FormData | null): boolean;

}
interface ISliderView {

}

interface ISliderPresenter {
  init(obj: JQuery): JQuery;
  setMinValue(obj: JQuery, value: number): JQuery;
  setMaxValue(obj: JQuery, value: number): JQuery;
}

interface IThumb {

}

interface IRail {
  thumbFrom: IThumb;
  thumbTo: IThumb;
  isVertical: boolean;
}

interface IScale {
  render(): void;
}

interface HTMLElementEventMap {
  'slider-pos': CustomEvent;
  'scale-pos': CustomEvent;
  'slider-data': CustomEvent;
  'view-events': CustomEvent;
}

interface JQuery {
  slider(method?: string, prop?: string): JQuery;
}
interface JQueryStatic {
  slider: ISliderPresenter;
}