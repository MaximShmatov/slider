//import '../../node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce';
import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
//import '../../node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-ce';
//window.WebComponents = {};
//window.WebComponents.root = 'node_modules/@webcomponents/webcomponentsjs/'

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
    //this.setAttribute('class', 'rail');
  }

  adoptedCallback() {
    //console.log('adopted rail');
  }
}

class Thumb extends HTMLElement {
  private posXorY: boolean;
  private pos: number = 0;
  private movement: number = 0;

  //private readonly thumb: Element;
  private mousemove: any;
  private mouseup: any;
  //private readonly onmouseup: any;

  constructor(pos: boolean) {
    super();
    //console.log('constructor thumb');
    this.posXorY = pos;
    this.onmousedown = this.onMouseDown
    //document.onmouseout = this.onMouseUp;
    //console.log(this.onmousemove);
    //this.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  connectedCallback() {
    this.setAttribute('class', 'thumb');
    //console.log('connection thumb');

    //this.setAttribute('class', 'rail');
  }

  adoptedCallback() {
    //console.log('adopted thumb');
  }

  private onMouseDown(evt: MouseEvent) {
    evt.preventDefault()
    this.pos = evt.screenX;
    this.mousemove = this.onMouseMove.bind(this);
    this.mouseup = this.onMouseUp.bind(this);
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
  }

  private onMouseMove(evt: MouseEventInit) {
    //console.log(evt);
    //console.log(this.pos);
    //this.style.left = '150px';
    if(evt.screenX) {
      this.movement = evt.screenX - this.pos;
    }
    console.log(this.movement);
    this.style.left = `${this.movement}px`;
    //this.draggable = true;
    //this.offsetLeft = evt.clientX;
    //let shiftX = evt.clientX - this.getBoundingClientRect().left;
    //this.scrollLeft = 10;
    //console.log(this.offsetLeft);
    //console.log(this.offsetWidth);
    //console.log(this.offsetHeight);
    //console.log(this.style.left.slice(0,-2));
  }

  private onMouseUp() {
    //this.onmousemove = null;
    //this.onmouseup = null;
    //console.log('remove listeners', this.onMouseUp);
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);
  }

}

customElements.define("slider-element", SliderView);
customElements.define('slider-element-rail', Rail);
customElements.define('slider-element-thumb', Thumb);



export {SliderView};