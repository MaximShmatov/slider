import ViewAbstract from './ViewAbstract';

class ViewThumb extends ViewAbstract {
  private readonly tooltip: HTMLElement;

  constructor() {
    super();
    this.className = 'slider__thumb';
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'slider__thumb-tooltip';
    this.appendChild(this.tooltip);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case 'data-is-vertical':
        if (newValue === 'true') {
          this.leftOrTop = 'top';
          this.style.left = '0';
          this.style.top = `${this.dataset.move}%`;
        } else {
          this.leftOrTop = 'left';
          this.style.left = `${this.dataset.move}%`;
          this.style.top = '0';
        }
        break;
      case 'data-has-tooltip':
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
