import '../../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import './View/View';
import Model from './Model';
import Presenter from './Presenter';

(function (): void {
  if (!$) return;
  const controls = new Map();

  $.fn.slider = function (prop: TPluginProps | 'init' | 'all', value?: number | boolean | TPluginData) {
    if (this.length === 0 || prop === undefined) return this;
    let propValue = null;

    this.each(function () {
      const presenter = controls.get(this.id);
      if (prop === 'init') {
        const rootElement = document.createElement('range-slider');
        const slider = new Presenter(rootElement, new Model());
        controls.set(slider.id, slider);
        this.id = slider.id;
        this.replaceWith(rootElement);
        if (typeof value === 'object') {
          const sliderProps = slider.getProp();
          slider.setProp({ ...sliderProps, ...value });
        } else if (value === undefined) {
          const {
            minValue, maxValue, valueTo, valueFrom, stepSize,
            isRange, isVertical, hasTooltip, hasScale,
          } = this.dataset;
          slider.setProp({
            minValue: Number(minValue),
            maxValue: Number(maxValue),
            valueFrom: Number(valueFrom),
            valueTo: Number(valueTo),
            stepSize: Number(stepSize),
            hasScale: (hasScale === 'true'),
            hasTooltip: (hasTooltip === 'true'),
            isRange: (isRange === 'true'),
            isVertical: (isVertical === 'true'),
          });
        }
      } else if (presenter) {
        if (prop === 'all') {
          propValue = presenter.getProp();
        } else if (value === undefined) {
          propValue = presenter.getProp()[prop];
        } else if (typeof value === 'object') {
          const sliderProps = presenter.getProp();
          presenter.setProp({ ...sliderProps, ...value });
        } else {
          const sliderProps = presenter.getProp();
          sliderProps[prop] = value;
          presenter.setProp(sliderProps);
        }
        return false;
      }
    });
    return (propValue ?? this);
  };
}());
