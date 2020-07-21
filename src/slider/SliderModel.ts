import {ISliderModel} from './ISliderModel';

class SliderModel implements ISliderModel {
  min: number = 1;
  max: number = 10;
  valueStart: number = 5;
  valueEnd: number = 5;
  stepSize: number = 1;
  vertical: boolean = false;
  range: boolean = false;
  tooltip: boolean = false;

  constructor() {
    let form: FormData = new FormData();
    form.append('variant', '0');
    try {
      fetch('http://localhost:9000/slider', {method: 'POST', body: form})
        .then((res: Response) => res.json())
        .then((model: ISliderModel) => this.setDataModel(model));
    } catch (e) {
      console.log('Error connection', e)
    }
  }

  setDataModel(model: ISliderModel) {
    this.minValue = model.minValue;
    this.maxValue = model.maxValue;
    this.valueStart = model.valueStart;
    this.valueEnd = model.valueEnd;
    this.stepSizeValue = model.stepSizeValue;
    this.onVertical = model.vertical;
    this.onRange = model.range;
    this.onTooltip = model.tooltip;
  }

  get minValue(): number {
    return this.min;
  }

  set minValue(min: number) {
    this.min = min;
  }

  get maxValue(): number {
    return this.max;
  }

  set maxValue(max: number) {
    this.max = max;
  }

  get valueFrom(): number {
    return this.valueStart;
  }

  set valueFrom(value: number) {
    this.valueStart = value;
  }

  get valueTo(): number {
    return this.valueEnd;
  }

  set valueTo(value: number) {
    this.valueEnd = value;
  }

  get stepSizeValue(): number {
    return this.stepSize;
  }

  set stepSizeValue(stepSize: number) {
    this.stepSize = stepSize;
  }

  get onVertical(): boolean {
    return this.vertical;
  }

  set onVertical(vertical: boolean) {
    this.vertical = vertical;
  }

  get onRange(): boolean {
    return this.range;
  }

  set onRange(range: boolean) {
    this.range = range;
  }

  get onTooltip(): boolean {
    return this.tooltip;
  }

  set onTooltip(tooltip: boolean) {
    this.tooltip = tooltip;
  }
}

export {SliderModel};