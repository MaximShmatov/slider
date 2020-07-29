import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';


class SliderView extends HTMLElement implements ISliderView {
  private rail: HTMLElement;
  private scale: HTMLElement;

  constructor() {
    super();
    this.rail = new Rail();
    this.scale = new Scale();
    this.attachShadow({mode: 'open'});
  }

  private setPosition(evt: Event) {
    //console.log(evt.target);
  }

  connectedCallback() {
    if (this.shadowRoot) {
      Object.assign(this.rail.dataset, this.dataset);
      Object.assign(this.scale.dataset, this.dataset);
      this.shadowRoot.innerHTML = `<style>${require('./SliderPlugin.css')}</style>`;
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
      this.shadowRoot.addEventListener('click', this.setPosition);
    }
  }

  static get observedAttributes(): string[] {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-on-vertical', 'data-on-range', 'data-on-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value-from':
        break;
      case 'data-value-to':
        break;
      case 'data-min-value':
        break;
      case 'data-max-value':
        break;
      case 'data-on-vertical':
        break;
      case 'data-on-range':
        break;
      case 'data-on-tooltip':
    }
  }
}

class Rail extends HTMLElement {
  private thumb: HTMLElement;
  private progress: HTMLElement;

  constructor() {
    super();
    this.thumb = new Thumb();
    this.progress = document.createElement('div');
  }

  connectedCallback() {
    Object.assign(this.thumb.dataset, this.dataset);
    this.className = 'rail';
    this.progress.className = 'progress';
    this.setThumbPosition(Number(this.dataset.valueFrom));
    this.appendChild(this.thumb);
    this.appendChild(this.progress);
  }

  static get observedAttributes(): string[] {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-on-vertical', 'data-on-range', 'data-on-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value-from':
        //this.thumb.dataset.currentValue = this.dataset.valueFrom;
        break;
      case 'data-value-to':
        break;
      case 'data-min-value':
        break;
      case 'data-max-value':
        break;
      case 'data-on-vertical':
        //this.thumb.dataset.onVertical = this.dataset.onVertical;
        break;
      case 'data-on-range':
        break;
      case 'data-on-tooltip':
        //this.thumb.dataset.onTooltip = this.dataset.onTooltip;
    }
  }

  private setThumbPosition(currentValue: number): void {
    //console.log(this.dataset.valueFrom);
    this.thumb.dataset.thumbPosition = String(currentValue / ((Number(this.dataset.maxValue) - Number(this.dataset.minValue)) / 100));
  }
}

class Thumb extends HTMLElement {
  private tooltip: HTMLElement;
  private mousemove: (evt: MouseEventInit) => void;
  private mouseup: (evt: MouseEvent) => void;
  private pxInPercent: number = 0;
  private startOffsetToPercent: number = 0;
  private endOffsetToPercent: number = 0;
  private currentOffsetToPercent: number = 0;
  private parentOffset: number = 0;

  constructor() {
    super();
    this.tooltip = document.createElement('div');
    this.mousemove = this.onMouseMove.bind(this);
    this.mouseup = this.onMouseUp.bind(this);
    this.onmousedown = this.onMouseDown;
  }

  connectedCallback() {
    this.className = 'thumb';
    this.tooltip.className = 'tooltip';
    this.appendChild(this.tooltip);
    this.calculatePositions();
    this.moveToPosition();
  }

  static get observedAttributes(): string[] {
    return ['data-current-value', 'data-thumb-position', 'data-on-tooltip', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-current-value':
        this.tooltip.textContent = String(this.dataset.currentValue);
        break;
      case 'data-thumb-position':
        break;
      case 'data-on-tooltip':
        this.toggleTooltip();
        break;
      case 'data-on-vertical':
    }
  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    this.calculatePositions();
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
  }

  private onMouseMove(evt: MouseEventInit): void {
    if (evt.clientX) {
      this.currentOffsetToPercent = (evt.clientX - this.parentOffset) / this.pxInPercent;
      this.moveToPosition();
    }
  }

  private calculatePositions(): void {
    if (this.parentElement) {
      this.pxInPercent = this.parentElement.offsetWidth / 100;
      this.parentOffset = this.parentElement.offsetLeft + this.offsetWidth / 2;
      this.startOffsetToPercent = 0 - this.offsetWidth / 2 / this.pxInPercent;
      this.endOffsetToPercent = 100 + this.startOffsetToPercent;
      this.currentOffsetToPercent = Number(this.dataset.thumbPosition) + this.startOffsetToPercent;
      //console.log(this.currentOffsetToPercent)
    }
  }

  private moveToPosition(): void{
    if (this.currentOffsetToPercent < this.startOffsetToPercent) {
      this.currentOffsetToPercent = this.startOffsetToPercent;
    }
    if (this.currentOffsetToPercent > this.endOffsetToPercent) {
      this.currentOffsetToPercent = this.endOffsetToPercent;
    }
    this.style.marginLeft = `${this.currentOffsetToPercent}%`;

    this.dispatchEvent(new CustomEvent('slider-pos', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        valueFrom: this.currentOffsetToPercent - this.startOffsetToPercent
      }
    }));
  }

  private toggleTooltip() {
    if(this.dataset.onTooltip === 'true') {
      this.tooltip.style.display = 'flex';
    } else {
      this.tooltip.style.display = 'none';
    }
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);
  }
}

class Scale extends HTMLElement {
  private scaleValue: HTMLSpanElement[] = [];
  private container: HTMLDivElement;

  constructor() {
    super();
    this.className = 'scale';
    for (let i = 0; i < 5; i++) {
      this.scaleValue[i] = document.createElement('span');
    }
    this.container = document.createElement('div');
    for (let span of this.scaleValue) {
      this.container.appendChild(span);
    }
  }

  connectedCallback(): void {
    this.appendChild(this.container);
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['data-min-value', 'data-max-value'];
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    let min = Number(this.dataset.minValue);
    let max = Number(this.dataset.maxValue);
    let scaleValue = Math.round((max - min) / 4);
    this.scaleValue[0].textContent = min.toString();
    this.scaleValue[1].textContent = Math.round(scaleValue).toString();
    this.scaleValue[2].textContent = Math.round(scaleValue * 2).toString();
    this.scaleValue[3].textContent = Math.round(scaleValue * 3).toString();
    this.scaleValue[4].textContent = Math.round(max).toString();
  }
}

customElements.define('input-slider-view', SliderView);
customElements.define('input-slider-view-thumb', Thumb);
customElements.define('input-slider-view-rail', Rail);
customElements.define('input-slider-view-scale', Scale);

export {SliderView};