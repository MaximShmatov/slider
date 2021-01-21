import Model from '../src/components/RangeSlider/Model';
import run from './TestData';

describe('TESTING MODULE SRC/SLIDER/MODEL.TS', () => {
  let spyCallback: jasmine.Spy;
  let model: Model;

  beforeAll(() => {
    model = new Model();
    spyCallback = jasmine.createSpy('spyCallback');
    model.callback = spyCallback;
  });

  run((title: string, data: TObject) => {
    describe(title, () => {
      describe('Testing "stepSize" property', () => {
        let stepSize: number;
        beforeAll(() => {
          spyCallback.calls.reset();
          model.write({ stepSize: data.stepSize });
          stepSize = model.read().stepSize;
        });
        it('Should be execute callback ', () => {
          expect(spyCallback).toHaveBeenCalledWith('data-step-size', stepSize);
        });
        it('Should be > 0', () => {
          expect(stepSize).toBeGreaterThanOrEqual(0);
        });
        it('Should be <= (maxValue - minValue)', () => {
          const { minValue, maxValue } = model.read();
          expect(stepSize).toBeLessThanOrEqual(maxValue - minValue);
        });
      });

      describe('Testing "minValue" property', () => {
        let minValue: number;
        beforeAll(() => {
          spyCallback.calls.reset();
          model.write({ minValue: data.minValue });
          minValue = model.read().minValue;
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('data-min-value', minValue);
        });
        it('Should be <= "valueFrom"', () => {
          expect(minValue).toBeLessThanOrEqual(model.read().valueFrom);
        });
      });

      describe('Testing "maxValue" property', () => {
        let maxValue: number;
        beforeAll(() => {
          spyCallback.calls.reset();
          model.write({ maxValue: data.maxValue });
          maxValue = model.read().maxValue;
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('data-max-value', maxValue);
        });
        it('"Should be >= "valueTo" if "isRange" = "true", else >= "valueFrom"', () => {
          const { valueFrom, valueTo, isRange } = model.read();
          const valueFromOrTo = (isRange) ? valueTo : valueFrom;
          expect(maxValue).toBeGreaterThanOrEqual(valueFromOrTo);
        });
      });

      describe('Testing "valueFrom" property', () => {
        let valueFrom: number;
        beforeAll(() => {
          spyCallback.calls.reset();
          model.write({ valueFrom: data.valueFrom });
          valueFrom = model.read().valueFrom;
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('data-value-from', valueFrom);
        });
        it('Should be <= "valueTo" if "isRange" = true, else <= "maxValue"', () => {
          const { maxValue, valueTo, isRange } = model.read();
          const valueToOrMax = (isRange) ? valueTo : maxValue;
          expect(valueFrom).toBeLessThanOrEqual(valueToOrMax);
        });
        it('"Should be >= "minValue"', () => {
          expect(valueFrom).toBeGreaterThanOrEqual(model.read().minValue);
        });
      });

      describe('Testing "valueTo" property where "isRange" = "true"', () => {
        let valueTo: number;
        beforeAll(() => {
          spyCallback.calls.reset();
          model.write({ isRange: true });
          model.write({ valueTo: data.valueTo });
          valueTo = model.read().valueTo;
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('data-value-to', valueTo);
        });
        it('Should be <= "maxValue"', () => {
          expect(valueTo).toBeLessThanOrEqual(model.read().maxValue);
        });
        it('"valueTo" should be >= "valueFrom"', () => {
          expect(valueTo).toBeGreaterThanOrEqual(model.read().valueFrom);
        });
      });

      describe('Testing "isRange" property', () => {
        let isRange: boolean;
        beforeAll(() => {
          spyCallback.calls.reset();
          isRange = (data.isRange === 'true');
          model.write({ isRange });
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('data-is-range', isRange);
        });
        it(`Should be equal ${data.isRange}`, () => {
          expect(model.read().isRange).toBe(isRange);
        });
      });
    });
  });
});
