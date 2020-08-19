type TMethodsUnion = 'minValue' | 'maxValue' | 'stepSize' | 'valueFrom' | 'valueTo' | 'onScale' | 'onTooltip' | 'onRange' | 'onVertical';

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

  setProps(element: HTMLElement, method: TMethodsUnion, value: number | boolean): void;

  getProps(element: HTMLElement, method: TMethodsUnion): number | boolean;
}

interface IThumb {

}

interface IRail {

}

interface IScale {
  render(): void;
}

interface JQuery {
  slider(method: TMethodsUnion, prop: number | boolean): JQuery;

  slider(method: TMethodsUnion): number | boolean;

  slider(): JQuery;
}

interface JQueryStatic {
  slider: ISliderPresenter;
}

interface HTMLElementEventMap {
  'slider': CustomEvent;
  'slider-data': CustomEvent;
}