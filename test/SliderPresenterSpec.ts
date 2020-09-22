import {SliderPresenter} from "../src/slider/SliderPresenter";


describe('TESTING MODULE SRC/SLIDER/SLIDERPRESENTER.TS', () => {
  const presenter = new SliderPresenter();
  const modelData = {
    onVertical: true,
    onScale: true,
    onRange: true,
    onTooltip: true,
    minValue: 0,
    maxValue: 100,
    valueFrom: 10,
    valueTo: 90,
    stepSize: 1,
    serverURL: 'http://localhost:9000/slider'
  }
  const props = <TMethodsUnion[]>Object.keys(modelData);


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
    let spySetModelData: jasmine.Spy;
    const spyModelEvt = jasmine.createSpy('spyModelEvt').and.callFake((evt) => {
      dataModelEvt.push(evt.detail);
    });
    const dataModelEvt: { name: string, value: number | boolean | string }[] = [];

    beforeAll(() => {
      spySetModelData = spyOn(presenter.view, 'setModelData');
      presenter.view.addEventListener('slider-data', spyModelEvt);
    });
    afterEach(() => {
      spyModelEvt.calls.reset();
      spySetModelData.calls.reset();
      dataModelEvt.length = 0;
    });
    for (let key of props) {
      it(`setProps("${key}") should dispatch event "slider-model" and call method "setModelData" with (${key}, ${modelData[key]})`, () => {
        presenter.setProps(key, modelData[key]);
        if (key === 'valueTo' && presenter.getProps('onRange') === false) {
          expect(spyModelEvt).not.toHaveBeenCalled();
        } else {
          expect(spyModelEvt).toHaveBeenCalled();
          expect(dataModelEvt[0].name).toEqual(key);
          expect(dataModelEvt[0].value).toEqual(modelData[key]);
          expect(spySetModelData).toHaveBeenCalledWith(key, modelData[key]);
        }
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
});