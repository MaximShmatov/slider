declare module '*.module.sass';

type TMethodsUnion = keyof ISliderData;

interface ISliderData {
  minValue: number;
  maxValue: number;
  valueFrom: number;
  valueTo: number;
  stepSize: number;
  onVertical: boolean;
  onRange: boolean;
  onTooltip: boolean;
  onScale: boolean;
}

interface ISliderModel extends ISliderData {
  serverURL: URL;

  init(data: HTMLElement | ISliderData | FormData | null): boolean;
}

interface ISliderView extends HTMLElement {
  slider: ISliderPresenter | null;

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
  'slider-view': CustomEvent;
  'slider-data': CustomEvent;
}