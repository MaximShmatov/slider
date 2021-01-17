import '../../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import ViewAbstract from './ViewAbstract';
import ViewRail from './ViewRail';
import ViewScale from './ViewScale';
import styles from './styles.module.sass';

class View extends ViewAbstract {
  readonly id: string;

  private readonly rail: ViewRail;

  private readonly scale: ViewScale;

  private readonly slider: HTMLElement;

  private readonly styles: HTMLElement;

  constructor() {
    super();
    this.id = String(Math.random());
    this.className = 'range-slider';
    this.rail = new ViewRail();
    this.scale = new ViewScale();
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    this.dispatchEvent(new CustomEvent('range-slider', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { name, value: newValue },
    }));

    switch (name) {
      case 'data-has-scale':
        this.scale.style.display = (newValue === 'true') ? '' : 'none';
        return;
      case 'data-min-value':
      case 'data-max-value':
      case 'data-step-size':
        this.setMoveAttribute('data-move-from');
        this.setMoveAttribute('data-move-to');
        break;
      case 'data-value-from':
        this.setMoveAttribute('data-move-from');
        break;
      case 'data-value-to':
        this.setMoveAttribute('data-move-to');
        break;
      case 'data-is-vertical':
        if (newValue === 'true') this.slider.classList.add('slider_vertical');
        else this.slider.classList.remove('slider_vertical');
    }

    this.rail.setAttribute(name, newValue);
    this.scale.setAttribute(name, newValue);
  }

  setCallback(func: TViewCallback): void {
    this.rail.callback = func;
    this.scale.callback = func;
  }

  private setMoveAttribute(name: 'data-move-from' | 'data-move-to'): void {
    const min = Number(this.dataset.minValue);
    const max = Number(this.dataset.maxValue);
    const prop = (name === 'data-move-from') ? 'valueFrom' : 'valueTo';
    const value = Number(this.dataset[prop]);
    if (Number.isNaN(min + max + value)) return;

    const position = () => Math.abs((min - value) / ((max - min) / 100));
    this.rail.setAttribute(name, position().toFixed());
    this.scale.setAttribute(name, position().toFixed());
  }
}

if (!customElements.get('range-slider')) {
  customElements.define('range-slider', View);
}

export default View;
