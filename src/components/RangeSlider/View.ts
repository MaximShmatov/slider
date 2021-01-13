import '../../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import ViewRail from './ViewRail';
import ViewScale from './ViewScale';
import styles from './styles.module.sass';

class View extends HTMLElement {
  readonly id: string;

  private readonly rail: HTMLElement;

  private readonly scale: HTMLElement;

  private readonly slider: HTMLElement;

  private readonly styles: HTMLElement;

  constructor() {
    super();
    this.id = String(Math.random());
    this.rail = new ViewRail(this.callback.bind(this));
    this.scale = new ViewScale(this.callback.bind(this));
    this.styles = document.createElement('style');
    this.styles.innerHTML = styles;
    this.slider = document.createElement('div');
    this.slider.className = 'slider';
    this.slider.appendChild(this.rail);
    this.slider.appendChild(this.scale);
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.styles);
      this.shadowRoot.appendChild(this.slider);
    }
  }

  static get observedAttributes(): string[] {
    return [
      'data-min-value',
      'data-max-value',
      'data-value-from',
      'data-value-to',
      'data-step-size',
      'data-is-range',
      'data-is-scale',
      'data-is-tooltip',
      'data-is-vertical',
      'data-move-from',
      'data-move-to',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
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
        this.rail.setAttribute(name, newValue);
        this.scale.setAttribute(name, newValue);
        break;
      case 'data-is-range':
        this.rail.setAttribute(name, newValue);
        this.scale.setAttribute(name, newValue);
        this.init('isRange');
        break;
      case 'data-value-from':
      case 'data-value-to':
      case 'data-is-tooltip':
        this.rail.setAttribute(name, newValue);
        break;
      case 'data-is-vertical':
        if (newValue === 'true') this.slider.classList.add('slider_vertical');
        else this.slider.classList.remove('slider_vertical');
        this.rail.setAttribute(name, newValue);
        this.scale.setAttribute(name, newValue);
    }
    this.dispatchEvent(new CustomEvent('range-slider', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { name, value: newValue },
    }));
  }

  init(name: TModelProps): void {
    const min = Number(this.dataset.minValue);
    const max = Number(this.dataset.maxValue);
    const from = Number(this.dataset.valueFrom);
    const to = Number(this.dataset.valueTo);
    if (Number.isNaN(min + max + from + to)) return;

    const calcPosition = (val: number) => Math.abs((min - val) / ((max - min) / 100));
    switch (name) {
      case 'valueFrom':
        this.setAttribute('data-move-from', calcPosition(from).toString());
        return;
      case 'valueTo':
        this.setAttribute('data-move-to', calcPosition(to).toString());
        return;
      case 'isRange':
        if (this.dataset.isRange === 'true') {
          this.setAttribute('data-move-to', calcPosition(to).toString());
        } else {
          this.setAttribute('data-move-to', '100');
        }
        this.setAttribute('data-move-from', calcPosition(from).toString());
        return;
    }
    this.setAttribute('data-move-from', calcPosition(from).toString());
    this.setAttribute('data-move-to', calcPosition(to).toString());
  }

  private callback(name: 'data-move-from' | 'data-move-to', value: number): void {
    this.setAttribute(name, String(value));
  }
}

if (!customElements.get('range-slider')) {
  customElements.define('range-slider', View);
}

export default View;
