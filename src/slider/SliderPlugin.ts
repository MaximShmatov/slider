import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import {SliderPresenter} from './SliderPresenter';


;(function ($: JQueryStatic): void {
  $.slider = new SliderPresenter();

  $.fn.slider = function (method?: setMethods | getMethods, prop?: string): any {
    if (method) {
      if (method === 'getProps') {
        return $.slider[method](this[0]);
      }
      if (prop) {
        this.each(function () {
          $.slider[method](this, prop);
        });
      }
      return this;
    }
    return $.slider.init(this);
  }
})(jQuery);