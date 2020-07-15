interface ISliderModel {
    minValue: number | string;
    maxValue: number | string;
    currentValue: number | string;
    stepSizeValue: number | string;
    position: boolean;
    range: boolean;
    tooltip: boolean;
}

export { ISliderModel };