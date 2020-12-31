class SliderModel implements ISliderModel {

  private readonly callback;

  private minValue = 0;

  private maxValue = 100;

  private valueFrom = 0;

  private valueTo = 100;

  private stepSize = 1;

  constructor(func: TCallback) {
    this.callback = func;
  }

  init(data: HTMLElement | TModelData) {
    if (data instanceof HTMLElement) {
      this.initModelFromElement(data);
    } else {
      this.initModelFromObject(data);
    }
  }

  getMinValue(): number {
    return this.minValue;
  }

  setMinValue(minValue: number) {
    if (minValue < this.valueFrom) {
      const step = Math.round((this.valueFrom - minValue) / this.stepSize) * this.stepSize;
      this.minValue = this.valueFrom - step;
    } else {
      this.minValue = this.valueFrom;
    }
    if (this.minValue === this.maxValue) {
      this.minValue -= this.stepSize;
    }
  }

  getMaxValue(): number {
    return this.maxValue;
  }

  setMaxValue(maxValue: number) {
    if (maxValue <= this.valueTo) {
      this.maxValue = this.valueTo;
    } else if (maxValue <= this.valueFrom) {
      this.maxValue = this.valueFrom;
    } else {
      this.maxValue = Math.round((maxValue - this.minValue) / this.stepSize);
      this.maxValue = this.maxValue * this.stepSize + this.minValue;
    }
    if (this.maxValue === this.minValue) {
      this.maxValue += this.stepSize;
    }
  }

  getValueFrom(): number {
    return this.valueFrom;
  }

  setValueFrom(valueFrom: number) {
    if (valueFrom <= this.minValue) {
      this.valueFrom = this.minValue;
    } else if (valueFrom >= this.valueTo) {
      this.valueFrom = this.valueTo;
    } else if (valueFrom >= this.maxValue) {
      this.valueFrom = this.maxValue;
    } else {
      this.valueFrom = Math.round((valueFrom - this.minValue) / this.stepSize);
      this.valueFrom = this.valueFrom * this.stepSize + this.minValue;
    }
  }

  getValueTo(): number {
    return this.valueTo;
  }

  setValueTo(valueTo: number) {
    if (valueTo > this.valueFrom && valueTo < this.maxValue) {
      this.valueTo = Math.round((valueTo - this.valueFrom) / this.stepSize);
      this.valueTo = this.valueTo * this.stepSize + this.valueFrom;
    } else if (valueTo >= this.maxValue) {
      this.valueTo = this.maxValue;
    } else {
      this.valueTo = this.valueFrom;
    }
  }

  getStepSize(): number {
    return this.stepSize;
  }

  setStepSize(stepSize: number) {
    const maxStep = Math.abs(this.maxValue - this.minValue);
    stepSize = Math.abs(Math.round(stepSize));
    if (maxStep % stepSize !== 0) {
      while (maxStep % stepSize !== 0) {
        stepSize -= 1;
        if (stepSize <= 0) {
          this.stepSize = 1;
          return this;
        }
      }
    }

    if (stepSize < maxStep && stepSize > 0) {
      this.stepSize = Math.round(stepSize);
    } else if (stepSize >= maxStep) {
      this.stepSize = maxStep;
    } else {
      this.stepSize = 1;
    }

    if (this.valueFrom > this.minValue) {
      this.valueFrom = Math.round((this.valueFrom - this.minValue) / this.stepSize);
      this.valueFrom = this.valueFrom * this.stepSize + this.minValue;
    } else {
      this.valueFrom = this.minValue;
    }

    if (this.valueTo > this.valueFrom) {
      this.valueTo = Math.round((this.valueTo - this.minValue) / this.stepSize);
      this.valueTo = this.valueTo * this.stepSize + this.minValue;
    } else {
      this.valueTo = this.valueFrom;
    }
  }

  private initModelFromObject(data: TModelData) {
    const {
      minValue,
      maxValue,
      valueFrom,
      valueTo,
      stepSize,
    } = data;
    this.setMinValue(minValue);
    const inc = (maxValue <= Math.round(minValue)) ? 1 : 0;
    this.setMaxValue(maxValue + inc);
    this.setStepSize(stepSize);
    this.setValueFrom(valueFrom);
    this.setValueTo(valueTo)
  }

  private initModelFromElement(element: HTMLElement) {
    const data = {
      minValue: Number(element.dataset.minValue),
      maxValue: Number(element.dataset.maxValue),
      valueFrom: Number(element.dataset.valueFrom),
      valueTo: Number(element.dataset.valueTo),
      stepSize: Number(element.dataset.stepSize),
    };
    this.initModelFromObject(data);
  }
}

export default SliderModel;
