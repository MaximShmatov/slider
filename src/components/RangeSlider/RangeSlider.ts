import Presenter from './Presenter';

(function ($: JQueryStatic): void {
  if (!$) return;
  const jquery = $;
  const controls = new Map();

  jquery.fn.slider = function (prop: TPluginProps | 'init', value?: string | Record<string, unknown>): any {
    if (this.length === 0) return this;
    let propValue = null;

    this.each(function () {
      const presenter = controls.get(this.id);

      if (presenter && prop !== 'init') {
        if (value === undefined) {
          propValue = presenter.getProp(prop);
          return false;
        }
        presenter.setProp(prop, String(value));
      }

      if (prop === 'init') {
        const slider = new Presenter();
        controls.set(slider.view.id, slider);
        slider.view.className = this.className;
        this.id = slider.view.id;
        this.replaceWith(slider.view);
        if (typeof value === 'object') slider.init(value);
        else slider.init(this.dataset);
      }
    });

    return (propValue ?? this);
  };
}(window.$));
