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
    this.view.setCallback(this.viewCallback.bind(this));
    this.model.callback = this.modelCallback.bind(this);
  }

  setProp(obj: Record<string, unknown>): void {
    this.model.write(obj);
    const {
      isVertical, hasTooltip, hasScale,
    } = obj;
    if (isVertical !== undefined) this.view.setAttribute('data-is-Vertical', String(isVertical));
    if (hasTooltip !== undefined) this.view.setAttribute('data-has-tooltip', String(hasTooltip));
    if (hasScale !== undefined) this.view.setAttribute('data-has-scale', String(hasScale));
  }

  getProp(): TModelData {
    return this.model.read();
  }

  private modelCallback(prop: TViewProps, value: number | boolean): void {
    this.view.setAttribute(prop, value.toString());
  }

  private viewCallback(prop: 'valueFrom' | 'valueTo', value: number): void {
    this.model.write({ [prop]: value });
  }
}

export default Presenter;
