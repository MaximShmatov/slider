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
  private _position = 0;

  private _clientXorY: 'clientX' | 'clientY' = 'clientX';

  private _offsetXorY = 0;

  private _widthOrHeight = 0;

  private _direction: 'left' | 'top' = 'left';

  private readonly _name: 'valueFrom' | 'valueTo';

  private readonly _tooltip = document.createElement('div');

  private readonly _mouseMove = this.onMouseMove.bind(this);

  private readonly _mouseUp = this.onMouseUp.bind(this);

  constructor(name: 'valueFrom' | 'valueTo') {
    super();
    this._name = name;
    this.className = 'slider__thumb';
    this._tooltip.className = 'slider__thumb-tooltip';
    this.appendChild(this._tooltip);
    this.setHandlesEvents();
  }

  static get observedAttributes() {
    return ['data-value', 'data-position', 'data-is-vertical', 'data-is-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value':
        this._tooltip.textContent = <string>this.dataset.value;
        break;
      case 'data-position':
        this._position = Number(this.dataset.position);
        this.moveToPosition(this._position);
        break;
      case 'data-is-vertical':
        this.setPosition();
        this.moveToPosition(this._position);
        break;
      case 'data-is-tooltip':
        if (this.dataset.isTooltip === 'false') $(this._tooltip).hide();
        else $(this._tooltip).show();
        break;
      default:
    }
  }

  private setHandlesEvents() {
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  private moveToPosition(position: number): void {
    $(this).css(`${this._direction}`, `${position}%`);
  }

  private setPosition(): void {
    if (this.parentElement) {
      const rect = this.parentElement.getBoundingClientRect();
      if (this.dataset.isVertical === 'true') {
        this._clientXorY = 'clientY';
        this._direction = 'top';
        this._offsetXorY = rect.top;
        this._widthOrHeight = rect.height;
        this.style.left = '0';
      } else {
        this._clientXorY = 'clientX';
        this._direction = 'left';
        this._offsetXorY = rect.left;
        this._widthOrHeight = rect.width;
        this.style.top = '0';
      }
    }
  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    this.setPosition();
    document.addEventListener('mousemove', this._mouseMove);
    document.addEventListener('mouseup', this._mouseUp);
  }

  private onMouseMove(evt: MouseEventInit): void {
    this._position = (<number>evt[this._clientXorY] - this._offsetXorY);
    this._position /= (this._widthOrHeight / 100);
    if (this._position < 0) this._position = 0;
    if (this._position > 100) this._position = 100;
    this.dispatchEvent(new CustomEvent('slider-view', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {name: this._name, value: this._position},
    }));
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this._mouseMove);
    document.removeEventListener('mouseup', this._mouseUp);
  }
}

class Rail extends HTMLElement {

  private readonly callback: TCallback;

  private readonly thumbFrom: HTMLElement;

  private readonly thumbTo: HTMLElement;

  private readonly progress: HTMLElement;

  constructor(func: TCallback) {
    super();
    this.callback = func;
    this.className = 'slider__rail';
    this.thumbFrom = new Thumb('valueFrom');
    this.thumbTo = new Thumb('valueTo');
    this.progress = new Progress();
    this.appendChild(this.thumbFrom);
    this.appendChild(this.thumbTo);
    this.appendChild(this.progress);
  }

  static get observedAttributes() {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-is-tooltip', 'data-is-range', 'data-is-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-min-value':
      case 'data-max-value':
        this.thumbFrom.setAttribute('data-position', this.calcThumbPosition('from').toString());
        this.progress.setAttribute('data-position-from', this.calcThumbPosition('from').toString());
        this.thumbTo.setAttribute('data-position', this.calcThumbPosition('to').toString());
        this.progress.setAttribute('data-position-to', this.calcThumbPosition('to').toString());
        break;
      case 'data-is-tooltip':
        this.thumbFrom.setAttribute('data-is-tooltip', <string>this.dataset.isTooltip);
        this.thumbTo.setAttribute('data-is-tooltip', <string>this.dataset.isTooltip);
        break;
      case 'data-is-range':
        this.progress.setAttribute('data-is-range', <string>this.dataset.isRange);
        if (this.dataset.isRange === 'false') $(this.thumbTo).hide();
        else $(this.thumbTo).show();
        break;
      case 'data-is-vertical':
        this.thumbFrom.setAttribute('data-is-vertical', <string>this.dataset.isVertical);
        this.progress.setAttribute('data-is-vertical', <string>this.dataset.isVertical);
        this.thumbTo.setAttribute('data-is-vertical', <string>this.dataset.isVertical);
        break;
      case 'data-value-from':
        this.thumbFrom.setAttribute('data-position', this.calcThumbPosition('from').toString());
        this.thumbFrom.setAttribute('data-value', Number(this.dataset.valueFrom).toFixed());
        this.progress.setAttribute('data-position-from', this.calcThumbPosition('from').toString());
        break;
      case 'data-value-to':
        this.thumbTo.setAttribute('data-position', this.calcThumbPosition('to').toString());
        this.thumbTo.setAttribute('data-value', Number(this.dataset.valueTo).toFixed());
        this.progress.setAttribute('data-position-to', this.calcThumbPosition('to').toString());
        break;
      default:
    }
  }

  private calcThumbPosition(thumb: string): number {
    const min = Number(this.dataset.minValue);
    const max = Number(this.dataset.maxValue);
    let target = 0;
    if (thumb === 'from') target = Number(this.dataset.valueFrom);
    else target = Number(this.dataset.valueTo);
    return ((target - min) / ((max - min) / 100));
  }
}

class Scale extends HTMLElement {

  private readonly callback: TCallback;

  private readonly valueItems: NodeListOf<HTMLSpanElement>;

  constructor(func: TCallback) {
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
    switch (name) {
      case 'data-min-value':
      case 'data-max-value':
        this.setScaleValues();
        const range = Number(this.dataset.maxValue) - Number(this.dataset.minValue);
        this.valueItems[2].style.display = (range < 3) ? 'none' : '';
        this.valueItems[1].style.display = (range < 2) ? 'none' : '';
      default:
    }
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
    const rect = this.getBoundingClientRect();
    if (evt.clientX && evt.clientY) {
      const offset = Boolean(this.dataset.isVertical) ? evt.clientY : evt.clientX;
      const position = (offset - rect.top) / (rect.height / 100);

      if (Boolean(this.dataset.isRange)) {
        const distanceFrom = position - Number(this.dataset.valueFrom);
        const distanceTo = Number(this.dataset.valueTo) - position;
        const nearThumb = (distanceFrom < distanceTo) ? 'valueFrom' : 'valueTo';
        this.callback(nearThumb, position);
      } else {
        this.callback('valueFrom', position);
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

  private readonly callback: TCallback;

  private readonly rail: HTMLElement;

  private readonly scale: HTMLElement;

  private readonly slider: HTMLElement;

  private readonly styles: HTMLElement;

  constructor(func: TCallback = () => {}) {
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
      'data-step-size',
      'data-is-range',
      'data-is-scale',
      'data-is-tooltip',
      'data-is-vertical',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.rail.setAttribute(name, newValue);
    this.scale.setAttribute(name, newValue);

    switch (name) {
      case 'data-is-vertical':
        if (newValue === 'true') this.slider.classList.add('slider_vertical');
        else this.slider.classList.remove('slider_vertical');
      default:
    }

    this.dispatchEvent(new CustomEvent('range-slider', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {name, value: newValue},
    }));
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
