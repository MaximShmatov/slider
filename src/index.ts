import './index.sass';
import './slider/SliderPlugin';

class ControlPanel {
  private readonly $slider: JQuery;
  private readonly $minValue: JQuery;
  private readonly $maxValue: JQuery;
  private readonly $stepSize: JQuery;
  private readonly $valueFrom: JQuery;
  private readonly $valueTo: JQuery;
  private readonly $valueRange: JQuery;
  private readonly $onScale: JQuery;
  private readonly $onTooltip: JQuery;
  private readonly $onRange: JQuery;
  private readonly $onVertical: JQuery;

  constructor(container: HTMLElement) {
    this.$minValue = $(container)
      .find('.control__min-value')
      .on('input', this.setMinValue.bind(this));
    this.$maxValue = $(container)
      .find('.control__max-value')
      .on('input', this.setMaxValue.bind(this));
    this.$stepSize = $(container)
      .find('.control__step-size')
      .on('input', this.setStepSize.bind(this));
    this.$valueFrom = $(container)
      .find('.control__value-from')
      .on('input', this.setValueFrom.bind(this));
    this.$valueTo = $(container)
      .find('.control__value-to')
      .on('input', this.setValueTo.bind(this));
    this.$valueRange = $(container).find('.control__value-range');
    this.$onTooltip = $(container)
      .find('.control__on-tooltip')
      .on('change', this.toggleTooltip.bind(this));
    this.$onVertical = $(container)
      .find('.control__on-vertical')
      .on('change', this.toggleVertical.bind(this));
    this.$onRange = $(container)
      .find('.control__on-range')
      .on('change', this.toggleRange.bind(this));
    this.$onScale = $(container)
      .find('.control__on-scale')
      .on('change', this.toggleScale.bind(this));
    this.$slider = $(container)
      .on('slider-data', this.handleContainerEvents.bind(this) as EventListener)
      .find('.input-slider-plugin')
      .slider();
  }

  private setMinValue(): void {
    this.$slider.slider('minValue', Number(this.$minValue.val()));
  }

  private setMaxValue(): void {
    this.$slider.slider('maxValue', Number(this.$maxValue.val()));
  }

  private setValueFrom(): void {
    this.$slider.slider('valueFrom', Number(this.$valueFrom.val()));
  }

  private setValueTo(): void {
    this.$slider.slider('valueTo', Number(this.$valueTo.val()));
  }

  private setStepSize(): void {
    this.$slider.slider('stepSize', Number(this.$stepSize.val()));
  }

  private toggleScale(): void {
    this.$slider.slider('onScale', !this.$slider.slider('onScale'));
  }

  private toggleTooltip(): void {
    this.$slider.slider('onTooltip', !this.$slider.slider('onTooltip'));
  }

  private toggleVertical(): void {
    this.$slider.slider('onVertical', !this.$slider.slider('onVertical'));
  }

  private toggleRange(): void {
    this.$slider.slider('onRange', !this.$slider.slider('onRange'));
  }

  private setRangeValue() {
    this.$valueRange.val(Number(this.$valueTo.val()) - Number(this.$valueFrom.val()));
  }

  private handleContainerEvents(evt: CustomEvent) {
    switch (evt.detail.name) {
      case 'minValue':
        this.$minValue.val(evt.detail.value);
        break;
      case 'maxValue':
        this.$maxValue.val(evt.detail.value);
        break;
      case 'valueFrom':
        this.$valueFrom.val(evt.detail.value);
        this.setRangeValue();
        break;
      case 'valueTo':
        this.$valueTo.val(evt.detail.value);
        this.setRangeValue();
        break;
      case 'stepSize':
        this.$stepSize.val(evt.detail.value);
        break;
      case 'onScale':
        this.$onScale.prop('checked', evt.detail.value);
        break;
      case 'onTooltip':
        this.$onTooltip.prop('checked', evt.detail.value);
        break;
      case 'onRange':
        this.$onRange.prop('checked', evt.detail.value);
        break;
      case 'onVertical':
        this.$onVertical.prop('checked', evt.detail.value);
    }
  }
}

$('.container').each(function () {
  new ControlPanel(this);
});
