import Model from '../src/components/RangeSlider/Model';

type TObject = Record<TModelProps, number | boolean>
type TSpyObject = Record<TModelProps, jasmine.Spy>
type TRunFunc = (title: string, data: TObject) => void;

const ITERATION_COUNT = 3;

function runTests(run: TRunFunc): void {
  const getRandom = (val: number) => {
    const newValue = (Math.round(Math.random()) ? (-1 * val) : val);
    return newValue * Math.random();
  };
  const getTestData = () => ({
    minValue: getRandom(100),
    maxValue: getRandom(100),
    valueTo: getRandom(100),
    valueFrom: getRandom(100),
    stepSize: getRandom(10),
    isRange: (Math.round(Math.random()) === 1),
  });
  for (let i = 0; i < ITERATION_COUNT; i += 1) {
    const data = getTestData();
    const title = `Testing model initialized from the part - ${i}: ${JSON.stringify(data)}`;
    run(title, data);
  }
}

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

  runTests((title: string, data: TObject) => {
    describe(title, () => {
      describe('Testing "stepSize" property', () => {
        beforeAll(() => {
          model.stepSize = data.stepSize as number;
        });
        it(`Should be called setter with ${data.stepSize}`, () => {
          expect(spySet.stepSize).toHaveBeenCalledWith(data.stepSize);
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
          model.minValue = data.minValue as number;
        });
        it(`Should be called setter with ${data.minValue}`, () => {
          expect(spySet.minValue).toHaveBeenCalledWith(data.minValue);
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
          model.maxValue = data.maxValue as number;
        });
        it(`Should be called setter with ${data.maxValue}`, () => {
          expect(spySet.maxValue).toHaveBeenCalledWith(data.maxValue);
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
          model.valueFrom = data.valueFrom as number;
        });
        it(`Should be called setter with ${data.valueFrom}`, () => {
          expect(spySet.valueFrom).toHaveBeenCalledWith(data.valueFrom);
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
          model.valueTo = data.valueTo as number;
        });
        it(`Should be called setter with ${data.valueTo}`, () => {
          expect(spySet.valueTo).toHaveBeenCalledWith(data.valueTo);
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
        beforeAll(() => {
          model.isRange = data.isRange as boolean;
        });
        it(`Should be called setter with ${data.isRange}`, () => {
          expect(spySet.isRange).toHaveBeenCalledWith(data.isRange);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('isRange', data.isRange);
        });
        it(`Should be equal ${data.isRange}`, () => {
          expect(model.isRange).toBe(data.isRange as boolean);
        });
      });
    });
  });
});
