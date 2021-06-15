import '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import '../src/components/RangeSlider/View';
import Model from '../src/components/RangeSlider/Model';
import Presenter from '../src/components/RangeSlider/Presenter';
import run from './TestData';

describe('TESTING MODULE SRC/SLIDER/PRESENTER.TS', () => {
  let presenter: Presenter;
  let view: HTMLElement;
  let model: Model;

  beforeAll(() => {
    view = document.createElement('range-slider');
    model = new Model();
    presenter = new Presenter(view, model);
  });

  run((title: string, data: TPluginData) => {
    describe(title, () => {
      let newModel: TPluginData;

      beforeAll(() => {
        presenter.setProp(data);
        newModel = presenter.getProp();
      });
      it('Should return view ID', () => {
        expect(presenter.id).toBe(view.id);
      });
      it('Should read and write the property "data-has-scale"', () => {
        const prop = view.getAttribute('data-has-scale');
        expect(prop).toBe(String(newModel.hasScale));
      });
      it('Should read and write set the property "data-has-tooltip"', () => {
        const prop = view.getAttribute('data-has-tooltip');
        expect(prop).toBe(String(newModel.hasTooltip));
      });
      it('Should read and write set the property "data-is-vertical"', () => {
        const prop = view.getAttribute('data-is-vertical');
        expect(prop).toBe(String(newModel.isVertical));
      });
      it('Should read and write the property "data-is-range"', () => {
        const prop = view.getAttribute('data-is-range');
        expect(prop).toBe(String(newModel.isRange));
      });
      it('Should read and write set the property "data-min-value"', () => {
        const prop = view.getAttribute('data-min-value');
        expect(prop).toBe(String(newModel.minValue));
      });
      it('Should read and write set the property "data-max-value"', () => {
        const prop = view.getAttribute('data-max-value');
        expect(prop).toBe(String(newModel.maxValue));
      });
      it('Should read and write the property "data-value-from"', () => {
        const prop = view.getAttribute('data-value-From');
        expect(prop).toBe(String(newModel.valueFrom));
      });
      it('Should read and write set the property "data-value-to"', () => {
        const prop = view.getAttribute('data-value-to');
        expect(prop).toBe(String(newModel.valueTo));
      });
      it('Should read and write set the property "data-step-size"', () => {
        const prop = view.getAttribute('data-step-size');
        expect(prop).toBe(String(newModel.stepSize));
      });
    });
  });
});
