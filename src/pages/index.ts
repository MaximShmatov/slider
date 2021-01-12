import '../components/range-slider/RangeSlider';
import ControlPanel from '../components/ControlPanel';
import './index.sass';

(function ($){
  const plugins: ControlPanel[] = [];
  $('.container').each(function () {
    plugins.push(new ControlPanel($(this)));
  });

  const initObj = {
    minValue: 0,
    maxValue: 100,
    valueFrom: 10,
    valueTo: 90,
    stepSize: 2,
    isRange: true,
    isVertical: false,
    isScale: true,
    isTooltip: true,
  }
  plugins[0].$plugin.slider('init');
  plugins[1].$plugin.slider('init');
  plugins[2].$plugin.slider('init');
  plugins[3].$plugin.slider('init', initObj);
}(window.$))

