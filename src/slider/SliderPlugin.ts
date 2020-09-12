import {SliderPresenter} from './SliderPresenter';


;(function ($: JQueryStatic): void {
  $.fn.slider = function (method?: TMethodsUnion | 'init', prop?: number | boolean | string | FormData | ISliderData | HTMLElement): any {

    let viewArr: ISliderView[] = [];

    if (method === undefined) {
      this.each(function () {
        if (this.constructor.name === 'SliderView') {
          viewArr.push(<ISliderView>this);
        }
      });
      return $().pushStack(viewArr);
    }

    if (method === 'init') {
      this.each(function () {
        if (this.constructor.name === 'SliderView') {
          viewArr.push(<ISliderView>this);
        } else {
          let presenter = new SliderPresenter();
          $(this).replaceWith(presenter.view);
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
      if (prop === undefined && this[0].constructor.name === 'SliderView') {
        let element = <ISliderView>this[0];
        if(element.presenter) {
          return element.presenter.getProps(method);
        }
      } else {
        this.each(function () {
          if (this.constructor.name === 'SliderView') {
            let element = <ISliderView>this;
            if(element.presenter) {
              return element.presenter.setProps(method, <number | boolean | string>prop);
            }
          }
        });
        return this;
      }
    }
  }
})(jQuery);