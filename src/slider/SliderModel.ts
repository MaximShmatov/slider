class SliderModel implements ISliderModel {
  private _minValue: number = 0;
  private _maxValue: number = 100;
  private _valueFrom: number = 10;
  private _valueTo: number = 90;
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
      })
      .catch((e) => {
        console.log('Request error2:', e);
        return false;
      });
  }

  private async initModelFromObject(data: ISliderData): Promise<boolean> {
    this.onVertical = data.onVertical;
    this.onRange = data.onRange;
    this.onTooltip = data.onTooltip;
    this.onScale = data.onScale;
    this.minValue = data.minValue;
    this.maxValue = data.maxValue;
    this.valueFrom = data.valueFrom;
    this.valueTo = data.valueTo;
    this.stepSize = data.stepSize;
    this.serverURL = data.serverURL;
    return true;
  }

  private async initModelFromElement(element: HTMLElement): Promise<boolean> {
    this.onVertical = (element.dataset.onVertical === 'true');
    this.onTooltip = (element.dataset.onTooltip === 'true');
    this.onScale = (element.dataset.onScale === 'true');
    this.onRange = (element.dataset.onRange === 'true');
    this.minValue = Number(element.dataset.minValue);
    this.maxValue = Number(element.dataset.maxValue);
    this.valueFrom = Number(element.dataset.valueFrom);
    this.valueTo = Number(element.dataset.valueTo);
    this.stepSize = Number(element.dataset.stepSize);
    this.serverURL = String(element.dataset.serverURL);
    return true;
  }

  get minValue(): number {
    return this._minValue;
  }

  set minValue(minValue: number) {
    if (minValue <= this._maxValue) {
      this._minValue = minValue;
    } else {
      this._minValue = this._maxValue;
    }
    if (this._minValue > this._valueFrom) this.valueFrom = this._minValue;
    if (this._minValue > this._valueTo) this.valueTo = this._minValue;
    this._observer('minValue', this._minValue);
  }

  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(maxValue: number) {
    if (maxValue >= this._minValue) {
      this._maxValue = maxValue;
    } else {
      this._maxValue = this._minValue;
    }
    if (this._maxValue < this._valueTo) this.valueTo = this._maxValue;
    if (this._maxValue < this._valueFrom) this.valueFrom = this._maxValue;
    this._observer('maxValue', this._maxValue)
  }

  get valueFrom(): number {
    return this._valueFrom;
  }

  set valueFrom(valueFrom: number) {
    if (this._onRange) {
      if (valueFrom <= this._valueTo && valueFrom >= this._minValue) {
        this._valueFrom = valueFrom;
      }
      if (valueFrom < this._minValue) {
        this._valueFrom = this._minValue;
      }
      if (valueFrom > this._valueTo) {
        this._valueFrom = this._valueTo;
      }
    } else {
      if (valueFrom >= this._minValue && valueFrom <= this._maxValue) {
        this._valueFrom = valueFrom;
      }
      if (valueFrom > this._maxValue) {
        this._valueFrom = this._maxValue;
      }
      if (valueFrom < this._minValue) {
        this._valueFrom = this._minValue;
      }
      if (valueFrom > this._valueTo) {
        this.valueTo = this._valueFrom;
      }
    }
    this._observer('valueFrom', this._valueFrom)
  }

  get valueTo(): number {
    return this._valueTo;
  }

  set valueTo(valueTo: number) {
    if (valueTo >= this._valueFrom && valueTo <= this._maxValue) {
      this._valueTo = valueTo;
    }
    if (valueTo > this._maxValue) {
      this._valueTo = this._maxValue;
    }
    if (valueTo < this._valueFrom) {
      this._valueTo = this._valueFrom;
    }
    this._observer('valueTo', this._valueTo)
  }

  get stepSize(): number {
    return this._stepSize;
  }

  set stepSize(stepSize: number) {
    this._stepSize = stepSize ? stepSize : 1;
    if (stepSize > (this._maxValue - this._minValue)) {
      this._stepSize = this._maxValue - this._minValue;
    }
    this._observer('stepSize', this._stepSize)
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