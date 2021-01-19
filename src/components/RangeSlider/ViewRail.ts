import ViewAbstract from './ViewAbstract';
import ViewThumb from './ViewThumb';
import ViewProgress from './ViewProgress';

class ViewRail extends ViewAbstract {
  callback: TViewCallback;

  private readonly progress: HTMLElement;

  private readonly thumbFrom: HTMLElement;

  private readonly thumbTo: HTMLElement;

  private readonly mouseMove = this.handleMouseMove.bind(this);

  private readonly mouseUp = this.handleMouseUp.bind(this);

  constructor() {
    super();
    this.callback = () => ({});
    this.className = 'slider__rail';
    this.thumbFrom = new ViewThumb();
    this.thumbTo = new ViewThumb();
    this.progress = new ViewProgress();
    this.appendChild(this.thumbFrom);
    this.appendChild(this.thumbTo);
    this.appendChild(this.progress);
    this.addEventListener('mousedown', this.handleMousedown.bind(this));
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case 'data-value-from':
        this.thumbFrom.setAttribute('data-value', newValue);
        break;
      case 'data-value-to':
        this.thumbTo.setAttribute('data-value', newValue);
        break;
      case 'data-move-from':
        this.thumbFrom.setAttribute('data-move', newValue);
        this.progress.setAttribute(name, newValue);
        break;
      case 'data-move-to':
        this.thumbTo.setAttribute('data-move', newValue);
        this.progress.setAttribute(name, newValue);
        break;
      case 'data-is-vertical':
        this.progress.setAttribute(name, newValue);
        this.thumbFrom.setAttribute(name, newValue);
        this.thumbTo.setAttribute(name, newValue);
        break;
      case 'data-has-tooltip':
        this.thumbFrom.setAttribute(name, newValue);
        this.thumbTo.setAttribute(name, newValue);
        break;
      case 'data-is-range':
        this.progress.setAttribute(name, newValue);
        this.thumbTo.style.display = (newValue === 'true') ? '' : 'none';
    }
  }

  private handleMousedown(evt: MouseEvent): void {
    this.setDirection(evt);
    this.handleMouseMove(evt);
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  private handleMouseMove(evt: MouseEvent): void {
    evt.preventDefault();
    this.callback(this.valuePropName, this.calcValue(evt));
  }

  private handleMouseUp(): void {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

if (!customElements.get('range-slider-rail')) {
  customElements.define('range-slider-rail', ViewRail);
}

export default ViewRail;
