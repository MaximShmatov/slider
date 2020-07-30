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

  connectedCallback() {
    if (this.shadowRoot) {
      Object.assign(this.rail.dataset, this.dataset);
      Object.assign(this.scale.dataset, this.dataset);
      this.shadowRoot.innerHTML = `<style>${require('./SliderPlugin.css')}</style>`;
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
      this.shadowRoot.addEventListener('click', this.setThumbPosition.bind(this));
    }
  }

  static get observedAttributes(): string[] {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-on-vertical', 'data-on-range', 'data-on-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value-from':
        this.rail.dataset.valueFrom = this.dataset.valueFrom;
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

  private setThumbPosition(evt: Event) {
    console.log(evt.target);
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
    this.appendChild(this.thumb);
    this.appendChild(this.progress);
    this.setThumbPosition(Number(this.dataset.valueFrom));
  }

  static get observedAttributes(): string[] {
    return ['data-min-value', 'data-max-value', 'data-value-from', 'data-value-to', 'data-on-vertical', 'data-on-range', 'data-on-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value-from':
        this.thumb.dataset.tooltipValue = this.dataset.valueFrom;
        console.log(this.dataset.valueFrom)
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
    this.thumb.dataset.thumbPosition = String(currentValue / ((Number(this.dataset.maxValue) - Number(this.dataset.minValue)) / 100));
  }
}

class Thumb extends HTMLElement {
  private readonly tooltip: HTMLElement;
  private readonly mousemove: (evt: MouseEventInit) => void;
  private readonly mouseup: (evt: MouseEvent) => void;
  private currentOffsetToPercent: number = 0;

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
    this.appendChild(document.createElement('div'));
    this.appendChild(this.tooltip);
  }

  static get observedAttributes() {
    return ['data-tooltip-value', 'data-thumb-position', 'data-on-tooltip', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-tooltip-value':
        this.tooltip.textContent = String(this.dataset.tooltipValue);
        break;
      case 'data-thumb-position':
        this.currentOffsetToPercent = Number(this.dataset.thumbPosition);
        this.moveToPosition();
        break;
      case 'data-on-tooltip':
        this.toggleTooltip();
        break;
      case 'data-on-vertical':
    }
  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
  }

  private onMouseMove(evt: MouseEventInit): void {
    if (evt.clientX && this.parentElement) {
      this.currentOffsetToPercent = (evt.clientX - this.parentElement.offsetLeft) / (this.parentElement.offsetWidth / 100);
      this.moveToPosition();
    }
  }

  private moveToPosition(): void {
    if (this.currentOffsetToPercent < 0) {
      this.currentOffsetToPercent = 0;
    }
    if (this.currentOffsetToPercent > 100) {
      this.currentOffsetToPercent = 100;
    }
    this.style.marginLeft = `${this.currentOffsetToPercent}%`;

    this.dispatchEvent(new CustomEvent('slider-pos', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        valueFrom: this.currentOffsetToPercent
      }
    }));
  }

  private toggleTooltip(): void {
    if (this.dataset.onTooltip === 'true') {
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
  private scaleValueItems: HTMLSpanElement[] = [];
  private readonly scaleValues: HTMLDivElement;

  constructor() {
    super();
    this.className = 'scale';
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

    for (let i = 0; i < 4; i++) {
      this.scaleValueItems[i] = document.createElement('span');
      this.scaleValueItems[i].className = 'scale__values-item';
    }
    this.scaleValues = document.createElement('div');
    this.scaleValues.className = 'scale__values'
    for (let span of this.scaleValueItems) {
      this.scaleValues.appendChild(span);
    }
  }

  connectedCallback(): void {
    this.appendChild(this.scaleValues);
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['data-min-value', 'data-max-value', 'data-step-size'];
  }

  attributeChangedCallback(): void {
    this.render();
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
}

customElements.define('input-slider-view', SliderView);
customElements.define('input-slider-view-thumb', Thumb);
customElements.define('input-slider-view-rail', Rail);
customElements.define('input-slider-view-scale', Scale);

export {SliderView};