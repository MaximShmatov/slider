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
  serverURL: string;
}

interface ISliderModel extends ISliderData {
  init(data: HTMLElement | ISliderData | FormData | null): Promise<boolean>;
}

interface ISliderView extends HTMLElement {
  presenter: ISliderPresenter | null;

  setModelData(method: TMethodsUnion, value: number | boolean | string): void;
}

interface ISliderPresenter {
  init(obj: HTMLElement | ISliderData | FormData): void;

  setProps(method: TMethodsUnion, value: number | boolean | string): void

  getProps(method: TMethodsUnion): number | boolean | string;
}

interface JQuery {
  slider(method: 'init', prop: HTMLElement | ISliderData | FormData): JQuery;

  slider(method: 'init'): JQuery;

  slider(method: TMethodsUnion): number | boolean | string;

  slider(method: TMethodsUnion, prop: number | boolean | string): void;

  slider(): JQuery;
}

interface HTMLElementEventMap {
  'slider-view': CustomEvent;
  'slider-data': CustomEvent;
}

interface Window {
  $: JQueryStatic;
}
