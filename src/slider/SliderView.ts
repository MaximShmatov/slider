class SliderView extends HTMLElement implements ISliderView {
  private readonly rail: Rail = new Rail();
  private readonly scale: Scale = new Scale();
  readonly index: number;

  constructor(id: number) {
    super();
    this.className = 'input-slider-view';
    this.index = id;
    this.attachShadow({mode: 'open'});
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>${require('./slider-plugin.css')}</style>`;
      //<style>${require('./slider-vertical.css')}</style>`;
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
    }
  }

  setModel(model: ISliderModel): void {
    this.scale.dataset.minValue = model.minValue.toString();
    this.scale.dataset.maxValue = model.maxValue.toString();
    this.scale.dataset.onScale = model.onScale.toString();
    this.scale.dataset.onVertical = model.onVertical.toString();
    this.rail.dataset.onTooltip = model.onTooltip.toString();
    this.rail.dataset.onRange = model.onRange.toString();
    this.rail.dataset.onVertical = model.onVertical.toString();
  }

  setModelData(prop: TPropsUnion, value: number | boolean) {
    this.scale.dataset[prop] = value.toString();
    this.rail.dataset[prop] = value.toString();
  }
}

class Rail extends HTMLElement implements IRail {
  thumbFrom: Thumb = new Thumb('from');
  thumbTo: Thumb = new Thumb('to');
  progress = document.createElement('div');
  isVertical: boolean = false;

  constructor() {
    super();
    this.className = 'rail';
    this.progress.className = 'rail__progress';
    //this.appendChild(this.progress);
    this.appendChild(this.thumbFrom);
    this.appendChild(this.thumbTo);
    this.addEventListener('slider-pos', this.setProgressPosition.bind(this));
  }

  static get observedAttributes() {
    return ['data-on-tooltip', 'data-on-range', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-on-tooltip':
        this.thumbTo.dataset.onTooltip = this.dataset.onTooltip;
        this.thumbFrom.dataset.onTooltip = this.dataset.onTooltip;
        break;
      case 'data-on-range':
        this.thumbTo.dataset.onRange = this.dataset.onRange;
        this.thumbFrom.dataset.onRange = this.dataset.onRange;
        break;
      case 'data-on-vertical':
        this.thumbTo.dataset.onVertical = this.dataset.onVertical;
        this.thumbFrom.dataset.onVertical = this.dataset.onVertical;
    }
  }


  private setProgressPosition(evt: CustomEvent) {
    switch (this.isVertical) {
      case true:
        if (evt.detail.name === 'from') {

        } else {

        }
        break;
      case false:
        if (evt.detail.name === 'to') {

        } else {
          this.progress.style.left = `${evt.detail.pos}%`;
          this.progress.style.width = `${100 - evt.detail.pos}%`;
          //console.log(`${this.progress.style.width}%`);
        }
        break;
    }
  }
}

class Thumb extends HTMLElement implements IThumb {
  private isVertical: boolean = false;
  private clientXorY: 'clientX' | 'clientY' = 'clientX';
  private offsetXorY: number = 0;
  private widthOrHeight: number = 0;
  private direction: 'left' | 'top' = 'left';
  private readonly name: 'from' | 'to';
  private readonly tooltip: HTMLElement = document.createElement('div');
  private readonly point: HTMLElement = document.createElement('div');
  private readonly mouseMove: (evt: MouseEventInit) => void = this.onMouseMove.bind(this);
  private readonly mouseUp: (evt: MouseEvent) => void = this.onMouseUp.bind(this);

