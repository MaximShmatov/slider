import Model from '../src/components/RangeSlider/Model';
import run from './TestData';

describe('TESTING MODULE SRC/SLIDER/MODEL.TS', () => {
  let spyCallback: jasmine.Spy;
  let model: Model;
  let modelData: TModelData;

  beforeAll(() => {
    model = new Model();
    modelData = model.read();
    spyCallback = jasmine.createSpy('spyCallback');
    model.setViewAttribute = spyCallback;
  });

  run((title: string, data: TModelData) => {
    describe(title, () => {
      describe('Testing "stepSize" property', () => {
        let stepSize: number;
        beforeAll(() => {
          spyCallback.calls.reset();
          modelData.stepSize = data.stepSize;
          model.write(modelData);
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
          modelData.minValue = data.minValue;
          model.write(modelData);
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
          modelData.maxValue = data.maxValue;
          model.write(modelData);
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
          modelData.valueFrom = data.valueFrom;
          model.write(modelData);
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
          modelData.isRange = true;
          modelData.valueTo = data.valueTo;
          model.write(modelData);
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
          modelData.isRange = data.isRange;
          model.write(modelData);
          isRange = model.read().isRange;
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
