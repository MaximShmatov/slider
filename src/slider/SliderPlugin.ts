import * as $ from 'jquery';
import {SliderView} from './SliderView';
import {SliderPresenter} from './SliderPresenter';

;(function ($:JQueryStatic): void {
  $.fn.slider = function (method?: TMethodsUnion | 'init', prop?: number | boolean | string | FormData | ISliderData | HTMLElement): any {

    let viewArr: ISliderView[] = [];

    if (method === undefined) {
      this.each(function () {
        if (this instanceof SliderView) {
          viewArr.push(this);
        }
      });
      return $().pushStack(viewArr);
    }

    if (method === 'init') {
      this.each(function () {
        if (this instanceof SliderView) {
          viewArr.push(this);
        } else {
          let presenter = new SliderPresenter();
          presenter.view.className = this.className;
          this.replaceWith(presenter.view);
          viewArr.push(presenter.view);
          if (prop === undefined) {
            presenter.init(this);
          } else {
            presenter.init(<HTMLElement | FormData | ISliderData>prop);
          }
        }
      });
      return $().pushStack(viewArr);
    }

    if (method) {
      if (prop === undefined && this[0] instanceof SliderView) {
        if(this[0].presenter) {
          return this[0].presenter.getProps(method);
        }
      } else {
        this.each(function () {
          if (this instanceof SliderView) {
            if(this.presenter) {
              return this.presenter.setProps(method, <number | boolean | string>prop);
            }
          }
        });
        return this;
      }
    }
  }
}($));