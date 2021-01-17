import ViewAbstract from './ViewAbstract';

class ViewProgress extends ViewAbstract {
  private leftOrTop: 'left' | 'top' = 'left';

  private rightOrBottom: 'right' | 'bottom' = 'right';

  constructor() {
    super();
    this.className = 'slider__progress';
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    const isRange = (this.dataset.isRange === 'true');
    switch (name) {
      case 'data-is-range':
        this.init(isRange);
        break;
      case 'data-move-from':
        if (isRange) this.moveFrom();
        else this.moveFromIsNoRange();
        break;
      case 'data-move-to':
        if (isRange) this.moveTo();
        break;
      case 'data-is-vertical':
        if (newValue === 'true') {
          this.leftOrTop = 'top';
          this.rightOrBottom = 'bottom';
          this.style.left = '0%';
        } else {
          this.leftOrTop = 'left';
          this.rightOrBottom = 'right';
          this.style.top = '0%';
        }
        this.init(isRange);
    }
  }

  private init(isRange: boolean): void {
    if (isRange) {
      this.moveFrom();
      this.moveTo();
    } else {
      this.style[this.leftOrTop] = '0%';
      this.moveFromIsNoRange();
    }
  }

  private moveFrom() {
    this.style[this.leftOrTop] = `${this.dataset.moveFrom}%`;
  }

  private moveFromIsNoRange() {
    this.style[this.rightOrBottom] = `${100 - Number(this.dataset.moveFrom)}%`;
  }

  private moveTo() {
    this.style[this.rightOrBottom] = `${100 - Number(this.dataset.moveTo)}%`;
  }
}

if (!customElements.get('range-slider-progress')) {
  customElements.define('range-slider-progress', ViewProgress);
}

export default ViewProgress;
