import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import {ISliderModel} from "./ISliderModel";


class SliderView extends HTMLElement {
  rail: HTMLElement = document.createElement('slider-element-rail');
  thumb: HTMLElement = document.createElement('slider-element-thumb');
  scale: HTMLElement = document.createElement('slider-element-scale');

  //attributes: ISliderModel;

  constructor() {
    super();
  }


  private render() {
    this.rail.appendChild(this.thumb);
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
    }

    console.log(this.shadowRoot);
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = `<style>${require('./slider.css')}</style>`;
    this.scale.setAttribute('max', <string>this.getAttribute('max'));
    this.scale.setAttribute('min', <string>this.getAttribute('min'));
    console.log(this.getAttribute('max'));
    console.log(this.getAttribute('min'));
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['min', 'max', 'step', 'start-value', 'end-value', 'pos', 'range', 'tooltip'];
  }

  attributeChangedCallback() {
    //console.log('Set attribute');
  }
}

class Rail extends HTMLElement {
  constructor() {
    super();
    //console.log('constructor rail');
  }

  connectedCallback() {
    this.setAttribute('class', 'rail');
    this.appendChild(document.createElement('div'));

    //console.log('connection rail');
  }

  adoptedCallback() {
    console.log('adopted rail');
  }
}

class Thumb extends HTMLElement {
  private isVertical: boolean;
  private length: number = 0;
  private pos: number = 0;
  private mousemove: (evt: MouseEventInit) => void = this.onMouseMove.bind(this);
  private mouseup: (evt: MouseEvent) => void = this.onMouseUp.bind(this);

  constructor(pos: boolean) {
    super();
    this.isVertical = pos;
    this.onmousedown = this.onMouseDown
  }

  connectedCallback(): void {
    this.setAttribute('class', 'thumb');

  }

  adoptedCallback(): void {
    //console.log('adopted thumb');
  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    this.length = this.parentElement ? this.parentElement.clientWidth / 100 : 0;
    this.pos = this.offsetLeft + (evt.clientX - this.offsetLeft) - Number(this.style.marginLeft.slice(0, -1)) * this.length;
    this.mousemove = this.onMouseMove.bind(this);
    this.mouseup = this.onMouseUp.bind(this);
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
    console.log(this.offsetWidth);
  }

  private onMouseMove(evt: MouseEventInit): void {
    if (evt.clientX) {
      let indent: number = (evt.clientX - this.pos) / this.length;
      if (indent < 0) {
        indent = 0;
      }
      if (indent > 100) {
        indent = 100;
      }
      this.style.marginLeft = `${indent}%`;
    }
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);
  }

}

class Scale extends HTMLElement {
  private spansTag: [HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement] = [
    document.createElement('span'),
    document.createElement('span'),
    document.createElement('span'),
    document.createElement('span'),
    document.createElement('span')
  ];

  constructor() {
    super();
  }

  render() {
    let min: number = Number(this.getAttribute('min'));
    let max: number = Number(this.getAttribute('max'));
    let valuesScale = Math.round((max - min) / 4);
    this.spansTag[0].textContent = min.toString();
    this.spansTag[1].textContent = Math.round(valuesScale).toString();
    this.spansTag[2].textContent = Math.round(valuesScale * 2).toString();
    this.spansTag[3].textContent = Math.round(valuesScale * 3).toString();
    this.spansTag[4].textContent = Math.round(max).toString();
    for (let i = 0; i < 5; i++) {
      this.appendChild(this.spansTag[i]);
    }
  }

  connectedCallback() {
    this.setAttribute('class', 'scale');
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['min', 'max'];
  }

  attributeChangedCallback(arg: string) {
    this.render();
  }
}

customElements.define("slider-element", SliderView);
customElements.define('slider-element-rail', Rail);
customElements.define('slider-element-thumb', Thumb);
customElements.define('slider-element-scale', Scale);


export {SliderView};