  constructor(name: 'from' | 'to') {
    super();
    this.name = name;
    this.className = 'thumb';
    this.tooltip.className = 'thumb__tooltip';
    this.point.className = 'thumb__point';
    this.appendChild(this.tooltip);
    this.appendChild(this.point);
    this.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  static get observedAttributes() {
    return ['data-thumb-position', 'data-tooltip-value', 'data-on-vertical', 'data-on-tooltip', 'data-on-range'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-tooltip-value':
        this.tooltip.textContent = <string>this.dataset.tooltipValue;
        break;
      case 'data-thumb-position':
        this.moveToPosition(Number(this.dataset.thumbPosition));
        break;
      case 'data-on-vertical':
        this.isVertical = (this.dataset.onVertical === 'true');
        this.setProperties();
        break;
      case 'data-on-tooltip':
        //console.log('data on tooltip');
        (this.dataset.onTooltip === 'false') ? $(this.tooltip).hide() : $(this.tooltip).show();
        break;
      case 'data-on-range':
        if (this.dataset.onRange === 'false') {
          if (this.dataset.onVertical === 'false' && this.name === 'to') {
            $(this).hide();
          }
          if (this.dataset.onVertical === 'true' && this.name === 'from') {
            $(this).hide();
          }
        } else $(this).show();
    }
  }

  moveToPosition(position: number): void {
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    this.style[this.direction] = `${position}%`;
    this.dispatchEvent(new CustomEvent('slider-pos', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        name: this.name,
        pos: position
      }
    }));
    console.log(this.direction);
  }

  private setProperties(): void {
    if (this.parentElement) {
      const rect = this.parentElement.getBoundingClientRect();
      if (this.isVertical) {
        this.clientXorY = 'clientY';
        this.offsetXorY = rect.top;
        this.widthOrHeight = rect.height;
        this.direction = 'top';
      } else {
        this.clientXorY = 'clientX';
        this.offsetXorY = rect.left;
        this.widthOrHeight = rect.width;
        this.direction = 'left';
      }
    }
  }

  private onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    this.setProperties();
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  private onMouseMove(evt: MouseEventInit): void {
    this.moveToPosition((<number>evt[this.clientXorY] - this.offsetXorY) / (this.widthOrHeight / 100));
  }

  private onMouseUp(): void {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

class Scale extends HTMLElement implements IScale {
  private scaleValueItems: HTMLSpanElement[] = [];

  constructor() {
    super();
    this.className = 'scale';
    for (let i = 0; i < 4; i++) {
      this.scaleValueItems[i] = document.createElement('span');
      this.scaleValueItems[i].className = 'scale__values-item';
    }
    let scaleValues: HTMLElement = document.createElement('div');
    scaleValues.className = 'scale__values'
    for (let span of this.scaleValueItems) {
      scaleValues.appendChild(span);
    }
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
    this.appendChild(scaleValues);
    this.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  static get observedAttributes() {
    return ['data-min-value', 'data-max-value', 'data-on-scale', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-min-value':
        this.render();
        break;
      case 'data-max-value':
        this.render();
        break;
      case 'data-on-scale':
        (this.dataset.onScale === 'false') ? $(this).hide() : $(this).show();
        break;
      case 'data-on-vertical':
        this.onVertical();
    }
  }

  onVertical() {
    if (this.dataset._onVertical === 'true') {
      this.className = this.className + ' scale_vertical';
    } else {
      this.className = 'scale';
    }
  }

  render(): void {
    let min = Number(this.dataset.minValue);
    let max = Number(this.dataset.maxValue);
    let scaleValue = (max - min) / 3;
    this.scaleValueItems[0].textContent = min.toFixed();
    this.scaleValueItems[1].textContent = (min + scaleValue).toFixed();
    this.scaleValueItems[2].textContent = (min + scaleValue + scaleValue).toFixed();
    this.scaleValueItems[3].textContent = max.toFixed();
  }

  private handleMouseDown(evt: MouseEventInit) {
    let rect = this.getBoundingClientRect();
    let position: number = 0;
    if (evt.clientX && evt.clientY) {
      if (this.dataset._onVertical === 'true') {
        position = (rect.height - (evt.clientY - rect.y)) / (rect.height / 100);
      } else {
        position = (evt.clientX - rect.x) / (rect.width / 100);
      }
    }
    this.dispatchEvent(new CustomEvent('scale-pos', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        from: position
      }
    }));
  }
}

export {SliderView}

customElements.define('input-slider-view', SliderView);
customElements.define('input-slider-view-thumb', Thumb);
customElements.define('input-slider-view-rail', Rail);
customElements.define('input-slider-view-scale', Scale);
