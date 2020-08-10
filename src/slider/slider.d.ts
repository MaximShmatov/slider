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
  getProps(element: HTMLElement): ISliderModel | undefined;
  setMinValue(element: HTMLElement, value: string): void;
  setMaxValue(element: HTMLElement, value: string): void;
  // setValueFrom(obj: JQuery, value: string): JQuery;
  // setValueTo(obj: JQuery, value: string): JQuery;
  // setStepSize(obj: JQuery, value: string): JQuery;
  // onRange(obj: JQuery, value: string): JQuery;
  // onVertical(obj: JQuery, value: string): JQuery;
  // onTooltip(obj: JQuery, value: string): JQuery;
  onScale(element: HTMLElement, value: string): void;
  // setDataServer(obj: JQuery, value: string): JQuery;
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

type setMethods = 'setMinValue' | 'setMaxValue' | 'getProps' | 'onScale';
type getMethods = 'getProps';


interface JQuery {
  slider(method: setMethods, prop: string): JQuery;
  slider(method: getMethods): ISliderModel;
  slider(): JQuery;
}
interface JQueryStatic {
  slider: ISliderPresenter;
}