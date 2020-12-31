class SliderModel implements ISliderModel {
  private _minValue = 0;

  private _maxValue = 100;

  private _valueFrom = 0;

  private _valueTo = 100;

  private _stepSize = 1;

  private _isRange = false;

  private _isTooltip = false;

  private _isVertical = false;

  private _isScale = false;

  private _serverURL = 'http://localhost:9000/slider';

  private readonly _observer: (key: TMethodsUnion, value: boolean | number | string) => void;

  constructor(observer: (key: TMethodsUnion, value: number | boolean | string) => void) {
    this._observer = observer;
  }

  init(data: HTMLElement | ISliderData | FormData): Promise<boolean> {
    if (data instanceof HTMLElement) {
      return this.initModelFromElement(data);
    }
    if (data instanceof FormData) {
      return this.initModelFromServer(data);
    }
    return this.initModelFromObject(data);
  }

  private initModelFromServer(form: FormData): Promise<boolean> {
    this.serverURL = <string>form.get('uri');
    return fetch(this.serverURL, { method: 'POST', body: form })
      .then((res: Response) => res.json())
      .then((data: ISliderData) => this.initModelFromObject(data));
  }

  private async initModelFromObject(sliderData: ISliderData): Promise<boolean> {
    const data = sliderData;
    this._serverURL = data.serverURL;
    this._observer('serverURL', this._serverURL);
    this._isVertical = data.isVertical;
    this._observer('isVertical', this._isVertical);
    this._isRange = data.isRange;
    this._observer('isRange', this._isRange);
    this._isTooltip = data.isTooltip;
    this._observer('isTooltip', this._isTooltip);
    this._isScale = data.isScale;
    this._observer('isScale', this._isScale);

    if (data.minValue) {
      this._minValue = data.minValue;
    } else {
      this._minValue = 0;
    }
    this._observer('minValue', this._minValue);

    data.stepSize = Math.round(Math.abs(data.stepSize));
    if (data.stepSize > 0) {
      this._stepSize = data.stepSize;
    } else {
      this._stepSize = 1;
    }
    this._observer('stepSize', this._stepSize);

    if (data.maxValue > (this._minValue + this._stepSize)) {
      this._maxValue = Math.round((data.maxValue - this._minValue) / this._stepSize);
      this._maxValue = this.maxValue * this._stepSize + this._minValue;
    } else {
      this._maxValue = this._stepSize + this._minValue;
    }
    this._observer('maxValue', this._maxValue);

    if (data.valueFrom > this._minValue && data.valueFrom < this._maxValue) {
      this._valueFrom = Math.round((data.valueFrom - this._minValue) / this._stepSize);
      this._valueFrom = this._valueFrom * this._stepSize + this._minValue;
    } else if (data.valueFrom >= this._maxValue) {
      this._valueFrom = this._maxValue;
    } else {
      this._valueFrom = this._minValue;
    }
    this._observer('valueFrom', this._valueFrom);

    if (data.valueTo > this._valueFrom && data.valueTo < this._maxValue) {
      this._valueTo = Math.round((data.valueTo - this._minValue) / this._stepSize);
      this._valueTo = this._valueTo * this._stepSize + this._minValue;
    } else if (data.valueTo >= this._maxValue) {
      this._valueTo = this._maxValue;
    } else {
      this._valueTo = this._valueFrom;
    }
    this._observer('valueTo', this._valueTo);

    return true;
  }

  private async initModelFromElement(element: HTMLElement): Promise<boolean> {
    const data = {
      isVertical: (element.dataset.isVertical === 'true'),
      isRange: (element.dataset.isRange === 'true'),
      isTooltip: (element.dataset.isTooltip === 'true'),
      isScale: (element.dataset.isScale === 'true'),
      minValue: Number(element.dataset.minValue),
      maxValue: Number(element.dataset.maxValue),
      valueFrom: Number(element.dataset.valueFrom),
      valueTo: Number(element.dataset.valueTo),
      stepSize: Number(element.dataset.stepSize),
      serverURL: String(element.dataset.serverURL),
    };
    return this.initModelFromObject(data);
  }

  get minValue(): number {
    return this._minValue;
  }

  set minValue(minValue: number) {
    if (minValue < this._valueFrom) {
      const step = Math.round((this._valueFrom - minValue) / this._stepSize) * this._stepSize;
      this._minValue = this._valueFrom - step;
    } else {
      this._minValue = this._valueFrom;
    }
    if (this._minValue === this._maxValue) {
      this._minValue -= this._stepSize;
    }
    this._observer('minValue', this._minValue);
  }

  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(maxValue: number) {
    if (this._isRange && maxValue <= this._valueTo) {
      this._maxValue = this._valueTo;
    } else if (maxValue <= this._valueFrom) {
      this._maxValue = this._valueFrom;
    } else {
      this._maxValue = Math.round((maxValue - this._minValue) / this._stepSize);
      this._maxValue = this._maxValue * this._stepSize + this._minValue;
    }
    if (this._maxValue === this._minValue) {
      this._maxValue += this._stepSize;
    }
    this._observer('maxValue', this._maxValue);
  }

  get valueFrom(): number {
    return this._valueFrom;
  }

  set valueFrom(valueFrom: number) {
    if (valueFrom <= this._minValue) {
      this._valueFrom = this._minValue;
    } else if (this._isRange && valueFrom >= this._valueTo) {
      this._valueFrom = this._valueTo;
    } else if (valueFrom >= this._maxValue) {
      this._valueFrom = this._maxValue;
    } else {
      this._valueFrom = Math.round((valueFrom - this._minValue) / this._stepSize);
      this._valueFrom = this._valueFrom * this._stepSize + this._minValue;
    }
    this._observer('valueFrom', this._valueFrom);
  }

  get valueTo(): number {
    return this._valueTo;
  }

  set valueTo(valueTo: number) {
    if (this._isRange) {
      if (valueTo > this._valueFrom && valueTo < this._maxValue) {
        this._valueTo = Math.round((valueTo - this._valueFrom) / this._stepSize);
        this._valueTo = this._valueTo * this._stepSize + this._valueFrom;
      } else if (valueTo >= this._maxValue) {
        this._valueTo = this._maxValue;
      } else {
        this._valueTo = this._valueFrom;
      }
      this._observer('valueTo', this._valueTo);
    }
  }

  get stepSize(): number {
    return this._stepSize;
  }

  set stepSize(stepSize: number) {
    const maxStep = Math.abs(this._maxValue - this._minValue);
    if (stepSize < maxStep && stepSize > 0) {
      this._stepSize = Math.round(stepSize);
    } else if (stepSize >= maxStep) {
      this._stepSize = maxStep;
    } else {
      this._stepSize = 1;
    }
    this._observer('stepSize', this._stepSize);

    if (this._valueFrom > this._minValue) {
      this._valueFrom = Math.round((this._valueFrom - this._minValue) / this._stepSize);
      this._valueFrom = this._valueFrom * this._stepSize + this._minValue;
    } else {
      this._valueFrom = this._minValue;
    }
    this._observer('valueFrom', this._valueFrom);

    if (this._isRange) {
      if (this._valueTo > this._valueFrom) {
        this._valueTo = Math.round((this._valueTo - this._minValue) / this._stepSize);
        this._valueTo = this._valueTo * this._stepSize + this._minValue;
      } else {
        this._valueTo = this._valueFrom;
      }
      this._observer('valueTo', this._valueTo);
    }
    // this.maxValue = this.maxValue;
  }

  get isVertical(): boolean {
    return this._isVertical;
  }

  set isVertical(isVertical: boolean) {
    this._isVertical = isVertical;
    this._observer('isVertical', this._isVertical);
  }

  get isRange(): boolean {
    return this._isRange;
  }

  set isRange(isRange: boolean) {
    this._isRange = isRange;
    this._observer('isRange', this._isRange);
    this.valueTo = this._valueTo;
  }

  get isTooltip(): boolean {
    return this._isTooltip;
  }

  set isTooltip(isTooltip: boolean) {
    this._isTooltip = isTooltip;
    this._observer('isTooltip', this._isTooltip);
  }

  get isScale(): boolean {
    return this._isScale;
  }

  set isScale(isScale: boolean) {
    this._isScale = isScale;
    this._observer('isScale', this._isScale);
  }

  get serverURL(): string {
    return this._serverURL;
  }

  set serverURL(serverURL: string) {
    this._serverURL = serverURL;
    this._observer('serverURL', this._serverURL);
  }
}

export default SliderModel;
