interface ISliderModelData {
  minValue: number;
  maxValue: number;
  valueFrom: number;
  valueTo: number;
  stepSize: number;
  onVertical: boolean;
  onRange: boolean;
  onTooltip: boolean;
}

interface ISliderModel {
  setDataModelFromElement(el: HTMLElement): void;
  setDataModelFromObject(data: ISliderModelData): void;
  setDataModelFromServer(variant: string): void;
  getMinValue(): number;
  setMinValue(val: number): this;
  getMaxValue(): number;
  setMaxValue(val: number): this;
  getValueFrom(): number;
  setValueFrom(val: number): this;
  getValueTo(): number;
  setValueTo(val: number): this;
  getStepSize(): number;
  setStepSize(val: number): this;
  isVertical(): boolean;
  setVertical(val: boolean): this;
  isRange(): boolean;
  setRange(val: boolean): this;
  isTooltip(): boolean;
  setTooltip(val: boolean): this;
}

interface ISliderView extends HTMLElement {

}

interface HTMLElementEventMap {
  'slider-pos': CustomEvent;
}

interface ISliderController {

}

interface JQuery {
  slider(data: ISliderModelData | null): this;
}