import Model from './Model';
import View from './View';

class Presenter {
  private readonly props: Map<TPluginProps, TViewProps> = new Map([
    ['minValue', 'data-min-value'],
    ['maxValue', 'data-max-value'],
    ['valueTo', 'data-value-to'],
    ['valueFrom', 'data-value-from'],
    ['stepSize', 'data-step-size'],
    ['isRange', 'data-is-range'],
    ['hasTooltip', 'data-has-tooltip'],
    ['hasScale', 'data-has-scale'],
    ['isVertical', 'data-is-vertical'],
  ]);

  private readonly model: Model;

  readonly view: View;

  constructor() {
    this.view = new View(this.viewCallback.bind(this));
    this.model = new Model(this.modelCallback.bind(this));
  }

  getProp(name: TPluginProps): number | boolean {
    switch (name) {
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

  init(obj: Record<string, unknown>): void {
    Array.from(this.props.keys()).forEach((prop) => {
      this.setProp(prop, String(obj[prop]));
    });
  }

  private modelCallback(prop: TModelProps, value: number | boolean): void {
    this.view.setAttribute(this.props.get(prop) as TViewProps, value.toString());
  }

  private viewCallback(prop: 'valueFrom' | 'valueTo', value: number): void {
    const range = this.model.maxValue - this.model.minValue;
    this.model[prop] = value * (range / 100) + this.model.minValue;
  }
}

export default Presenter;
