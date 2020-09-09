import {SliderModel} from '../src/slider/SliderModel';

describe('src/slider/SliderModel.ts tests', () => {
  let model: SliderModel = new SliderModel(callbackFunc.bind(this));
  let methods: TMethodsUnion[] = ['onVertical', 'onRange', 'onTooltip', 'onScale', 'minValue', 'maxValue', 'valueFrom', 'valueTo', 'stepSize'];
  let testData: Map<string, number | boolean> = new Map();
  let testValues: number[] = [-112, 455, 34.5, 0, -11, 10, 0, 120, -28, 0.5, 12.8];
  //testData.set('minValue', 111).set('maxValue', 222);

  it('Model should be init from server', async () => {
    let result = await model.init(getTestForms()[0]);
    expect(result).toBeTruthy();
  });
  describe('Model should be init from HTMLElement', () => {
    initModel(getTestElements(), (data: HTMLElement) => {
      describe(`HTMLElement: ${data.outerHTML}`, () => {
        for (let i = 0; i < methods.length; i++) {
          it(`Property ${methods[i]} should be defined (${model[methods[i]]})`, () => {
            expect(model[methods[i]]).toBeDefined('undefined');
          });
        }
      });
    });
  });

  describe('Model should be init from objects', () => {
    initModel(getTestObjects(), (data: ISliderData) => {
      describe(`Object: ${JSON.stringify(data)}`, () => {
        for (let i = 0; i < methods.length; i++) {
          it(`Property ${methods[i]} should be defined (${model[methods[i]]})`, () => {
            expect(model[methods[i]]).toBeDefined('undefined');
          });
        }
      });
    });
  });

  describe('Model should be init from server', () => {
    console.log('model-1');
    initModel(getTestForms(), (data: FormData) => {
      describe(`Server: variant ${data.get('variant')}`, () => {
        console.log('model-3');
        for (let i = 0; i < methods.length; i++) {
          it(`Property ${methods[i]} should be defined (${model[methods[i]]})`, () => {
            //console.log(testData.get(methods[i]));
            expect(model[methods[i]]).toBeDefined('undefined');
            console.log('model-4');
          });
        }
      });
    });
  });
  // it('Model should be init from server', () => {
  //
  //   expect(model.init(form)).toBeTruthy('error init model from server')
  // });
  //
  // describe('Property model.onVertical should be valid', () => {
  //
  //   it('Property should be true or false', () => {
  //     expect(model.onVertical || !model.onVertical).toBeTruthy('not(true|false))');
  //   });
  // });
  //
  // describe('Property model.onRange should be valid', () => {
  //
  //   it('Property should be true or false', () => {
  //     expect(model.onRange || !model.onRange).toBeTruthy('not(true|false))');
  //   });
  // });
  //
  // describe('Property model.onTooltip should be valid', () => {
  //
  //   it('Property should be true or false', () => {
  //     expect(model.onTooltip || !model.onTooltip).toBeTruthy('not(true|false))');
  //   });
  // });
  //
  // describe('Property model.onScale should be valid', () => {
  //
  //   it('Property should be true or false', () => {
  //     expect(model.onScale || !model.onScale).toBeTruthy('not(true|false))');
  //   });
  // });
  //
  // describe('Property model.minValue should be valid', () => {
  //
  //   using('Should valid all properties in SliderModel', testValues, (value: number) => {
  //     it(`Should be: model.minValue (${value}) <= model.maxValue`, () => {
  //       model.minValue = value;
  //       expect(model.minValue <= model.maxValue).toBeTruthy(`model.minValue (${model.minValue}) <= model.maxValue (${model.maxValue})`);
  //     });
  //   });
  // });
  //
  // describe('Property model.maxValue should be valid', () => {
  //
  //   using('Should valid all properties in SliderModel', testValues, (value: number) => {
  //     it(`Should be: model.maxValue (${value}) >= model.minValue`, () => {
  //       model.maxValue = value;
  //       expect(model.maxValue >= model.minValue).toBeTruthy(`model.maxValue (${model.maxValue}) >= model.minValue (${model.minValue})`);
  //     });
  //   });
  // });
  //
  // describe('Property model.valueFrom should be valid', () => {
  //
  //   using('Should valid all properties in SliderModel', testValues, (value: number) => {
  //     it(`Should be: model.minValue <= model.valueFrom (${value}) <= model.valueTo `, () => {
  //       model.valueFrom = value;
  //       expect((model.valueFrom >= model.minValue) && (model.valueFrom <= model.valueTo))
  //         .toBeTruthy(`model.minValue (${model.minValue}) <= model.valueFrom (${model.valueFrom}) <= model.valueTo (${model.valueTo})`);
  //     });
  //   });
  // });
  //
  // describe('Property model.valueTo should be valid', () => {
  //
  //   using('Should valid all properties in SliderModel', testValues, (value: number) => {
  //     it(`Should be: model.valueFrom <= model.valueTo (${value}) <= model.maxValue`, () => {
  //       model.valueTo = value;
  //       expect((model.valueTo >= model.valueFrom) && (model.valueTo <= model.maxValue))
  //         .toBeTruthy(`model.minValue (${model.valueFrom}) <= model.valueTo (${model.valueTo}) <= model.maxValue (${model.maxValue})`);
  //     });
  //   });
  // });
  //
  // describe('Property model.stepSize should be valid', () => {
  //   it('Property should be defined', () => {
  //     expect(model.stepSize).toBeDefined('undefined');
  //   });
  // });
  //
  // describe('Property model.serverURL should be valid', () => {
  //   it('Property should be defined', () => {
  //     expect(model.serverURL).toBeDefined(`undefined`);
  //   });
  // });

  function callbackFunc(method: TMethodsUnion, value: number | boolean) {
    testData.set(method, value);
  }

  function initModel(values: ISliderData[] | HTMLElement[] | FormData[], func: Function) {
    for (let i = 0, count = values.length; i < count; i++) {
      func.apply(Object, [values[i]]);
    }
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
        onScale: true
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
        onScale: false
      }
    ];
  }
});