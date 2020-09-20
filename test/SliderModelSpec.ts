import {SliderModel} from '../src/slider/SliderModel';


describe('Testing module src/slider/SliderModel.ts', () => {
  let spyCallback = jasmine.createSpy('spyCallback');
  const model: SliderModel = new SliderModel(spyCallback);
  const props: TMethodsUnion[] = ['onVertical', 'onRange', 'onTooltip', 'onScale', 'minValue', 'maxValue', 'valueFrom', 'valueTo', 'stepSize', 'serverURL'];
  const spyGetters = jasmine.createSpyObj(props);
  const spySetters = jasmine.createSpyObj(props);


  beforeAll(() => {
    for (let prop of props) {
      spyGetters[prop] = spyOnProperty(model, prop, 'get').and.callThrough();
      spySetters[prop] = spyOnProperty(model, prop, 'set').and.callThrough();
    }
  });

  getTestData((title: string, data: ISliderData, obj: HTMLElement | ISliderData | FormData) => {
    describe(title, () => {
      beforeAll(async () => {
        await expectAsync(model.init(obj)).toBeResolvedTo(true);
      });
      afterAll(() => {
        for (let prop of props) {
          spyGetters[prop].calls.reset();
          spySetters[prop].calls.reset();
        }
        spyCallback.calls.reset();
        console.log(model);
      });
      describe('Model should be initialized', () => {
        for (let key of props) {
          it(`Should be execute callback from "${key}"`, () => {
            expect(spyCallback).toHaveBeenCalledWith(key, jasmine.anything());
          });
        }
      });

      describe(`Property minValue should be valid`, () => {
        it('Should be <= valueFrom property', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.valueFrom);
        });
        it('Should be <= valueTo property', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.valueTo);
        });
        it('Should be < maxValue property', () => {
          expect(model.minValue).toBeLessThan(model.maxValue);
        });
      });

      describe(`Property maxValue should be valid`, () => {
        it(`Should be >= valueTo property`, () => {
          expect(model.maxValue).toBeGreaterThanOrEqual(model.valueTo);
        });
        it(`Should be >= valueFrom property`, () => {
          expect(model.maxValue).toBeGreaterThanOrEqual(model.valueFrom);
        });
        it(`Should be > minValue property`, () => {
          expect(model.maxValue).toBeGreaterThan(model.minValue);
        });
      });
      describe(`Property valueFrom should be valid`, () => {
        it(`Should be >= minValue property`, () => {
          expect(model.valueFrom).toBeGreaterThanOrEqual(model.minValue);
        });
        it(`Should be <= valueTo property`, () => {
          expect(model.valueFrom).toBeLessThanOrEqual(model.valueTo);
        });
        it(`Should be <= maxValue property`, () => {
          expect(model.valueFrom).toBeLessThanOrEqual(model.maxValue);
        });
      });
      describe(`Property valueTo should be valid`, () => {
        it(`Should be >= minValue property`, () => {
          expect(model.valueTo).toBeGreaterThanOrEqual(model.minValue);
        });
        it(`Should be >= valueFrom property`, () => {
          expect(model.valueTo).toBeGreaterThanOrEqual(model.valueFrom);
        });
        it(`Should be <= maxValue property`, () => {
          expect(model.valueTo).toBeLessThanOrEqual(model.maxValue);
        });
      });
      describe(`Property stepSize should be valid`, () => {
        it(`Should be <= (maxValue - minValue)`, () => {
          expect(model.stepSize).toBeLessThanOrEqual(model.maxValue);
        });
        it(`Should be > 0`, () => {
          expect(model.stepSize).toBeGreaterThan(0);
        });
      });
      describe(`Property onVertical should be valid`, () => {
        it(`Should be ${data.onVertical}`, () => {
          expect(model.onVertical).toEqual(data.onVertical);
        });
      });
      describe(`Property onScale should be valid`, () => {
        it(`Should be ${data.onScale}`, () => {
          expect(model.onScale).toEqual(data.onScale);
        });
      });
      describe(`Property onRange should be valid`, () => {
        it(`Should be ${data.onRange}`, () => {
          expect(model.onRange).toEqual(data.onRange);
        });
      });
      describe(`Property onTooltip should be valid`, () => {
        it(`Should be ${data.onTooltip}`, () => {
          expect(model.onTooltip).toEqual(data.onTooltip);
        });
      });
      describe(`Property serverURL should be valid`, () => {
        it(`Should be ${data.serverURL}`, () => {
          expect(model.serverURL).toEqual(data.serverURL);
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
        minValue: 10,
        maxValue: 110,
        valueFrom: 20,
        valueTo: 90,
        stepSize: 1,
        onVertical: false,
        onRange: false,
        onTooltip: false,
        onScale: true,
        serverURL: 'http://localhost:9000/slider'
      },
      {
        minValue: 5,
        maxValue: 8,
        valueFrom: 11,
        valueTo: 28,
        stepSize: 3,
        onRange: true,
        onTooltip: false,
        onVertical: true,
        onScale: false,
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
