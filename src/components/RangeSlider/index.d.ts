declare module '*.module.sass';

type TModelPropsNum = 'minValue' | 'maxValue' | 'valueFrom' | 'valueTo' | 'stepSize';

type TModelProps = TModelPropsNum | 'isRange';

type TPluginProps = TModelProps | 'hasTooltip' | 'hasScale' | 'isVertical';

type TModelData = {
  [P in TModelProps]?: P extends 'isRange' ? boolean : P extends TModelPropsNum ? number : null;
};

type TViewProps =
  'data-min-value' |
  'data-max-value' |
  'data-value-from' |
  'data-value-to' |
  'data-step-size' |
  'data-is-range' |
  'data-has-tooltip' |
  'data-has-scale' |
  'data-is-vertical';

type TModelCallback = (prop: TViewProps, value: number | boolean) => void;

type TViewCallback = (prop: 'valueFrom' | 'valueTo', value: number) => void;

interface HTMLElement {
  callback: TViewCallback;
  setCallback(func: TViewCallback): void;
}

interface JQuery {
  slider: {
    (prop: TPluginProps, value: number | boolean | string | Record<string, unknown>): JQuery,
    (prop: 'init', value?: number | boolean | string | Record<string, unknown>): JQuery,
    (prop: TPluginProps): number | boolean,
    (prop: 'all'): TModelData,
  }
}

interface Event {
  detail: { name: string, value: string };
}

interface Window {
  $: JQueryStatic;
}
