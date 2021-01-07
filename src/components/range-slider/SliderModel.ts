class SliderModel {

  private readonly callback: TCallback;

  private min = 0;

  private max = 100;

  private from = 0;

  private to = 100;

  private step = 1;

  constructor(func: TCallback) {
    this.callback = func;
  }

  get minValue(): number {
    return this.min;
  }

  set minValue(val: number) {
    const minValue = isNaN(val) ? this.min : Math.round(val);
    if (minValue < this.from) {
      const stepSize = Math.round((this.from - minValue) / this.step) * this.step;
      this.min = this.from - stepSize;
    } else {
      this.min = this.from;
    }
    if (this.min === this.max) {
      this.min -= this.step;
    }
    this.callback('minValue', this.min);
  }

  get maxValue(): number {
    return this.max;
  }

  set maxValue(val: number) {
    const maxValue = isNaN(val) ? this.max : Math.round(val);
    if (maxValue <= this.to) {
      this.max = this.to;
    } else if (maxValue <= this.from) {
      this.max = this.from;
    } else {
      this.max = Math.round((maxValue - this.min) / this.step);
      this.max = this.max * this.step + this.min;
    }
    if (this.max === this.min) {
      this.max += this.step;
    }
    this.callback('maxValue', this.max);
  }

  get valueFrom(): number {
    return this.from;
  }

  set valueFrom(val: number) {
    const valueFrom = isNaN(val) ? this.from : Math.round(val);
    if (valueFrom <= this.min) {
      this.from = this.min;
    } else if (valueFrom >= this.to) {
      this.from = this.to;
    } else if (valueFrom >= this.max) {
      this.from = this.max;
    } else {
      this.from = Math.round((valueFrom - this.min) / this.step);
      this.from = this.from * this.step + this.min;
    }
    this.callback('valueFrom', this.from);
  }

  get valueTo(): number {
    return this.to;
  }

  set valueTo(val: number) {
    const valueTo = isNaN(val) ? this.to : Math.round(val);
    if (valueTo > this.from && valueTo < this.max) {
      this.to = Math.round((valueTo - this.from) / this.step);
      this.to = this.to * this.step + this.from;
    } else if (valueTo >= this.max) {
      this.to = this.max;
    } else {
      this.to = this.from;
    }
    this.callback('valueTo', this.to);
  }

  get stepSize(): number {
    return this.step;
  }

  set stepSize(val: number) {
    const stepSize = isNaN(val) ? this.step : Math.round(val);
    const maxStep = Math.abs(this.max - this.min);
    this.step = Math.abs(stepSize);

    if (this.step >= maxStep) this.step = maxStep;
    while (maxStep % this.step !== 0) {
      this.step -= 1;
      if (this.step < 1) {
        this.step = 1;
        break;
      }
    }
    this.callback('stepSize', this.step);

    if (this.from > this.min) {
      this.from = Math.round((this.from - this.min) / this.step);
      this.from = this.from * this.step + this.min;
    } else {
      this.from = this.min;
    }
    this.callback('valueFrom', this.from);

    if (this.to > this.from) {
      this.to = Math.round((this.to - this.min) / this.step);
      this.to = this.to * this.step + this.min;
    } else {
      this.to = this.from;
    }
    this.callback('valueTo', this.to);
  }
}

export default SliderModel;
