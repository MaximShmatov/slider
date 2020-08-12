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
      this.shadowRoot.innerHTML = `<style>${require('./slider-plugin.css')}</style>`;
      this.shadowRoot.appendChild(this.rail);
      this.shadowRoot.appendChild(this.scale);
    }
  }

  setModelData(method: TMethodsUnion, value: number | boolean) {
    switch (method) {
      case 'minValue':
        this.scale.dataset[method] = value.toString();
        break;
      case 'maxValue':
        this.scale.dataset[method] = value.toString();
        break;
      case 'stepSize':
        break;
      case 'valueFrom':
        break;
      case 'valueTo':
        break;
      case 'onScale':
        (value) ? $(this.scale).show() : $(this.scale).hide();
        break;
      case 'onTooltip':
        break;
      case 'onRange':
        break;
      case 'onVertical':
        this.scale.dataset[method] = value.toString();
    }
    this.rail.dataset[method] = value.toString();
  }
}

class Rail extends HTMLElement implements IRail {
  private thumbFrom: Thumb = new Thumb('valueFrom');
  private thumbTo: Thumb = new Thumb('valueTo');
  private progress = document.createElement('div');

  constructor() {
    super();
    $(this.progress).addClass('rail__progress');
    $(this)
      .addClass('rail')
      .append(this.thumbFrom)
      .append(this.thumbTo)
      .append(this.progress)
  }

  static get observedAttributes() {
    return ['data-value-from', 'data-value-to', 'data-on-tooltip', 'data-on-range', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-on-tooltip':
        this.thumbTo.dataset.onTooltip = this.dataset.onTooltip;
        this.thumbFrom.dataset.onTooltip = this.dataset.onTooltip;
        break;
      case 'data-on-range':
        if (this.dataset.onRange === 'false') {
          (this.dataset.onVertical === 'true') ? $(this.thumbFrom).hide() : $(this.thumbTo).hide();
        } else {
          $(this.thumbFrom).show();
          $(this.thumbTo).show();
        }
        break;
      case 'data-on-vertical':
        this.thumbTo.dataset.onVertical = this.dataset.onVertical;
        this.thumbFrom.dataset.onVertical = this.dataset.onVertical;
        break;
      case 'data-value-from':
        this.thumbFrom.dataset.position = this.calcThumbPosition('from').toString();
        this.thumbFrom.dataset.value = Number(this.dataset.valueFrom).toFixed();
        break;
      case 'data-value-to':
        this.thumbTo.dataset.position = this.calcThumbPosition('to').toString();
        this.thumbTo.dataset.value = Number(this.dataset.valueTo).toFixed();

    }
  }

  private calcThumbPosition(thumb: string): number {
    let min = Number(this.dataset.minValue);
    let max = Number(this.dataset.maxValue);
    let target: number = 0;
    (thumb === 'from') ? target = Number(this.dataset.valueFrom) : target = Number(this.dataset.valueTo);
    return target / ((max - min) / 100);
  }

  private setProgressPosition(evt: JQuery.Event, data: { name: string, pos: number }) {
    switch (this.dataset.onVertical === 'true') {
      case true:
        if (data.name === 'from') {

        } else {

        }
        break;
      case false:
        if (data.name === 'to') {

        } else {
          $(this.progress).css('left', `${data.pos}%`);
          $(this.progress).css('width', `${this.calcThumbPosition('to') - this.calcThumbPosition('from')}%`);
          //console.log(this.calcThumbPosition('from'));
          //console.log(this.calcThumbPosition('to'));
        }
        break;
    }
  }
}

class Progress {
  private leftOrTop: 'left' | 'top' = 'left';
  private widthOrHeight: 'width' | 'height' = 'width';
  constructor() {
  }
  static get observedAttributes() {
    return ['data-position-from', 'data-position-to', 'data-on-range', 'data-on-vertical'];
  }
  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-position-from':
        break;
      case 'data-position-to':
        break;
      case 'data-on-range':
        break;
      case 'data-on-vertical':
    }
  }
}

class Thumb extends HTMLElement implements IThumb {
  private clientXorY: 'clientX' | 'clientY' = 'clientX';
  private offsetXorY: number = 0;
  private widthOrHeight: number = 0;
  private direction: 'left' | 'top' = 'left';
  private readonly name: 'valueFrom' | 'valueTo';
  private readonly tooltip: HTMLElement = document.createElement('div');
  private readonly point: HTMLElement = document.createElement('div');
  private readonly mouseMove: (evt: MouseEventInit) => void = this.onMouseMove.bind(this);
  private readonly mouseUp: (evt: MouseEvent) => void = this.onMouseUp.bind(this);

  constructor(name: 'valueFrom' | 'valueTo') {
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
    return ['data-value', 'data-position', 'data-on-vertical', 'data-on-tooltip'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-value':
        this.tooltip.textContent = <string>this.dataset.value;
        break;
      case 'data-position':
        this.moveToPosition(Number(this.dataset.position));
        break;
      case 'data-on-vertical':
        this.setPosition();
        break;
      case 'data-on-tooltip':
        (this.dataset.onTooltip === 'false') ? $(this.tooltip).hide() : $(this.tooltip).show();
    }
  }

  private moveToPosition(position: number): void {
    $(this).css(`${this.direction}`, `${position}%`)
  }

  private setPosition(): void {
    if (this.parentElement) {
      const rect = this.parentElement.getBoundingClientRect();
      if (this.dataset.onVertical === 'true') {
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
    this.setPosition();
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  private onMouseMove(evt: MouseEventInit): void {
    let position = (<number>evt[this.clientXorY] - this.offsetXorY) / (this.widthOrHeight / 100);
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    //this.moveToPosition(position);
    this.dispatchEvent(new CustomEvent('slider', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        name: this.name,
        value: position
      }
    }));
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
    return ['data-min-value', 'data-max-value', 'data-on-vertical'];
  }

  attributeChangedCallback(prop: string) {
    switch (prop) {
      case 'data-min-value':
        this.render();
        break;
      case 'data-max-value':
        this.render();
        break;
      case 'data-on-vertical':
        if (this.dataset.onVertical === 'true') {
          $(this).addClass('scale_vertical');
        } else {
          $(this).removeClass('scale_vertical');
        }
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
