class ControlPanel {

  private readonly $container: JQuery;

  private readonly $minValue: JQuery;

  private readonly $maxValue: JQuery;

  private readonly $stepSize: JQuery;

  private readonly $valueFrom: JQuery;

  private readonly $valueTo: JQuery;

  private readonly $isScale: JQuery;

  private readonly $isTooltip: JQuery;

  private readonly $isRange: JQuery;

  private readonly $isVertical: JQuery;

  private readonly $rangeValue: JQuery;

  readonly $plugin: JQuery;

  constructor($container: JQuery) {
    this.$container = $container;
    this.$minValue = $container.find('.control__min-value');
    this.$maxValue = $container.find('.control__max-value');
    this.$valueFrom = $container.find('.control__value-from');
    this.$valueTo = $container.find('.control__value-to');
    this.$stepSize = $container.find('.control__step-size');
    this.$isRange = $container.find('.control__is-range');
    this.$isScale = $container.find('.control__is-scale');
    this.$isVertical = $container.find('.control__is-vertical');
    this.$isTooltip = $container.find('.control__is-tooltip');
    this.$rangeValue = $container.find('.control__value-range');
    this.$plugin = $container.find('.range-slider');
    this.setEventHandlers();
  }

  private setEventHandlers() {
    this.$minValue.on('blur', this.handleMinValueBlur.bind(this));
    this.$maxValue.on('blur', this.handleMaxValueBlur.bind(this));
    this.$valueFrom.on('blur', this.handleValueFromBlur.bind(this));
    this.$valueTo.on('blur', this.handleValueToBlur.bind(this));
    this.$stepSize.on('blur', this.handleStepSizeBlur.bind(this));
    this.$isTooltip.on('change', this.handleIsTooltipChange.bind(this));
    this.$isVertical.on('change', this.handleIsVerticalChange.bind(this));
    this.$isRange.on('change', this.handleIsRangeChange.bind(this));
    this.$isScale.on('change', this.handleIsScaleChange.bind(this));
    this.$container.on('range-slider', this.handlePluginEvents.bind(this) as EventListener);
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

  private handleIsScaleChange(): void {
    const isScale = this.$isScale.prop('checked');
    this.$plugin.slider('isScale', isScale);
  }

  private handleIsTooltipChange(): void {
    const isTooltip = this.$isTooltip.prop('checked');
    this.$plugin.slider('isTooltip', isTooltip);
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
    const valueFrom = Number(this.$valueFrom.val());
    const valueTo = Number(this.$valueTo.val());
    this.$rangeValue.text(valueTo - valueFrom);
  }

  private handlePluginEvents(evt: CustomEvent) {
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
        const isRange = (value === 'true');
        isRange ? this.setRangeValue() : this.$rangeValue.text('Disabled');
        this.$valueTo.prop('disabled', !isRange);
        this.$isRange.prop('checked', isRange);
        break;
      case 'data-is-scale':
        this.$isScale.prop('checked', (value === 'true'));
        break;
      case 'data-is-tooltip':
        this.$isTooltip.prop('checked', (value === 'true'));
        break;
      case 'data-is-vertical':
        this.$isVertical.prop('checked', (value === 'true'));
    }
  }
}

export default ControlPanel;