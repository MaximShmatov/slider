import {SliderPresenter} from "../src/slider/SliderPresenter";


describe('TESTING MODULE SRC/SLIDER/SLIDERPRESENTER.TS', () => {
  const presenter = new SliderPresenter();
  const modelData = {
    minValue: 0,
    maxValue: 100,
    valueFrom: 10,
    valueTo: 90,
    stepSize: 1,
    onVertical: true,
    onScale: true,
    onRange: true,
    onTooltip: true,
    serverURL: 'http://localhost:9000/slider'
  }
  const props = <TMethodsUnion[]>Object.keys(modelData);
  let dataModelEvt: {name: string, value: number | boolean | string};


  it('View should be defined', () => {
    expect(presenter.view).toBeDefined();
  });
  describe('Testing reading properties', () => {
    const element: HTMLElement = getHTMLElementFromObj(modelData);
    beforeAll(() => {
      presenter.init(element);
    });
    for (let key of props) {
      it(`getProps("${key}") should return ${element.dataset[key]}`, () => {
        expect(element.dataset[key]).toBeDefined();
        expect(String(presenter.getProps(key))).toEqual(String(element.dataset[key]));
      });
    }
  });
  describe('Testing setting properties', () => {
    const spyModelEvt = jasmine.createSpy('spyModelEvt').and.callFake((evt) => {dataModelEvt = evt.detail;});
    beforeAll(() => {
      presenter.view.addEventListener('slider-data', spyModelEvt);
    });
    afterEach(() => {
      spyModelEvt.calls.reset();
    });
    for (let key of props) {
      it(`setProps("${key}") should dispatch event "slider-model" with (${key}, ${modelData[key]})`, () => {
        presenter.setProps(key, modelData[key]);
        expect(spyModelEvt).toHaveBeenCalled();
        expect(dataModelEvt.name).toEqual(key);
      });
    }
  });

  function getHTMLElementFromObj(data: ISliderData): HTMLElement {
    const element = document.createElement('input');
    element.setAttribute('data-min-value', '5');
    element.setAttribute('data-max-value', '95');
    element.setAttribute('data-value-from', '15');
    element.setAttribute('data-value-to', '85');
    element.setAttribute('data-step-size', '5');
    element.setAttribute('data-on-range', 'false');
    element.setAttribute('data-on-scale', 'false');
    element.setAttribute('data-on-vertical', 'false');
    element.setAttribute('data-on-tooltip', 'false');
    element.setAttribute('data-server-u-r-l', 'test string');
    return element;
  }
    //
    // it(`getProps("maxValue") should return ${modelData.maxValue}`, () => {
    //   expect(presenter.getProps('maxValue')).toEqual(modelData.maxValue);
    // });
    // it(`getProps("valueFrom") should return ${modelData.valueFrom}`, () => {
    //   expect(presenter.getProps('valueFrom')).toEqual(modelData.valueFrom);
    // });
    // it(`getProps("valueTo") should return ${modelData.minValue}`, () => {
    //   expect(presenter.getProps('valueTo')).toEqual(modelData.minValue);
    // });
    // it(`getProps("stepSize") should return ${modelData.minValue}`, () => {
    //   expect(presenter.getProps('stepSize')).toEqual(modelData.minValue);
    // });
    // it(`getProps("onVertical") should return ${modelData.minValue}`, () => {
    //   expect(presenter.getProps('onVertical')).toBeTruthy();
    // });
    // it(`getProps("onRange") should return ${modelData.minValue}`, () => {
    //   expect(presenter.getProps('onRange')).toBeTruthy();
    // });
    // it(`getProps("onScale") should return ${modelData.minValue}`, () => {
    //   expect(presenter.getProps('onScale')).toBeTruthy();
    // });
    // it(`getProps("onTooltip") should return ${modelData.minValue}`, () => {
    //   expect(presenter.getProps('onTooltip')).toBeTruthy();
    // });
    // it(`getProps("serverUrl") should return ${modelData.minValue}`, () => {
    //   expect(presenter.getProps('serverURL')).toEqual(modelData.minValue);
    // });

});