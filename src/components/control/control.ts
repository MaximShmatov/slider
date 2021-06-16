import './constrol.sass';

class Control {
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

  readonly $rangeSlider: JQuery;

  constructor($container: JQuery, $slider: JQuery) {
    this.$container = $container;
    this.$rangeSlider = $slider;
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
    this.$rangeSlider.slider('minValue', Number(this.$minValue.val()));
  }

  private handleMaxValueBlur(): void {
    this.$rangeSlider.slider('maxValue', Number(this.$maxValue.val()));
  }

  private handleValueFromBlur(): void {
    this.$rangeSlider.slider('valueFrom', Number(this.$valueFrom.val()));
  }

  private handleValueToBlur(): void {
    this.$rangeSlider.slider('valueTo', Number(this.$valueTo.val()));
  }

  private handleStepSizeBlur(): void {
    this.$rangeSlider.slider('stepSize', Number(this.$stepSize.val()));
  }

  private handleHasScaleChange(): void {
    const hasScale = this.$hasScale.prop('checked');
    this.$rangeSlider.slider('hasScale', hasScale);
  }

  private handleHasTooltipChange(): void {
    const hasTooltip = this.$hasTooltip.prop('checked');
    this.$rangeSlider.slider('hasTooltip', hasTooltip);
  }

  private handleIsVerticalChange(): void {
    const isVertical = this.$isVertical.prop('checked');
    this.$rangeSlider.slider('isVertical', isVertical);
  }

  private handleIsRangeChange(): void {
    const isRange = this.$isRange.prop('checked');
    this.$rangeSlider.slider('isRange', isRange);
  }

  private setRangeValue() {
    if (this.$rangeSlider.slider('isRange')) {
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

export default Control;
