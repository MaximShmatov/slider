class SliderModel implements ISliderModel {
  private _minValue: number = 0;
  private _maxValue: number = 100;
  private _valueFrom: number = 0;
  private _valueTo: number = 100;
  private _stepSize: number = 1;
  private _onRange: boolean = false;
  private _onTooltip: boolean = false;
  private _onVertical: boolean = false;
  private _onScale: boolean = false;
  private _serverURL: string = 'http://localhost:9000/slider';
  private readonly _observer: (key: TMethodsUnion, value: boolean | number | string) => void;

  constructor(observer: (key: TMethodsUnion, value: number | boolean | string) => void) {
    this._observer = observer;
  }

  init(data: HTMLElement | ISliderData | FormData): Promise<boolean> {
    if (data instanceof HTMLElement) {
      return this.initModelFromElement(data);
    } else {
      if (data instanceof FormData) {
        return this.initModelFromServer(data);
      } else {
        return this.initModelFromObject(data);
      }
    }
  }

  private initModelFromServer(form: FormData): Promise<boolean> {
    return fetch(this.serverURL, {method: 'POST', body: form})
      .then((res: Response) => res.json())
      .then((data: ISliderData) => {
        return this.initModelFromObject(data);
      });
  }

  private async initModelFromObject(data: ISliderData): Promise<boolean> {
    this._serverURL = data.serverURL;
    this._observer('serverURL', this._serverURL);
    this._onVertical = data.onVertical;
    this._observer('onVertical', this._onVertical);
    this._onRange = data.onRange;
    this._observer('onRange', this._onRange);
    this._onTooltip = data.onTooltip;
    this._observer('onTooltip', this._onTooltip);
    this._onScale = data.onScale;
    this._observer('onScale', this._onScale);

    if (data.minValue) {
      this._minValue = data.minValue;
    } else {
      this._minValue = 0;
    }
    this._observer('minValue', this._minValue);

    if (data.stepSize > 0) {
      this._stepSize = Math.round(data.stepSize);
    } else {
      this._stepSize = 1;
    }
    this._observer('stepSize', this._stepSize);

    if (data.maxValue > (this._minValue + this._stepSize)) {
      this._maxValue = Math.round((data.maxValue - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
    } else {
      this._maxValue = this._stepSize + this._minValue;
    }
    this._observer('maxValue', this._maxValue);


    if (data.valueFrom > this._minValue && data.valueFrom < this._maxValue) {
      this._valueFrom = Math.round((data.valueFrom - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
    } else {
      if (data.valueFrom >= this._maxValue) {
        this._valueFrom = this._maxValue;
      } else {
        this._valueFrom = this._minValue;
      }
    }
    this._observer('valueFrom', this._valueFrom);

    if (data.valueTo > this._valueFrom && data.valueTo < this._maxValue) {
      this._valueTo = Math.round((data.valueTo - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
    } else {
      if (data.valueTo >= this._maxValue) {
        this._valueTo = this._maxValue;
      } else {
        this._valueTo = this._valueFrom;
      }
    }
    this._observer('valueTo', this._valueTo);

    return true;
  }

  private async initModelFromElement(element: HTMLElement): Promise<boolean> {
    const data = {
      onVertical: (element.dataset.onVertical === 'true'),
      onRange: (element.dataset.onRange === 'true'),
      onTooltip: (element.dataset.onTooltip === 'true'),
      onScale: (element.dataset.onScale === 'true'),
      minValue: Number(element.dataset.minValue),
      maxValue: Number(element.dataset.maxValue),
      valueFrom: Number(element.dataset.valueFrom),
      valueTo: Number(element.dataset.valueTo),
      stepSize: Number(element.dataset.stepSize),
      serverURL: String(element.dataset.serverURL)
    }
    return this.initModelFromObject(data);
  }

  get minValue(): number {
    return this._minValue;
  }

  set minValue(minValue: number) {
    if (minValue <= this._valueFrom) {
      this._minValue = this._maxValue - Math.round((this._maxValue - minValue) / this._stepSize) * this._stepSize
    } else {
      this._minValue = this._valueFrom;
    }
    this._observer('minValue', this._minValue);
  }

  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(maxValue: number) {
    if (maxValue >= this._valueTo) {
      this._maxValue = Math.round((maxValue - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
    } else {
      this._maxValue = this._valueTo;
    }
    this._observer('maxValue', this._maxValue)
  }

  get valueFrom(): number {
    return this._valueFrom;
  }

  set valueFrom(valueFrom: number) {
    if (this._onRange) {
      if (valueFrom >= this._minValue && valueFrom <= this._valueTo) {
        this._valueFrom = Math.round((valueFrom - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
      } else {
        if (valueFrom > this._valueTo) {
          this._valueFrom = Math.round((this._valueTo - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
        } else {
          this._valueFrom = this._minValue;
        }
      }
    } else {
      if (valueFrom >= this._minValue && valueFrom <= this._maxValue) {
        this._valueFrom = Math.round((valueFrom - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
      } else {
        if (valueFrom > this._maxValue) {
          this._valueFrom = Math.round((this._maxValue - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
        } else {
          this._valueFrom = this._minValue;
        }
      }
    }
    this._observer('valueFrom', this._valueFrom);
  }

  get valueTo(): number {
    return this._valueTo;
  }

  set valueTo(valueTo: number) {
    if (valueTo >= this._valueFrom && valueTo <= this._maxValue) {
      this._valueTo = Math.round((valueTo - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
    } else {
      if (valueTo > this._maxValue) {
        this._valueTo = Math.round((this._maxValue - this._minValue) / this._stepSize) * this._stepSize + this._minValue;
      } else {
        this._valueTo = this._valueFrom;
      }
    }
    this._observer('valueTo', this._valueTo)
  }

  get stepSize(): number {
    return this._stepSize;
  }

  set stepSize(stepSize: number) {
    stepSize = Math.round(stepSize);
    if (stepSize <= 0) {
      this._stepSize = 1;
    } else {
      if (stepSize <= (this._maxValue - this._minValue)) {
        this._stepSize = stepSize;
      } else {
        this._stepSize = this._maxValue - this._minValue;
      }
    }
    this.valueFrom = this.valueFrom;
    this.valueTo = this.valueTo;
    this.maxValue = this.maxValue;
    this._observer('stepSize', this._stepSize);
  }

  get onVertical(): boolean {
    return this._onVertical;
  }

  set onVertical(onVertical: boolean) {
    this._onVertical = onVertical;
    this._observer('onVertical', this._onVertical)
  }

  get onRange(): boolean {
    this.valueTo = this._valueTo;
    return this._onRange;
  }

  set onRange(onRange: boolean) {
    this._onRange = onRange;
    this._observer('onRange', this._onRange)
  }

  get onTooltip(): boolean {
    return this._onTooltip;
  }

  set onTooltip(onTooltip: boolean) {
    this._onTooltip = onTooltip;
    this._observer('onTooltip', this._onTooltip)
  }

  get onScale(): boolean {
    return this._onScale;
  }

  set onScale(onScale: boolean) {
    this._onScale = onScale;
    this._observer('onScale', this._onScale);
  }

  get serverURL(): string {
    return this._serverURL;
  }

  set serverURL(serverURL: string) {
    this._serverURL = serverURL;
    this._observer('serverURL', this._serverURL);
  }
}

export {SliderModel};