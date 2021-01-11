class ViewThumb extends HTMLElement {

  private readonly tooltip: HTMLElement;

  private leftOrTop: 'left' | 'top' = 'left';

  constructor() {
    super();
    this.className = 'slider__thumb';
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'slider__thumb-tooltip';
    this.appendChild(this.tooltip);
  }

  static get observedAttributes() {
    return [
      'data-is-vertical',
      'data-is-tooltip',
      'data-value',
      'data-move',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'data-is-vertical':
        const isVertical = (newValue === 'true');
        this.leftOrTop = isVertical ? 'top' : 'left';
        this.style.left = isVertical ? '0' : `${this.dataset.move}%`;
        this.style.top = isVertical ? `${this.dataset.move}%` : '0';
        break;
      case 'data-is-tooltip':
        this.tooltip.style.display = (newValue === 'true') ? '' : 'none';
        break;
      case 'data-value':
        this.tooltip.textContent = newValue;
        break;
      case 'data-move':
        this.style[this.leftOrTop] = `${newValue}%`;
    }
  }
}

if (!customElements.get('range-slider-view-thumb')) {
  customElements.define('range-slider-view-thumb', ViewThumb);
}

export default ViewThumb;
