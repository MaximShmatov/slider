import * as $ from 'jquery';
import {SliderPresenter} from './SliderPresenter';

;(function ($:JQueryStatic): void {
  $.fn.slider = function (method?: TMethodsUnion | 'init', prop?: number | boolean | string | FormData | ISliderData | HTMLElement): any {
    if (this.length === 0) return this;

    let viewArr: ISliderView[] = [];

    if (method === undefined) {
      this.each(function () {
        if (instanceOfSliderView(this)) {
          viewArr.push(this);
        }
      });
      return $().pushStack(viewArr);
    }

    if (method === 'init') {
      this.each(function () {
        if (instanceOfSliderView(this)) {
          if(prop && this.presenter) {
            this.presenter.init(<HTMLElement | FormData | ISliderData>prop)
          }
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
      if (prop === undefined && instanceOfSliderView(this[0])) {
        if(this[0].presenter) {
          return this[0].presenter.getProps(method);
        }
      } else {
        this.each(function () {
          if (instanceOfSliderView(this)) {
            if(this.presenter) {
              return this.presenter.setProps(method, <number | boolean | string>prop);
            }
          }
        });
        return this;
      }
    }
  }

  function instanceOfSliderView(obj: HTMLElement): obj is ISliderView {
    return 'presenter' in obj;
  }
}($));