import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import {SliderPresenter} from './SliderPresenter';

;(function ($: JQueryStatic): void {
  $.slider = new SliderPresenter();
  $.fn.slider = function (method?: TMethodsUnion, prop?: number | boolean): any {
    if (method) {
      if (prop !== undefined) {
        this.each(function () {
          $.slider.setProps(this, method, prop);
        });
        return this;
      }
      return $.slider.getProps(this[0], method);
    }
    return $.slider.init(this);
  }
})(jQuery);