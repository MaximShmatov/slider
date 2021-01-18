import '../src/components/RangeSlider/RangeSlider';
import run from './TestData';

describe('TESTING MODULE SRC/SLIDER/PLUGIN.TS', () => {
  const props: Map<TPluginProps, TViewProps> = new Map([
    ['hasTooltip', 'data-has-tooltip'],
    ['hasScale', 'data-has-scale'],
    ['isVertical', 'data-is-vertical'],
    ['minValue', 'data-min-value'],
    ['maxValue', 'data-max-value'],
    ['valueFrom', 'data-value-from'],
    ['valueTo', 'data-value-to'],
    ['stepSize', 'data-step-size'],
    ['isRange', 'data-is-range'],
  ]);
  const testElements = document.createElement('div');
  const element = '<div class="test"></div>';
  testElements.innerHTML = element + element + element;

  run((title: string, data: TObject) => {
    describe(title, () => {
      let $elements: JQuery;
      let spySetAttribute: jasmine.Spy;

      beforeAll(() => {
        document.body.appendChild(testElements);
        $('.test').slider('init', data);
        $elements = $('range-slider');
        spySetAttribute = jasmine.createSpy();
        $elements.eq(0).on('range-slider', spySetAttribute);
      });
      afterAll(() => {
        testElements.remove();
      });
      it('Plugin should initialize elements', () => {
        expect($elements.length).toBe(3);
      });
      Array.from(props.keys()).forEach((prop) => {
        it(`Plugin should reading "${prop}" prop`, () => {
          const value = $elements.eq(0).slider(prop);
          expect(value).toBeDefined();
        });
      });
      Array.from(props.keys()).forEach((prop) => {
        it(`Plugin should setting "${prop}" prop`, () => {
          spySetAttribute.calls.reset();
          $elements.eq(0).slider(prop, data[prop]);
          expect(spySetAttribute).toHaveBeenCalled();
        });
      });
    });
  });
});
