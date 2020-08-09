import '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import {SliderPresenter} from './SliderPresenter';


;(function ($: JQueryStatic): void {
  $.slider = new SliderPresenter();
  $.fn.slider = function (method?: string, prop?:string) {
    switch (method) {
      case 'setMinValue':
        //console.log('method setMinValue');
        $.slider.setMinValue(this, Number(prop));
        break;
      case 'setMaxValue':
        //console.log('method setMaxValue');
        $.slider.setMaxValue(this, Number(prop));
    }
    return $.slider.init(this);
  }
})(jQuery);