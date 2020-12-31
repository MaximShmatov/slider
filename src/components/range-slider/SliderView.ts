import '../../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import styles from './slider.module.sass';

class Progress extends HTMLElement {
  private _leftOrTop: 'left' | 'top' = 'left';

  private _rightOrBottom: 'right' | 'bottom' = 'right';

  constructor() {
    super();
    this.className = styles.locals.progress;
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
        if (this.dataset.isVertical === 'true') $(this).addClass(styles.locals.progress_ver);
        else $(this).removeClass(styles.locals.progress_ver);
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
    this.className = styles.locals.thumb;
    this._tooltip.className = styles.locals.thumb__tooltip;
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
        if (this.dataset.isVertical === 'true') {
          $(this).addClass(styles.locals.thumb_ver);
          $(this._tooltip).addClass(styles.locals.thumb__tooltip_ver);
        } else {
          $(this).removeClass(styles.locals.thumb_ver);
          $(this._tooltip).removeClass(styles.locals.thumb__tooltip_ver);
        }
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
  private _thumbFrom = new Thumb('valueFrom');

  private _thumbTo = new Thumb('valueTo');

  private _progress = new Progress();

  constructor(func: TCallback) {
    super();
    this.className = styles.locals.rail;
    this.appendChild(this._thumbFrom);
    this.appendChild(this._thumbTo);
    this.appendChild(this._progress);
  }

  static get observedAttributes() {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-is-tooltip', 'data-is-range', 'data-is-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-min-value':
      case 'data-max-value':
        this._thumbFrom.setAttribute('data-position', this.calcThumbPosition('from').toString());
        this._progress.setAttribute('data-position-from', this.calcThumbPosition('from').toString());
        this._thumbTo.setAttribute('data-position', this.calcThumbPosition('to').toString());
        this._progress.setAttribute('data-position-to', this.calcThumbPosition('to').toString());
        break;
      case 'data-is-tooltip':
        this._thumbFrom.setAttribute('data-is-tooltip', <string>this.dataset.isTooltip);
        this._thumbTo.setAttribute('data-is-tooltip', <string>this.dataset.isTooltip);
        break;
      case 'data-is-range':
        this._progress.setAttribute('data-is-range', <string>this.dataset.isRange);
        if (this.dataset.isRange === 'false') $(this._thumbTo).hide();
        else $(this._thumbTo).show();
        break;
      case 'data-is-vertical':
        this._thumbFrom.setAttribute('data-is-vertical', <string>this.dataset.isVertical);
        this._progress.setAttribute('data-is-vertical', <string>this.dataset.isVertical);
        this._thumbTo.setAttribute('data-is-vertical', <string>this.dataset.isVertical);
        if (this.dataset.isVertical === 'true') $(this).addClass(styles.locals.rail_ver);
        else $(this).removeClass(styles.locals.rail_ver);
        break;
      case 'data-value-from':
        this._thumbFrom.setAttribute('data-position', this.calcThumbPosition('from').toString());
        this._thumbFrom.setAttribute('data-value', Number(this.dataset.valueFrom).toFixed());
        this._progress.setAttribute('data-position-from', this.calcThumbPosition('from').toString());
        break;
      case 'data-value-to':
        this._thumbTo.setAttribute('data-position', this.calcThumbPosition('to').toString());
        this._thumbTo.setAttribute('data-value', Number(this.dataset.valueTo).toFixed());
        this._progress.setAttribute('data-position-to', this.calcThumbPosition('to').toString());
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

  private readonly valueItems: NodeListOf<HTMLElement>;

  constructor(func: TCallback) {
    super();
    this.callback = func;
    this.className = styles.locals.scale;
    this.createScaleDOM();
    this.valueItems = this.querySelectorAll(styles.locals.scale__valuesItem);
    this.addEventListener('mousedown', this.handleScaleMouseDown.bind(this));
  }

  static get observedAttributes() {
    return [
      'data-min-value',
      'data-max-value',
      'data-is-vertical',
    ];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-min-value':
      case 'data-max-value':
        this.setScaleValues();
        const range = Number(this.dataset.maxValue) - Number(this.dataset.minValue);
        this.valueItems[3].style.display = (range < 4) ? 'none' : 'block';
        this.valueItems[2].style.display = (range < 3) ? 'none' : 'block';
        break;
      case 'data-is-vertical':
        if (this.dataset.isVertical === 'true') {
          $(this).addClass(styles.locals.scale_ver);
          $(this).find(`.${styles.locals.scale__wrapper}`).addClass(styles.locals.scale__wrapper_ver);
          $(this).find(`.${styles.locals.scale__values}`).addClass(styles.locals.scale__values_ver);
          $(this).find(`.${styles.locals.scale__valuesItem}`).addClass(styles.locals.scale__valuesItem_ver);
          $(this).find(`.${styles.locals.scale__division}`).addClass(styles.locals.scale__division_ver);
          $(this).find(`.${styles.locals.scale__subdivision}`).addClass(styles.locals.scale__subdivision_ver);
        } else {
          $(this).removeClass(styles.locals.scale_ver);
          $(this).find(`.${styles.locals.scale__wrapper}`).removeClass(styles.locals.scale__wrapper_ver);
          $(this).find(`.${styles.locals.scale__values}`).removeClass(styles.locals.scale__values_ver);
          $(this).find(`.${styles.locals.scale__valuesItem}`).removeClass(styles.locals.scale__valuesItem_ver);
          $(this).find(`.${styles.locals.scale__division}`).removeClass(styles.locals.scale__division_ver);
          $(this).find(`.${styles.locals.scale__subdivision}`).removeClass(styles.locals.scale__subdivision_ver);
        }
        break;
      default:
    }
  }

  private createScaleDOM() {
    let subdivisions = `<span class="${styles.locals.scale__subdivision}"></span>`;
    for (let i = 0; i < 4; i += 1) {
      subdivisions += subdivisions;
    }
    let divisions = `<div class="${styles.locals.scale__division}">${subdivisions}</div>`;
    divisions += divisions + divisions;
    const scale = `<div class="${styles.locals.scale__wrapper}">${divisions}</div>`;

    let valueItems = `<span class="${styles.locals.scale__valuesItem}"></span>`;
    valueItems += valueItems + valueItems + valueItems;
    const values = `<div class="${styles.locals.scale__values}">${valueItems}</div>`;

    this.innerHTML = scale + values;
    this.setScaleValues();
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

class SliderView extends HTMLElement implements ISliderView {

  private readonly callback: TCallback;

  private readonly rail: HTMLElement;

  private readonly scale: HTMLElement;

  private readonly styles: HTMLElement;

  constructor(func: TCallback) {
    super();
    this.callback = func;
    this.rail = new Rail(func);
    this.scale = new Scale(func);
    this.styles = document.createElement('style');
    this.styles.innerHTML = styles;
    this.attachShadow({mode: 'open'});
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.styles);
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
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
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.rail.setAttribute(name, newValue);
    this.scale.setAttribute(name, newValue);

    if (name === 'data-is-scale') {
      this.scale.style.display = Boolean(newValue) ? 'none' : 'block';
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
