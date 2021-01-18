import Model from '../src/components/RangeSlider/Model';
import run from './TestData';

describe('TESTING MODULE SRC/SLIDER/MODEL.TS', () => {
  let spyCallback: jasmine.Spy;
  let spySet: TSpyObject;
  let model: Model;

  beforeAll(() => {
    const setMethods: TModelProps[] = [
      'minValue', 'maxValue', 'valueFrom', 'valueTo', 'stepSize', 'isRange',
    ];
    const reducer = (acc: TSpyObject, current: TModelProps) => {
      acc[current] = spyOnProperty(model, current, 'set').and.callThrough();
      return acc;
    };
    model = new Model();
    spySet = setMethods.reduce(reducer, {} as TSpyObject);
    spyCallback = jasmine.createSpy('spyCallback');
    model.callback = spyCallback;
  });

  run((title: string, data: TObject) => {
    describe(title, () => {
      describe('Testing "stepSize" property', () => {
        beforeAll(() => {
          model.stepSize = Number(data.stepSize);
        });
        it(`Should be called setter with ${data.stepSize}`, () => {
          expect(spySet.stepSize).toHaveBeenCalledWith(Number(data.stepSize));
        });
        it('Should be execute callback ', () => {
          expect(spyCallback).toHaveBeenCalledWith('stepSize', jasmine.anything());
        });
        it('Should be > 0', () => {
          expect(model.stepSize).toBeGreaterThanOrEqual(0);
        });
        it('Should be <= (maxValue - minValue)', () => {
          expect(model.stepSize).toBeLessThanOrEqual(model.maxValue - model.minValue);
        });
      });

      describe('Testing "minValue" property', () => {
        beforeAll(() => {
          model.minValue = Number(data.minValue);
        });
        it(`Should be called setter with ${data.minValue}`, () => {
          expect(spySet.minValue).toHaveBeenCalledWith(Number(data.minValue));
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('minValue', jasmine.anything());
        });
        it('Should be <= "valueFrom"', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.valueFrom);
        });
      });

      describe('Testing "maxValue" property', () => {
        beforeAll(() => {
          model.maxValue = Number(data.maxValue);
        });
        it(`Should be called setter with ${data.maxValue}`, () => {
          expect(spySet.maxValue).toHaveBeenCalledWith(Number(data.maxValue));
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('maxValue', jasmine.anything());
        });
        it('"Should be >= "valueTo" if "isRange" = "true", else >= "valueFrom"', () => {
          const valueFromOrTo = (model.isRange) ? model.valueTo : model.valueFrom;
          expect(model.maxValue).toBeGreaterThanOrEqual(valueFromOrTo);
        });
      });

      describe('Testing "valueFrom" property', () => {
        beforeAll(() => {
          model.valueFrom = Number(data.valueFrom);
        });
        it(`Should be called setter with ${data.valueFrom}`, () => {
          expect(spySet.valueFrom).toHaveBeenCalledWith(Number(data.valueFrom));
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('valueFrom', jasmine.anything());
        });
        it('Should be <= "valueTo" if "isRange" = true, else <= "maxValue"', () => {
          const valueToOrMax = (model.isRange) ? model.valueTo : model.maxValue;
          expect(model.valueFrom).toBeLessThanOrEqual(valueToOrMax);
        });
        it('"Should be >= "minValue"', () => {
          expect(model.valueFrom).toBeGreaterThanOrEqual(model.minValue);
        });
      });

      describe('Testing "valueTo" property where "isRange" = "true"', () => {
        beforeAll(() => {
          model.isRange = true;
          model.valueTo = Number(data.valueTo);
        });
        it(`Should be called setter with ${data.valueTo}`, () => {
          expect(spySet.valueTo).toHaveBeenCalledWith(Number(data.valueTo));
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('valueTo', jasmine.anything());
        });
        it('Should be <= "maxValue"', () => {
          expect(model.valueTo).toBeLessThanOrEqual(model.maxValue);
        });
        it('"valueTo" should be >= "valueFrom"', () => {
          expect(model.valueTo).toBeGreaterThanOrEqual(model.valueFrom);
        });
      });

      describe('Testing "isRange" property', () => {
        let isRange: boolean;
        beforeAll(() => {
          isRange = (data.isRange === 'true');
          model.isRange = (data.isRange === 'true');
        });
        it(`Should be called setter with ${data.isRange}`, () => {
          expect(spySet.isRange).toHaveBeenCalledWith(isRange);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('isRange', isRange);
        });
        it(`Should be equal ${data.isRange}`, () => {
          expect(model.isRange).toBe(isRange);
        });
      });
    });
  });
});
