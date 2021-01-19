import Model from './Model';

class Presenter {
  private readonly props: Map<TPluginProps, TViewProps> = new Map([
    ['isRange', 'data-is-range'],
    ['hasTooltip', 'data-has-tooltip'],
    ['hasScale', 'data-has-scale'],
    ['isVertical', 'data-is-vertical'],
    ['minValue', 'data-min-value'],
    ['maxValue', 'data-max-value'],
    ['valueTo', 'data-value-to'],
    ['valueFrom', 'data-value-from'],
    ['stepSize', 'data-step-size'],
  ]);

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

  init(obj: Record<string, unknown>): void {
    this.model.setAll(obj);
    const {
      isVertical, hasTooltip, hasScale,
    } = obj;
    if (isVertical) this.setProp('isVertical', String(isVertical));
    if (hasTooltip) this.setProp('hasTooltip', String(hasTooltip));
    if (hasScale) this.setProp('hasScale', String(hasScale));
  }

  getProp(name: TPluginProps | 'all'): number | boolean | TModelData {
    switch (name) {
      case 'all':
        return this.model.getAll();
      case 'hasTooltip':
      case 'hasScale':
      case 'isVertical':
        return (this.view.dataset[name] === 'true');
    }
    return this.model[name];
  }

  setProp(name: TPluginProps, value: string): void {
    switch (name) {
      case 'hasTooltip':
      case 'hasScale':
      case 'isVertical':
        this.view.setAttribute(this.props.get(name) as TViewProps, value);
        return;
      case 'isRange':
        this.model.isRange = (value === 'true');
        return;
    }
    const valueToNum = Number(value);
    if (!Number.isNaN(valueToNum)) this.model[name] = valueToNum;
  }

  private modelCallback(prop: TModelProps, value: number | boolean): void {
    this.view.setAttribute(this.props.get(prop) as TViewProps, value.toString());
  }

  private viewCallback(prop: 'valueFrom' | 'valueTo', value: number): void {
    this.model[prop] = value;
  }
}

export default Presenter;
