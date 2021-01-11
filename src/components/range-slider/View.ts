import '../../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import ViewRail from './ViewRail';
import ViewScale from './ViewScale';
import styles from './styles.module.sass';

class View extends HTMLElement {

  readonly id: string;

  private readonly callback: TViewCallback;

  private readonly rail: HTMLElement;

  private readonly scale: HTMLElement;

  private readonly slider: HTMLElement;

  private readonly styles: HTMLElement;

  constructor(func: TViewCallback = () => {}) {
    super();
    this.id = String(Math.random());
    this.callback = func;
    this.rail = new ViewRail(func);
    this.scale = new ViewScale(func);
    this.styles = document.createElement('style');
    this.styles.innerHTML = styles;
    this.slider = document.createElement('div');
    this.slider.className = 'slider';
    this.slider.appendChild(this.rail);
    this.slider.appendChild(this.scale);
    this.attachShadow({mode: 'open'});
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.styles);
      this.shadowRoot.appendChild(this.slider);
    }
  }

  static get observedAttributes() {
    return [
      'data-min-value',
      'data-max-value',
      'data-value-from',
      'data-value-to',
      'data-is-range',
      'data-is-scale',
      'data-is-tooltip',
      'data-is-vertical',
      'data-move-from',
      'data-move-to',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'data-is-scale':
        this.scale.style.display = (newValue === 'true') ? '' : 'none';
        break;
      case 'data-min-value':
      case 'data-max-value':
        this.scale.setAttribute(name, newValue);
        break;
      case 'data-move-from':
      case 'data-move-to':
        this.scale.setAttribute(name, newValue);
      case 'data-value-from':
      case 'data-value-to':
      case 'data-is-tooltip':
        this.rail.setAttribute(name, newValue);
        break;
      case 'data-is-vertical':
        if (newValue === 'true') this.slider.classList.add('slider_vertical');
        else this.slider.classList.remove('slider_vertical');
      case 'data-is-range':
        this.rail.setAttribute(name, newValue);
        this.scale.setAttribute(name, newValue);
    }
  }
}

if (!customElements.get('range-slider')) {
  customElements.define('range-slider', View);
}

export default View;
