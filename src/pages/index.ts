import '../components/range-slider/RangeSlider';
import './index.sass';

class ControlPanel {

  private readonly $slider: JQuery;

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
    this.$isScale.prop('checked', this.$slider.slider('isScale'));
    this.$isTooltip.prop('checked', this.$slider.slider('isTooltip'));
    this.$isRange.prop('checked', this.$slider.slider('isRange'));
    this.$isVertical.prop('checked', this.$slider.slider('isVertical'));
    const isRange = !this.$slider.slider('isRange');
    this.$valueTo.prop('disabled', isRange);
    isRange ? this.$valueRange.text('Disabled') : this.setRangeValue();
  }

  private handleMinValueBlur(): void {
    this.$slider.slider('minValue', String(this.$minValue.val()));
  }

  private handleMaxValueBlur(): void {
    this.$slider.slider('maxValue', String(this.$maxValue.val()));
  }

  private handleValueFromBlur(): void {
    this.$slider.slider('valueFrom', String(this.$valueFrom.val()));
  }

  private handleValueToBlur(): void {
    this.$slider.slider('valueTo', String(this.$valueTo.val()));
  }

  private handleStepSizeBlur(): void {
    this.$slider.slider('stepSize', String(this.$stepSize.val()));
  }

  private handleIsScaleChange(): void {
    const isScale = String(!this.$slider.slider('isScale'));
    this.$slider.slider('isScale', isScale);
  }

  private handleIsTooltipChange(): void {
    const isTooltip = String(!this.$slider.slider('isTooltip'));
    this.$slider.slider('isTooltip', isTooltip);
  }

  private handleIsVerticalChange(): void {
    const isVertical = String(!this.$slider.slider('isVertical'));
    this.$slider.slider('isVertical', isVertical);
  }

  private handleIsRangeChange(): void {
    const isRange = this.$slider.slider('isRange');
    this.$slider.slider('isRange', String(!isRange));
    this.$valueTo.prop('disabled', isRange);
    isRange ? this.$valueRange.text('Disabled') : this.setRangeValue();
  }

  private setRangeValue() {
    this.$valueRange.text(Number(this.$valueTo.val()) - Number(this.$valueFrom.val()));
  }

  private handleContainerEvents(evt: CustomEvent) {
    const {name, value} = evt.detail;
    switch (name) {
      case 'minValue':
        this.$minValue.val(value);
        break;
      case 'maxValue':
        this.$maxValue.val(value);
        break;
      case 'valueFrom':
        this.$valueFrom.val(value);
        this.setRangeValue();
        break;
      case 'valueTo':
        this.$valueTo.val(value);
        this.setRangeValue();
        break;
      case 'stepSize':
        this.$stepSize.val(value);
    }
  }
}

const plugins = [];

window.$('.container').each(function () {
  plugins.push(new ControlPanel(window.$(this)));
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
window.$('.init-from-object').slider('init', initObj);