declare module '*.module.sass';

type TModelProps =
  'minValue' |
  'maxValue' |
  'valueFrom' |
  'valueTo' |
  'stepSize' |
  'isRange';

type TPluginProps = TModelProps | 'isTooltip' | 'isScale' | 'isVertical';

type TViewProps =
  'data-min-value' |
  'data-max-value' |
  'data-value-from' |
  'data-value-to' |
  'data-step-size' |
  'data-is-range' |
  'data-is-tooltip' |
  'data-is-scale' |
  'data-is-vertical';

type TModelCallback = (prop: TModelProps, value: number | boolean) => void;

type TViewCallback = (prop: 'data-move-from' | 'data-move-to', value: number) => void;

interface JQuery {
  slider: {
    (prop: TPluginProps, value: string): JQuery,
    (prop: 'init', value?: object): JQuery,
    (prop: TPluginProps): number | boolean,
  }
}

interface Window {
  $: JQueryStatic;
}
