class ViewProgress extends HTMLElement {

  private leftOrTop: 'left' | 'top' = 'left';

  private rightOrBottom: 'right' | 'bottom' = 'right';

  constructor() {
    super();
    this.className = 'slider__progress';
  }

  static get observedAttributes() {
    return [
      'data-move-from',
      'data-move-to',
      'data-is-range',
      'data-is-vertical',
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const isRange = (this.dataset.isRange === 'true');
    switch (name) {
      case 'data-move-from':
        this.moveFrom();
        break;
      case 'data-move-to':
        if (isRange) this.moveTo();
        break;
      case 'data-is-vertical':
        const isVertical = (newValue === 'true');
        this.leftOrTop = isVertical ? 'top' : 'left';
        this.rightOrBottom = isVertical ? 'bottom' : 'right';
        isVertical ? this.style.left = '0' : this.style.top = '0';
        this.moveFrom();
      case 'data-is-range':
        isRange ? this.moveTo() : this.style[this.rightOrBottom] = '0';
    }
  }

  private moveFrom() {
    this.style[this.leftOrTop] = `${this.dataset.moveFrom}%`;
  }

  private moveTo() {
    this.style[this.rightOrBottom] = `${100 - (Number(this.dataset.moveTo))}%`;
  }
}

if (!customElements.get('range-slider-view-progress')) {
  customElements.define('range-slider-view-progress', ViewProgress);
}

export default ViewProgress;