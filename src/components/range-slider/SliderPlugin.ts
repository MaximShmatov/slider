import SliderPresenter from './SliderPresenter';

(function ($: JQueryStatic): void {
  if (!$) return;

  const controls = new Map();

  $.fn.slider = function (prop: TRangeSliderKeys | TInit, value?: string): any {
    if (this.length === 0) return this;
    let propValue = null;

    this.each(function () {
      const slider = controls.get(this.id);

      if (slider && prop !== 'init') {
        if (value === undefined) {
          propValue = slider.getProp(prop);
          return false;
        }
        slider.setProp(prop, value.toString());
      }

      if (prop === 'init') {
        const presenter = new SliderPresenter();
        presenter.view.className = this.className;
        this.id = presenter.view.id;
        this.replaceWith(presenter.view);
        presenter.init(this);
        controls.set(presenter.view.id, presenter);
      }
    });

    return (propValue ?? this);
  }
}(window.$));
