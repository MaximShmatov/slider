import './index.sass';
import './slider/SliderPlugin';

class ControlPanel {
  private readonly $slider: JQuery;
  private readonly sliderProps: ISliderModel;
  private readonly $minValue: JQuery;
  private readonly $maxValue: JQuery;
  private readonly $stepSize: JQuery;
  private readonly $valueFrom: JQuery;
  private readonly $valueTo: JQuery;

  constructor(container: HTMLElement) {
    this.$slider = $(container).find('.input-slider-plugin').slider();
    this.sliderProps = this.$slider.slider('getProps');
    $(container)
      .find('.control__on-tooltip')
      .prop('checked', this.sliderProps.onTooltip)
      .on('change', this.toggleTooltip.bind(this));
    $(container)
      .find('.control__on-vertical')
      .prop('checked', this.sliderProps.onVertical)
      .on('change', this.toggleVertical.bind(this));
    $(container)
      .find('.control__on-range')
      .prop('checked', this.sliderProps.onRange)
      .on('change', this.toggleRange.bind(this));
    $(container)
      .find('.control__on-scale')
      .prop('checked', this.sliderProps.onScale)
      .on('change', this.toggleScale.bind(this));
    this.$minValue = $(container)
      .find('.control__min-value')
      .attr('value', this.sliderProps.minValue)
      .on('input', this.setMinValue.bind(this));
    this.$maxValue = $(container)
      .find('.control__max-value')
      .attr('value', this.sliderProps.maxValue)
      .on('input', this.setMaxValue.bind(this));
    this.$stepSize = $(container)
      .find('.control__step-size')
      .attr('value', this.sliderProps.stepSize)
      .on('input', this.setStepSize.bind(this));
    this.$valueFrom = $(container)
      .find('.control__value-from')
      .attr('value', this.sliderProps.valueFrom)
      .on('input', this.setValueFrom.bind(this));
    this.$valueTo = $(container)
      .find('.control__value-to')
      .attr('value', this.sliderProps.valueTo)
      .on('input', this.setValueTo.bind(this));
    this.$slider.on('slider-data', this.handleElementEvents.bind(this) as EventListener);
  }

  private toggleScale(): void {
    this.$slider.slider('onScale', String(!this.sliderProps.onScale));
  }

  private toggleTooltip(): void {
    let tooltip = this.$slider.attr('data-on-tooltip') === 'true';
    this.$slider.attr('data-on-tooltip', String(!tooltip));
  }

  private toggleVertical(): void {
    console.log('on vertical');
  }

  private toggleRange(): void {
    console.log('on range');
  }

  private setMinValue(): void {
    this.$slider.slider('setMinValue', <string>this.$minValue.val());
  }

  private setMaxValue(): void {
    this.$slider.slider('setMaxValue', <string>this.$maxValue.val());
  }

  private setStepSize(): void {
    //this.$slider.slider('setStepSize', <string>this.$stepSize.val());
  }

  private setValueFrom(): void {
    //this.$slider.slider('setValueFrom', <string>this.$valueFrom.val());
  }

  private setValueTo(): void {
    //this.$slider.slider('setValueTo', <string>this.$valueTo.val());
  }

  private handleElementEvents(evt: CustomEvent) {

    switch (evt.detail.data) {
      case 'data-value-from':
        this.$valueFrom.val(Number(this.$slider.attr('data-value-from')));
        break;
      case 'data-value-to':
        break;
    }
  }
}

$('.container').each(function () {
  new ControlPanel(this);
});