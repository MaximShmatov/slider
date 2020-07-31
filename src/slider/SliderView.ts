class RailView extends HTMLElement implements IRailView{
  thumb: Thumb;

  constructor() {
    super();
    this.className = 'rail';
    this.thumb = new Thumb();
    let progress = document.createElement('div');
    progress.className = 'rail__progress';
    this.appendChild(this.thumb);
    this.appendChild(progress);
  }
}

class Thumb extends HTMLElement implements IThumb {
  private readonly mousemove: (evt: MouseEventInit) => void;
  private readonly mouseup: (evt: MouseEvent) => void;
  private readonly tooltip: HTMLElement;

  constructor() {
    super();
    this.className = 'thumb';
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'thumb__tooltip';
    let point = document.createElement('div');
    point.className = 'thumb__point';
    this.appendChild(point);
    this.appendChild(this.tooltip);
    this.mousemove = this.onMouseMove.bind(this);
    this.mouseup = this.onMouseUp.bind(this);
    this.onmousedown = this.onMouseDown;
  }

  setTooltipValue(value: number) {
    this.tooltip.textContent = value.toFixed();
  }

  moveToPosition(position: number): void {
    if (position < 0) {
      position = 0;
    }
    if (position > 100) {
      position = 100;
    }
    this.style.marginLeft = `${position}%`;

    this.dispatchEvent(new CustomEvent('slider-pos', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        valueFrom: position
      }
    }));
  }

  toggleTooltip(): void {
    if (this.dataset.onTooltip === 'true') {
      this.tooltip.style.display = 'flex';
    } else {
      this.tooltip.style.display = 'none';
    }
  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    document.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseup', this.mouseup);
  }

  private onMouseMove(evt: MouseEventInit): void {
    if (evt.clientX && this.parentElement) {
      this.moveToPosition((evt.clientX - this.parentElement.offsetLeft) / (this.parentElement.offsetWidth / 100));
    }
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('mouseup', this.mouseup);
  }
}

class ScaleView extends HTMLElement implements IScaleView{
  private scaleValueItems: HTMLSpanElement[] = [];

  constructor() {
    super();
    this.className = 'scale';
    this.innerHTML = `      
      <div class="scale__wrapper">
        <div class="scale__division">
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
        </div>
        <div class="scale__division">
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
        </div>
        <div class="scale__division">
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
          <span class="scale__subdivision"></span>
        </div>
      </div>`;

    for (let i = 0; i < 4; i++) {
      this.scaleValueItems[i] = document.createElement('span');
      this.scaleValueItems[i].className = 'scale__values-item';
    }

    let scaleValues: HTMLElement = document.createElement('div');

    scaleValues.className = 'scale__values'
    for (let span of this.scaleValueItems) {
      scaleValues.appendChild(span);
    }
    this.appendChild(scaleValues);
  }

  render(min: number, max: number): void {
    let scaleValue = (max - min) / 3;
    this.scaleValueItems[0].textContent = min.toFixed();
    this.scaleValueItems[1].textContent = (min + scaleValue).toFixed();
    this.scaleValueItems[2].textContent = (min + scaleValue + scaleValue).toFixed();
    this.scaleValueItems[3].textContent = max.toFixed();
  }
}

customElements.define('input-slider-view-thumb', Thumb);
customElements.define('input-slider-view-rail', RailView);
customElements.define('input-slider-view-scale', ScaleView);

export {RailView, ScaleView};