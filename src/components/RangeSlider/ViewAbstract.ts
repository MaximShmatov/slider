abstract class ViewAbstract extends HTMLElement {
  protected leftOrTop: 'left' | 'top' = 'left';

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
}

export default ViewAbstract;
