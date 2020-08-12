class SliderModel implements ISliderModel {
  readonly id: number;
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

  constructor(data: HTMLElement | SliderModel | FormData | null) {
    this.id = Math.random();
    if (data) this.init(data);
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
    if (this._minValue) {
      if (this._minValue <= this._maxValue) {
        this._minValue = minValue;
      } else {
        this._minValue = this._maxValue;
      }
    } else {
      this._minValue = 0
    }
  }

  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(maxValue: number) {
    if (this._maxValue) {
      if (this._maxValue >= this._minValue) {
        this._maxValue = maxValue;
      } else {
        this._maxValue = this._minValue;
      }
    } else {
      this._maxValue = 0
    }
  }

  get valueFrom(): number {
    return this._valueFrom;
  }

  set valueFrom(valueFrom: number) {
    if (this._valueFrom) {
      if (this._valueFrom <= this._valueTo) {
        this._valueFrom = valueFrom;
      } else {
        this._valueFrom = this._valueTo;
      }
    } else {
      this._minValue = 0
    }
  }

  get valueTo(): number {
    return this._valueTo;
  }

  set valueTo(valueTo: number) {
    if (this._valueTo) {
      if (this._valueTo >= this._valueFrom) {
        this._valueTo = valueTo;
      } else {
        this._valueTo = this._valueFrom;
      }
    } else {
      this._valueTo = 0
    }
  }

  get stepSize(): number {
    return this._stepSize;
  }

  set stepSize(stepSize: number) {
    this._stepSize = stepSize ? stepSize : 1;
  }

  get onVertical(): boolean {
    return this._onVertical;
  }

  set onVertical(onVertical: boolean) {
    this._onVertical = onVertical;
  }

  get onRange(): boolean {
    return this._onRange;
  }

  set onRange(onRange: boolean) {
    this._onRange = onRange;
  }

  get onTooltip(): boolean {
    return this._onTooltip;
  }

  set onTooltip(onTooltip: boolean) {
    this._onTooltip = onTooltip;
  }

  get onScale(): boolean {
    return this._onScale;
  }

  set onScale(onScale: boolean) {
    this._onScale = onScale;
  }

  get serverURL(): URL {
    return this._serverURL;
  }

  set serverURL(serverURL: URL) {
    this._serverURL = serverURL;
  }
}

export {SliderModel};