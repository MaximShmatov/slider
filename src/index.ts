import './index.sass';
import './slider/SliderPlugin';

class ControlPanel {
  private readonly $element: JQuery;
  private readonly $minValue: JQuery;
  private readonly $maxValue: JQuery;
  private readonly $stepSize: JQuery;
  private readonly $valueFrom: JQuery;
  private readonly $valueTo: JQuery;

  constructor(element: HTMLElement) {
    this.$element = $(element).find('.input-slider-plugin');
    $(element).find('.control__on-tooltip')
      .prop('checked', this.$element.data('onTooltip'))
      .on('change', this.toggleTooltip.bind(this));
    $(element).find('.control__on-vertical')
      .prop('checked', this.$element.data('onVertical'))
      .on('change', this.toggleVertical.bind(this));
    $(element).find('.control__on-range')
      .prop('checked', this.$element.data('onRange'))
      .on('change', this.toggleRange.bind(this));
    $(element).find('.control__on-scale')
      .prop('checked', this.$element.data('onScale'))
      .on('change', this.toggleScale.bind(this));
    this.$minValue = $(element).find('.control__min-value')
      .attr('value', this.$element.data('minValue'))
      .on('input', this.setMinValue.bind(this));
    this.$maxValue = $(element).find('.control__max-value')
      .attr('value', this.$element.data('maxValue'))
      .on('input', this.setMaxValue.bind(this));
    this.$stepSize = $(element).find('.control__step-size')
      .attr('value', this.$element.data('stepSize'))
      .on('input', this.setStepSize.bind(this));
    this.$valueFrom = $(element).find('.control__value-from')
      .attr('value', this.$element.data('valueFrom'))
      .on('input', this.setValueFrom.bind(this));
    this.$valueTo = $(element).find('.control__value-to')
      .attr('value', this.$element.data('valueTo'))
      .on('input', this.setValueTo.bind(this));
    this.$element.on('slider-data', this.handleElementEvents.bind(this) as EventListener);
  }

  private toggleScale(): void {
    console.log('on scale');
  }

  private toggleTooltip(): void {
    let tooltip = this.$element.attr('data-on-tooltip') === 'true';
    this.$element.attr('data-on-tooltip', String(!tooltip));
  }

  private toggleVertical(): void {
    console.log('on vertical');
  }

  private toggleRange(): void {
    console.log('on range');
  }

  private setMinValue(): void {
    this.$element.attr('data-min-value', String(this.$minValue.val()));
  }

  private setMaxValue(): void {
    this.$element.attr('data-max-value', String(this.$maxValue.val()));
  }

  private setStepSize(): void {
    this.$element.attr('data-step-size', String(this.$stepSize.val()));
  }

  private setValueFrom(): void {
    this.$element.attr('data-value-from', String(this.$valueFrom.val()));
  }
  private setValueTo(): void {
    this.$element.attr('data-value-to', String(this.$valueTo.val()));
  }
  private handleElementEvents(evt: CustomEvent) {

    switch (evt.detail.data) {
      case 'data-value-from':
        this.$valueFrom.val(Number(this.$element.attr('data-value-from')));
        break;
      case 'data-value-to':
        break;
    }
  }
}


let s = $('.input-slider-plugin').slider();
s.slider('setMinValue', '0');
s.slider('setMaxValue', '100');
//let s = $.slider($('.input-slider-plugin'));
//console.log(s.slider.getControl(0));
//console.log($('.input-slider-plugin').sliderAPI.initial());
console.log(s);
//s.sliderAPI.initial();

$('.container').each((index: number, element: HTMLElement) => {
  new ControlPanel(element);
});