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
    ['isTooltip', 'data-is-tooltip'],
    ['isScale', 'data-is-scale'],
    ['isVertical', 'data-is-vertical'],
  ]);

  private readonly model: Model;

  readonly view: View;

  constructor() {
    this.view = new View();
    this.model = new Model(this.modelCallback.bind(this));
    this.setEventHandlers();
  }

  getProp(name: TPluginProps): number | boolean {
    switch (name) {
      case 'isTooltip':
      case 'isScale':
      case 'isVertical':
        return (this.view.dataset[name] === 'true');
    }
    return this.model[name];
  }

  setProp(name: TPluginProps, value: string): void {
    switch (name) {
      case 'isTooltip':
      case 'isScale':
      case 'isVertical':
        this.view.setAttribute(this.props.get(name) as TViewProps, value);
        return;
      case 'isRange':
        this.model.isRange = (value === 'true');
        this.view.init('valueTo');
        return;
    }
    const valueToNum = Number(value);
    if (!Number.isNaN(valueToNum)) this.model[name] = valueToNum;
    this.view.init(name);
  }

  init(obj: Record<string, unknown>): void {
    Array.from(this.props.keys()).forEach((prop) => {
      this.setProp(prop, String(obj[prop]));
    });
  }

  private modelCallback(name: TModelProps, value: number | boolean): void {
    this.view.setAttribute(this.props.get(name) as TViewProps, value.toString());
  }

  private setEventHandlers(): void {
    this.view.addEventListener('range-slider', this.handleViewEvent.bind(this));
  }

  private handleViewEvent(evt: Event): void {
    const { name, value } = evt.detail;

    const setModel = (prop: 'valueFrom' | 'valueTo') => {
      const range = this.model.maxValue - this.model.minValue;
      this.model[prop] = Number(value) * (range / 100) + this.model.minValue;
    };

    if (name === 'data-move-from') setModel('valueFrom');
    else if (name === 'data-move-to') setModel('valueTo');
  }
}

export default Presenter;
