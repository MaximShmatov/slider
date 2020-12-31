declare module '*.module.sass';

type TModelData = {
  minValue: number;
  maxValue: number;
  valueFrom: number;
  valueTo: number;
  stepSize: number;
}

type TMethodsUnion = keyof TModelData;

type TCallback = (prop: string, value: number | boolean) => {};

interface ISliderModel {
  init(data: HTMLElement | TModelData): void;
  getMinValue(): number;
  setMinValue(minValue: number): void;
  getMaxValue(): number;
  setMaxValue(maxValue: number): void;
  getValueFrom(): number;
  setValueFrom(valueFrom: number): void;
  getValueTo(): number;
  setValueTo(valueTo: number): void;
  getStepSize() :number;
  setStepSize(prop:number): void;
}

interface ISliderPresenter {
  init(obj: HTMLElement | TModelData | FormData): void;

  setProps(method: TMethodsUnion, value: number | boolean | string): void

  getProps(method: TMethodsUnion): number | boolean | string;
}

interface ISliderView extends HTMLElement {

}

interface JQuery {
  slider(method: 'init', prop: HTMLElement | TModelData | FormData): JQuery;

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
