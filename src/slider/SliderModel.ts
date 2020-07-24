class SliderModel implements ISliderModel {
  private min: number = 1;
  private max: number = 10;
  private valueStart: number = 5;
  private valueEnd: number = 6;
  private stepSize: number = 1;
  private vertical: boolean = false;
  private range: boolean = false;
  private tooltip: boolean = false;

  constructor(data: ISliderModelData | null) {
    if (data) {
      this.setDataModelFromObject(data);
    }
  }

  setDataModelFromElement(element: HTMLElement) {
    Object.assign(this, element.dataset);
    console.log(this);
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

  setDataModelFromObject(model: ISliderModelData) {
    Object.assign(this, model);
  }

  get minValue(): number {
    return this.min;
  }

  set minValue(min: number) {
    this.min = min;
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

  get stepValue(): number {
    return this.stepSize;
  }

  set stepValue(stepSize: number) {
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