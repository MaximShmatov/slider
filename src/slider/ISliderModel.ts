interface ISliderModel {
    minValue: number
    maxValue: number;
    currentValue: number;
    stepSizeValue: number;
    vertical: boolean;
    range: boolean;
    tooltip: boolean;
}

export { ISliderModel };