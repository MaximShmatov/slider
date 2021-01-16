declare module '*.module.sass';

type TModelProps =
  'minValue' |
  'maxValue' |
  'valueFrom' |
  'valueTo' |
  'stepSize' |
  'isRange';

type TPluginProps = TModelProps | 'hasTooltip' | 'hasScale' | 'isVertical';

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

type TModelCallback = (prop: TModelProps, value: number | boolean) => void;

type TViewCallback = (prop: 'valueFrom' | 'valueTo', value: number) => void;

interface JQuery {
  slider: {
    (prop: TPluginProps | 'init', value?: string | Record<string, unknown>): JQuery,
    (prop: TPluginProps): number | boolean,
  }
}

interface Event {
  detail: { name: string, value: string };
}

interface Window {
  $: JQueryStatic;
}
