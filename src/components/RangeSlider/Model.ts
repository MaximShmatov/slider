class Model {
  callback: TModelCallback;

  private min = 0;

  private max = 1;

  private from = 0;

  private to = 1;

  private step = 1;

  private isTo = true;

  constructor() {
    this.callback = () => ({});
  }

  read(): TModelData {
    return {
      isRange: this.isTo,
      minValue: this.min,
      maxValue: this.max,
      valueTo: this.to,
      valueFrom: this.from,
      stepSize: this.step,
    };
  }

  write(data: Record<string, unknown>) {
    const {
      minValue, maxValue, valueTo, valueFrom, stepSize, isRange,
    } = data;
    if (isRange !== undefined) this.isRange = (String(isRange) === 'true');
    if (!Number.isNaN(Number(minValue))) this.minValue = Number(minValue);
    if (!Number.isNaN(Number(maxValue))) this.maxValue = Number(maxValue);
    if (!Number.isNaN(Number(stepSize))) this.stepSize = Number(stepSize);
    if (!Number.isNaN(Number(valueTo))) this.valueTo = Number(valueTo);
    if (!Number.isNaN(Number(valueFrom))) this.valueFrom = Number(valueFrom);
  }

  private set minValue(minValue: number) {
    if (minValue < this.from) {
      const stepSize = Math.round((this.from - minValue) / this.step) * this.step;
      this.min = this.from - stepSize;
    } else this.min = this.from;
    if (this.min === this.max) this.min -= this.step;
    this.callback('data-min-value', this.min);
  }

  private set maxValue(maxValue: number) {
    if (this.isTo && maxValue <= this.to) this.max = this.to;
    else if (maxValue <= this.from) this.max = this.from;
    else {
      this.max = Math.round((maxValue - this.min) / this.step);
      this.max = this.max * this.step + this.min;
    }
    if (this.max === this.min) this.max += this.step;
    this.callback('data-max-value', this.max);
  }

  private set valueFrom(valueFrom: number) {
    if (valueFrom <= this.min) this.from = this.min;
    else if (this.isTo && valueFrom >= this.to) this.from = this.to;
    else if (valueFrom >= this.max) this.from = this.max;
    else {
      this.from = Math.round((valueFrom - this.min) / this.step);
      this.from = this.from * this.step + this.min;
    }
    this.callback('data-value-from', this.from);
  }

  private set valueTo(valueTo: number) {
    if (this.isTo) {
      if (valueTo > this.from && valueTo < this.max) {
        this.to = Math.round((valueTo - this.from) / this.step);
        this.to = this.to * this.step + this.from;
      } else if (valueTo >= this.max) {
        this.to = this.max;
      } else this.to = this.from;
    }
    this.callback('data-value-to', this.to);
  }

  private set stepSize(stepSize: number) {
    const maxStep = Math.abs(this.max - this.min);
    this.step = Math.abs(Math.round(stepSize));

    if (this.step >= maxStep) this.step = maxStep;
    while (maxStep % this.step !== 0) {
      this.step -= 1;
      if (this.step < 1) {
        this.step = 1;
        break;
      }
    }

    const calcStep = (value: number) => {
      const valToStep = Math.round((value - this.min) / this.step);
      return valToStep * this.step + this.min;
    };

    if (this.from > this.min) this.valueFrom = calcStep(this.from);
    else this.valueFrom = this.min;
    if (this.isTo) {
      if (this.to > this.from) this.valueTo = calcStep(this.to);
      else this.valueTo = this.from;
    }

    this.callback('data-step-size', this.step);
  }

  private set isRange(isRange: boolean) {
    this.isTo = isRange;
    if (isRange) {
      if (this.to > this.max) this.valueTo = this.max;
      if (this.to < this.from) this.valueTo = this.from;
    }
    this.callback('data-is-range', this.isTo);
  }
}

export default Model;
