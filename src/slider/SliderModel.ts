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
  private _serverURL: URL = new URL('http://localhost:9000/slider');
  private readonly _observer: (key: TMethodsUnion, value: boolean | number) => void;

  constructor(observer: (key: TMethodsUnion, value: number | boolean) => void) {
    this._observer = observer;
  }

  init(data: HTMLElement | SliderModel | FormData): boolean {
    try {
      if (data instanceof HTMLElement) this.initModelFromElement(data);
      if (data instanceof SliderModel) this.initModelFromObject(data);
      if (data instanceof FormData) this.initModelFromServer(data);
      return true;
    } catch (e) {
      console.log('Error initialization model', e)
      return false;
    }
  }

  private initModelFromServer(form: FormData): boolean {
    //let form: FormData = new FormData();
    //form.append('variant', variant);
    try {
      fetch(this._serverURL.href, {method: 'POST', body: form})
        .then((res: Response) => res.json())
        .then((model: ISliderModel) => this.initModelFromObject(model));
      return true;
    } catch (e) {
      console.log('Error connection', e)
      return false;
    }
  }

  private initModelFromObject(data: ISliderModel) {
    Object.assign(this, data);
  }

  private initModelFromElement(element: HTMLElement) {
    this.minValue = Number(element.dataset.minValue);
    this.maxValue = Number(element.dataset.maxValue);
    this.valueFrom = Number(element.dataset.valueFrom);
    this.valueTo = Number(element.dataset.valueTo);
    this.stepSize = Number(element.dataset.stepSize);
    this.onVertical = Boolean(element.dataset.onVertical);
    this.onRange = Boolean(element.dataset.onRange);
    this.onTooltip = Boolean(element.dataset.onTooltip);
    this.onScale = Boolean(element.dataset.onScale);
  }

  get minValue(): number {
    return this._minValue;
  }

  set minValue(minValue: number) {
    if (minValue && this._maxValue) {
      if (minValue <= this._maxValue) {
        this._minValue = minValue;
      } else {
        this._minValue = this._maxValue;
      }
    } else {
      if (minValue) {
        this._minValue = minValue;
      } else {
        this._minValue = 0;
      }
    }
    this._observer('minValue', this._minValue);
  }

  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(maxValue: number) {
    if (maxValue && this._minValue) {
      if (maxValue >= this._minValue) {
        this._maxValue = maxValue;
      } else {
        this._maxValue = this._minValue;
      }
    } else {
      if (maxValue) {
        this._maxValue = maxValue;
      } else {
        this._maxValue = 0;
      }
    }
    this._observer('maxValue', this._maxValue)
  }

  get valueFrom(): number {
    return this._valueFrom;
  }

  set valueFrom(valueFrom: number) {
    if (valueFrom && this._valueTo && this._minValue) {
      if (valueFrom <= this._valueTo && valueFrom >= this._minValue) {
        this._valueFrom = valueFrom;
      }
      if (valueFrom < this._minValue) {
        this._valueFrom = this._minValue;
      }
      if (valueFrom > this._valueTo) {
        this._valueFrom = this._valueTo;
      }
    }
    if (valueFrom && this._valueTo && !this._minValue) {
      if (valueFrom < this._valueTo) {
        this._valueFrom = valueFrom;
      } else {
        this._valueFrom = this._valueTo;
      }
    }
    if (valueFrom && !this._valueTo && this._minValue) {
      if (valueFrom > this._minValue) {
        this._valueFrom = valueFrom;
      } else {
        this._valueFrom = this._minValue;
      }
    }
    if (valueFrom && !this._valueTo && !this._minValue) {
      if (this._valueFrom) {
        this._valueFrom = valueFrom;
      } else {
        this._valueFrom = 0;
      }
    }
    this._observer('valueFrom', this._valueFrom)
  }

  get valueTo(): number {
    return this._valueTo;
  }

  set valueTo(valueTo: number) {
    if (valueTo && this._valueFrom && this._maxValue) {
      if (valueTo >= this._valueFrom && valueTo <= this._maxValue) {
        this._valueTo = valueTo;
      }
      if (valueTo > this._maxValue) {
        this._valueTo = this._maxValue;
      }
      if (valueTo < this._valueFrom) {
        this._valueTo = this._valueFrom;
      }
    }
    if (valueTo && this._valueFrom && !this._maxValue) {
      if (valueTo > this._valueFrom) {
        this._valueTo = valueTo;
      } else {
        this._valueTo = this._valueFrom;
      }
    }
    if (valueTo && !this._valueFrom && this._maxValue) {
      if (valueTo < this._maxValue) {
        this._valueTo = valueTo;
      } else {
        this._valueTo = this._maxValue;
      }
    }
    if (valueTo && !this._valueFrom && !this._maxValue) {
      if (this._valueTo) {
        this._valueTo = valueTo;
      } else {
        this._valueTo = 0;
      }
    }
    this._observer('valueTo', this._valueTo)
  }

  get stepSize(): number {
    return this._stepSize;
  }

  set stepSize(stepSize: number) {
    this._stepSize = stepSize ? stepSize : 1;
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
    return this._onRange;
  }

  set onRange(onRange: boolean) {
    if (!onRange) {
      this._valueTo = this._maxValue;
    }
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
    this._observer('onScale', this._onScale)
  }

  get serverURL(): URL {
    return this._serverURL;
  }

  set serverURL(serverURL: URL) {
    this._serverURL = serverURL;
  }
}

export {SliderModel};