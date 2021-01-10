declare module '*.module.sass';

type TInit = 'init';

type TModelPropNames = 'minValue' | 'maxValue' | 'valueFrom' | 'valueTo' | 'stepSize';
type TViewPropNames = 'isRange' | 'isTooltip' | 'isScale' | 'isVertical';
type TSliderPropNames = TViewPropNames | TModelPropNames;

type TRangeSliderData = {
  [P in TSliderPropNames]: P extends TModelPropNames ? number : P extends TViewPropNames ? boolean : null;
};

type TModelCallback = (prop: TModelPropNames, value: number) => void;
type TViewCallback = (prop: 'valueFrom' | 'valueTo', value: number) => void;

interface JQuery {
  slider: {
    (prop: TSliderPropNames, value: string): JQuery,
    (prop: TInit): JQuery,
    (prop: TViewPropNames): boolean,
    (prop: TModelPropNames): number,
  }
}
interface Window {
  $: JQueryStatic;
}
