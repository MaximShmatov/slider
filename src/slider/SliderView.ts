import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';


class SliderView extends HTMLElement implements ISliderView {
  private rail: HTMLElement;
  private scale: HTMLElement;

  constructor() {
    super();
    this.rail = new Rail();
    this.scale = new Scale();
    this.attachShadow({mode: 'open'}).innerHTML = `<style>${require('./SliderPlugin.css')}</style>`;
    if (this.shadowRoot) {
      this.shadowRoot.addEventListener('click', this.setPosition);
    }
  }

  private setPosition(evt: Event) {
    console.log(evt.target);
  }

  connectedCallback() {
    Object.assign(this.rail.dataset, this.dataset);
    this.scale.dataset.minValue = this.dataset.minValue;
    this.scale.dataset.maxValue = this.dataset.maxValue;
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
    }
    console.log('connected callback view');
  }

  static get observedAttributes(): string[] {
    return ['min-value', 'max-value', 'step-size', 'value-from', 'value-to', 'on-vertical', 'on-range', 'on-tooltip'];
  }

  attributeChangedCallback() {

  }
}

class Rail extends HTMLElement {
  private thumb: HTMLElement;
  private progress: HTMLElement;

  constructor() {
    super();
    this.thumb = new Thumb();
    this.progress = document.createElement('div');
    this.className = 'rail';
    this.thumb.className = 'thumb';
    this.progress.className = 'progress';
  }

  connectedCallback() {
    this.calculatePositionToPercent();
    this.thumb.dataset.positionToPercent = this.calculatePositionToPercent();
    this.thumb.dataset.onVertical = this.dataset.onVertical;
    this.appendChild(this.thumb);
    this.appendChild(this.progress);
  }

  static get observedAttributes(): string[] {
    return ['min-value', 'max-value', 'step-value', 'value-from', 'value-to', 'on-vertical', 'on-range', 'on-tooltip'];
  }

  attributeChangedCallback() {

  }

  private calculatePositionToPercent() {
    let valueInPercent = (Number(this.dataset.maxValue) - Number(this.dataset.minValue)) / 100;
    return (Number(this.dataset.valueFrom) / valueInPercent).toString();
  }
}

class Thumb extends HTMLElement {
  private tooltip: HTMLElement;
  private mousemove: (evt: MouseEventInit) => void;
  private mouseup: (evt: MouseEvent) => void;
  private pxInPercent: number = 1;
  private startOffsetToPercent: number = 1;
  private endOffsetToPercent: number = 1;
  private parentOffset: number = 1

  constructor() {
    super();
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    this.className = 'thumb';
    this.mousemove = this.onMouseMove.bind(this);
    this.mouseup = this.onMouseUp.bind(this);
    this.onmousedown = this.onMouseDown;
  }

  connectedCallback() {
    this.appendChild(this.tooltip);
    this.calculatePositions();
    this.moveToPosition(Number(this.dataset.positionToPercent) + this.startOffsetToPercent);
  }

  static get observedAttributes(): string[] {
    return ['on-vertical', 'position-to-percent'];
  }

  attributeChangedCallback() {

  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    this.calculatePositions();
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
  }

  private onMouseMove(evt: MouseEventInit): void {
    if (evt.clientX) {
      let offsetPosition: number = (evt.clientX - this.parentOffset) / this.pxInPercent;
      this.moveToPosition(offsetPosition);
    }
  }

  private calculatePositions(): void {
    console.log(this.parentOffset);
    if (this.parentElement) {
      this.pxInPercent = this.parentElement.offsetWidth / 100;
      this.parentOffset = this.parentElement.offsetLeft + this.offsetWidth / 2;
    }
    this.startOffsetToPercent = 0 - this.offsetWidth / 2 / this.pxInPercent;
    this.endOffsetToPercent = 100 + this.startOffsetToPercent;
  }

  private moveToPosition(offset: number){
    if (offset < this.startOffsetToPercent) {
      offset = this.startOffsetToPercent;
    }
    if (offset > this.endOffsetToPercent) {
      offset = this.endOffsetToPercent;
    }
    this.style.marginLeft = `${offset}%`;
    this.dispatchEvent(new CustomEvent('slider-pos', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        valueFrom: offset - this.startOffsetToPercent
      }
    }));
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
    return ['min-value', 'max-value'];
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