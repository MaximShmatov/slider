class SliderModel extends HTMLElement implements ISliderModel {
  constructor(element: HTMLElement | null) {
    super();
    if (element) {
      this.className = element.className;
      this.initModelFromElement(element);
    } else this.className = 'input-slider-model';
  }

  static get observedAttributes() {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-on-vertical', 'data-on-range', 'data-on-tooltip', 'data-on-scale'];
  }

  attributeChangedCallback(prop: string) {
    this.dispatchEvent(new CustomEvent('slider-data', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        data: prop
      }
    }));
  }

  initModelFromServer(variant: string) {
    let form: FormData = new FormData();
    form.append('variant', variant);
    try {
      fetch('http://localhost:9000/slider', {method: 'POST', body: form})
        .then((res: Response) => res.json())
        .then((model: ISliderModel) => this.initModelFromObject(model));
      return true;
    } catch (e) {
      console.log('Error connection', e)
      return false;
    }
  }

  initModelFromObject(data: ISliderModel) {
    Object.assign(this, data);
  }

  get minValue(): number {
    return Number(this.dataset.minValue);
  }

  set minValue(minValue: number) {
    this.dataset.minValue = (minValue ? minValue : 0).toString();
  }

  get maxValue(): number {
    return Number(this.dataset.maxValue);
  }

  set maxValue(maxValue: number) {
    this.dataset.maxValue = (maxValue ? maxValue : 0).toString();
  }

  get valueFrom(): number {
    return Number(this.dataset.valueFrom);
  }

  set valueFrom(valueFrom: number) {
    this.dataset.valueFrom = (valueFrom ? valueFrom : 0).toString();
  }

  get valueTo(): number {
    return Number(this.dataset.valueTo);
  }

  set valueTo(valueTo: number) {
    this.dataset.valueTo = (valueTo ? valueTo : 0).toString();
  }

  get stepSize(): number {
    return Number(this.dataset.stepSize);
  }

  set stepSize(stepSize: number) {
    this.dataset.stepSize = (stepSize ? stepSize : 1).toString();
  }

  get onVertical(): boolean {
    return (this.dataset.onVertical === 'true');
  }

  set onVertical(onVertical: boolean) {
    this.dataset.onVertical = String(onVertical);
  }

  get onRange(): boolean {
    return (this.dataset.onRange === 'true');
  }

  set onRange(onRange: boolean) {
    this.dataset.onRange = String(onRange);
  }

  get onTooltip(): boolean {
    return (this.dataset.onTooltip === 'true');
  }

  set onTooltip(onTooltip: boolean) {
    this.dataset.onTooltip = String(onTooltip);
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
  }
}

customElements.define('input-slider-model', SliderModel);

export {SliderModel};