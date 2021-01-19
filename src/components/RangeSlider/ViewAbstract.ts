abstract class ViewAbstract extends HTMLElement {
  private clickOffset = 0;

  private offsetXorY = 0;

  private widthOrHeight = 0;

  protected valuePropName: 'valueFrom' | 'valueTo' = 'valueFrom';

  protected clientXorY: 'clientX' | 'clientY' = 'clientX';

  static get observedAttributes(): string[] {
    return [
      'data-min-value',
      'data-max-value',
      'data-value-from',
      'data-value-to',
      'data-step-size',
      'data-is-range',
      'data-has-scale',
      'data-has-tooltip',
      'data-is-vertical',
      'data-move-from',
      'data-move-to',
      'data-value',
      'data-move',
    ];
  }

  protected calcValue(evt: MouseEvent): number {
    let posInPercent = this.calcPosInPercent(evt);
    if (posInPercent < 0) posInPercent = 0;
    if (posInPercent > 100) posInPercent = 100;
    const min = Number(this.dataset.minValue);
    const max = Number(this.dataset.maxValue);
    return (posInPercent * ((max - min) / 100) + min);
  }

  protected setDirection(evt: MouseEvent): void {
    this.clickOffset = 0;
    const isVertical = (this.dataset.isVertical === 'true');
    this.clientXorY = isVertical ? 'clientY' : 'clientX';

    const rect = this.getBoundingClientRect();
    this.offsetXorY = isVertical ? rect.top : rect.left;
    this.widthOrHeight = isVertical ? rect.height : rect.width;

    const isRange = (this.dataset.isRange === 'true');
    const moveFrom = Number(this.dataset.moveFrom);
    const moveTo = Number(this.dataset.moveTo);
    const posInPercent = this.calcPosInPercent(evt);
    const distanceFrom = posInPercent - moveFrom;
    const distanceTo = posInPercent - moveTo;
    const minValue = Number(this.dataset.minValue);
    const valueFrom = Number(this.dataset.valueFrom);
    const valueTo = Number(this.dataset.valueTo);
    const isNearThumbTo = isRange
      && (Math.abs(distanceFrom) > Math.abs(distanceTo)
        || (distanceFrom === distanceTo
          && ((valueFrom === minValue && valueTo === minValue)
            || posInPercent > moveFrom
          )
        )
      );
    this.valuePropName = isNearThumbTo ? 'valueTo' : 'valueFrom';

    const element = evt.target as HTMLElement;
    const isTooltipOrThumb = element.className === 'slider__thumb-tooltip'
      || element.className === 'slider__thumb';
    if (isTooltipOrThumb) {
      this.clickOffset = isNearThumbTo ? distanceTo : distanceFrom;
    }
  }

  private calcPosInPercent(evt: MouseEvent): number {
    const pos = (evt[this.clientXorY] - this.offsetXorY) / (this.widthOrHeight / 100);
    return (pos - this.clickOffset);
  }
}

export default ViewAbstract;
