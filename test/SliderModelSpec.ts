import {SliderModel} from '../src/slider/SliderModel';
import SpyObj = jasmine.SpyObj;

describe('Testing module src/slider/SliderModel.ts', () => {
  let model: SliderModel = new SliderModel(callbackFunc.bind(this));
  let callbackTestData: Map<TMethodsUnion, number | boolean | string> = new Map();
  // let resultInitsFromServer: Map<string, number | boolean | URL>[] = [];
  // let checkInitsFromServer: boolean [] = [];
  // let resultInitsFromElement: Map<string, number | boolean | URL>[] = [];
  // let checkInitsFromElement: boolean [] = [];
  // let resultInitsFromObject: Map<string, number | boolean | URL>[] = [];
  // let checkInitsFromObject: boolean [] = [];
  let props: TMethodsUnion[] = ['onVertical', 'onRange', 'onTooltip', 'onScale', 'minValue', 'maxValue', 'valueFrom', 'valueTo', 'stepSize', 'serverURL'];
  //let spySetters: SpyObj<any> = jasmine.createSpyObj('spySetters', props);
  //let spyGetters: SpyObj<any> = jasmine.createSpyObj('spyGetters', props);
  //let testValues: number[] = [-112, 455, 34.5, 0, -11, 10, 0, 120, -28, 0.5, 12.8];
  //testData.set('minValue', 111).set('maxValue', 222);
  // it('Model should be init from server', async () => {
  //    await expectAsync(model.init(getTestForms()[0])).toBeResolvedTo(true);
  //    console.log(model);
  //   //expect(result).toBeTruthy()
  // });
  // beforeAll(() => {
  //   for (let prop of props) {
  //     spySetters[prop] = spyOnProperty(model, prop, 'set').and.callThrough();
  //     //spyGetters[prop] = spyOnProperty(model, prop, 'get').and.callThrough();
  //   }
  // });
  //console.log(spySetters);

  describe('Model should be initialized from server and be valid', () => {
    setTestData(getTestForms(), (data: FormData) => {
      console.log('step-1');
      describe(`Should be initialized from server: variant - ${data.get('variant')}`, () => {
        //let minValueGetSpy: any;
        //let minValueSetSpy: any;
        beforeAll(async () => {
          //minValueGetSpy = spyOnProperty(model, 'minValue', 'get').and.callThrough();
          //minValueSetSpy = spyOnProperty(model, 'minValue', 'set').and.callThrough();
          //console.log('step-3');
          await expectAsync(model.init(data)).toBeResolvedTo(true);
          //console.log(callbackTestData);
          //console.log('step-4');
        });
        // setTestData(props, (key: TMethodsUnion) => {
        //   it(`Should be set property "${key}"`, () => {
        //     expect(spySetters[key]).toHaveBeenCalled();
        //   });
        // });

        console.log('step-2');
        describe(`Property minValue should be reading and be valid`, () => {
          it('Should be <= valueFrom property', () => {
            expect(model.minValue).toBeLessThanOrEqual(model.valueFrom);
          });
          // it('Should be <= valueTo property', () => {
          //   expect(model.minValue).toBeLessThanOrEqual(model.valueTo);
          // });
          // it('Should be <= maxValue property', () => {
          //   expect(model.minValue).toBeLessThanOrEqual(model.maxValue);
          // });
        });
        // describe(`Property maxValue should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'maxValue', 'set');
        //     model.maxValue = model.maxValue;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'maxValue', 'get');
        //     model.maxValue = model.maxValue;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it(`Should be >= valueTo property`, () => {
        //     expect(model.maxValue).toBeGreaterThanOrEqual(model.valueTo);
        //   });
        //   it(`Should be >= valueFrom property`, () => {
        //     expect(model.maxValue).toBeGreaterThanOrEqual(model.valueFrom);
        //   });
        //   it(`Should be >= minValue property`, () => {
        //     expect(model.maxValue).toBeGreaterThanOrEqual(model.minValue);
        //   });
        // });
        // describe(`Property valueFrom should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'valueFrom', 'set');
        //     model.valueFrom = model.valueFrom;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'valueFrom', 'get');
        //     model.valueFrom = model.valueFrom;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it(`Should be >= minValue property`, () => {
        //     expect(model.valueFrom).toBeGreaterThanOrEqual(model.minValue);
        //   });
        //   it(`Should be <= valueTo property`, () => {
        //     expect(model.valueFrom).toBeLessThanOrEqual(model.valueTo);
        //   });
        //   it(`Should be <= maxValue property`, () => {
        //     expect(model.valueFrom).toBeLessThanOrEqual(model.maxValue);
        //   });
        // });
        // describe(`Property valueTo should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'valueTo', 'set');
        //     model.valueTo = model.valueTo;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'valueTo', 'get');
        //     model.valueTo = model.valueTo;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it(`Should be >= minValue property`, () => {
        //     expect(model.valueTo).toBeGreaterThanOrEqual(model.minValue);
        //   });
        //   it(`Should be >= valueFrom property`, () => {
        //     expect(model.valueTo).toBeGreaterThanOrEqual(model.valueFrom);
        //   });
        //   it(`Should be <= maxValue property`, () => {
        //     expect(model.valueTo).toBeLessThanOrEqual(model.maxValue);
        //   });
        // });
        // describe(`Property stepSize should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'stepSize', 'set');
        //     model.stepSize = model.stepSize;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'stepSize', 'get');
        //     model.stepSize = model.stepSize;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it(`Should be <= (maxValue - minValue)`, () => {
        //     expect(model.stepSize).toBeLessThanOrEqual(model.maxValue);
        //   });
        // });
        // describe(`Property onVertical should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'onVertical', 'set');
        //     model.onVertical = model.onVertical;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'onVertical', 'get');
        //     model.onVertical = model.onVertical;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        // });
        // describe(`Property onRange should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'onRange', 'set');
        //     model.onRange = model.onRange;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'onRange', 'get');
        //     model.onRange = model.onRange;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        // });
        // describe(`Property onScale should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'onScale', 'set');
        //     model.onScale = model.onScale;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'onScale', 'get');
        //     model.onScale = model.onScale;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        // });
        // describe(`Property onTooltip should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'onTooltip', 'set');
        //     model.onTooltip = model.onTooltip;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'onTooltip', 'get');
        //     model.onTooltip = model.onTooltip;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        // });
        // describe(`Property serverURL should be defined and be valid`, () => {
        //   it('Should be set property', () => {
        //     let testProp = spyOnProperty(model, 'serverURL', 'set');
        //     //console.log(model.serverURL);
        //     //console.log(model.minValue);
        //     model.serverURL = model.serverURL;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        //   it('Should be get property', () => {
        //     let testProp = spyOnProperty(model, 'serverURL', 'get');
        //     model.serverURL = model.serverURL;
        //     expect(testProp).toHaveBeenCalled();
        //   });
        // });
      });
    });
  });

  function callbackFunc(method: TMethodsUnion, value: number | boolean | string) {
    callbackTestData.set(method, value);
  }

  // function getSpyon(property: TMethodsUnion, method: 'set' | 'get') {
  //   return spyOnProperty(model, property, method);
  // }
  function setTestData(values: ISliderData[] | HTMLElement[] | FormData[] | TMethodsUnion[], func: Function) {
    for (let i = 0; i < values.length; i++) {
      func.apply(Object, [values[i]]);
    }
  }

  function testProps(func: Function) {
    func.apply(Object);
  }

  function testProperties(values: Map<string, number | boolean>, func: Function) {
    values.forEach((val, key, map) => {
      func.apply(Object, [key, val]);
    });
  }

  function getTestElements(): HTMLElement[] {
    let elements: HTMLElement[] = [];
    let data = [
      ['5', '110', '15', '95', '1', 'true', 'true', 'true', 'true'],
      ['3', '98', '15', '85', '2', 'false', 'false', 'false', 'false']
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