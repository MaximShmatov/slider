import ViewAbstract from './ViewAbstract';

class ViewScale extends ViewAbstract {
  setFromToValue: TViewCallback;

  private readonly valueItems: HTMLSpanElement[] = [];

  constructor() {
    super();
    this.setFromToValue = () => ({});
    this.className = 'slider__scale';
    this.createScaleDOM();
    this.setScaleValues();
    this.setEventHandlers();
  }

  attributeChangedCallback(): void {
    this.setScaleValues();
    const range = Number(this.dataset.maxValue) - Number(this.dataset.minValue);
    this.valueItems[2].style.display = (range < 3) ? 'none' : '';
    this.valueItems[1].style.display = (range < 2) ? 'none' : '';
  }

  private setEventHandlers(): void {
    this.addEventListener('mousedown', this.handleScaleMousedown.bind(this));
  }

  private createScaleDOM() {
    const division = Array(5).fill(null).reduce((acc) => {
      const subdivision = document.createElement('span');
      subdivision.className = 'slider__scale-subdivision';
      acc.appendChild(subdivision);
      return acc;
    }, document.createElement('div'));
    division.className = 'slider__scale-division';

    const scale = Array(3).fill(null).reduce((acc) => {
      acc.appendChild(division.cloneNode(true));
      return acc;
    }, document.createElement('div'));
    scale.className = 'slider__scale-wrapper';

    const scaleValues = Array(4).fill(null).reduce((acc) => {
      const valueItem = document.createElement('span');
      valueItem.className = 'slider__scale-values-item';
      this.valueItems.push(valueItem);
      acc.appendChild(valueItem);
      return acc;
    }, document.createElement('div'));
    scaleValues.className = 'slider__scale-values';

    this.appendChild(scale);
    this.appendChild(scaleValues);
  }

  private handleScaleMousedown(evt: MouseEvent): void {
    this.setDirection(evt);
    this.setFromToValue(this.valuePropName, this.calcValue(evt));
  }

  private setScaleValues(): void {
    const min = Number(this.dataset.minValue);
    const max = Number(this.dataset.maxValue);
    const scaleValue = (max - min) / 3;
    this.valueItems[0].textContent = min.toFixed();
    this.valueItems[1].textContent = (min + scaleValue).toFixed();
    this.valueItems[2].textContent = (min + scaleValue + scaleValue).toFixed();
    this.valueItems[3].textContent = max.toFixed();
  }
}

if (!customElements.get('range-slider-scale')) {
  customElements.define('range-slider-scale', ViewScale);
}

export default ViewScale;
