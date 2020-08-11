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

type TPropsUnion = keyof ISliderModel;

interface ISliderView {

}

interface ISliderPresenter {
  init(obj: JQuery): JQuery;

  setProps(element: HTMLElement, method: setMethods, value: number | boolean): void;

  getProps(element: HTMLElement, method: getMethods): number | boolean;
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

type setMethods =
  'setMinValue'
  | 'setMaxValue'
  | 'setStepSize'
  | 'setValueFrom'
  | 'setValueTo'
  | 'onScale'
  | 'onTooltip'
  | 'onRange'
  | 'onVertical';
type getMethods =
  'getMinValue'
  | 'getMaxValue'
  | 'getStepSize'
  | 'getValueFrom'
  | 'getValueTo'
  | 'isScale'
  | 'isTooltip'
  | 'isRange'
  | 'isVertical';

interface JQuery {
  slider(method: setMethods, prop: number | boolean): JQuery;

  slider(method: getMethods): number | boolean;

  slider(): JQuery;
}

interface JQueryStatic {
  slider: ISliderPresenter;
}