import '../../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import './View';
import Model from './Model';
import Presenter from './Presenter';

(function ($: JQueryStatic): void {
  if (!$) return;
  const jquery = $;
  const controls = new Map();

  jquery.fn.slider = function (prop: TPluginProps | 'init' | 'all', value?: string | Record<string, unknown>): any {
    if (this.length === 0 || prop === undefined) return this;
    let propValue = null;

    this.each(function () {
      const presenter = controls.get(this.id);

      if (presenter && prop !== 'init') {
        if (value === undefined) propValue = presenter.getProp(prop);
        else if (prop !== 'all') presenter.setProp(prop, String(value));
        else if (typeof value === 'object') presenter.init(value);
        return false;
      }

      if (prop === 'init') {
        const view = document.createElement('range-slider');
        const slider = new Presenter(view, new Model());
        controls.set(slider.id, slider);
        this.id = slider.id;
        this.replaceWith(view);
        if (typeof value === 'object') slider.init(value);
        else slider.init(this.dataset);
      }
    });

    return (propValue ?? this);
  };
}(window.$));
