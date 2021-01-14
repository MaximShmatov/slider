import '../components/RangeSlider/RangeSlider';
import '../assets/favicon/favicon';
import './index.sass';

class ControlPanel {
  private readonly $container: JQuery;

  private readonly $minValue: JQuery;

  private readonly $maxValue: JQuery;

  private readonly $stepSize: JQuery;

  private readonly $valueFrom: JQuery;

  private readonly $valueTo: JQuery;

  private readonly $hasScale: JQuery;

  private readonly $hasTooltip: JQuery;

  private readonly $isRange: JQuery;

  private readonly $isVertical: JQuery;

  private readonly $rangeValue: JQuery;

  readonly $plugin: JQuery;

  constructor($container: JQuery) {
    this.$container = $container;
    this.$minValue = $container.find('.js-control__min-value');
    this.$maxValue = $container.find('.js-control__max-value');
    this.$valueFrom = $container.find('.js-control__from-value');
    this.$valueTo = $container.find('.js-control__to-value');
    this.$stepSize = $container.find('.js-control__step-size');
    this.$isRange = $container.find('.js-control__is-range');
    this.$hasScale = $container.find('.js-control__has-scale');
    this.$isVertical = $container.find('.js-control__is-vertical');
    this.$hasTooltip = $container.find('.js-control__has-tooltip');
    this.$rangeValue = $container.find('.js-control__range-value');
    this.$plugin = $container.find('.js-range-slider');
    this.setEventHandlers();
  }

  private setEventHandlers() {
    this.$minValue.on('blur', this.handleMinValueBlur.bind(this));
    this.$maxValue.on('blur', this.handleMaxValueBlur.bind(this));
    this.$valueFrom.on('blur', this.handleValueFromBlur.bind(this));
    this.$valueTo.on('blur', this.handleValueToBlur.bind(this));
    this.$stepSize.on('blur', this.handleStepSizeBlur.bind(this));
    this.$hasTooltip.on('change', this.handleHasTooltipChange.bind(this));
    this.$isVertical.on('change', this.handleIsVerticalChange.bind(this));
    this.$isRange.on('change', this.handleIsRangeChange.bind(this));
    this.$hasScale.on('change', this.handleHasScaleChange.bind(this));
    this.$container.on('range-slider', this.handlePluginEvents.bind(this));
  }

  private handleMinValueBlur(): void {
    this.$plugin.slider('minValue', String(this.$minValue.val()));
  }

  private handleMaxValueBlur(): void {
    this.$plugin.slider('maxValue', String(this.$maxValue.val()));
  }

  private handleValueFromBlur(): void {
    this.$plugin.slider('valueFrom', String(this.$valueFrom.val()));
  }

  private handleValueToBlur(): void {
    this.$plugin.slider('valueTo', String(this.$valueTo.val()));
  }

  private handleStepSizeBlur(): void {
    this.$plugin.slider('stepSize', String(this.$stepSize.val()));
  }

  private handleHasScaleChange(): void {
    const hasScale = this.$hasScale.prop('checked');
    this.$plugin.slider('hasScale', hasScale);
  }

  private handleHasTooltipChange(): void {
    const hasTooltip = this.$hasTooltip.prop('checked');
    this.$plugin.slider('hasTooltip', hasTooltip);
  }

  private handleIsVerticalChange(): void {
    const isVertical = this.$isVertical.prop('checked');
    this.$plugin.slider('isVertical', isVertical);
  }

  private handleIsRangeChange(): void {
    const isRange = this.$isRange.prop('checked');
    this.$plugin.slider('isRange', String(isRange));
  }

  private setRangeValue() {
    if (this.$plugin.slider('isRange')) {
      const valueFrom = Number(this.$valueFrom.val());
      const valueTo = Number(this.$valueTo.val());
      this.$rangeValue.val(valueTo - valueFrom);
    } else this.$rangeValue.val('Disabled');
  }

  private handlePluginEvents(evt: Event) {
    const { name, value } = evt.detail;
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
      case 'data-is-range':
        this.setRangeValue();
        this.$valueTo.prop('disabled', (value === 'false'));
        this.$isRange.prop('checked', (value === 'true'));
        break;
      case 'data-has-scale':
        this.$hasScale.prop('checked', (value === 'true'));
        break;
      case 'data-has-tooltip':
        this.$hasTooltip.prop('checked', (value === 'true'));
        break;
      case 'data-is-vertical':
        this.$isVertical.prop('checked', (value === 'true'));
    }
  }
}

(function ($) {
  const plugins: ControlPanel[] = [];
  $('.js-container').each(function () {
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
    hasScale: true,
    hasTooltip: true,
  };

  plugins[0].$plugin.slider('init');
  plugins[1].$plugin.slider('init');
  plugins[2].$plugin.slider('init');
  plugins[3].$plugin.slider('init', initObj);
}(window.$));
