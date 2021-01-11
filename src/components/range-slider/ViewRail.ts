import ViewThumb from './ViewThumb';
import ViewProgress from './ViewProgress';

class ViewRail extends HTMLElement {

  private readonly callback: TViewCallback;

  private readonly progress: HTMLElement;

  private readonly mouseMove = this.handleMouseMove.bind(this);

  private readonly mouseUp = this.handleMouseUp.bind(this);

  private readonly thumbFrom: HTMLElement;

  private readonly thumbTo: HTMLElement;

  private valueFromOrTo: 'valueFrom' | 'valueTo';

  private clientXorY: 'clientX' | 'clientY';

  private offsetXorY = 0;

  private widthOrHeight = 0;

  private moveFrom = 0;

  private moveTo = 0;

  constructor(func: TViewCallback) {
    super();
    this.callback = func;
    this.className = 'slider__rail';
    this.thumbFrom = new ViewThumb();
    this.thumbTo = new ViewThumb();
    this.progress = new ViewProgress();
    this.clientXorY = 'clientX';
    this.valueFromOrTo = 'valueFrom';
    this.appendChild(this.thumbFrom);
    this.appendChild(this.thumbTo);
    this.appendChild(this.progress);
    this.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  static get observedAttributes() {
    return [
      'data-value-from',
      'data-value-to',
      'data-is-tooltip',
      'data-is-range',
      'data-is-vertical',
      'data-move-from',
      'data-move-to',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
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
        this.moveFrom = Number(newValue);
        break;
      case 'data-move-to':
        this.thumbTo.setAttribute('data-move', newValue);
        this.progress.setAttribute(name, newValue);
        this.moveTo = Number(newValue);
        break;
      case 'data-is-vertical':
        this.progress.setAttribute(name, newValue);
      case 'data-is-tooltip':
        this.thumbFrom.setAttribute(name, newValue);
        this.thumbTo.setAttribute(name, newValue);
        break;
      case 'data-is-range':
        this.progress.setAttribute(name, newValue);
        this.thumbTo.style.display = (newValue === 'true') ? '' : 'none';
    }
  }

  private handleMouseDown(evt: MouseEvent): void {
    const rect = this.getBoundingClientRect();
    const isVertical = (this.dataset.isVertical === 'true');
    this.clientXorY = isVertical ? 'clientY' : 'clientX';
    this.offsetXorY = isVertical ? rect.top : rect.left;
    this.widthOrHeight = isVertical ? rect.height : rect.width;

    if (this.dataset.isRange === 'true') {
      const posXorY = evt[this.clientXorY];
      if (posXorY) {
        const posToPercent = (posXorY - this.offsetXorY) / (this.widthOrHeight / 100);
        const distanceFrom = Math.abs(posToPercent - this.moveFrom);
        const distanceTo = Math.abs(this.moveTo - posToPercent);
        const isNearThumb = (distanceFrom < distanceTo);
        this.valueFromOrTo = isNearThumb ? 'valueFrom' : 'valueTo';
      }
    } else {
      this.valueFromOrTo = 'valueFrom';
    }

    this.handleMouseMove(evt);

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  private handleMouseMove(evt: MouseEvent): void {
    evt.preventDefault();
    const position = evt[this.clientXorY];
    if (position) {
      let posToPercent = (position - this.offsetXorY) / (this.widthOrHeight / 100);
      const minPercent = (this.valueFromOrTo === 'valueFrom') ? 0 : this.moveFrom;
      const maxPercent = (this.valueFromOrTo === 'valueTo') ? 100 : this.moveTo;
      if (posToPercent < minPercent) posToPercent = minPercent;
      if (posToPercent > maxPercent) posToPercent = maxPercent;
      this.callback(this.valueFromOrTo, posToPercent);
    }
  }

  private handleMouseUp(): void {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

if (!customElements.get('range-slider-view-rail')) {
  customElements.define('range-slider-view-rail', ViewRail);
}

export default ViewRail;