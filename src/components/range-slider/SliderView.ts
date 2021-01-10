import '../../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import styles from './styles.module.sass';

class Progress extends HTMLElement {
  private _leftOrTop: 'left' | 'top' = 'left';

  private _rightOrBottom: 'right' | 'bottom' = 'right';

  constructor() {
    super();
    this.className = 'slider__progress';
  }

  static get observedAttributes() {
    return ['data-position-from', 'data-position-to', 'data-is-range', 'data-is-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-position-from':
        this.setPosFrom();
        break;
      case 'data-position-to':
        this.setPosTo();
        break;
      case 'data-is-range':
        this.setPosTo();
        break;
      case 'data-is-vertical':
        this.setDirection();
        this.setPosFrom();
        this.setPosTo();
        break;
      default:
    }
  }

  private setPosFrom() {
    $(this).css(`${this._leftOrTop}`, `${this.dataset.positionFrom}%`);
  }

  private setPosTo() {
    if (this.dataset.isRange === 'true') {
      $(this).css(`${this._rightOrBottom}`, `${100 - (Number(this.dataset.positionTo))}%`);
    } else {
      $(this).css(`${this._rightOrBottom}`, '0');
    }
  }

  private setDirection() {
    if (this.dataset.isVertical === 'true') {
      this._leftOrTop = 'top';
      this._rightOrBottom = 'bottom';
      this.style.left = '0';
    } else {
      this._leftOrTop = 'left';
      this._rightOrBottom = 'right';
      this.style.top = '0';
    }
  }
}

class Thumb extends HTMLElement {

  private readonly tooltip: HTMLElement;

  private leftOrTop: 'left' | 'top' = 'left';

  constructor() {
    super();
    this.className = 'slider__thumb';
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'slider__thumb-tooltip';
    this.appendChild(this.tooltip);
  }

  static get observedAttributes() {
    return [
      'data-is-vertical',
      'data-is-tooltip',
      'data-value',
      'data-move',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'data-is-vertical':
        const isVertical = (newValue === 'true');
        isVertical ? this.leftOrTop = 'top' : 'left';
        this.style.left = isVertical ? '0' : `${this.dataset.move}%`;
        this.style.top = isVertical ? `${this.dataset.move}%` : '0';
        break;
      case 'data-is-tooltip':
        this.tooltip.style.display = (newValue === 'true') ? '' : 'none';
        break;
      case 'data-value':
        this.tooltip.textContent = newValue;
        break;
      case 'data-move':
        this.style[this.leftOrTop] = `${newValue}%`;
    }
  }
}

class Rail extends HTMLElement {

  private readonly callback: TViewCallback;

  private readonly progress: HTMLElement;

  private readonly mouseMove = this.handleMouseMove.bind(this);

  private readonly mouseUp = this.handleMouseUp.bind(this);

  private readonly thumbFrom: HTMLElement;

  private readonly thumbTo: HTMLElement;

  private valueFromOrTo: 'valueFrom' | 'valueTo';

  private clientXorY: 'clientX' | 'clientY';

  private offsetXorY = 0;

  private widthOrHeight = 0;

  private moveFrom = 0;

  private moveTo = 0;

