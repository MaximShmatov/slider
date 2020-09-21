import {SliderModel} from '../src/slider/SliderModel';


describe('TESTING MODULE SRC/SLIDER/SLIDERMODEL.TS', () => {
  const spyCallback = jasmine.createSpy('spyCallback');
  const model: SliderModel = new SliderModel(spyCallback);

  getTestData((title: string, data: ISliderData, initObj: HTMLElement | ISliderData | FormData) => {
    describe(title, () => {
      beforeAll(async () => {
        if (initObj instanceof FormData) {
          await fetch(model.serverURL, {method: 'POST', body: initObj})
            .then(res => res.json())
            .then(obj => {
              initObj = obj;
              data = obj;
            })
            .catch((e) => console.log(e));
        }
      });
      describe('Testing model initialization', () => {
        beforeAll(async () => {
          spyCallback.calls.reset();
          await expectAsync(model.init(initObj)).toBeResolvedTo(true);
        });
        it(`Should be execute callback for "minValue"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('minValue', jasmine.anything());
        });
        it(`Should be execute callback for "maxValue"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('maxValue', jasmine.anything());
        });
        it(`Should be execute callback for "valueFrom"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('valueFrom', jasmine.anything());
        });
        it(`Should be execute callback for "valueTo"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('valueTo', jasmine.anything());
        });
        it(`Should be execute callback for "stepSize"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('stepSize', jasmine.anything());
        });
        it(`Should be execute callback for "onVertical"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('onVertical', jasmine.anything());
        });
        it(`Should be execute callback for "onTooltip"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('onTooltip', jasmine.anything());
        });
        it(`Should be execute callback for "onRange"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('onRange', jasmine.anything());
        });
        it(`Should be execute callback for "onScale"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('onScale', jasmine.anything());
        });
        it(`Should be execute callback for "serverURL"`, () => {
          expect(spyCallback).toHaveBeenCalledWith('serverURL', jasmine.anything());
        });
        it('"minValue" should be <= "valueFrom"', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.valueFrom);
        });
        it('"maxValue" should be >= "valueTo"', () => {
          expect(model.maxValue).toBeGreaterThanOrEqual(model.valueTo);
        });
        it('"valueFrom" should be <= "valueTo"', () => {
          expect(model.valueFrom).toBeLessThanOrEqual(model.valueTo);
        });
        it('"valueFrom" should be >= "minValue"', () => {
          expect(model.valueFrom).toBeGreaterThanOrEqual(model.minValue);
        });
        it('"valueTo" should be <= "maxValue"', () => {
          expect(model.valueTo).toBeLessThanOrEqual(model.maxValue);
        });
        it('"valueTo" should be >= "valueFrom"', () => {
          expect(model.valueTo).toBeGreaterThanOrEqual(model.valueFrom);
        });
        it('"stepSize" should be >= 1', () => {
          expect(model.stepSize).toBeGreaterThanOrEqual(1);
        });
        it('"stepSize" should be <= (maxValue - minValue)', () => {
          expect(model.stepSize).toBeLessThanOrEqual(model.maxValue - model.minValue);
        });
        it('Property "onVertical" must be setting', () => {
          expect(model.onVertical).toEqual(data.onVertical);
        });
        it('Property "onTooltip" must be setting', () => {
          expect(model.onTooltip).toEqual(data.onTooltip);
        });
        it('Property "onRange" must be setting', () => {
          expect(model.onRange).toEqual(data.onRange);
        });
        it('Property "onScale" must be setting', () => {
          expect(model.onScale).toEqual(data.onScale);
        });
        it('Property "serverURL" must be setting', () => {
          expect(model.serverURL).toEqual(data.serverURL);
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
        it('"maxValue" should be >= "valueTo"', () => {
          expect(model.maxValue).toBeGreaterThanOrEqual(model.valueTo);
        });
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
        it('"valueFrom" should be <= "valueTo"', () => {
          if (model.onRange) {
            expect(model.valueFrom).toBeLessThanOrEqual(model.valueTo);
          } else {
            expect(model.valueFrom).toBeLessThanOrEqual(model.maxValue);
          }
        });
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
        it('Should be execute callback', () => {
          expect(spyCallback).toHaveBeenCalledWith('valueTo', jasmine.anything());
        });
        it('"valueTo" should be <= "maxValue"', () => {
          expect(model.valueTo).toBeLessThanOrEqual(model.maxValue);
        });
        it('"valueTo" should be >= "valueFrom"', () => {
          if (model.onRange) {
            expect(model.valueTo).toBeGreaterThanOrEqual(model.valueFrom);
          } else {
            expect(model.valueTo).toBeGreaterThanOrEqual(model.minValue);
          }
        });
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
        const str = 'test string';
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

  function getHTMLElementFromObj(data: ISliderData): HTMLElement {
    const element = document.createElement('input');
    element.setAttribute('data-min-value', data.minValue.toString());
    element.setAttribute('data-max-value', data.maxValue.toString());
    element.setAttribute('data-value-from', data.valueFrom.toString());
    element.setAttribute('data-value-to', data.valueTo.toString());
    element.setAttribute('data-step-size', data.stepSize.toString());
    element.setAttribute('data-on-range', data.onRange.toString());
    element.setAttribute('data-on-scale', data.onScale.toString());
    element.setAttribute('data-on-vertical', data.onVertical.toString());
    element.setAttribute('data-on-tooltip', data.onTooltip.toString());
    element.setAttribute('data-server-u-r-l', data.serverURL.toString());
    return element;
  }

  function getTestData(func: Function): void {
    const data: ISliderData[] = [
      {
        minValue: Math.round(Math.random() * 100),
        maxValue: Math.round(Math.random() * 100),
        valueFrom: Math.round(Math.random() * 100),
        valueTo: Math.round(Math.random() * 100),
        stepSize: Math.round(Math.random() * 100),
        onVertical: Math.round(Math.random()) === 1,
        onRange: Math.round(Math.random()) === 1,
        onTooltip: Math.round(Math.random()) === 1,
        onScale: Math.round(Math.random()) === 1,
        serverURL: 'http://localhost:9000/slider'
      },
      {
        minValue: Math.round(Math.random() * 100),
        maxValue: Math.round(Math.random() * 100),
        valueFrom: Math.round(Math.random() * 100),
        valueTo: Math.round(Math.random() * 100),
        stepSize: Math.round(Math.random() * 100),
        onRange: Math.round(Math.random()) === 1,
        onTooltip: Math.round(Math.random()) === 1,
        onVertical: Math.round(Math.random()) === 1,
        onScale: Math.round(Math.random()) === 1,
        serverURL: 'http://localhost:9000/slider'
      }
    ];
    const element = getHTMLElementFromObj(data[1]);
    const formData: FormData = new FormData();
    formData.set('variant', '0');
    const title = [
      `Testing model initialized from the "ISliderData": ${JSON.stringify(data[0])}`,
      `Testing model initialized from the server: variant - ${formData.get('variant')}`,
      `Testing model initialized from the "HTMLElement": ${element.outerHTML}`
    ];

    func(title[0], data[0], data[0]);
    func(title[1], data[0], formData);
    func(title[2], data[1], element);
  }
});
