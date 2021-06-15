import Model from './Model';

class Presenter {
  private readonly model: Model;

  private readonly view: HTMLElement;

  readonly id: string;

  constructor(view: HTMLElement, model: Model) {
    this.view = view;
    this.model = model;
    this.id = Math.random().toString();
    this.view.className = 'range-slider';
    this.view.setAttribute('id', this.id);
    this.view.setCallback(this.setFromToValue.bind(this));
    this.model.setViewAttribute = this.setViewAttribute.bind(this);
  }

  setProp(data: TPluginData): void {
    this.model.write(data);
    const {
      isVertical, hasTooltip, hasScale,
    } = data;
    this.view.setAttribute('data-is-Vertical', String(isVertical));
    this.view.setAttribute('data-has-tooltip', String(hasTooltip));
    this.view.setAttribute('data-has-scale', String(hasScale));
  }

  getProp(): TPluginData {
    const isVertical = (String(this.view.dataset.isVertical) === 'true');
    const hasScale = (String(this.view.dataset.hasScale) === 'true');
    const hasTooltip = (String(this.view.dataset.hasTooltip) === 'true');
    return {
      ...this.model.read(), isVertical, hasScale, hasTooltip,
    };
  }

  private setViewAttribute(prop: TViewProps, value: number | boolean): void {
    this.view.setAttribute(prop, value.toString());
  }

  private setFromToValue(prop: 'valueFrom' | 'valueTo', value: number): void {
    const sliderProps = this.model.read();
    sliderProps[prop] = value;
    this.model.write(sliderProps);
  }
}

export default Presenter;
