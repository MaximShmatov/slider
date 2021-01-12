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
    this.view.addEventListener('range-slider', this.handleViewEvent.bind(this) as EventListener)
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
    switch(name) {
      case 'isRange':
        this.model[name] = (value === 'true');
        this.initView();
        return;
      case 'isTooltip':
      case 'isScale':
      case 'isVertical':
        this.view.setAttribute(this.props.get(name) as TViewProps, value);
        return;
    }
    if (!isNaN(Number(value))) {
      this.model[name] = Number(value);
    } else this.model[name] = this.model[name];
    this.initView();
  }

  init(obj: object) {
    const data = (obj instanceof HTMLElement) ? {...obj.dataset} : {...obj};
    for (const key of Array.from(this.props.keys())) {
      this.setProp(key, String(data[key]));
    }
  }

  private initView() {
    const min = this.model.minValue;
    const max = this.model.maxValue;
    const calcValue = (value: number) => {
      return Math.abs((min - value) / ((max - min) / 100)).toString();
    }
    this.view.setAttribute('data-move-from', calcValue(this.model.valueFrom));
    this.view.setAttribute('data-move-to', calcValue(this.model.valueTo));
  }

  private modelCallback(name: TModelProps, value: number | boolean): void {
    this.view.setAttribute(this.props.get(name) as TViewProps, value.toString());
  }

  private handleViewEvent(evt: CustomEvent): void {
    const { name, value } = evt.detail;

    const setModel = (prop: 'valueFrom' | 'valueTo') => {
      const range = this.model.maxValue - this.model.minValue;
      this.model[prop] = Number(value) * (range / 100) + this.model.minValue;
    }

    if (name === 'data-move-from') setModel('valueFrom');
    else if (name === 'data-move-to') setModel('valueTo');
  }
}

export default Presenter;
