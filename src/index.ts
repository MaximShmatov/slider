import './index.sass';
import './slider/SliderPlugin';

class ControlPanel {
  private readonly $slider: JQuery;
  private readonly $minValue: JQuery;
  private readonly $maxValue: JQuery;
  private readonly $stepSize: JQuery;
  private readonly $valueFrom: JQuery;
  private readonly $valueTo: JQuery;
  private readonly $onScale: JQuery;
  private readonly $onTooltip: JQuery;
  private readonly $onRange: JQuery;
  private readonly $onVertical: JQuery;

  constructor(container: HTMLElement) {
    this.$slider = $(container).find('.input-slider-plugin').slider();
    this.$minValue = $(container)
      .find('.control__min-value')
      //.attr('value', String(this.$slider.slider('minValue')))
      .on('input', this.setMinValue.bind(this));
    this.$maxValue = $(container)
      .find('.control__max-value')
      //.attr('value', String(this.$slider.slider('maxValue')))
      .on('input', this.setMaxValue.bind(this));
    this.$stepSize = $(container)
      .find('.control__step-size')
      //.attr('value', String(this.$slider.slider('stepSize')))
      .on('input', this.setStepSize.bind(this));
    this.$valueFrom = $(container)
      .find('.control__value-from')
      //.attr('value', String(this.$slider.slider('valueFrom')))
      .on('input', this.setValueFrom.bind(this));
    this.$valueTo = $(container)
      .find('.control__value-to')
      //.attr('value', String(this.$slider.slider('valueTo')))
      .on('input', this.setValueTo.bind(this));
    this.$onTooltip = $(container)
      .find('.control__on-tooltip')
      //.prop('checked', this.$slider.slider('onTooltip'))
      .on('change', this.toggleTooltip.bind(this));
    this.$onVertical = $(container)
      .find('.control__on-vertical')
      //.prop('checked', this.$slider.slider('onVertical'))
      .on('change', this.toggleVertical.bind(this));
    this.$onRange = $(container)
      .find('.control__on-range')
      //.prop('checked', this.$slider.slider('onRange'))
      .on('change', this.toggleRange.bind(this));
    this.$onScale = $(container)
      .find('.control__on-scale')
      //.prop('checked', this.$slider.slider('onScale'))
      .on('change', this.toggleScale.bind(this));
    $(document).on('slider-data', this.handleElementEvents.bind(this) as EventListener);
  }

  private setMinValue(): void {
    this.$slider.slider('minValue', <number>this.$minValue.val());
  }

  private setMaxValue(): void {
    this.$slider.slider('maxValue', <number>this.$maxValue.val());
  }

  private setValueFrom(): void {
    this.$slider.slider('valueFrom', <number>this.$valueFrom.val());
  }

  private setValueTo(): void {
    this.$slider.slider('valueTo', <number>this.$valueTo.val());
  }

  private setStepSize(): void {
    this.$slider.slider('stepSize', <number>this.$stepSize.val());
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

  private handleElementEvents(evt: CustomEvent) {
    console.log(evt.target);
    switch (evt.detail.name) {
      case 'minValue':
        this.$minValue.val(evt.detail.value);
        break;
      case 'maxValue':
        this.$maxValue.val(evt.detail.value);
        break;
      case 'valueFrom':
        this.$valueFrom.val(evt.detail.value);
        break;
      case 'valueTo':
        this.$valueTo.val(evt.detail.value);
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
