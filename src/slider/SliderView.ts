import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import styles from './slider.module.sass';


class SliderView extends HTMLElement implements ISliderView {
  readonly presenter: ISliderPresenter | null;
  private readonly rail: Rail = new Rail();
  private readonly scale: Scale = new Scale();
  private readonly styles = document.createElement('style');

  constructor(presenter: ISliderPresenter | null) {
    super();
    this.presenter = presenter;
    this.styles.innerHTML = styles;
    this.attachShadow({mode: 'open'});
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.styles);
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
    }
  }

  connectedCallback() {
    this.style.display = 'flex';
    this.style.justifyContent = 'center';
  }

  setModelData(method: TMethodsUnion, value: number | boolean | string): void {
    switch (method) {
      case 'minValue':
        this.rail.setAttribute('data-min-value', value.toString());
        this.scale.setAttribute('data-min-value', value.toString());
        break;
      case 'maxValue':
        this.rail.setAttribute('data-max-value', value.toString());
        this.scale.setAttribute('data-max-value', value.toString());
        break;
      case 'valueFrom':
        this.rail.setAttribute('data-value-from', value.toString());
        break;
      case 'valueTo':
        this.rail.setAttribute('data-value-to', value.toString());
        break;
      case 'onScale':
        (value) ? $(this.scale).show() : $(this.scale).hide();
        break;
      case 'onTooltip':
        this.rail.setAttribute('data-on-tooltip', value.toString());
        break;
      case 'onRange':
        this.rail.setAttribute('data-on-range', value.toString());
        this.scale.setAttribute('data-on-range', value.toString());
        break;
      case 'onVertical':
        (value) ? this.style.flexDirection = 'row' : this.style.flexDirection = 'column';
        this.rail.setAttribute('data-on-vertical', value.toString());
        this.scale.setAttribute('data-on-vertical', value.toString());
    }
  }
}

class Rail extends HTMLElement {
  private _thumbFrom: Thumb = new Thumb('valueFrom');
  private _thumbTo: Thumb = new Thumb('valueTo');
  private _progress = new Progress();

  constructor() {
    super();
    this.className = styles.locals.rail
    this.appendChild(this._thumbFrom);
    this.appendChild(this._thumbTo);
    this.appendChild(this._progress);
  }

  static get observedAttributes() {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-on-tooltip', 'data-on-range', 'data-on-vertical'];
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
      case 'data-on-tooltip':
        this._thumbFrom.setAttribute('data-on-tooltip', <string>this.dataset.onTooltip);
        this._thumbTo.setAttribute('data-on-tooltip', <string>this.dataset.onTooltip);
        break;
      case 'data-on-range':
        this._progress.setAttribute('data-on-range', <string>this.dataset.onRange);
        (this.dataset.onRange === 'false') ? $(this._thumbTo).hide() : $(this._thumbTo).show();
        break;
      case 'data-on-vertical':
        this._thumbFrom.setAttribute('data-on-vertical', <string>this.dataset.onVertical);
        this._progress.setAttribute('data-on-vertical', <string>this.dataset.onVertical);
        this._thumbTo.setAttribute('data-on-vertical', <string>this.dataset.onVertical);
        (this.dataset.onVertical === 'true') ? $(this).addClass(styles.locals.rail_ver) : $(this).removeClass(styles.locals.rail_ver);
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
    }
  }

  private calcThumbPosition(thumb: string): number {
    let min = Number(this.dataset.minValue);
    let max = Number(this.dataset.maxValue);
    let target: number = 0;
    (thumb === 'from') ? target = Number(this.dataset.valueFrom) : target = Number(this.dataset.valueTo);
    return ((target - min) / ((max - min) / 100));
  }
}

class Progress extends HTMLElement {
  private _leftOrTop: 'left' | 'top' = 'left';
  private _rightOrBottom: 'right' | 'bottom' = 'right';

  constructor() {
    super();
    this.className = styles.locals.progress;
  }

  static get observedAttributes() {
    return ['data-position-from', 'data-position-to', 'data-on-range', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-position-from':
        this.setPosFrom();
        break;
      case 'data-position-to':
        this.setPosTo();
        break;
      case 'data-on-range':
        this.setPosTo();
        break;
      case 'data-on-vertical':
        (this.dataset.onVertical === 'true') ? $(this).addClass(styles.locals.progress_ver) : $(this).removeClass(styles.locals.progress_ver)
        this.setDirection();
        this.setPosFrom();
        this.setPosTo();
    }
  }

  private setPosFrom() {
    $(this).css(`${this._leftOrTop}`, `${this.dataset.positionFrom}%`);
  }

  private setPosTo() {
    if (this.dataset.onRange === 'true') {
      $(this).css(`${this._rightOrBottom}`, `${100 - (Number(this.dataset.positionTo))}%`);
    } else {
      $(this).css(`${this._rightOrBottom}`, '0');
    }
  }

