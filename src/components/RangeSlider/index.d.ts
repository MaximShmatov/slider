declare module '*.module.sass';

type TIsRange = 'isRange';

type TPropsNum = 'minValue' | 'maxValue' | 'valueFrom' | 'valueTo' | 'stepSize';

type TPropsBool = 'hasTooltip' | 'hasScale' | 'isVertical' | TIsRange

type TModelProps = TPropsNum | TIsRange;

type TPluginProps = TPropsNum | TPropsBool;

type TModelData = {
  [P in TModelProps]: P extends TIsRange ? boolean : P extends TPropsNum ? number : never;
};

type TPluginData = {
  [P in TPluginProps]: P extends TPropsNum ? number : P extends TPropsBool ? boolean : never;
}

type TViewProps = 'data-min-value'
  | 'data-max-value'
  | 'data-value-from'
  | 'data-value-to'
  | 'data-step-size'
  | 'data-is-range'
  | 'data-is-vertical'
  | 'data-has-scale'
  | 'data-has-tooltip';

type TModelCallback = (prop: TViewProps, value: number | boolean) => void;

type TViewCallback = (prop: 'valueFrom' | 'valueTo', value: number) => void;

interface HTMLElement {
  callback: TViewCallback;

  setCallback(func: TViewCallback): void;
}

interface JQuery {
  slider: {
    (prop: TPluginProps, value: number | boolean | string | Record<string, unknown>): JQuery;
    (prop: 'init', value?: number | boolean | string | Record<string, unknown>): JQuery;
    (prop: TPluginProps): number | boolean;
    (prop: 'all'): TModelData;
  }
  // slider: {
  //   (prop: TPluginProps, value: number | boolean | string | Record<string, unknown>): JQuery;
  //   (prop: 'init', value?: number | boolean | string | Record<string, unknown>): JQuery;
  //   (prop: TPluginProps): number | boolean;
  //   (prop: 'all'): TModelData;
  // }
}

interface Event {
  detail: { name: string, value: string };
}
