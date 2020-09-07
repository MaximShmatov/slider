import {SliderModel} from '../src/slider/SliderModel';

describe('src/slider/SliderModel.ts tests', () => {
  let model: SliderModel = new SliderModel(callbackFunc);

  let testValues: number[] = [-112, 455, 34.5, 0, -11, 10, 0, 120, -28, 0.5, 12.8];

  let testElements: HTMLElement[] = [];
  testElements.push(getHTMLElement(['5', '110', '15', '95', '1', 'true', 'true', 'true', 'true']));
  testElements.push(getHTMLElement(['3', '98', '15', '85', '2', 'false', 'false', 'false', 'false']));

  let testForms: FormData[] = [];
  for (let i = 0; i <= 1; i++) {
    testForms[i] = new FormData();
    testForms[i].append('variant', i.toString());
  }

  let testObjects: [ISliderData,ISliderData] = [{
    minValue: 10,
    maxValue: 120,
    valueFrom: 20,
    valueTo: 110,
    stepSize: 2,
    onRange: true,
    onTooltip: true,
    onVertical: true,
    onScale: true,
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
  }];
  function getHTMLElement(data: string[]): HTMLElement {
    let element =  document.createElement('div');
    element.setAttribute('data-min-value', data[0]);
    element.setAttribute('data-max-value', data[1]);
    element.setAttribute('data-value-from', data[2]);
    element.setAttribute('data-value-to', data[3]);
    element.setAttribute('data-step-size', data[4]);
    element.setAttribute('data-on-range', data[5]);
    element.setAttribute('data-on-scale', data[6]);
    element.setAttribute('data-on-vertical', data[7]);
    element.setAttribute('data-on-tooltip', data[8]);
    return element;
  }
  describe('Model should be init from objects', () => {
    using(testObjects, (data: SliderModel) => {
      describe(`Object: ${JSON.stringify(data)}`, () => {
        console.log('model-1');
        model.init(data);
        console.log('model-3');
        toBeValid();
      });
    });
  });
  describe('Model should be init from server', () => {
    using(testForms, (data: FormData) => {
      describe(`Server: variant - ${data.get('variant')}`, () => {
        console.log('model-11');
        model.init(data);
        console.log('model-33');
        toBeValid();
      });
    });
  });
  describe('Model should be init from HTMLElement', () => {
    using(testElements, (data: HTMLElement) => {
      describe(`HTMLElement: ${data.outerHTML}`, () => {
        console.log('model-1');
        model.init(data);
        console.log('model-3');
        toBeValid();
      });
    });
  });

  function toBeValid() {
    it(`Property onVertical should be defined (${model.onVertical})`, () => {
      expect(model.onVertical).toBeDefined('undefined');
    });
    it(`Property onRange should be defined (${model.onRange})`, () => {
      expect(model.onRange).toBeDefined('undefined');
    });
    it(`Property onTooltip should be defined (${model.onTooltip})`, () => {
      expect(model.onTooltip).toBeDefined('undefined');
    });
    it(`Property onScale should be defined (${model.onScale})`, () => {
      expect(model.onScale).toBeDefined('undefined');
    });
    it(`Property minValue should be defined (${model.minValue})`, () => {
      expect(model.minValue).toBeDefined('undefined');
    });
    it(`Property maxValue should be defined (${model.maxValue})`, () => {
      expect(model.maxValue).toBeDefined('undefined');
    });
    it(`Property valueFrom should be defined (${model.valueFrom})`, () => {
      expect(model.valueFrom).toBeDefined('undefined');
    });
    it(`Property valueTo should be defined (${model.valueTo})`, () => {
      expect(model.valueTo).toBeDefined('undefined');
    });
  }

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

  function callbackFunc(name: TMethodsUnion, value: number | boolean) {
    //console.log(name, value);
  }

  function using<T>(values: T[], func: Function) {
    for (let i = 0, count = values.length; i < count; i++) {
      func.apply(Object, [values[i]]);
    }
  }
});