import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';

import {SliderPresenter} from './SliderPresenter';
import {SliderView} from './SliderView';

;(function ($: JQueryStatic): void {
  $.fn.slider = function (method?: TMethodsUnion | 'init', prop?: number | boolean | ISliderModel): any {

    if (method === 'init' || method === undefined) {
      let viewArr: ISliderView[] = [];
      let view: ISliderView;
      this.each(function () {
        if (this instanceof SliderView) {
          viewArr.push(this);
        } else {
          view = new SliderPresenter().view;
          $(this).replaceWith(view);
          viewArr.push(view);
          if (view.slider) {
            if (typeof prop === 'object') {
              view.slider.init(prop);
            } else {
              view.slider.init(this);
            }
          }
        }
      })
      return $().pushStack(viewArr);
    }

    if (method) {
      if (prop !== undefined && (typeof prop !== 'object')) {
        this.each(function () {
          if (this instanceof SliderView && this.slider) {
            this.slider.setProps(method, prop);
          }
        })
        return this;
      }
      if (this[0] instanceof SliderView && this[0].slider) {
        return this[0].slider.getProps(method);
      }
    }
  }
})(jQuery);