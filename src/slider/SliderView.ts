import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';


class SliderView extends HTMLElement {
  rail: HTMLElement = document.createElement('slider-element-rail');
  thumb: HTMLElement = document.createElement('slider-element-thumb');

  constructor() {
    super();
  }


  private render() {
    this.rail.appendChild(this.thumb);
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.rail);
    }
    console.log(this.shadowRoot);
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = `<style>${require('./slider.css')}</style>`;
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['min', 'max', 'step', 'value', 'pos', 'range', 'tooltip'];
  }

  attributeChangedCallback() {
    console.log('Set attribute');
  }
}

class Rail extends HTMLElement {
  constructor() {
    super();
    //console.log('constructor rail');
  }

  connectedCallback() {
    this.setAttribute('class', 'rail');
    //console.log('connection rail');
  }

  adoptedCallback() {
    console.log('adopted rail');
  }
}

class Thumb extends HTMLElement {
  private posXorY: boolean;
  private posWidthOrHeight: number = 0;
  private pos: number = 0;
  private mousemove: (evt: MouseEventInit) => void = () => {
  };
  private mouseup: (evt: MouseEvent) => void = () => {
  };

  constructor(pos: boolean) {
    super();
    this.posXorY = pos;
    this.onmousedown = this.onMouseDown
  }

  connectedCallback(): void {
    this.setAttribute('class', 'thumb');
    //console.log('connection thumb');
  }

  adoptedCallback(): void {
    //console.log('adopted thumb');
  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    let paddingRight = this.parentElement ? window.getComputedStyle(this.parentElement).getPropertyValue('padding-right').slice(0, -2): 0;
    this.posWidthOrHeight = this.parentElement ? (this.parentElement.clientWidth - Number(paddingRight)) / 100 : 0;
    this.pos = this.offsetLeft + (evt.clientX - this.offsetLeft) - Number(this.style.left.slice(0, -1)) * this.posWidthOrHeight;
    this.mousemove = this.onMouseMove.bind(this);
    this.mouseup = this.onMouseUp.bind(this);
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
  }

  private onMouseMove(evt: MouseEventInit): void {
    if (evt.clientX) {
      let indent: number = (evt.clientX - this.pos) / this.posWidthOrHeight;
      if(indent < 0) {
        indent = 0;
      }
      if(indent > 100) {
        indent = 100;
      }
      this.style.left = `${indent}%`;
    }
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);
  }

}

customElements.define("slider-element", SliderView);
customElements.define('slider-element-rail', Rail);
customElements.define('slider-element-thumb', Thumb);


export {SliderView};