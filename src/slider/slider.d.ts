interface ISliderModelData {
  minValue: number;
  maxValue: number;
  valueStart: number;
  valueEnd: number;
  stepSizeValue: number;
  vertical: boolean;
  range: boolean;
  tooltip: boolean;
}
interface ISliderModel {

}

interface ISliderView {

}

interface ISliderController {

}

interface JQuery {
  sliderPlugin(model: ISliderModel | null): void;
}