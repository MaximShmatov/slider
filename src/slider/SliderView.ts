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
    return ['data-min-value', 'data-max-value', 'data-step-size', 'data-value-from', 'data-value-to', 'data-on-vertical', 'data-on-range', 'data-on-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value-from':
        this.rail.dataset.valueFrom = this.dataset.valueFrom;
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
    this.className = 'rail';
    this.thumb.className = 'thumb';
    this.progress.className = 'progress';
  }

  connectedCallback() {
    this.calculatePositionToPercent();
    this.thumb.dataset.positionToPercent = this.calculatePositionToPercent();
    this.thumb.dataset.onVertical = this.dataset.onVertical;
    this.thumb.dataset.value = this.dataset.valueFrom;
    this.thumb.dataset.onTooltip = this.dataset.onTooltip;
    this.appendChild(this.thumb);
    this.appendChild(this.progress);
  }

  static get observedAttributes(): string[] {
    return ['min-value', 'max-value', 'step-value', 'data-value-from', 'value-to', 'on-vertical', 'on-range', 'on-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value-from':
        this.thumb.dataset.value = this.dataset.valueFrom;
        console.log(this.dataset.valueFrom);
    }
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
  private currentOffsetToPercent: number = 0;
  private parentOffset: number = 1

  constructor() {
    super();
    this.className = 'thumb';
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    this.tooltip.textContent = String(this.dataset.value);
    this.mousemove = this.onMouseMove.bind(this);
    this.mouseup = this.onMouseUp.bind(this);
    this.onmousedown = this.onMouseDown;
  }

  connectedCallback() {
    this.toggleTooltip();
    this.appendChild(this.tooltip);
    this.calculatePositions();
    this.currentOffsetToPercent = Number(this.dataset.positionToPercent) + this.startOffsetToPercent;
    this.moveToPosition();
  }

  static get observedAttributes(): string[] {
    return ['data-value', 'position-to-percent', 'data-on-tooltip', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value':
        this.tooltip.textContent = String(this.dataset.value);
        break;
      case 'data-position-to-percent':
        this.currentOffsetToPercent = Number(this.dataset.positionToPercent) + this.startOffsetToPercent;
        this.moveToPosition();
        break;
      case 'data-on-tooltip':
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
    }
    this.startOffsetToPercent = 0 - this.offsetWidth / 2 / this.pxInPercent;
    this.endOffsetToPercent = 100 + this.startOffsetToPercent;
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