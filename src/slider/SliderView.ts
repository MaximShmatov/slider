import {SliderPresenter} from './SliderPresenter';

class SliderView extends HTMLElement implements ISliderView {
  readonly slider: SliderPresenter = new SliderPresenter(this);
  private readonly rail: Rail = new Rail();
  private readonly scale: Scale = new Scale();

  constructor() {
    super();
    this.className = 'input-slider-view';
    this.attachShadow({mode: 'open'});
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>${require('./slider-horizontal.css')}</style>
        <style>${require('./slider-vertical.css')}</style>`;
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
    }
  }

  setModelData(method: TMethodsUnion, value: number | boolean): void {
    //console.log(method, value)
    switch (method) {
      case 'minValue':
        this.scale.dataset[method] = value.toString();
        break;
      case 'maxValue':
        this.scale.dataset[method] = value.toString();
        break;
      case 'stepSize':
        break;
      case 'valueFrom':
        break;
      case 'valueTo':
        break;
      case 'onScale':
        (value) ? $(this.scale).show() : $(this.scale).hide();
        break;
      case 'onTooltip':
        break;
      case 'onRange':
        break;
      case 'onVertical':
        if (value && this.shadowRoot) {
          this.shadowRoot.styleSheets[0].disabled = true;
          this.shadowRoot.styleSheets[1].disabled = false;
        }
        if (!value && this.shadowRoot) {
          this.shadowRoot.styleSheets[1].disabled = true;
          this.shadowRoot.styleSheets[0].disabled = false;
        }
        this.scale.dataset[method] = value.toString();
    }
    this.rail.dataset[method] = value.toString();
  }
}

class Rail extends HTMLElement {
  private thumbFrom: Thumb = new Thumb('valueFrom');
  private thumbTo: Thumb = new Thumb('valueTo');
  private progress = new Progress();

  constructor() {
    super();
    $(this)
      .addClass('rail')
      .append(this.thumbFrom)
      .append(this.thumbTo)
      .append(this.progress);
  }

  static get observedAttributes() {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-on-tooltip', 'data-on-range', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-min-value':
      case 'data-max-value':
        this.thumbFrom.dataset.position = this.progress.dataset.positionFrom = this.calcThumbPosition('from').toString();
        this.thumbTo.dataset.position = this.progress.dataset.positionTo = this.calcThumbPosition('to').toString();
        break;
      case 'data-on-tooltip':
        this.thumbTo.dataset.onTooltip = this.thumbFrom.dataset.onTooltip = this.dataset.onTooltip;
        break;
      case 'data-on-range':
        this.progress.dataset.onRange = this.dataset.onRange;
        (this.dataset.onRange === 'false') ? $(this.thumbTo).hide() : $(this.thumbTo).show();
        break;
      case 'data-on-vertical':
        this.progress.dataset.onVertical = this.thumbTo.dataset.onVertical = this.thumbFrom.dataset.onVertical = this.dataset.onVertical;
        break;
      case 'data-value-from':
        this.thumbFrom.dataset.position = this.progress.dataset.positionFrom = this.calcThumbPosition('from').toString();
        this.thumbFrom.dataset.value = Number(this.dataset.valueFrom).toFixed();
        break;
      case 'data-value-to':
        this.thumbTo.dataset.position = this.progress.dataset.positionTo = this.calcThumbPosition('to').toString();
        this.thumbTo.dataset.value = Number(this.dataset.valueTo).toFixed();
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
    $(this).addClass('progress');
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
  private position: number = 0;
  private clientXorY: 'clientX' | 'clientY' = 'clientX';
  private offsetXorY: number = 0;
  private widthOrHeight: number = 0;
  private direction: 'left' | 'top' = 'left';
  private readonly name: 'valueFrom' | 'valueTo';
  private readonly tooltip: HTMLElement = document.createElement('div');
  private readonly point: HTMLElement = document.createElement('div');
  private readonly mouseMove: (evt: MouseEventInit) => void = this.onMouseMove.bind(this);
  private readonly mouseUp: (evt: MouseEvent) => void = this.onMouseUp.bind(this);

  constructor(name: 'valueFrom' | 'valueTo') {
    super();
    this.name = name;
    this.className = 'thumb';
    this.tooltip.className = 'thumb__tooltip';
    this.point.className = 'thumb__point';
    this.appendChild(this.tooltip);
    this.appendChild(this.point);
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  static get observedAttributes() {
    return ['data-value', 'data-position', 'data-on-vertical', 'data-on-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value':
        this.tooltip.textContent = <string>this.dataset.value;
        break;
      case 'data-position':
        this.position = Number(this.dataset.position);
        this.moveToPosition(this.position);
        break;
      case 'data-on-vertical':
        this.setPosition();
        this.moveToPosition(this.position);
        break;
      case 'data-on-tooltip':
        (this.dataset.onTooltip === 'false') ? $(this.tooltip).hide() : $(this.tooltip).show();
    }
  }

  private moveToPosition(position: number): void {
    console.log(this.style.left, this.style.right, this.style.top, this.style.bottom, '---')
    $(this).css(`${this.direction}`, `${position}%`);
    //console.log('position', position);
  }

  private setPosition(): void {
    if (this.parentElement) {
      const rect = this.parentElement.getBoundingClientRect();
      if (this.dataset.onVertical === 'true') {
        this.clientXorY = 'clientY';
        this.direction = 'top';
        this.offsetXorY = rect.top;
        this.widthOrHeight = rect.height;
        this.style.left = '0';
      } else {
        this.clientXorY = 'clientX';
        this.direction = 'left';
        this.offsetXorY = rect.left;
        this.widthOrHeight = rect.width;
        this.style.top = '0';
      }
    }
  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    this.setPosition();
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  private onMouseMove(evt: MouseEventInit): void {
    this.position = (<number>evt[this.clientXorY] - this.offsetXorY) / (this.widthOrHeight / 100);
    if (this.position < 0) this.position = 0;
    if (this.position > 100) this.position = 100;
    //this.moveToPosition(position);
    this.dispatchEvent(new CustomEvent('slider-view', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {name: this.name, value: this.position}
    }));
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

class Scale extends HTMLElement {
  private scaleValueItems: HTMLSpanElement[] = [];

  constructor() {
    super();
    this.className = 'scale';
    for (let i = 0; i < 4; i++) {
      this.scaleValueItems[i] = document.createElement('span');
      this.scaleValueItems[i].className = 'scale__values-item';
    }
    let scaleValues: HTMLElement = document.createElement('div');
    scaleValues.className = 'scale__values'
    for (let span of this.scaleValueItems) {
      scaleValues.appendChild(span);
    }
    this.innerHTML = `      
      <div class="scale__wrapper">
        <div class="scale__division">
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
        </div>
        <div class="scale__division">
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
        </div>
        <div class="scale__division">
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
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
    }
  }

  private render(): void {
    let min = Number(this.dataset.minValue);
    let max = Number(this.dataset.maxValue);
    let scaleValue = (max - min) / 3;
    this.scaleValueItems[0].textContent = min.toFixed();
    this.scaleValueItems[1].textContent = (min + scaleValue).toFixed();
    this.scaleValueItems[2].textContent = (min + scaleValue + scaleValue).toFixed();
    this.scaleValueItems[3].textContent = max.toFixed();
  }

  private handleMouseDown(evt: MouseEventInit) {
    let rect = this.getBoundingClientRect();
    let position: number = 0;
    let name: string = 'valueFrom';
    if (evt.clientX && evt.clientY) {
      if (this.dataset._onVertical === 'true') {
        name = 'valueTo';
        position = (rect.height - (evt.clientY - rect.y)) / (rect.height / 100);
      } else {
        position = (evt.clientX - rect.x) / (rect.width / 100);
      }
    }
    this.dispatchEvent(new CustomEvent('slider-view', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {name: name, value: position}
    }));
  }
}

export {SliderView}

customElements.define('input-slider-view', SliderView);
customElements.define('input-slider-view-thumb', Thumb);
customElements.define('input-slider-view-rail', Rail);
customElements.define('input-slider-view-scale', Scale);
customElements.define('input-slider-view-progress', Progress);
