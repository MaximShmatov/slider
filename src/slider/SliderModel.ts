class SliderModel implements ISliderModel {
  private minValue: number = 1;
  private maxValue: number = 10;
  private valueFrom: number = 5;
  private valueTo: number = 6;
  private stepSize: number = 1;
  private onVertical: boolean = false;
  private onRange: boolean = false;
  private onTooltip: boolean = false;

  constructor(data: ISliderModelData | null) {
    if (data) {
      this.setDataModelFromObject(data);
    }
  }

  setDataModelFromElement(element: HTMLElement) {
    this
      .setMinValue(Number(element.dataset.minValue))
      .setMaxValue(Number(element.dataset.maxValue))
      .setValueFrom(Number(element.dataset.valueFrom))
      .setValueTo(Number(element.dataset.valueTo))
      .setStepSize(Number(element.dataset.stepSize))
      .setVertical(Boolean(element.dataset.onVertical))
      .setRange(Boolean(element.dataset.onRange))
      .setTooltip(Boolean(element.dataset.onTooltip));
  }

  setDataModelFromServer(variant: string) {
    let form: FormData = new FormData();
    form.append('variant', variant);
    try {
      fetch('http://localhost:9000/slider', {method: 'POST', body: form})
        .then((res: Response) => res.json())
        .then((model: ISliderModelData) => this.setDataModelFromObject(model));
      return true;
    } catch (e) {
      console.log('Error connection', e)
      return false;
    }
  }

  setDataModelFromObject(data: ISliderModelData) {
    Object.assign(this, data);
  }

  getMinValue(): number {
    return this.minValue;
  }

  setMinValue(minValue: number): this {
    if(minValue) {
      this.minValue = minValue;
    }
    this.minValue = minValue;
    return this;
  }

  getMaxValue(): number {
    return this.maxValue;
  }

  setMaxValue(maxValue: number): this {
    if(maxValue) {
      this.maxValue = maxValue;
    }
    return this;
  }

  getValueFrom(): number {
    return this.valueFrom;
  }

  setValueFrom(valueFrom: number): this {
    if(valueFrom) {
      this.valueFrom = valueFrom;
    }
    return this;
  }

  getValueTo(): number {
    return this.valueTo;
  }

  setValueTo(valueTo: number): this {
    if(valueTo) {
      this.valueTo = valueTo;
    }
    return this;
  }

  getStepSize(): number {
    return this.stepSize;
  }

  setStepSize(stepSize: number): this {
    if(stepSize) {
      this.stepSize = stepSize;
    }
    return this;
  }

  isVertical(): boolean {
    return this.onVertical;
  }

  setVertical(onVertical: boolean): this {
    if(onVertical) {
      this.onVertical = onVertical;
    }
    return this;
  }

  isRange(): boolean {
    return this.onRange;
  }

  setRange(onRange: boolean): this {
    if(onRange) {
      this.onRange = onRange;
    }
    return this;
  }

  isTooltip(): boolean {
    return this.onTooltip;
  }

  setTooltip(onTooltip: boolean): this {
    if(onTooltip) {
      this.onTooltip = onTooltip;
    }
    return this;
  }
}

export {SliderModel};