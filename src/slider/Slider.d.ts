interface ISliderModel {
  minValue: number;
  maxValue: number;
  valueFrom: number;
  valueTo: number;
  stepSize: number;
  onVertical: boolean;
  onRange: boolean;
  onTooltip: boolean;

  setDataModelFromObject(data: ISliderModel): void;

  setDataModelFromServer(variant: string): void;
}

interface ISliderController {
  initView(): void;
}


interface IThumb {
  setTooltipValue(value: number): void;

  moveToPosition(position: number): void;

  toggleTooltip(): void;
}

interface IRailView {
  thumb: IThumb;
}

interface IScaleView {
  render(min: number, max: number): void;
}

interface HTMLElementEventMap {
  'slider-pos': CustomEvent;
}

interface JQuery {
  slider(data: ISliderModel | null): this;
}