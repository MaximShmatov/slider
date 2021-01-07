import '../components/range-slider/SliderPlugin';
import './index.sass';

class ControlPanel {
  private readonly $slider: any;

  private readonly $minValue: JQuery;

  private readonly $maxValue: JQuery;

  private readonly $stepSize: JQuery;

  private readonly $valueFrom: JQuery;

  private readonly $valueTo: JQuery;

  private readonly $valueRange: JQuery;

  private readonly $isScale: JQuery;

  private readonly $isTooltip: JQuery;

  private readonly $isRange: JQuery;

  private readonly $isVertical: JQuery;

  constructor($container: JQuery) {
    this.$minValue = $container
      .find('.control__min-value')
      .on('blur', this.handleMinValueBlur.bind(this));
    this.$maxValue = $container
      .find('.control__max-value')
      .on('blur', this.handleMaxValueBlur.bind(this));
    this.$stepSize = $container
      .find('.control__step-size')
      .on('blur', this.handleStepSizeBlur.bind(this));
    this.$valueFrom = $container
      .find('.control__value-from')
      .on('blur', this.handleValueFromBlur.bind(this));
    this.$valueTo = $container
      .find('.control__value-to')
      .on('blur', this.handleValueToBlur.bind(this));
    this.$valueRange = $container.find('.control__value-range');
    this.$isTooltip = $container
      .find('.control__is-tooltip')
      .on('change', this.handleIsTooltipChange.bind(this));
    this.$isVertical = $container
      .find('.control__is-vertical')
      .on('change', this.handleIsVerticalChange.bind(this));
    this.$isRange = $container
      .find('.control__is-range')
      .on('change', this.handleIsRangeChange.bind(this));
    this.$isScale = $container
      .find('.control__is-scale')
      .on('change', this.handleIsScaleChange.bind(this));
    this.$slider = $container
      .on('range-slider', this.handleContainerEvents.bind(this) as EventListener)
      .find('.range-slider')
      .slider('init');
  }

  private handleMinValueBlur(): void {
    this.$slider.slider('minValue', Number(this.$minValue.val()));
  }

  private handleMaxValueBlur(): void {
    this.$slider.slider('maxValue', Number(this.$maxValue.val()));
  }

  private handleValueFromBlur(): void {
    this.$slider.slider('valueFrom', Number(this.$valueFrom.val()));
  }

  private handleValueToBlur(): void {
    this.$slider.slider('valueTo', Number(this.$valueTo.val()));
  }

  private handleStepSizeBlur(): void {
    this.$slider.slider('stepSize', Number(this.$stepSize.val()));
  }

  private handleIsScaleChange(): void {
    this.$slider.slider('isScale', !this.$slider.slider('isScale'));
  }

  private handleIsTooltipChange(): void {
    this.$slider.slider('isTooltip', !this.$slider.slider('isTooltip'));
  }

  private handleIsVerticalChange(): void {
    this.$slider.slider('isVertical', !this.$slider.slider('isVertical'));
  }

  private handleIsRangeChange(): void {
    this.$slider.slider('isRange', !this.$slider.slider('isRange'));
  }

  private setRangeValue() {
    this.$valueRange.text(Number(this.$valueTo.val()) - Number(this.$valueFrom.val()));
  }

  private handleContainerEvents(evt: CustomEvent) {
    const {name, value} = evt.detail;
    switch (name) {
      case 'data-min-value':
        this.$minValue.val(value);
        break;
      case 'data-max-value':
        this.$maxValue.val(value);
        break;
      case 'data-value-from':
        this.$valueFrom.val(value);
        this.setRangeValue();
        break;
      case 'data-value-to':
        this.$valueTo.val(value);
        this.setRangeValue();
        break;
      case 'data-step-size':
        this.$stepSize.val(value);
        break;
      case 'data-is-scale':
        this.$isScale.prop('checked', value === 'true');
        break;
      case 'data-is-tooltip':
        this.$isTooltip.prop('checked', value === 'true');
        break;
      case 'data-is-range':
        this.$isRange.prop('checked', value === 'true');
        break;
      case 'data-is-vertical':
        this.$isVertical.prop('checked', value === 'true');
        break;
      default:
    }
  }
}

const plugins = [];

window.$('.container').each(function () {
  plugins.push(new ControlPanel(window.$(this)));
});

//const p = window.$('.range-slider').slider('minValue', '-1').slider('maxValue');

//const c = window.$('.range-slider').slider('maxValue');

//console.log(p)
