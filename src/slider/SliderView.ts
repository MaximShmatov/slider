import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';


class SliderView extends HTMLElement implements ISliderView {
  private rail: HTMLElement = document.createElement('slider-view-rail');
  private thumb: HTMLElement = document.createElement('slider-view-thumb');
  private scale: Scale = new Scale();

  constructor() {
    super();
    //console.log(model);
  }


  private render() {
    console.log($);
    this.rail.appendChild(this.thumb);
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale.scale);
    }
  }

  connectedCallback() {
    this.scale.render(Number(this.dataset.min), Number(this.dataset.max));
    this.attachShadow({mode: 'open'}).innerHTML = `<style>${require('./slider.css')}</style>`;
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['min', 'max', 'step', 'start-value', 'end-value', 'pos', 'range', 'tooltip'];
  }

  attributeChangedCallback() {

  }
}

class Rail extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('class', 'rail');
    this.appendChild(document.createElement('div'));
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

class Scale {
  scale: HTMLElement = document.createElement('div');
  private spansTags: [HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement, HTMLSpanElement] = [
    document.createElement('span'),
    document.createElement('span'),
    document.createElement('span'),
    document.createElement('span'),
    document.createElement('span')
  ];

  constructor() {
    let div = document.createElement('div');
    for (let span of this.spansTags) {
      div.appendChild(span);
    }
    this.scale.appendChild(div);
    this.scale.className = 'scale';
    this.scale.addEventListener('click', (evt) => {
      console.log(evt);
    })
  }

  render(min: number, max: number) {
    let valuesScale = Math.round((max - min) / 4);
    this.spansTags[0].textContent = min.toString();
    this.spansTags[1].textContent = Math.round(valuesScale).toString();
    this.spansTags[2].textContent = Math.round(valuesScale * 2).toString();
    this.spansTags[3].textContent = Math.round(valuesScale * 3).toString();
    this.spansTags[4].textContent = Math.round(max).toString();
  }
}

customElements.define('slider-view', SliderView);
customElements.define('slider-view-rail', Rail);
customElements.define('slider-view-thumb', Thumb);


export {SliderView};