  private setDirection() {
    if (this.dataset.onVertical === 'true') {
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
  private _position: number = 0;
  private _clientXorY: 'clientX' | 'clientY' = 'clientX';
  private _offsetXorY: number = 0;
  private _widthOrHeight: number = 0;
  private _direction: 'left' | 'top' = 'left';
  private readonly _name: 'valueFrom' | 'valueTo';
  private readonly _tooltip: HTMLElement = document.createElement('div');
  private readonly _mouseMove: (evt: MouseEventInit) => void = this.onMouseMove.bind(this);
  private readonly _mouseUp: (evt: MouseEvent) => void = this.onMouseUp.bind(this);

  constructor(name: 'valueFrom' | 'valueTo') {
    super();
    this._name = name;
    this.className = styles.locals.thumb;
    this._tooltip.className = styles.locals.thumb__tooltip;
    this.appendChild(this._tooltip);
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  static get observedAttributes() {
    return ['data-value', 'data-position', 'data-on-vertical', 'data-on-tooltip'];
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
      case 'data-on-vertical':
        if (this.dataset.onVertical === 'true') {
          $(this).addClass(styles.locals.thumb_ver);
          $(this._tooltip).addClass(styles.locals.thumb__tooltip_ver);
        } else {
          $(this).removeClass(styles.locals.thumb_ver);
          $(this._tooltip).removeClass(styles.locals.thumb__tooltip_ver);
        }
        this.setPosition();
        this.moveToPosition(this._position);
        break;
      case 'data-on-tooltip':
        (this.dataset.onTooltip === 'false') ? $(this._tooltip).hide() : $(this._tooltip).show();
    }
  }

  private moveToPosition(position: number): void {
    $(this).css(`${this._direction}`, `${position}%`);
  }

  private setPosition(): void {
    if (this.parentElement) {
      const rect = this.parentElement.getBoundingClientRect();
      if (this.dataset.onVertical === 'true') {
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
    this._position = (<number>evt[this._clientXorY] - this._offsetXorY) / (this._widthOrHeight / 100);
    if (this._position < 0) this._position = 0;
    if (this._position > 100) this._position = 100;
    this.dispatchEvent(new CustomEvent('slider-view', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {name: this._name, value: this._position}
    }));
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this._mouseMove);
    document.removeEventListener('mouseup', this._mouseUp);
  }
}

class Scale extends HTMLElement {
  private _scaleValueItems: HTMLSpanElement[] = [];
  private _name: 'valueFrom' | 'valueTo' = 'valueTo';

  constructor() {
    super();
    this.className = styles.locals.scale;
    for (let i = 0; i < 4; i++) {
      this._scaleValueItems[i] = document.createElement('span');
      this._scaleValueItems[i].className = styles.locals.scale__valuesItem;
    }
    const scaleValues: HTMLElement = document.createElement('div');
    scaleValues.className = styles.locals.scale__values;
    for (let span of this._scaleValueItems) {
      scaleValues.appendChild(span);
    }
    this.innerHTML = `      
      <div class="${styles.locals.scale__wrapper}">
        <div class="${styles.locals.scale__division}">
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
        </div>
        <div class="${styles.locals.scale__division}">
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
        </div>
        <div class="${styles.locals.scale__division}">
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
          <span class="${styles.locals.scale__subdivision}"></span>
        </div>
      </div>`;
    this.appendChild(scaleValues);
    this.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  static get observedAttributes() {
    return ['data-min-value', 'data-max-value', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-min-value':
        this.render();
        break;
      case 'data-max-value':
        this.render();
        break;
      case 'data-on-vertical':
        if (this.dataset.onVertical === 'true') {
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
    }
  }

  private render(): void {
    const min = Number(this.dataset.minValue);
    const max = Number(this.dataset.maxValue);
    const scaleValue = (max - min) / 3;
    this._scaleValueItems[0].textContent = min.toFixed();
    this._scaleValueItems[1].textContent = (min + scaleValue).toFixed();
    this._scaleValueItems[2].textContent = (min + scaleValue + scaleValue).toFixed();
    this._scaleValueItems[3].textContent = max.toFixed();
  }

  private handleMouseDown(evt: MouseEventInit): void {
    const rect = this.getBoundingClientRect();
    let position: number = 0;
    if (evt.clientX && evt.clientY) {
      if (this.dataset.onVertical === 'true') {
        position = (evt.clientY - rect.top) / (rect.height / 100);
      } else {
        position = (evt.clientX - rect.left) / (rect.width / 100);
      }
    }
    if (this.dataset.onRange === 'true') {
      (this._name === 'valueFrom') ? this._name = 'valueTo' : this._name = 'valueFrom';
    } else {
      this._name = 'valueFrom';
    }
    this.dispatchEvent(new CustomEvent('slider-view', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {name: this._name, value: position}
    }));
  }
}

if (!customElements.get('input-slider')) {
  customElements.define('input-slider', SliderView);
  customElements.define('input-slider-view-thumb', Thumb);
  customElements.define('input-slider-view-rail', Rail);
  customElements.define('input-slider-view-scale', Scale);
  customElements.define('input-slider-view-progress', Progress);
}


export {SliderView}