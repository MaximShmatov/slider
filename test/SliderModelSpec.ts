import SliderModel from '../src/components/range-slider/SliderModel';
import { getHTMLElement, data } from './TestData';

type Func = (title: string, initObj: HTMLElement | ISliderData | FormData) => void

function getTestData(func: Func): void {
  const element = getHTMLElement();
  const formData: FormData = new FormData();
  formData.set('uri', 'http://localhost:9000/slider');
  const title = [
    `Testing model initialized from the "ISliderData": ${JSON.stringify(data)}`,
    `Testing model initialized from the server: address - ${formData.get('uri')}`,
    `Testing model initialized from the "HTMLElement": ${element.outerHTML}`,
  ];
  for (let i = 0; i < 2; i += 1) {
    func(title[0], data);
    // func(title[1], formData);
    func(title[2], element);
  }
}

describe('TESTING MODULE SRC/SLIDER/SLIDERMODEL.TS', () => {
  const spyCallback = jasmine.createSpy('spyCallback');
  const model: SliderModel = new SliderModel(spyCallback);

  getTestData((title: string, initObj: HTMLElement | ISliderData | FormData) => {
    describe(title, () => {
      describe('Testing model initialization', () => {
        beforeAll(async () => {
          spyCallback.calls.reset();
          await expectAsync(model.init(initObj)).toBeResolvedTo(true);
        });
        it('Should be execute callback for "minValue"', () => {
          expect(spyCallback).toHaveBeenCalledWith('minValue', jasmine.anything());
        });
        it('Should be execute callback for "maxValue"', () => {
          expect(spyCallback).toHaveBeenCalledWith('maxValue', jasmine.anything());
        });
        it('Should be execute callback for "valueFrom"', () => {
          expect(spyCallback).toHaveBeenCalledWith('valueFrom', jasmine.anything());
        });
        it('Should be execute callback for "stepSize"', () => {
          expect(spyCallback).toHaveBeenCalledWith('stepSize', jasmine.anything());
        });
        it('Should be execute callback for "onVertical"', () => {
          expect(spyCallback).toHaveBeenCalledWith('onVertical', jasmine.anything());
        });
        it('Should be execute callback for "onTooltip"', () => {
          expect(spyCallback).toHaveBeenCalledWith('onTooltip', jasmine.anything());
        });
        it('Should be execute callback for "onRange"', () => {
          expect(spyCallback).toHaveBeenCalledWith('onRange', jasmine.anything());
        });
        it('Should be execute callback for "onScale"', () => {
          expect(spyCallback).toHaveBeenCalledWith('onScale', jasmine.anything());
        });
        it('Should be execute callback for "serverURL"', () => {
          expect(spyCallback).toHaveBeenCalledWith('serverURL', jasmine.anything());
        });

        it('Property "onVertical" must be defined', () => {
          expect(model.onVertical).toBeDefined();
        });
        it('Property "onTooltip" must be defined', () => {
          expect(model.onTooltip).toBeDefined();
        });
        it('Property "onRange" must be defined', () => {
          expect(model.onRange).toBeDefined();
        });
        it('Property "onScale" must be defined', () => {
          expect(model.onScale).toBeDefined();
        });
        it('Property "serverURL" must be defined', () => {
          expect(model.serverURL).toBeDefined();
        });

        it('"stepSize" should be > 0', () => {
          expect(model.stepSize).toBeGreaterThanOrEqual(0);
        });
        it('"stepSize" should be <= mod(maxValue - minValue)', () => {
          expect(model.stepSize).toBeLessThanOrEqual(model.maxValue - model.minValue);
        });
        it('"minValue" should be <= "valueFrom"', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.valueFrom);
        });
        it('"valueFrom" should be <= "maxValue"', () => {
          expect(model.valueFrom).toBeLessThanOrEqual(model.maxValue);
        });
        if (model.onRange) {
          it('Should be execute callback for "valueTo"', () => {
            expect(spyCallback).toHaveBeenCalledWith('valueTo', jasmine.anything());
          });
          it('"valueTo" should be <= "maxValue"', () => {
            expect(model.valueTo).toBeLessThanOrEqual(model.maxValue);
          });
          it('"valueTo" should be >= "valueFrom"', () => {
            expect(model.valueTo).toBeGreaterThanOrEqual(model.valueFrom);
          });
        }
      });

      describe('Testing setter and getter for "stepSize" property', () => {
        const num = Math.round(Math.random() * 100);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'stepSize', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.stepSize = num;
        });
        it(`Should be called setter with ${num}`, () => {
          expect(spySet).toHaveBeenCalledWith(num);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('stepSize', jasmine.anything());
        });
        it('"stepSize" should be > 0', () => {
          expect(model.stepSize).toBeGreaterThanOrEqual(0);
        });
        it('"stepSize" should be <= mod(maxValue - minValue)', () => {
          expect(model.stepSize).toBeLessThanOrEqual(model.maxValue - model.minValue);
        });
      });

      describe('Testing setter and getter for "minValue" property', () => {
        const num = Math.round(Math.random() * 100);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'minValue', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.minValue = num;
        });
        it(`Should be called setter with ${num}`, () => {
          expect(spySet).toHaveBeenCalledWith(num);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('minValue', jasmine.anything());
        });
        it('"minValue" should be <= "valueFrom"', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.valueFrom);
        });
      });

      describe('Testing setter and getter for "maxValue" property', () => {
        const num = Math.round(Math.random() * 100);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'maxValue', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.maxValue = num;
        });
        it(`Should be called setter with ${num}`, () => {
          expect(spySet).toHaveBeenCalledWith(num);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('maxValue', jasmine.anything());
        });
        if (model.onRange) {
          it('"maxValue" should be >= "valueTo"', () => {
            expect(model.maxValue).toBeGreaterThanOrEqual(model.valueTo);
          });
        } else {
          it('"maxValue" should be >= "valueFrom"', () => {
            expect(model.maxValue).toBeGreaterThanOrEqual(model.valueFrom);
          });
        }
      });

      describe('Testing setter and getter for "valueFrom" property', () => {
        const num = Math.round(Math.random() * 100);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'valueFrom', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.valueFrom = num;
        });
        it(`Should be called setter with ${num}`, () => {
          expect(spySet).toHaveBeenCalledWith(num);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('valueFrom', jasmine.anything());
        });
        if (model.onRange) {
          it('"valueFrom" should be <= "valueTo"', () => {
            expect(model.valueFrom).toBeLessThanOrEqual(model.valueTo);
          });
        } else {
          it('"valueFrom" should be <= "maxValue"', () => {
            expect(model.valueFrom).toBeLessThanOrEqual(model.maxValue);
          });
        }
        it('"valueFrom" should be >= "minValue"', () => {
          expect(model.valueFrom).toBeGreaterThanOrEqual(model.minValue);
        });
      });

      describe('Testing setter and getter for "valueTo" property', () => {
        const num = Math.round(Math.random() * 100);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'valueTo', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.valueTo = num;
        });
        it(`Should be called setter with ${num}`, () => {
          expect(spySet).toHaveBeenCalledWith(num);
        });
        if (model.onRange) {
          it('Should be execute callback', () => {
            expect(spyCallback).toHaveBeenCalledWith('valueTo', jasmine.anything());
          });
          it('"valueTo" should be <= "maxValue"', () => {
            expect(model.valueTo).toBeLessThanOrEqual(model.maxValue);
          });
          it('"valueTo" should be >= "valueFrom"', () => {
            expect(model.valueTo).toBeGreaterThanOrEqual(model.valueFrom);
          });
        }
      });

      describe('Testing setter and getter for "onVertical" property', () => {
        const bool = (Math.round(Math.random()) === 0);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'onVertical', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.onVertical = bool;
        });
        it(`Should be called setter with ${bool}`, () => {
          expect(spySet).toHaveBeenCalledWith(bool);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('onVertical', bool);
        });
        it(`Should be setting ${bool}`, () => {
          expect(model.onVertical).toBe(bool);
        });
      });

      describe('Testing setter and getter for "onRange" property', () => {
        const bool = (Math.round(Math.random()) === 0);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'onRange', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.onRange = bool;
        });
        it(`Should be called setter with ${bool}`, () => {
          expect(spySet).toHaveBeenCalledWith(bool);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('onRange', bool);
        });
        it(`Should be setting ${bool}`, () => {
          expect(model.onRange).toBe(bool);
        });
      });

      describe('Testing setter and getter for "onScale" property', () => {
        const bool = (Math.round(Math.random()) === 0);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'onScale', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.onScale = bool;
        });
        it(`Should be called setter with ${bool}`, () => {
          expect(spySet).toHaveBeenCalledWith(bool);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('onScale', bool);
        });
        it(`Should be setting ${bool}`, () => {
          expect(model.onScale).toBe(bool);
        });
      });

      describe('Testing setter and getter for "onTooltip" property', () => {
        const bool = (Math.round(Math.random()) === 0);
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'onTooltip', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.onTooltip = bool;
        });
        it(`Should be called setter with ${bool}`, () => {
          expect(spySet).toHaveBeenCalledWith(bool);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('onTooltip', bool);
        });
        it(`Should be setting ${bool}`, () => {
          expect(model.onTooltip).toBe(bool);
        });
      });

      describe('Testing setter and getter for "serverURL" property', () => {
        const str = 'http://localhost:9000/slider';
        let spySet: jasmine.Spy;
        beforeAll(() => {
          spySet = spyOnProperty(model, 'serverURL', 'set').and.callThrough();
          spyCallback.calls.reset();
          model.serverURL = str;
        });
        it(`Should be called setter with ${str}`, () => {
          expect(spySet).toHaveBeenCalledWith(str);
        });
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('serverURL', str);
        });
        it(`Should be setting ${str}`, () => {
          expect(model.serverURL).toBe(str);
        });
      });
    });
  });
});
