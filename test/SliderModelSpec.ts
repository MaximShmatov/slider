import {SliderModel} from '../src/slider/SliderModel';

describe('Testing module src/slider/SliderModel.ts', () => {
  let model: SliderModel = new SliderModel(() => {});
  let props: TMethodsUnion[] = ['onVertical', 'onRange', 'onTooltip', 'onScale', 'minValue', 'maxValue', 'valueFrom', 'valueTo', 'stepSize', 'serverURL'];
  let spyGetters = jasmine.createSpyObj('spyGetters', props);
  let spySetters = jasmine.createSpyObj('spySetters', props);

  getTestData((title: string, data: FormData | HTMLElement | ISliderData) => {
    describe(title, () => {
      let spyCallback: jasmine.Spy;
      beforeAll(async () => {
        spyCallback = spyOn(model, <any>'_observer');
        for (let prop of props) {
          spyGetters[prop] = spyOnProperty(model, prop, 'get').and.callThrough();
          spySetters[prop] = spyOnProperty(model, prop, 'set').and.callThrough();
        }
        await expectAsync(model.init(data)).toBeResolvedTo(true);
      });
      for (let key of props) {
        it(`Should be set property "${key}"`, () => {
          expect(spySetters[key]).toHaveBeenCalled();
        });
        it(`Should be execute callback from "${key}"`, () => {
          expect(spyCallback).toHaveBeenCalledWith(key, model[key]);
        });
      }

      describe(`Property minValue should be valid`, () => {
        it(`Should be get property`, () => {
          model.minValue;
          expect(spyGetters.minValue).toHaveBeenCalled();
        });
        it('Should be <= valueFrom property', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.valueFrom);
        });
        it('Should be <= valueTo property', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.valueTo);
        });
        it('Should be <= maxValue property', () => {
          expect(model.minValue).toBeLessThanOrEqual(model.maxValue);
        });
      });

      describe(`Property maxValue should be valid`, () => {
        it(`Should be get property`, () => {
          model.maxValue;
          expect(spyGetters.maxValue).toHaveBeenCalled();
        });
        it(`Should be >= valueTo property`, () => {
          expect(model.maxValue).toBeGreaterThanOrEqual(model.valueTo);
        });
        it(`Should be >= valueFrom property`, () => {
          expect(model.maxValue).toBeGreaterThanOrEqual(model.valueFrom);
        });
        it(`Should be >= minValue property`, () => {
          expect(model.maxValue).toBeGreaterThanOrEqual(model.minValue);
        });
      });
      describe(`Property valueFrom should be valid`, () => {
        it(`Should be get property`, () => {
          model.valueFrom;
          expect(spyGetters.valueFrom).toHaveBeenCalled();
        });
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
        it(`Should be get property`, () => {
          model.valueTo;
          expect(spyGetters.valueTo).toHaveBeenCalled();
        });
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
        it(`Should be get property`, () => {
          model.stepSize;
          expect(spyGetters.stepSize).toHaveBeenCalled();
        });
        it(`Should be <= (maxValue - minValue)`, () => {
          expect(model.stepSize).toBeLessThanOrEqual(model.maxValue);
        });
      });
      describe(`Property onVertical should be valid`, () => {
        it(`Should be get property`, () => {
          model.onVertical;
          expect(spyGetters.onVertical).toHaveBeenCalled();
        });
      });
      describe(`Property onScale should be valid`, () => {
        it(`Should be get property`, () => {
          model.onScale;
          expect(spyGetters.onScale).toHaveBeenCalled();
        });
      });
      describe(`Property onRange should be valid`, () => {
        it(`Should be get property`, () => {
          model.onRange;
          expect(spyGetters.onRange).toHaveBeenCalled();
        });
      });
      describe(`Property onTooltip should be valid`, () => {
        it(`Should be get property`, () => {
          model.onTooltip;
          expect(spyGetters.onTooltip).toHaveBeenCalled();
        });
      });
      describe(`Property serverURL should be valid`, () => {
        it(`Should be get property`, () => {
          model.serverURL;
          expect(spyGetters.serverURL).toHaveBeenCalled();
        });
      });
    });
  });

  function getTestData(func: Function): void {
    let element = getTestElements();
    let obj = getTestObjects();
    let form = getTestForms();
    for (let i = 0; i < obj.length; i++) {
      func.apply(Object, [`Should be initialized from object: ${JSON.stringify(obj[i])}`, obj[i]]);
    }
    for (let i = 0; i < form.length; i++) {
      func.apply(Object, [`Should be initialized from server: variant - ${form[i].get('variant')}`, form[i]]);
    }
    for (let i = 0; i < element.length; i++) {
      func.apply(Object, [`Should be initialized from element: ${element[i].outerHTML}}`, element[i]]);
    }
  }

  function getTestElements(): HTMLElement[] {
    let elements: HTMLElement[] = [];
    let data = [
      ['5', '110', '15', '95', '1', 'true', 'true', 'true', 'true', 'http://localhost:9000/slider'],
      ['3', '98', '15', '85', '2', 'false', 'false', 'false', 'false', 'http://localhost:9000/slider']
    ]
    for (let i = 0; i <= 1; i++) {
      elements[i] = document.createElement('div');
      elements[i].setAttribute('data-min-value', data[i][0]);
      elements[i].setAttribute('data-max-value', data[i][1]);
      elements[i].setAttribute('data-value-from', data[i][2]);
      elements[i].setAttribute('data-value-to', data[i][3]);
      elements[i].setAttribute('data-step-size', data[i][4]);
      elements[i].setAttribute('data-on-range', data[i][5]);
      elements[i].setAttribute('data-on-scale', data[i][6]);
      elements[i].setAttribute('data-on-vertical', data[i][7]);
      elements[i].setAttribute('data-on-tooltip', data[i][8]);
      elements[i].setAttribute('data-server-u-r-l', data[i][9]);
    }
    return elements;
  }

  function getTestForms(): FormData[] {
    let forms: FormData[] = [];
    for (let i = 0; i <= 1; i++) {
      forms[i] = new FormData();
      forms[i].append('variant', i.toString());
    }
    return forms;
  }

  function getTestObjects(): ISliderData[] {
    return [
      {
        minValue: 10,
        maxValue: 120,
        valueFrom: 20,
        valueTo: 110,
        stepSize: 2,
        onRange: true,
        onTooltip: true,
        onVertical: true,
        onScale: true,
        serverURL: 'http://localhost:9000/slider'
      },
      {
        minValue: 11,
        maxValue: 210,
        valueFrom: 32,
        valueTo: 190,
        stepSize: 11,
        onRange: false,
        onTooltip: false,
        onVertical: false,
        onScale: false,
        serverURL: 'http://localhost:9000/slider'
      }
    ];
  }
});