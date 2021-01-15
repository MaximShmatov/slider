import ViewAbstract from './ViewAbstract';

class ViewScale extends ViewAbstract {
  private readonly callback: TViewCallback;

  private readonly valueItems: NodeListOf<HTMLSpanElement>;

  constructor(func: TViewCallback) {
    super();
    this.callback = func;
    this.className = 'slider__scale';
    this.createScaleDOM();
    this.valueItems = this.querySelectorAll('.slider__scale-values-item');
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
    this.addEventListener('mousedown', this.handleScaleMouseDown.bind(this));
  }

  private createScaleDOM() {
    let subdivisions = '<span class="slider__scale-subdivision"></span>';
    subdivisions += subdivisions + subdivisions + subdivisions + subdivisions;
    let divisions = `<div class="slider__scale-division">${subdivisions}</div>`;
    divisions += divisions + divisions;
    const scale = `<div class="slider__scale-wrapper">${divisions}</div>`;

    let valueItems = '<span class="slider__scale-values-item"></span>';
    valueItems += valueItems + valueItems + valueItems;
    const values = `<div class="slider__scale-values">${valueItems}</div>`;

    this.innerHTML = scale + values;
  }

  private handleScaleMouseDown(evt: MouseEvent): void {
    this.setDirection(evt);
    this.callback(this.valuePropName, this.calcPosInPercent(evt));
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

if (!customElements.get('range-slider-view-scale')) {
  customElements.define('range-slider-view-scale', ViewScale);
}

export default ViewScale;
