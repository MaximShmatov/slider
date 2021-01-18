import '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import '../src/components/RangeSlider/View';
import Model from '../src/components/RangeSlider/Model';
import Presenter from '../src/components/RangeSlider/Presenter';
import run from './TestData';

describe('TESTING MODULE SRC/SLIDER/PRESENTER.TS', () => {
  const props: Map<TModelProps, TViewProps> = new Map([
    ['isRange', 'data-is-range'],
    ['minValue', 'data-min-value'],
    ['maxValue', 'data-max-value'],
    ['valueTo', 'data-value-to'],
    ['valueFrom', 'data-value-from'],
    ['stepSize', 'data-step-size'],
  ]);
  let presenter: Presenter;
  let view: HTMLElement;
  let model: Model;

  beforeAll(() => {
    view = document.createElement('range-slider');
    model = new Model();
    presenter = new Presenter(view, model);
  });

  run((title: string, data: TObject) => {
    describe(title, () => {
      let spySetProp: jasmine.Spy;
      beforeAll(() => {
        spySetProp = spyOn(presenter, 'setProp').and.callThrough();
        presenter.init(data);
      });
      it('Should execute initialization', () => {
        expect(spySetProp.calls.count()).toBe(9);
      });
      it('Should return view ID', () => {
        expect(presenter.id).toBe(view.id);
      });

      describe('Testing properties reading', () => {
        Array.from(props.keys()).forEach((key) => {
          it(`Should read the property "${key}" and return it`, () => {
            expect(presenter.getProp(key)).toBe(model[key]);
          });
        });
        it('Should read the property "hasScale" and return it', () => {
          const prop = (view.getAttribute('data-has-scale') === 'true');
          expect(presenter.getProp('hasScale')).toBe(prop);
        });
        it('Should read the property "hasTooltip" and return it', () => {
          const prop = (view.getAttribute('data-has-tooltip') === 'true');
          expect(presenter.getProp('hasTooltip')).toBe(prop);
        });
        it('Should read the property "isVertical" and return it', () => {
          const prop = (view.getAttribute('data-is-vertical') === 'true');
          expect(presenter.getProp('isVertical')).toBe(prop);
        });
      });

      describe('Testing properties setting', () => {
        Array.from(props.keys()).forEach((key) => {
          it(`Should set the property "${props.get(key)}"`, () => {
            const prop = (view.getAttribute(props.get(key) as TViewProps));
            expect(prop).toBe(String(model[key]));
          });
        });
        it('Should set the property "data-has-scale"', () => {
          const prop = view.getAttribute('data-has-scale');
          expect(prop).toBe(String(data.hasScale));
        });
        it('Should set the property "data-has-tooltip"', () => {
          const prop = view.getAttribute('data-has-tooltip');
          expect(prop).toBe(String(data.hasTooltip));
        });
        it('Should set the property "data-is-vertical"', () => {
          const prop = view.getAttribute('data-is-vertical');
          expect(prop).toBe(String(data.isVertical));
        });
      });
    });
  });
});
