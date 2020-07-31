import './index.sass';
import './slider/SliderPlugin';

class ControlPanel {

  constructor(className: string) {
    $(className).each(this.initControlPanel.bind(this));
  }

  private initControlPanel(index: number, element: HTMLElement) {
    $(element)
      .find('.control__on-scale')
      .on('change', this.toggleScale);
    $(element)
      .find('.control__on-tooltip')
      .on('change', this.toggleTooltip);
    $(element)
      .find('.control__on-vertical')
      .on('change', this.toggleVertical);
    $(element)
      .find('.control__on-range')
      .on('change', this.toggleRange);
  }

  private toggleScale(): void {
    console.log('scale');
  }

  private toggleTooltip(): void {
    console.log('toggle');
  }

  private toggleVertical(): void {
    console.log('vertical');
  }

  private toggleRange(): void {
    console.log('range');
  }
}


$('.input-slider-plugin').slider(null);

new ControlPanel('.control');