  constructor(func: TViewCallback) {
    super();
    this.callback = func;
    this.className = 'slider__rail';
    this.thumbFrom = new Thumb();
    this.thumbTo = new Thumb();
    this.progress = new Progress();
    this.clientXorY = 'clientX';
    this.valueFromOrTo = 'valueFrom';
    this.appendChild(this.thumbFrom);
    this.appendChild(this.thumbTo);
    this.appendChild(this.progress);
    this.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  static get observedAttributes() {
    return [
      'data-value-from',
      'data-value-to',
      'data-is-tooltip',
      'data-is-range',
      'data-is-vertical',
      'data-move-from',
      'data-move-to',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'data-value-from':
        this.thumbFrom.setAttribute('data-value', newValue);
        break;
      case 'data-value-to':
        this.thumbTo.setAttribute('data-value', newValue);
        break;
      case 'data-move-from':
        this.thumbFrom.setAttribute('data-move', newValue);
        this.moveFrom = Number(newValue);
        break;
      case 'data-move-to':
        this.thumbTo.setAttribute('data-move', newValue);
        this.moveTo = Number(newValue);
        break;
      case 'data-is-vertical':
        this.progress.setAttribute(name, newValue);
      case 'data-is-tooltip':
        this.thumbFrom.setAttribute(name, newValue);
        this.thumbTo.setAttribute(name, newValue);
        break;
      case 'data-is-range':
        this.progress.setAttribute(name, newValue);
        this.thumbTo.style.display = (newValue === 'true') ? '' : 'none';
    }
  }

  private handleMouseDown(evt: MouseEvent): void {
    const rect = this.getBoundingClientRect();
    const isVertical = (this.dataset.isVertical === 'true');
    this.clientXorY = isVertical ? 'clientY' : 'clientX';
    this.offsetXorY = isVertical ? rect.top : rect.left;
    this.widthOrHeight = isVertical ? rect.height : rect.width;

    if (this.dataset.isRange === 'true') {
      const posXorY = evt[this.clientXorY];
      if (posXorY) {
        const posToPercent = (posXorY - this.offsetXorY) / (this.widthOrHeight / 100);
        const distanceFrom = Math.abs(posToPercent - this.moveFrom);
        const distanceTo = Math.abs(this.moveTo - posToPercent);
        const isNearThumb = (distanceFrom < distanceTo);
        this.valueFromOrTo = isNearThumb ? 'valueFrom' : 'valueTo';
      }
    } else {
      this.valueFromOrTo = 'valueFrom';
    }

    this.handleMouseMove(evt);

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  private handleMouseMove(evt: MouseEvent): void {
    evt.preventDefault();
    const position = evt[this.clientXorY];
    if (position) {
      let posToPercent = (position - this.offsetXorY) / (this.widthOrHeight / 100);
      const minPercent = (this.valueFromOrTo === 'valueFrom') ? 0 : this.moveFrom;
      const maxPercent = (this.valueFromOrTo === 'valueTo') ? 100 : this.moveTo;
      if (posToPercent < minPercent) posToPercent = minPercent;
      if (posToPercent > maxPercent) posToPercent = maxPercent;
      this.callback(this.valueFromOrTo, posToPercent);
    }
  }

  private handleMouseUp(): void {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

class Scale extends HTMLElement {

  private readonly callback: TViewCallback;

  private readonly valueItems: NodeListOf<HTMLSpanElement>;

  constructor(func: TViewCallback) {
    super();
    this.callback = func;
    this.className = 'slider__scale';
    this.createScaleDOM();
    this.valueItems = this.querySelectorAll('.slider__scale-values-item');
    this.setScaleValues();
    this.addEventListener('mousedown', this.handleScaleMouseDown.bind(this));
  }

  static get observedAttributes() {
    return [
      'data-min-value',
      'data-max-value',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.setScaleValues();
    const range = Number(this.dataset.maxValue) - Number(this.dataset.minValue);
    this.valueItems[2].style.display = (range < 3) ? 'none' : '';
    this.valueItems[1].style.display = (range < 2) ? 'none' : '';

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

  private handleScaleMouseDown(evt: MouseEventInit): void {
    if (evt.clientX && evt.clientY) {
      const rect = this.getBoundingClientRect();
      const isVertical = (this.dataset.isVertical === 'true');
      const clientXorY = isVertical ? evt.clientY : evt.clientX;
      const widthOrHeight = isVertical ? rect.height : rect.width;
      const leftOrTop = isVertical ? rect.top : rect.left;
      const posToPercent = (clientXorY - leftOrTop) / (widthOrHeight / 100);

      if (this.dataset.isRange === 'true') {
        const moveFom = Number(this.dataset.moveFrom);
        const moveTo = Number(this.dataset.moveTo);
        const distanceFrom = Math.abs(posToPercent - moveFom);
        const distanceTo = Math.abs(moveTo - posToPercent);
        const attr = (distanceFrom < distanceTo) ? 'valueFrom' : 'valueTo';
        this.callback(attr, posToPercent);
      } else {
        this.callback('valueFrom', posToPercent);
      }
    }
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

class SliderView extends HTMLElement {

  readonly id: string;

  private readonly callback: TViewCallback;

  private readonly rail: HTMLElement;

  private readonly scale: HTMLElement;

  private readonly slider: HTMLElement;

  private readonly styles: HTMLElement;

  constructor(func: TViewCallback = () => {}) {
    super();
    this.id = String(Math.random());
    this.callback = func;
    this.rail = new Rail(func);
    this.scale = new Scale(func);
    this.styles = document.createElement('style');
    this.styles.innerHTML = styles;
    this.slider = document.createElement('div');
    this.slider.className = 'slider';
    this.slider.appendChild(this.rail);
    this.slider.appendChild(this.scale);
    this.attachShadow({mode: 'open'});
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.styles);
      this.shadowRoot.appendChild(this.slider);
    }
  }

  static get observedAttributes() {
    return [
      'data-min-value',
      'data-max-value',
      'data-value-from',
      'data-value-to',
      'data-is-range',
      'data-is-scale',
      'data-is-tooltip',
      'data-is-vertical',
      'data-move-from',
      'data-move-to',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'data-is-scale':
        this.scale.style.display = (newValue === 'true') ? '' : 'none';
        break;
      case 'data-min-value':
      case 'data-max-value':
        this.scale.setAttribute(name, newValue);
        break;
      case 'data-move-from':
      case 'data-move-to':
        this.scale.setAttribute(name, newValue);
      case 'data-value-from':
      case 'data-value-to':
      case 'data-is-tooltip':
        this.rail.setAttribute(name, newValue);
        break;
      case 'data-is-vertical':
        if (newValue === 'true') this.slider.classList.add('slider_vertical');
        else this.slider.classList.remove('slider_vertical');
      case 'data-is-range':
        this.rail.setAttribute(name, newValue);
        this.scale.setAttribute(name, newValue);
    }
  }
}

if (!customElements.get('range-slider')) {
  customElements.define('range-slider', SliderView);
  customElements.define('range-slider-view-thumb', Thumb);
  customElements.define('range-slider-view-rail', Rail);
  customElements.define('range-slider-view-scale', Scale);
  customElements.define('range-slider-view-progress', Progress);
}

export default SliderView;
