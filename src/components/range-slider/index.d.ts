declare module '*.module.sass';

type TInit = 'init';
type TSliderModelKeys = 'minValue' | 'maxValue' | 'valueFrom' | 'valueTo' | 'stepSize';
type TSliderViewKeys = 'isRange' | 'isTooltip' | 'isScale' | 'isVertical';
type TRangeSliderKeys = TSliderModelKeys | TSliderViewKeys;

type TRangeSliderData = {
  [P in TRangeSliderKeys]: P extends TSliderModelKeys ? number : P extends TSliderViewKeys ? boolean : null;
};

type TCallback = (prop: TSliderModelKeys, value: number) => void;

interface JQuery {
  slider: {
    (prop: TRangeSliderKeys, value: string): JQuery,
    (prop: TInit): JQuery,
    (prop: TSliderViewKeys): boolean,
    (prop: TSliderModelKeys): number,
  }
}

interface HTMLElementEventMap {
  'range-slider': CustomEvent;
}

interface Window {
  $: JQueryStatic;
}
