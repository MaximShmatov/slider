interface ISliderModel {
    minValue: number
    maxValue: number;
    valueStart: number,
    valueEnd: number,
    stepSizeValue: number;
    vertical: boolean;
    range: boolean;
    tooltip: boolean;
}

export { ISliderModel };