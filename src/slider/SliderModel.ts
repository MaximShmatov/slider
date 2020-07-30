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
    this.minValue = minValue ? minValue : 0;
    return this;
  }

  getMaxValue(): number {
    return this.maxValue;
  }

  setMaxValue(maxValue: number): this {
    this.maxValue = maxValue ? maxValue : 0;
    return this;
  }

  getValueFrom(): number {
    return this.valueFrom;
  }

  setValueFrom(valueFrom: number): this {
    this.valueFrom = valueFrom ? valueFrom : 0;
    return this;
  }

  getValueTo(): number {
    return this.valueTo;
  }

  setValueTo(valueTo: number): this {
    this.valueTo = valueTo ? valueTo : 0;
    return this;
  }

  getStepSize(): number {
    return this.stepSize;
  }

  setStepSize(stepSize: number): this {
    this.stepSize = stepSize ? stepSize : 1;
    return this;
  }

  isVertical(): boolean {
    return this.onVertical;
  }

  setVertical(onVertical: boolean): this {
    this.onVertical = onVertical;
    return this;
  }

  isRange(): boolean {
    return this.onRange;
  }

  setRange(onRange: boolean): this {
    this.onRange = onRange;
    return this;
  }

  isTooltip(): boolean {
    return this.onTooltip;
  }

  setTooltip(onTooltip: boolean): this {
    this.onTooltip = onTooltip;
    return this;
  }
}

export {SliderModel};