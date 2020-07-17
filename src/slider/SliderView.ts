class SliderView extends HTMLElement {
  constructor() {
    super();
  }

  private render():void {
    this.attachShadow({mode: 'closed'})
      .innerHTML = `
        <style>${require('./slider.css')}</style>
        <div class="rail">
          <div class="thumb"></div>
        </div>`;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['min', 'max', 'step', 'value', 'pos', 'range', 'tooltip'];
  }

  attributeChangedCallback() {
    console.log('Set attribute');
  }
}

customElements.define("slider-element", SliderView);

export { SliderView };