type TMethodsUnion =
  'minValue'
  | 'maxValue'
  | 'stepSize'
  | 'valueFrom'
  | 'valueTo'
  | 'onScale'
  | 'onTooltip'
  | 'onRange'
  | 'onVertical';

interface ISliderModel {
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

interface ISliderView extends HTMLElement {
  slider: ISliderPresenter;
  setModelData(method: TMethodsUnion, value: number | boolean): void;
}

interface ISliderPresenter {
  init(obj: HTMLElement | ISliderModel): void;
  setProps(method: TMethodsUnion, value: number | boolean): void
  getProps(method: TMethodsUnion): number | boolean;
}

interface JQuery {
  slider(method: TMethodsUnion, prop: number | boolean | ISliderModel): JQuery;
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