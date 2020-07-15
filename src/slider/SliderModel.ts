import { ISliderModel } from './ISliderModel';

class SliderModel implements ISliderModel {
  min: number | string = 1;
  max: number | string = 10;
  value: number | string = 5;
  stepSize: number | string = 1;
  pos: boolean = false;
  range: boolean = false;
  tooltip: boolean = false;

  constructor(config: ISliderModel | null) {
    if (config !== null) {
      this.min = config.minValue;
      this.max = config.maxValue;
      this.value = config.maxValue;
      this.stepSize = config.stepSizeValue;
      this.pos = config.position;
      this.range = config.range;
      this.tooltip = config.tooltip;
    }
  }


  get minValue(): number | string {
    return this.min;
  }

  set minValue(min: number | string) {
    this.min = min;
  }

  get maxValue(): number | string {
    return this.max;
  }

  set maxValue(max: number | string) {
    this.max = max;
  }

  get currentValue(): number | string {
    return this.value;
  }

  set currentValue(value: number | string) {
    this.value = value;
  }

  get stepSizeValue(): number | string {
    return this.stepSize;
  }

  set stepSizeValue(stepSize: number | string) {
    this.stepSize = stepSize;
  }

  get position(): boolean {
    return this.pos;
  }

  set position(pos: boolean) {
    this.pos = pos;
  }

  get rangeOn(): boolean {
    return this.range;
  }

  set rangeOn(range: boolean) {
    this.range = range;
  }

  get tooltipOn(): boolean {
    return this.tooltip;
  }

  set tooltipOn(tooltip: boolean) {
    this.tooltip = tooltip;
  }
}

export {SliderModel};