import '../../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import './View';
import Model from './Model';
import Presenter from './Presenter';

(function (): void {
  if (!$) return;
  const controls = new Map();

  $.fn.slider = function (prop: TPluginProps | 'init' | 'all', value?: string | number | boolean | Record<string, unknown>): any {
    if (this.length === 0 || prop === undefined) return this;
    let propValue = null;

    this.each(function () {
      const presenter = controls.get(this.id);
      if (prop === 'init') {
        const view = document.createElement('range-slider');
        const slider = new Presenter(view, new Model());
        controls.set(slider.id, slider);
        this.id = slider.id;
        this.replaceWith(view);
        if (typeof value === 'object') slider.setProp(value);
        else if (value === undefined) slider.setProp(this.dataset);
        else slider.setProp({ [prop]: value });
      } else if (presenter) {
        if (prop === 'all') propValue = presenter.getProp();
        else if (value === undefined) propValue = presenter.getProp()[prop];
        else if (typeof value === 'object') presenter.setProp(value);
        else presenter.setProp({ [prop]: value });
        return false;
      }
    });
    return (propValue ?? this);
  };
}());
