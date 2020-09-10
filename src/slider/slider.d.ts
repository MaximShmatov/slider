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
  serverURL: URL;
}

interface ISliderModel extends ISliderData {
  init(data: HTMLElement | ISliderData | FormData | null): Promise<boolean>;
}

interface ISliderView extends HTMLElement {
  slider: ISliderPresenter | null;

  setModelData(method: TMethodsUnion, value: number | boolean | URL): void;
}

interface ISliderPresenter {
  init(obj: HTMLElement | ISliderData): void;

  setProps(method: TMethodsUnion, value: number | boolean | URL): void

  getProps(method: TMethodsUnion): number | boolean | URL;
}

interface JQuery {
  slider(method: TMethodsUnion, prop: number | boolean | ISliderData | URL): JQuery;

  slider(method: TMethodsUnion): number | boolean | URL;

  slider(): JQuery;
}

interface HTMLElementEventMap {
  'slider-view': CustomEvent;
  'slider-data': CustomEvent;
}