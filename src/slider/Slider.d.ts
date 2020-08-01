interface ISliderModel {
  minValue: number;
  maxValue: number;
  valueFrom: number;
  valueTo: number;
  stepSize: number;
  onVertical: boolean;
  onRange: boolean;
  onTooltip: boolean;

  initModelFromObject(data: ISliderModel): void;

  initModelFromServer(variant: string): void;
}

interface ISliderController {
  initView(): void;
}


interface IThumb {
  setTooltipValue(value: number): void;

  moveToPosition(position: number): void;

  onTooltip(on: boolean): void;
}

interface IRailView {
  thumb: IThumb;
}

interface IScaleView {
  setValues(min: number, max: number): void;
}

interface HTMLElementEventMap {
  'slider-pos': CustomEvent;
  'scale-pos': CustomEvent;
  'slider-data': CustomEvent;
}
interface TypeEventHandlers {
  'slider-data': CustomEvent;
}
interface JQuery {
  slider(data: ISliderModel | null): this;
}