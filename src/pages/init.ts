import Control from '../components/control/control';
import '../components/RangeSlider/RangeSlider';
import '../assets/favicon/favicon';
import './index.sass';

(function () {
  const controls: Control[] = [];
  $('.js-main__container').each(function () {
    controls.push(new Control($(this), $(this).find('.js-main__slider')));
  });

  const initObj = {
    minValue: 0,
    maxValue: 100,
    valueFrom: 10,
    valueTo: 90,
    stepSize: 2,
    isRange: true,
    isVertical: false,
    hasScale: true,
    hasTooltip: true,
  };

  controls[0].$rangeSlider.slider('init');
  controls[1].$rangeSlider.slider('init');
  controls[2].$rangeSlider.slider('init');
  controls[3].$rangeSlider.slider('init', initObj);
}());
