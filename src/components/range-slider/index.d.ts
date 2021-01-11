declare module '*.module.sass';

type TInit = 'init';

type TModelPropNames = 'minValue' | 'maxValue' | 'valueFrom' | 'valueTo' | 'stepSize' | 'isRange';
type TViewPropNames = 'isTooltip' | 'isScale' | 'isVertical';
type TSliderPropNames = TViewPropNames | TModelPropNames;

type TModelCallback = (prop: TModelPropNames, value: number | boolean) => void;
type TViewCallback = (prop: 'valueFrom' | 'valueTo', value: number) => void;

interface JQuery {
  slider: {
    (prop: TSliderPropNames, value: string): JQuery,
    (prop: TInit, value?: object): JQuery,
    (prop: TViewPropNames): boolean,
    (prop: TModelPropNames): number,
  }
}
interface Window {
  $: JQueryStatic;
}
