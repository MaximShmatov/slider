class SliderModel implements ISliderModel {
  private min: number = 1;
  private max: number = 10;
  private valueStart: number = 5;
  private valueEnd: number = 5;
  private stepSize: number = 1;
  private vertical: boolean = false;
  private range: boolean = false;
  private tooltip: boolean = false;

  constructor(model: ISliderModelData | null) {
    if (model) {
      this.setDataModel(model);
    }
  }

  setDataModelFromServer(variant: string) {
    let form: FormData = new FormData();
    form.append('variant', variant);
    try {
      fetch('http://localhost:9000/slider', {method: 'POST', body: form})
        .then((res: Response) => res.json())
        .then((model: ISliderModelData) => this.setDataModel(model));
      return true;
    } catch (e) {
      console.log('Error connection', e)
      return false;
    }
  }

  setDataModel(model: ISliderModelData) {
    this.minValue = model.minValue;
    this.maxValue = model.maxValue;
    this.valueFrom = model.valueStart;
    this.valueTo = model.valueEnd;
    this.stepSizeValue = model.stepSizeValue;
    this.onVertical = model.vertical;
    this.onRange = model.range;
    this.onTooltip = model.tooltip;
  }

  get minValue(): number {
    return this.min;
  }

  set minValue(min: number) {
    if (min !== undefined) {
      this.min = min;
    }
  }

  get maxValue(): number {
    return this.max;
  }

  set maxValue(max: number) {
    this.max = max;
  }

  get valueFrom(): number {
    return this.valueStart;
  }

  set valueFrom(value: number) {
    this.valueStart = value;
  }

  get valueTo(): number {
    return this.valueEnd;
  }

  set valueTo(value: number) {
    this.valueEnd = value;
  }

  get stepSizeValue(): number {
    return this.stepSize;
  }

  set stepSizeValue(stepSize: number) {
    this.stepSize = stepSize;
  }

  get onVertical(): boolean {
    return this.vertical;
  }

  set onVertical(vertical: boolean) {
    this.vertical = vertical;
  }

  get onRange(): boolean {
    return this.range;
  }

  set onRange(range: boolean) {
    this.range = range;
  }

  get onTooltip(): boolean {
    return this.tooltip;
  }

  set onTooltip(tooltip: boolean) {
    this.tooltip = tooltip;
  }
}

export {SliderModel};