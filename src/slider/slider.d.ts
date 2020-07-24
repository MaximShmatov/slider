interface ISliderModelData {
  minValue: number;
  maxValue: number;
  valueStart: number;
  valueEnd: number;
  stepValue: number;
  vertical: boolean;
  range: boolean;
  tooltip: boolean;
}
interface ISliderModel {
  setDataModelFromElement(el: HTMLElement): void;
}

interface ISliderView {

}

interface ISliderController {

}

interface JQuery {
  sliderPlugin(model: ISliderModel | null): void;
}